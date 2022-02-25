from django.contrib.auth.models import User
from django.db import models


def upload_to(instance, filename):
    return "recipes/{filename}".format(filename=filename)


class Category(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name_plural = "categories"


class Recipe(models.Model):
    title = models.CharField(
        max_length=50,
        unique=True,
        help_text="Recipe title, must be unqiue and no more than 50 characters",
    )
    content = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="recipes",
        blank=True,
        null=True,
        help_text="Foreign key to category",
    )
    image = models.ImageField(
        "Image",
        upload_to=upload_to,
        default="recipes/default.jpeg",
        blank=True,
        null=True,
    )
    author = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE, related_name="recipes"
    )

    def __str__(self):
        return str(self.title)

    class Meta:
        ordering = ["-created"]
