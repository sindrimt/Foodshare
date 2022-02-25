from django.test import TestCase
from .models import Recipe

# Create your tests here.

class recipeTest(TestCase):

    def create_recipe(self, title="test title", content="test content"):
        return Recipe.objects.create(title=title, content=content)

    def test_recipe_creation(self):
        testObject=self.create_recipe()
        self.assertTrue(isinstance(testObject, Recipe))

    def test_recipe_title(self):
        testObject=self.create_recipe()
        self.assertEquals(testObject.title, "test title")