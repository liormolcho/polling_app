from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from polls.models import Question, Choice
from polls.serializers import QuestionSerializer, ChoiceSerializer


class QuestionTests(APITestCase):

    def setUp(self):
        self.q1 = Question.objects.create(question_text='Test question 1', url='url1')
        self.q2 = Question.objects.create(question_text='Test question 2', url='url2')

    def test_get_all_questions(self):
        """ Get all questions
        """
        url = reverse('create_question')
        response = self.client.get(url, format='json')
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_create_question(self):
        url = reverse('create_question')
        data = {'question_text':'polll', 'url':'url3'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_question_invalid(self):
        url = reverse('create_question')
        data = {'question_text':'', 'url':''}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)



class ChoiceTests(APITestCase):

    def setUp(self):
        self.q1 = Question.objects.create(question_text='Test question 1', url='url1')
        self.c1 = Choice.objects.create(question=self.q1, choice_text='choice 1')
        self.c2 = Choice.objects.create(question=self.q1, choice_text='choice 2')

    def test_get_choices(self):
        """ Get all choices
        """
        url = reverse('choices')
        response = self.client.get(url, format='json')
        choices = Choice.objects.all()
        serializer = ChoiceSerializer(choices, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(choices.count(), 2)
        self.assertEqual(response.data, serializer.data)

    def test_create_choice_valid(self):
        url = reverse('choices')
        data = {'choice_text': 'Blah', 'question': self.q1.pk}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_choice_invalid(self):
        url = reverse('choices')
        data = {'choice_text': '', 'question': self.q1.pk}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class VoteChoiceTests(APITestCase):

    def setUp(self):
        self.q1 = Question.objects.create(question_text='Test question 1', url='url1')
        self.c1 = Choice.objects.create(question=self.q1, choice_text='choice 1')
        self.c2 = Choice.objects.create(question=self.q1, choice_text='choice 2')
        self.ip = 'ip'
        self.user_agent = 'user_agent'

    def test_vote_once_valid_choice(self):
        url = reverse('vote_choice', kwargs={'choice_id': self.c1.pk})
        response = self.client.post(url, format='json')
        c1 = Choice.objects.get(pk = self.c1.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(c1.votes, 1)

    def test_vote_once_invalid_choice(self):
        url = reverse('vote_choice', kwargs={'choice_id': 0})
        response = self.client.post(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_vote_twice_valid_choice(self):
        url = reverse('vote_choice', kwargs={'choice_id': self.c1.pk})
        self.client.post(url, format='json')
        response = self.client.post(url, format='json')
        c1 = Choice.objects.get(pk = self.c1.pk)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(c1.votes, 1)

