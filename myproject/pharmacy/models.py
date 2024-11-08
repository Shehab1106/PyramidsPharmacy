from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Medication(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class RefillRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    date_requested = models.DateTimeField(default=timezone.now, editable=False)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Denied', 'Denied')], default='Pending')

    def __str__(self):
        return f"Refill request for {self.medication.name} by {self.user.username}"
