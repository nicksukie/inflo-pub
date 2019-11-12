from django.shortcuts import render
import mysql.connector
from .scraping import scrapeNews, scrapeNewsHeadline
from django.http import HttpResponse
import datetime

from .models import Story, UserStory, Comments, Notification

from django.contrib.auth.models import User

from django.contrib.auth import authenticate, login

from django.forms.models import model_to_dict

import json

from django.http import JsonResponse

from django.core.paginator import Paginator

import random

from django.views.decorators.csrf import csrf_exempt

from django.core.exceptions import ObjectDoesNotExist

from django.core import serializers

#from .twitterFriends import getFriendslist
#from .readTweets import getNewstweets
#import tweepy

#from cnn_pytorch_demo import predict

from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer

from rest_framework_jwt.settings import api_settings

from django.core.exceptions import ValidationError

from django.conf import settings

import jwt

from .twitterPostCat import postToTwitter

paginationIndex = 6


def getUser(token):
    data = {'token': token}
    try:
        valid_data = VerifyJSONWebTokenSerializer().validate(data)
        user = valid_data['user']
        #username = valid_data['username']
        return user
    except ValidationError as v:
        return None

def validateUser(token):
    data = {'token': token}

    try:
        #valid_data = VerifyJSONWebTokenSerializer().validate(data)
        #user = valid_data['user']
        payload = jwt.decode(token, settings.SECRET_KEY)
        user = User.objects.get(id = payload['user_id'])
        return user
    except jwt.ExpiredSignatureError as j:
        return "Expired"
    except ValidationError as v:
        return "Other Error"
    
def getToken(user):
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)
    return token 

#login to existing account
@csrf_exempt
def authenticateLogin(request):
    data = json.loads(request.body)

    username = data["username"]
    password = data["password"]
    user = authenticate(request, username=username, password=password)
    print(request.META)
    if user is not None:
        login(request,user)
    else:
        print("NOOOOOO!")

    token = getToken(user)
    return JsonResponse(token, safe = False)

#create new account
@csrf_exempt
def createUser(request):
    data = json.loads(request.body)
    username = data["username"]
    password = data["password"]
    email = data["email"]
    
    user = User.objects.create_user(username, email, password)
    user.save()
    print(user)
    token = getToken(user)
    
    return JsonResponse(token, safe = False)

def getUsersByStory(story):
    userStories = UserStory.objects.filter(story = story)
    allusers = []
    for userstory in userStories:
        user = User.objects.get(id = userstory.user_id)
        obj = {"Time" : str(userstory.timestamp), "Name": user.username}
        allusers.append(obj)
    return allusers

def makeUsersJSON(stories):
    jsonstories = []
    for story in stories:
        userStories = UserStory.objects.filter(story = story)
        allusers = getUsersByStory(story)

        dict_obj = model_to_dict(story)
        dict_obj['users'] = allusers
        jsonstories.append(dict_obj)
    return jsonstories



def returnPage(request):
    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
    valid = validateUser(token)
    
    if valid == "Expired":
        return JsonResponse('Expired', safe=False)
    elif valid == "Other Error":
        return JsonResponse('Error : Cannot Login', safe=False)
    elif valid:
        pageNumber = request.GET.get('pageNumber')

        categories = request.GET.get('category').split(',')
        
        sortType = request.GET.get('sortType')
        
        if sortType == "Most Recently Shared":
            sortType = "-timeposted"
        elif sortType == "Most Recently Published":
            sortType = "-date"
        else:
            sortType = "timeposted"

        if categories[0] == "noCategories":
            stories = Story.objects.order_by(sortType)
            print(stories)
        else:
            stories = Story.objects.filter(category__in = categories).order_by(sortType)
        
        paginator = Paginator(stories, paginationIndex)
        stories = paginator.page(pageNumber)
        jsonstories = makeUsersJSON(stories)
        return JsonResponse(jsonstories, safe=False)


