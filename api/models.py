from django.db import models


def upload_to(instance, filename):
    return "recipes/{filename}".format(filename=filename)


class Category(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return str(self.name)


class Recipe(models.Model):
    title = models.CharField(max_length=50, unique=True)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(
        "Image",
        upload_to=upload_to,
        default="recipes/default.jpeg",
        blank=True,
    )

    def __str__(self):
        return str(self.title)

    class Meta:
        ordering = ["-created"]
