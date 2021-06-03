from django.shortcuts import render
from django.views import generic
from .models import Post
from . import views
from . import models

# Create your views here.


class PostList(generic.ListView):
    queryset = Post.objects.all()  # filter(status=1).order_by('-created_on')
    template_name = 'blog/post_list.html'


class PostDetail(generic.DetailView):
    model = Post
    template_name = 'blog/post_detail.html'
