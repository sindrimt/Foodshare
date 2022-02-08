from django.db import models


class Recipe(models.Model):
    title = models.CharField(max_length=30, unique=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    """ 
    author = models.ForeignKey
    category = ???
    etc.
    """

    def __str__(self):
        return str(self.title)

