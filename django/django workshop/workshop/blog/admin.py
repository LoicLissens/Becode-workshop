from django.contrib import admin
from .models import Post
# Register your models here.


class PostAdmin(admin.ModelAdmin):  # On décide ce qu'il va aficher
    list_display = ('title', 'slug', 'status', 'created_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    # VIRGULE A METTRE CAR TUPLE UNIQUE
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Post, PostAdmin)
