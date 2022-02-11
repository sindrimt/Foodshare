from django.db import models
import string
import random


class Recipe(models.Model):
    title = models.CharField(max_length=30, unique=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    """ 
    author = models.ForeignKey
    category = ???
    pic = ???
    etc.
    """

    def __str__(self):
        return str(self.title)
