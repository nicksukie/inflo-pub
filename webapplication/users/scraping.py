# -*- coding: utf-8 -*-
"""
Created on Mon Apr 23 15:58:07 2018

@author: nsukiennik
"""

from newspaper import Article
from newspaper import urls
import requests
from bs4 import BeautifulSoup
import urllib.parse
import articleDateExtractor
#from getCategoryAPI import getCategory
   



#def getURL():
#    #user types in (pastes) URL
#    url = input("Type a web address: ")
#    return url
        
def scrapeNewsHeadline(url): 
    try: 
        a = Article(url)
        a.download()
        a.parse()
        _headline = a.title
    except: 
        _date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _isNews = ([],[],[],[],[],[],[],False)
    return _headline

def scrapeNews(url): 
    _source = ""

    #    url = getURL()
    #    url = "https://www.bloomberg.com/news/articles/2018-04-16/commerce-blocks-china-s-zte-from-exporting-technology-from-u-s"
    try:
        a = Article(url)
        
        a.download()
        a.parse()
        #must handle when fields are empty, such as the date in https://www.nbcnews.com/politics/donald-trump/if-trump-lawyer-cohen-recorded-conversations-ok-n866236
        _date = a.publish_date
        _headline = a.title
        _thumbnail = a.top_image
        metadata = a.meta_data
        _details= a.text
        _sourceLink = url
        _originalStory = 0
        _isNews = urls.valid_url(url)
        #_category = getCategory(_headline+_details)
#        _category = getCategory('debug')
            
        #_author = a.authors
        _author = []
        
                
        if _details == False:    
            _details = metadata["og"]["description"]
        
        if "site_name" in metadata["og"]:
            _source = metadata["og"]["site_name"]
        elif _source == "":
            _source =  urllib.parse.urlparse(url)
            _source = _source.netloc
    #        _source = _source[4:]
        elif _source == "U.S.":
                _source = "Reuters"
        
        if _date == None: 
            _date = articleDateExtractor.extractArticlePublishedDate(url)
        if _date == None: 
            _date = ""
    except: 
        
        a = type('test', (object,), {})()
        _date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _isNews = ([],[],[],[],[],[],[],False)
    
    return _date, _headline, _thumbnail, _details, _originalStory, _source, _sourceLink, _isNews

    



#url = "https://abcnews.go.com/International/wireStory/zealand-ban-criminals-guns-66901881"
#
#print(scrapeNews(url))