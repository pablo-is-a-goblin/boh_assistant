from rest_framework import serializers
from . import models as my_models

class PrincipleSerializer(serializers.ModelSerializer):
	class Meta:
		model = my_models.Principle
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field

class TongueSerializer(serializers.ModelSerializer):
	class Meta:
		model = my_models.Tongue
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field

class ObjectLabelSerializer(serializers.ModelSerializer):
	class Meta:
		model = my_models.ObjectLabel
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field

class SkillLabelSerializer(serializers.ModelSerializer):
	class Meta:
		model = my_models.SkillLabel
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field
	
class SkillSerializer(serializers.ModelSerializer):
	class Meta:
		model = my_models.Skill
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field