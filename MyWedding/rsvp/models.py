from django.db import models
from django.utils.translation import gettext as _

# Create your models here.

class RSVP(models.Model):
	GUEST_TOTAL = (
		(1, 1),
		(2, 2),
		(3, 3),
		(4, 4),
		(0, _("More")),
	)
	EVENT_CATEGORIES = (
		("All events", _("All events")),
		("Wedding ceremony", _("Wedding ceremony (Lahat, South Sumatra)")),
		("Reception party", _("Reception party (Lahat, South Sumatra)")),
		("Ngunduh mantu", _("Ngunduh Mantu (Kediri, East Java)")),
	)
	name = models.CharField(_("Your name"), max_length=100)
	email = models.CharField(_("Your email"), max_length=100)
	guest = models.IntegerField(_("Number of guest"), choices=GUEST_TOTAL, default=1)
	event = models.CharField(_("I am attending"), choices=EVENT_CATEGORIES, max_length=100)
	message = models.TextField(_("Your message"), blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return "{} - {}".format(self.name, self.email)

	class Meta:
		verbose_name = "RSVP"
		verbose_name_plural = "RSVPs"
