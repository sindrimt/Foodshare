# Generated by Django 4.0.2 on 2022-03-03 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_recipe_prep_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='title',
            field=models.CharField(help_text='Recipe title, must be unqiue and no more than 50 chars', max_length=32, unique=True),
        ),
    ]
