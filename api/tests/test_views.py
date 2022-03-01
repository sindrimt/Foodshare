from multiprocessing import context
from urllib import request
from django.test import TestCase, RequestFactory
from ..views import RecipeView
"""
class RecipeViewTest(TestCase):
    def test_recipe_set_in_context(self):
        request = RequestFactory.get('')
        view = RecipeView()
        view.setup(request)

        context = view.get_context_data()
        self.assertIn('recipes', context)
"""