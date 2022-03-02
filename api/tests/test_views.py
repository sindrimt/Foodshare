from multiprocessing import context
from operator import imod
from urllib import request
from django.test import TestCase, RequestFactory, Client
from django.urls import reverse
from ..views import RecipeView
from ..models import Recipe
import json


class TestViews(TestCase):

    def test_recipe_view(self):
        client = Client()

        response = client.get('/api/recipes/')

        self.assertEquals(response.status_code, 200)


    def test_user_view(self):
        client = Client()

        response = client.get('/api/accounts/')

        self.assertEquals(response.status_code, 200)