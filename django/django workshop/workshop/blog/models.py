from django.db import models
from django.contrib.auth.models import User
# Create your models here.
STATUS = (
    (0, "Draft"),
    (1, "Public")
)


class Post(models.Model):
    # DJANGO GRACE A SON ORM ME PERMET DE TRAVAILLER MA DB SOUS FORME DE CLASS (OBJECT)
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='blog_posts')
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)

    # JE NE SUIS PAS OBLIGATOIRE MAIS JE VAIS BEAUCOUP T'AIDER ;)
    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title
