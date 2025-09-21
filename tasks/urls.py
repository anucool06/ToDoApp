from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, home

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', home),
    path('api/', include(router.urls)),
]
