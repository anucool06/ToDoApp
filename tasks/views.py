# from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from django.shortcuts import render

def home(request):
    return render(request, 'tasks/index.html')

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer