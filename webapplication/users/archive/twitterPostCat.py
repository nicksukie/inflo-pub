# -*- coding: utf-8 -*-
"""
Created on Thu Feb 28 17:14:41 2019

@author: user
"""


import requests

import tweepy
import json
import twitter   


# filename = "twitter_credentials.json"

# with open(filename, "r") as file:  
#     creds = json.load(file)
    
# ckey = creds['CONSUMER_KEY']
# csecret = creds['CONSUMER_SECRET']
# atoken =  creds['ACCESS_TOKEN']
# asecret = creds['ACCESS_SECRET']

#to change to inflonews creds
ckey = "vbbV51p6yTOYC4MBM44jSRNcS"
csecret = "WtZfpVDRXZUBClngy4t8JOYB64at03WBFwPZLlZZ9Ojqd30zzw"
atoken =  "1092037498832793600-YGvitakA59xm1jQL8vdTe1RETTIgyK"
asecret = "WQAVF0COw43pHc92W8tLDaEfzOckZmOyf0ztgzorSsjMT"


auth = tweepy.OAuthHandler(ckey, csecret)
auth.set_access_token(atoken, asecret)

api = tweepy.API(auth)



#this will post to @infloproject account. How to post from logged in user's acct? (Sign in via oauth, get access token from indiv user acct: https://developer.twitter.com/en/docs/basics/authentication/overview/oauth.html)
def postToTwitter(cat, url):
	message = "The following article has been classified by @infloproject as #"+str(cat) +":"
	
	api.update_status(message + url)