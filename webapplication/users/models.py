# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User

import jwt

class Comments(models.Model):
    commentid = models.AutoField(db_column='commentID', primary_key=True)  # Field name made lowercase.
    timestamp = models.DateField()
    text = models.CharField(max_length=500)
    commentaryType = models.CharField(max_length=500)
    votes = models.IntegerField()
    story = models.ForeignKey('Story', models.DO_NOTHING, db_column='storyID')  # Field name made lowercase.
    user = models.ForeignKey(User, models.DO_NOTHING, db_column='userID')

      # Field name made lowercase.
    class Meta:
        managed = True
        db_table = 'Comments'


class Connectionlist(models.Model):
    clid = models.AutoField(primary_key=True)
    privacylevel = models.IntegerField(db_column='privacyLevel')  # Field name made lowercase.
    self = models.ForeignKey('User', models.DO_NOTHING, db_column='self',related_name='b')
    other = models.ForeignKey('User', models.DO_NOTHING, db_column='other',related_name='a')

    class Meta:
        managed = True
        db_table = 'ConnectionList'
        unique_together = (('clid', 'self', 'other'),)


class Connectionrequests(models.Model):
    crid = models.AutoField(db_column='crID', primary_key=True)  # Field name made lowercase.
    timestamp = models.DateField()
    status = models.IntegerField()
    recieveruser = models.ForeignKey('User', models.DO_NOTHING, db_column='recieverUser',related_name='c')  # Field name made lowercase.
    senderuser = models.ForeignKey('User', models.DO_NOTHING, db_column='senderUser',related_name='d')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'ConnectionRequests'
        unique_together = (('crid', 'recieveruser', 'senderuser'),)


class Login(models.Model):
    password = models.CharField(max_length=500)
    email = models.CharField(primary_key=True, max_length=250)
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='userID')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'Login'


class Notification(models.Model):
    notificationid = models.AutoField(db_column='notificationID', primary_key=True)  # Field name made lowercase.
    type = models.CharField(max_length=500)
    time = models.DateField()
    story = models.ForeignKey('Story', models.DO_NOTHING, db_column='storyID')  # Field name made lowercase.
    userSender = models.ForeignKey(User, models.DO_NOTHING, db_column='userIDSender', related_name='Sender')  # Field name made lowercase.
    userReceiver = models.ForeignKey(User, models.DO_NOTHING, db_column='userIDReceiver', related_name='Receiver')  # Field name made lowercase.
    class Meta:
        managed = True
        db_table = 'Notification'


class Story(models.Model):
    storyid = models.AutoField(db_column='storyID', primary_key=True)  # Field name made lowercase.
    date = models.CharField(max_length=500)
    source = models.CharField(max_length=500, blank=True, null=True)
    thumbnail = models.CharField(max_length=500, blank=True, null=True)
    details = models.CharField(max_length=1000000, blank=True, null=True)
    headline = models.CharField(max_length=500, blank=True, null=True)
    originalstory = models.CharField(db_column='originalStory', max_length=500, blank=True, null=True)  # Field name made lowercase.
    sourcelink = models.CharField(db_column='sourceLink', max_length=500, blank=True, null=True)  # Field name made lowercase.
    url = models.CharField(max_length=500, blank=True, null=True)
    keywords = models.CharField(max_length=500, blank=True, null=True)
    timeposted = models.CharField(max_length=500, blank=True, null=True)
    category = models.CharField(max_length=500, blank=True, null=True)
    isnews = models.CharField(max_length=10, blank = True, null = False)
    class Meta:
        managed = True
        db_table = 'Story'


class UserStory(models.Model):
    id = models.AutoField(db_column='id1', primary_key=True)
    timestamp = models.CharField(max_length=500, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING, db_column='userID')  # Field name made lowercase.
    story = models.ForeignKey(Story, models.DO_NOTHING, db_column='storyID')  # Field name made lowercase.
    firstCommentary = models.ForeignKey(Comments, models.DO_NOTHING, db_column='firstCommentary')
    firstornot = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'USER_STORY'
        unique_together = (('user', 'story'),)


class User(models.Model):
    userid = models.AutoField(db_column='userID', primary_key=True)  # Field name made lowercase.
    email = models.CharField(unique=True, max_length=250)
    username = models.CharField(max_length=250)


    class Meta:
        managed = True
        db_table = 'User'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = True
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    profileImg = models.CharField(max_length=500)

    class Meta:
        managed = True
        db_table = 'auth_user'








class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'django_session'
