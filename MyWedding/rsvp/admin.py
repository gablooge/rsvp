from django.contrib import admin
from rsvp.models import RSVP
# Register your models here.
class RSVPAdmin(admin.ModelAdmin):
	list_display = ('name', 'email', 'guest', 'event', 'created_at')
		
admin.site.register(RSVP, RSVPAdmin)