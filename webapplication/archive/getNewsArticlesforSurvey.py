from newsapi import NewsApiClient
from pprint import pprint
import json
from datetime import date, timedelta
from django.http import JsonResponse
from scraping import scrapeNews, scrapeNewsHeadline
import mysql.connector
from datetime import date





def runnewsapi(today):
    newsapi = NewsApiClient(api_key='d478da899a2548d98c0255eaceab061a')
    #'gun control, democratic primaries, marijuana, immigration, brexit'
    topics = 'gun control', 'democratic primaries', 'marijuana', 'immigration', 'brexit'
    articlespertopicpersourceneeded = 1
    
    sources = "abc-news", "bbc-news", "al-jazeera-english", "associated-press", "cnn", 
    
    topics = ['gun control',]
    
    
    sources = ["abc-news",]    
    
    
    
    
    topicresults = []
    for source in sources:
        print(source)
    
        for topic in topics:
    
            page = 1
    
            start_date = today
#            end_date = date(2019, 11, 1)
            delta = timedelta(days=1)
            print(topic)
            articlespertopicsource = 0
            while articlespertopicsource < articlespertopicpersourceneeded:
                date_string = start_date.strftime("%Y-%m-%d")
                print("Starting with the date: ", date_string)
                            
                
            
                all_articles = newsapi.get_everything(q =topic,
                                                      sources = source,
                                                      from_param = date_string,
                                                      to = date_string,
                                                      language = 'en',
                                                      page_size = 100,                                              page = page)
        
                print("This date has ", all_articles['totalResults'], " pages.")
                
                
            
                for article in all_articles['articles']:
                    
                    data = {}
                    data['url'] = article['url']
                    data['title'] = article['title']
                    data['source'] = article['source']['name']
                    data['date'] = article['publishedAt'][:10]
                    if data['title'] not in topicresults:
                        topicresults.append([data["source"], data["title"], data['url']])
        #        if "ABC News" != data['source']:
                        print(data["source"], data["title"])
                        articlespertopicsource +=1
                start_date -= delta
                

                
            
            
    return topicresults

##TEST WITH DATE
print(runnewsapi(date.today()))





#garbage below


#    print(JsonResponse(articledata)



#print(getsurveyarticles())
    




#            outfile.write(json.dumps(data) + "\n")
#
#    total = int(all_articles['totalResults'] / 100)
#
#    for i in range(page + 1, total + 2):
#        print("Currently scraping the news published at ", date_string)
#        print("Page number ", i)
#        all_articles = newsapi.get_everything(sources = sources,
#                                              from_param = date_string,
#                                              to = date_string,
#                                              language = 'en',
#                                              page_size = 100,
#                                              page = i)
#        for article in all_articles['articles']:
#            data = {}
#            data['url'] = article['url']
#            data['title'] = article['title']
#            data['source'] = article['source']['name']
#            data['date'] = article['publishedAt'][:10]
#            if "ABC News" != data['source']:
#                outfile.write(json.dumps(data) + "\n")


