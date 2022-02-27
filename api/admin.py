from django.contrib import admin
from .models import Recipe, Comment, Category

# Register your models here.
admin.site.register(Recipe)
admin.site.register(Comment)
admin.site.register(Category)
