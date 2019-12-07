from rest_framework import serializers
from rsvp.models import RSVP

class RSVPSerializer(serializers.ModelSerializer):
	class Meta:
		model = RSVP
		fields = '__all__'