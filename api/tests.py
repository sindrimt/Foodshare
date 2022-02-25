from django.test import TestCase
from .models import Recipe

# Create your tests here.

class RecipeTest(TestCase):

    def create_recipe(self, title="test title", content="test content"):
        return Recipe.objects.create(title=title, content=content)

    def test_recipe_creation(self):
        test_object = self.create_recipe()
        self.assertTrue(isinstance(test_object, Recipe))

    def test_recipe_title(self):
        test_object = self.create_recipe()
        self.assertEquals(test_object.title, "test title")
