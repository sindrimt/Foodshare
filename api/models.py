from django.db import models
from django.utils.translation import gettext_lazy


def upload_to(instance, filename):
    return "recipes/{filename}".format(filename=filename)


class Recipe(models.Model):
    title = models.CharField(max_length=30, unique=True)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(
        gettext_lazy("Image"),
        upload_to=upload_to,
        default="recipes/default.jpg",
        blank=True,
    )

    """ 
    author = models.ForeignKey
    category = ???
    etc.
    """

    def __str__(self):
        return str(self.title)
