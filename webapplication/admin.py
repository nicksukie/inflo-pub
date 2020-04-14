from django.contrib import admin
from .models import Article, Votes, User


class ArticleAdmin(admin.ModelAdmin):
    #fields = ['headline', 'pub_date', 'topic', 'votes']
    list_display =('headline', 'topic', 'pub_date', 'votecount')


admin.site.register(Article, ArticleAdmin)

#admin.site.register(Article)



admin.site.register(Votes)
admin.site.register(User)
#admin.site.register(Topic)
# Register your models here.
