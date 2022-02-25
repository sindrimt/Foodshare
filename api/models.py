from django.contrib.auth.models import User
from django.db import models


# def upload_to(instance, filename):
#     return "recipes/{filename}".format(filename=filename)


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
        # upload_to=upload_to,
        default="default.jpeg",
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


class Like(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["recipe, user"]  # users can only like a recipe once

    def __str__(self):
        return f"{self.user} liked {self.recipe}"


class Comment(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     TODO: imeplement


class UserFollowing(models.Model):
    followed = models.ForeignKey("User", related_name="following")
    following = models.ForeignKey("User", related_name="followers")

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["followed, following"]

    def __str__(self):
        return f"{self.following} follows {self.followed}"
