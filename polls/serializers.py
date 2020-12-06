from rest_framework import serializers
from .models import Question, Choice, Vote

class QuestionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Question
    fields = ('id', 'url', 'question_text', 'pub_date')

class ChoiceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Choice
    fields = ('id', 'question', 'choice_text', 'votes')

class VoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Vote
    fields = ('id', 'ip_address', 'user_agent', 'question','vote_date')