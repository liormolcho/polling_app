from django.conf.urls import url, include
from . import views

urlpatterns = [ url(r'^$', views.api_root),
    			url(r'^questions/$', views.QuestionList.as_view(), name = 'create_question'),
				url(r'^questions/(?P<question_url>[0-9]+)/$', views.QuestionItem.as_view(), name='get_question'),
				url(r'^questions/(?P<question_url>[0-9]+)/choices/$', views.QuestionChoices.as_view(), name='question_choices'),
				url(r'^choices/$', views.ChoiceList.as_view(), name='choices'),
   				url(r'^choices/(?P<choice_id>[0-9]+)/$', views.ChoiceItem.as_view(), name='get_choice'),
				url(r'^vote/(?P<choice_id>[0-9]+)/$', views.VoteItem.as_view(), name='vote_choice')]