@csrf_exempt
def getNotification(request):
    #url = request.GET.get('url')

    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
    valid = validateUser(token)
    if valid:
        userReceiver = getUser(token)
        notifications = Notification.objects.filter(userReceiver = userReceiver)
        allnotifs = []
        for notification in notifications:
            if notification.type == "upvote":
                text = notification.userSender.username + " just upvoted your comment"
            elif notification.type == "downvote":
                text = notification.userSender.username + " just downvoted your comment"
            else:
                text = notification.userSender.username + " just commented on your post"
            allnotifs.append({'text' : text, 'storyid': notification.story.storyid, 'time' : notification.time})
        return JsonResponse(allnotifs, safe=False)
    return JsonResponse('', safe=False)


def saveNotification(type, story, userSender):
    userReceiver = UserStory.objects.filter(story = story).get(firstornot = True)
    notif = Notification(story = story, type = type, time = datetime.datetime.now(), userSender = userSender, userReceiver = userReceiver.user)
    notif.save()


"""def getstoriesbycategory(request):
    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
    valid = validateUser(token)
    if valid:
        categories = request.GET.get('category').split(',')
        stories = Story.objects.filter(category__in = categories)
        jsonstories = makeUsersJSON(stories)
        return JsonResponse(jsonstories, safe=False)
    else:
        return HttpResponse('unsuccessful')"""

def returnUserStories(request):
    username = request.GET.get('user')
    user = User.objects.get(username = username)
    userstories = UserStory.objects.filter(user = user)
    returnVal = []
    for userstory in userstories:
        dict_userstory = model_to_dict(userstory.story)
        dict_userstory["firstcommentary"] = userstory.firstCommentary.text
        returnVal.append(dict_userstory)
    return JsonResponse(returnVal, safe = False)

def returnUserInfo(request):
    username = request.GET.get('user')
    user = User.objects.get(email = username)
    userstories = UserStory.objects.filter(user = user)
    shares = userstories.count()
    date_joined = user.date_joined
    first_name = user.first_name
    last_name = user.last_name

    returnVal = {}

    returnVal["shares"] = shares
    returnVal["date_joined"] = date_joined
    returnVal["first_name"] = first_name
    returnVal["last_name"] = last_name
    
    return JsonResponse(returnVal, safe = False)

def returnComments(request):

    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
    valid = validateUser(token)
    if valid:
        user = getUser(token)
        
        
        storyID = request.GET.get('storyID')
        sortType = request.GET.get('sortType')

        story = Story.objects.get(storyid = storyID)
        
        username =  user.username
        

        if sortType == "Most Recent":
            sortType = "-timestamp"
        elif sortType == "Most Upvotes":
            sortType = "-votes"
        else:
            sortType = "votes"

        comments = Comments.objects.filter(story_id = storyID).order_by(sortType)

        result = {}

        for i, comment in enumerate(comments):
            result[i+1] = model_to_dict(comment)
        result[0] = model_to_dict(story)
        return JsonResponse(result, safe=False)
    return JsonResponse('', safe=False)

def insertCommentIntoDB(story, user, text, commentaryType):
    newComment = Comments(timestamp = datetime.datetime.now(), text = text,commentaryType = commentaryType, story = story, user = user, votes = 0)
    newComment.save()
    return newComment

@csrf_exempt
def storeVote(request):
    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
    valid = validateUser(token)
    if valid:
        commentid = request.GET.get('commentid')
        type = request.GET.get('type')
        comment =  Comments.objects.get(commentid = commentid)

        if comment.votes == None:
            comment.votes = 0
        if type == "up":
            comment.votes += 1
        else:
            comment.votes -= 1
        comment.save()
        print(commentid + type)

        saveNotification(type + "vote", comment.story, comment.user)
    return HttpResponse('')

