from django.urls import path
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('getcomments', views.returnComments, name='return-comments'),
    path('storecomment', views.storeComment, name='store-comments'),
    path('getpages', views.returnPage, name='get-pages'),
    #path('getstoriesbycategory', views.getstoriesbycategory, name='getstoriesbycategory'),
    path('_scrapeAndReturnData', views.scrapeDBreturn, name='scrape-data'),
    path('loggingin', views.login, name='login'),
    path('authenticate', views.authenticateLogin, name='authenticate'),
    path('createuser', views.createUser, name='create-user'),
    path('getuserstories', views.returnUserStories, name='return-user-stories'),
    path('getuserinfo', views.returnUserInfo, name='return-user-info'),
    url('api-token-auth/', obtain_jwt_token),
    path('api-token-verify/', verify_jwt_token),
    path('storevote', views.storeVote),
    path('getNotification', views.getNotification),
    
]