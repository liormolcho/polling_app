import datetime

from django.db import models
from django.utils import timezone

class Question(models.Model):
	pub_date = models.DateTimeField(auto_now_add=True)
	question_text = models.CharField(max_length = 200)
	url = models.CharField(max_length = 200)

	def __str__(self):
		return self.question_text

class Choice(models.Model):
	question = models.ForeignKey(Question, on_delete = models.CASCADE)
	choice_text = models.CharField(max_length = 200)
	votes = models.IntegerField(default = 0)

	def __str__(self):
		return self.choice_text

class Vote(models.Model):
	ip_address = models.GenericIPAddressField()
	user_agent = models.CharField(max_length = 200)
	question = models.ForeignKey(Question, on_delete = models.CASCADE)
	vote_date = models.DateTimeField(auto_now_add=True)
	def __str__(self):
		return str(self.ip_address) + " : " + self.user_agent