@csrf_exempt
def storeComment(request):

    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
    valid = validateUser(token)
    if valid:
        user = getUser(token)

        data = json.loads(request.body)
        story =  Story.objects.get(storyid = data['storyID'])
        commentaryType = data['commentaryType']
        text = data['text']
        print(user.id)
        newComment = insertCommentIntoDB(story, user, text, commentaryType)
        saveNotification("comment", story, user)
        return JsonResponse(str(newComment.commentid), safe = False)
    return JsonResponse('', safe = False)

#saving to db
def insertDataToStory(_date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _timePosted, _category, _isNews):
    newStory = Story(date = _date, headline = _headline, thumbnail = _thumbnail, details = _details, originalstory = _originalStory, source = _source, sourcelink = _sourceLink, timeposted = _timePosted, category = _category, isnews = _isNews)
    newStory.save()
    return newStory
   

def addNewStory(_date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _isNews, _timePosted, user, commentaryText, commentaryType):
    #categories = ['Politics', 'Business', 'Entertainment','Tech','Sports']
    _category = "debug"
    story = insertDataToStory(_date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _timePosted, _category, _isNews) 

    commentary = insertCommentIntoDB(story, user, commentaryText, commentaryType)
    newUserStory = UserStory(timestamp = _timePosted, user = user, story = story, firstornot = True, firstCommentary = commentary)
    newUserStory.save()
    story = Story.objects.get(headline = _headline)
    dict_obj = model_to_dict(story)
    return dict_obj, story

#@app.route('/_scrapeAndReturnData')
def scrapeDBreturn(request): 
    url = request.GET.get('url')
    commentaryType =  request.GET.get('commentaryType')
    commentaryText =  request.GET.get('commentaryText')

    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
    valid = validateUser(token)
    if valid:
        user = getUser(token)

        _headline = scrapeNewsHeadline(url)
        try:
            allStories = Story.objects.get(headline = _headline)
        except ObjectDoesNotExist:
            allStories = None

        ##post to Twitter (uncomment after @inflonews API approved)
        #postToTwitter(_category, url)
        

        t = datetime.datetime.now()
        _timePosted = t.strftime('%Y-%m-%d %H:%M')

        if(allStories == None):
            #if the story is new
            _date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _isNews = scrapeNews(url)
        
            if _isNews == False:
                return JsonResponse('Not News', safe = False)
            _details = _details[:120]
            dict_obj, story = addNewStory(_date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _isNews, _timePosted, user, commentaryText, commentaryType)
            dict_obj['users'] = getUsersByStory(story)
        else :
            #if the story is old but not shared by current user
            userStory = UserStory.objects.filter(story = allStories).filter(user = user)
            print(userStory)
            if(not userStory):
                allStories.timestamp = _timePosted
                allStories.save()
                commentary = insertCommentIntoDB(allStories, user, commentaryText, commentaryType)
                newUserStory = UserStory(timestamp = _timePosted, user = user, story = allStories, firstornot = False, firstCommentary = commentary)
                newUserStory.save()
                obj = {'Time' : _timePosted, 'Name': user.username}
                dict_obj = {"storyID": allStories.storyid, "exists":True, "user":obj} 
                
            else :
                #if the story is old and already shared by current user
                return JsonResponse('', safe = False)

        return JsonResponse(dict_obj)

    return JsonResponse('', safe = False)





def loggingin(request):
    return render(request, 'login.html')


def index(request):
    stories = Story.objects.order_by('-timeposted')
    paginator = Paginator(stories, paginationIndex)
    stories = paginator.page(1)
    jsonstories = makeUsersJSON(stories)
    print(jsonstories)
    context = {'stories':jsonstories,
                'currentUserID':request.user.id}
    
    #user = User.objects.create_user('myusername', 'myemail@crazymail.com', 'mypassword')
    #user.save()
    print(request.user.id)
    print("hiii")
    return render(request, 'dashboard.html', context)
   

    
