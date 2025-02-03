from rest_framework import serializers
from . import models as my_models

class PrincipleSerializer(serializers.ModelSerializer):
	class Meta:
		model = my_models.Principle
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field