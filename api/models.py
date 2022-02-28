from django.contrib.auth.models import User
from django.db import models
from taggit.managers import TaggableManager

from django.contrib.auth.models import AbstractUser


class Recipe(models.Model):

    title = models.CharField(
        max_length=32,
        unique=True,
        help_text="Recipe title, must be unqiue and no more than 50 characters",
    )

    summary = models.CharField(max_length=256, blank=True)

    content = models.TextField(blank=True)

    prep_time = models.IntegerField(blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True, editable=False)

    tags = TaggableManager(blank=True)

    image = models.ImageField(
        "Image",
        # upload_to=upload_to,
        default="default.jpeg",
    )

    user = models.ForeignKey(
        User,
        null=True,
        on_delete=models.CASCADE,
        related_name="recipes",
    )

    def __str__(self):
        return str(self.title)

    class Meta:
        ordering = ["-created"]


class Comment(models.Model):

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name="comments",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="comments",
    )

    content = models.TextField()

    created = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     TODO: imeplement


class Like(models.Model):

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name="likes",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="likes",
    )

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["user", "recipe"]

    # def __str__(self):
    #     TODO: imeplement


class UserFollow(models.Model):

    follows = models.ForeignKey(
        User,
        related_name="followers",
        on_delete=models.CASCADE,
    )

    user = models.ForeignKey(
        User,
        related_name="following",
        on_delete=models.CASCADE,
    )

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["user", "follows"]

    def __str__(self):
        return f"{self.user} follows {self.follows}"