#def insertDataToTwitterStory(_date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _timePosted, _category, _isNews, _twitterusername, _tweettext, _profileimg, _tweeturl):
#    #cursor=db.cursor()
#    #cursor.execute( "insert into Story(date, source, thumbnail, details, headline, originalStory, sourceLink, timePosted, category) values ( %s,%s,%s,%s,%s,%s,%s,%s,%s)", (_date , _source, _thumbnail,_details,_headline, _originalStory,_sourceLink, _timePosted, _category))
#    newTwitterStory = TwitterStory(date = _date, headline = _headline, thumbnail = _thumbnail, details = _details, originalstory = _originalStory, source = _source, sourcelink = _sourceLink, timeposted = _timePosted, category = _category, isnews = _isNews, twitterusername = _twitterusername,  tweettext = _tweettext, profileimg = _profileimg, tweeturl = _tweeturl)
#    newTwitterStory.save()


#def indexTwitter(request):
##    scrapeDBreturnTwitter()
#    stories = TwitterStory.objects.order_by('-timeposted')
#    paginator = Paginator(stories, 9)
#    stories = paginator.page(1)
#    context = {'stories':stories}
#    
#    return render(request, 'dashboard-twitter.html', context)

def userProf(request):
#    scrapeDBreturnTwitter()

#    paginator = Paginator(stories, 9)
#    stories = paginator.page(1)
#    context = {'stories':stories}
    
    return render(request, 'userProfile.html')

#START TWITTER




#def scrapeDBreturnTwitter(): 
##    with open("twitter_credentials.json", "r") as file:  
##        creds = json.load(file)
#
#    ckey = 'aVY180JluDAaWB2eLexdZDkHH'
#    csecret = 'sCydpjtwOvQVHzn4oW90P1eIKnVHYFLP14NSk1vmzvZF2menP7'
#    atoken =  '1044876081759735810-MMDDFXLUeGlw5yngYVBlEz5Y5MMUEF'
#    asecret = 'Yh7EkiHGXewbwBvlOG4qUtHcN69nx4pjhqkoRHh07jWnW'
#    
#    auth = tweepy.OAuthHandler(ckey, csecret)
#    auth.set_access_token(atoken, asecret)
#    
#    api = tweepy.API(auth)
#    
#    
#    #CHANGE TO BE PART OF REQUEST INPUT VARIABLE 
#    username = 'sukienniko'
#    mostRecent = TwitterStory.objects.order_by('-timeposted').first()
#    if mostRecent == None:
#        mostRecent = datetime.datetime(2019, 1, 1, 00, 00, 00)
#    else:
#        mostRecent = TwitterStory.objects.order_by('-timeposted').first().timeposted
#    
#    friends = getFriendslist(api, username)
#    
#    newsFromfriends = dict()
#    for friend in friends:
#        getNewstweets(api, friend, mostRecent)
#    
#    
##    result = getURL()
#    
##    a = request.GET.get('a')#other arguments?
##    _date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _isNews = scrapeNews(a)
##    t = datetime.datetime.now()
##    _timePosted = t.strftime('%Y-%m-%d %H:%M')
#    _category = 'Tech'
##    print(_category)
#
##    dataList = [ _date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink]
#    #_category = predict(_details)  #call cat algorithms
#    for i in newsFromfriends: 
#        _twitterusername, _date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _category, _isNews, _tweettext, _profileimg, _tweeturl, _timePosted = (i, newsFromfriends[i])
#        insertDataToTwitterStory(_date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _timePosted, _category, _isNews, _twitterusername, _tweettext, _profileimg, _tweeturl)
#    
#    story = TwitterStory.objects.filter(sourcelink = _sourceLink)
#
#    # assuming obj is your model instance
#    dict_obj = model_to_dict(story[0])
#    
#    serialized = json.dumps(dict_obj)
#    print("hiii" + str(_category))
##    storyID = DBdata[0]
##    return jsonify(result=DBdata)
#    print('hiiiii' + str(dict_obj))
#    return JsonResponse(dict_obj)
        