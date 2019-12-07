from django.shortcuts import render
from rsvp.models import RSVP 
from rsvp.serializers import RSVPSerializer
from rest_framework import generics
# Create your views here.

class RSVPListCreate(generics.ListCreateAPIView):
	queryset = RSVP.objects.all()
	serializer_class = RSVPSerializer

def index(request):
	return render(request, 'frontend/index.html')