# -*- coding: utf-8 -*-
"""
Created on Thu May 23 17:23:43 2019

@author: user
"""

import requests




origClasses = ['business', 'law', 'lifestyle', 'rel-pol', 'sports', 'war', 'entertainment', 'misc', 'science', 'tech']
newClasses = ['Business', 'Law', 'Lifestyle', 'Politics', 'Sports', 'World', 'Entertainment', 'Misc', 'Science', 'Tech']



def getCategory(articletext):

    #articletext = 'this is some text'
    params = {'text': articletext}
    apiurl = 'https://fastaitest-inflo.onrender.com/getCategory'

    r = requests.get(url = apiurl, params = params)
    data = r.json()
    data = data['category']
    counter = 0
    ##convert orig class to new class
    for x in origClasses:
        counter = counter+1
        print(x)

        if x in data:
#            print('yes')
            data = newClasses[counter-1]
#        else:
#            print('no')

    return data
