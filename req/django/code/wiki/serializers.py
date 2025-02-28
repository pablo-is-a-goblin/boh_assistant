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
	
class ReadSkillSerializer(serializers.ModelSerializer):
	principle1 = PrincipleSerializer()
	principle2 = PrincipleSerializer()
	aspects = SkillLabelSerializer(many=True)

	class Meta:
		model = my_models.Skill
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field

class WriteSkillSerializer(serializers.ModelSerializer):
	aspects = serializers.PrimaryKeyRelatedField(
		queryset=my_models.SkillLabel.objects.all(),
		many=True,
		allow_null=True)
	
	class Meta:
		model = my_models.Skill
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field

class ObjectHasPrincipleSerializer(serializers.ModelSerializer):
	principle = PrincipleSerializer()
	class Meta:
		model = my_models.ObjectHasPrinciple
		fields = ["principle", "qty"]

class ReadMemorySerializer(serializers.ModelSerializer):
	principles = ObjectHasPrincipleSerializer(source='objecthasprinciple_set',many=True)
	aspects = SkillLabelSerializer(many=True)

	class Meta:
		model = my_models.Object
		list_field = ['pk']
		list_field.extend(model.get_params(self=my_models.Object(object_type="MEMORY")))
		fields = list_field

class WriteMemorySerializer(serializers.ModelSerializer):
	aspects = serializers.PrimaryKeyRelatedField(
		queryset=my_models.ObjectLabel.objects.all(),
		many=True,
		allow_null=True)
	principles = serializers.ListField(child=serializers.CharField())

	class Meta:
		model = my_models.Object
		list_field = ['pk']
		list_field.extend(model.get_params(self=my_models.Object(object_type="MEMORY")))
		fields = list_field

	def create(self, validated_data):
		principles_data = validated_data.pop('principles')
		aspects = validated_data.pop('aspects')
		memory = my_models.Object.objects.create(**validated_data)
		memory.aspects.set(aspects)
		memory.save()
		for principle_str in principles_data:
			if (len(principle_str) < 3):
				continue
			principle_list = principle_str.split(':')
			principle = my_models.Principle.objects.get(pk=int(principle_list[0]))
			qty = int(principle_list[1])
			if qty == 0:
				continue
			my_models.ObjectHasPrinciple.objects.create(obj=memory, principle=principle, qty=qty)
		return memory

	def update(self, instance, validated_data):
		print(validated_data)
		principles_data = validated_data.pop('principles')
		for principle_str in principles_data:
			principle_list = principle_str.split(':')
			principle = my_models.Principle.objects.get(pk=int(principle_list[0]))
			if (len(principle_str) < 3):
				qty = 0;
			else:
				qty = int(principle_list[1])
			try:
				ohp = my_models.ObjectHasPrinciple.objects.get(obj=instance, principle=principle)
				if qty == 0:
					ohp.delete()
				else:
					ohp.qty = qty
					ohp.save()
			except:
				my_models.ObjectHasPrinciple.objects.create(obj=instance, principle=principle, qty=qty)

		instance.name = validated_data.get("name", instance.name)
		instance.description = validated_data.get("description", instance.description)
		instance.aspects.set(validated_data.get("aspects", instance.aspects))
		instance.image = validated_data.get("image", instance.image)
		instance.save()
		return instance

class ReadBookSerializer(serializers.ModelSerializer):
	tongue = TongueSerializer(allow_null=True)
	mistery = PrincipleSerializer()
	memory = ReadMemorySerializer(allow_null=True)

	class Meta:
		model = my_models.Book
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field
		
class WriteBookSerializer(serializers.ModelSerializer):
	tongue = serializers.PrimaryKeyRelatedField(
		queryset=my_models.Tongue.objects.all(),
		allow_null=True)
	
	mistery = serializers.PrimaryKeyRelatedField(
		queryset=my_models.Principle.objects.all(),)
	
	memory = serializers.PrimaryKeyRelatedField(
		queryset=my_models.Object.objects.filter(object_type="MEMORY"),
		allow_null=True)

	class Meta:
		model = my_models.Book
		list_field = ['pk']
		list_field.extend(model.get_params())
		fields = list_field
		