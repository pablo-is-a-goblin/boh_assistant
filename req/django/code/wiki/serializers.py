from rest_framework import serializers
from . import models as my_models

class PrincipleSerializer(serializers.ModelSerializer):
	class Meta:
		model = my_models.Principle
		fields = model.get_params()