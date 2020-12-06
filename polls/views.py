from django.shortcuts import render
from django.http import HttpResponse
from .models import Question, Choice, Vote
from .serializers import QuestionSerializer, ChoiceSerializer
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

from django.contrib.auth.models import User
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework import status
from ipware import get_client_ip
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'questions': reverse('questions', request=request, format=format),
        'choices': reverse('choices', request=request, format=format)
    })


class QuestionList(APIView):
    """ List all questions, or create new question
    """

    def get(self, request, format=None):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = QuestionSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionItem(APIView):
    """ Get or delete a single question
    """

    def get_object(self, question_url):
        obj = get_object_or_404(Question, url=question_url)
        return obj

    def get(self, request, question_url, format=None):
        question = self.get_object(question_url)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def delete(self, request, question_url, format=None):
        question = self.get_object(question_url)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionChoices(APIView):
    """ Returns choices of a question
    """
    def get_question(self, question_url):
        try:
            return Question.objects.get(url=question_url)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, question_url, format=None):
        q = self.get_question(question_url)
        choices = Choice.objects.filter(question=q)
        serializer = ChoiceSerializer(choices, many=True)
        return Response(serializer.data)


class ChoiceList(APIView):
    """ List all choices, or create new choice
    """

    def get(self, request, format=None):
        choices = Choice.objects.all()
        serializer = ChoiceSerializer(choices, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ChoiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChoiceItem(APIView):
    """ Get, patch or delete a choice
    """
    def get_object(self, choice_id):
        try:
            return Choice.objects.get(pk=choice_id)
        except Choice.DoesNotExist:
            raise Http404

    def get(self, request, choice_id, format=None):
        choice = self.get_object(choice_id)
        serializer = ChoiceSerializer(choice)
        return Response(serializer.data)

    def delete(self, request, choice_id, format=None):
        choice = self.get_object(choice_id)
        choice.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class VoteItem(APIView):

    def get_vote(self, question_id, ip, user_agent):
        try:
            return Vote.objects.get(question_id=question_id, ip_address=ip, user_agent=user_agent)
        except Vote.DoesNotExist:
            raise Http404


    def get(self, request, choice_id, format=None):
        choice = self.get_choice(choice_id)
        serializer = ChoiceSerializer(choice)
        return Response(serializer.data)

    def get_choice(self, choice_id):
        try:
            return Choice.objects.get(pk=choice_id)
        except Choice.DoesNotExist:
            raise Http404

    def has_vote(self, question_id, ip, user_agent):
        votes = Vote.objects.filter(question_id=question_id, ip_address=ip, user_agent=user_agent)
        if votes.count() > 0:
            return True
        else:
            return False

    @csrf_exempt        
    def post(self, request, choice_id):
        ip, is_routable = get_client_ip(request)
        if ip == None:
            return Response('can not get ip', status=status.HTTP_400_BAD_REQUEST)
        user_agent = request.META.get('HTTP_USER_AGENT', 'default')
        choice = self.get_choice(choice_id)
        if self.has_vote(choice.question_id, ip, user_agent):
            return Response('Already voted on this question', status=status.HTTP_400_BAD_REQUEST)
        else:
            choice.votes += 1
            question = choice.question
            question.vote_set.create(ip_address = ip, user_agent=user_agent)
            choice.save()
            question.save()
            serializer = ChoiceSerializer(choice)
            return Response(serializer.data)