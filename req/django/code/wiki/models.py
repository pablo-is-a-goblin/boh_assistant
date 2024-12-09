from django.db import models

# Create your models here.

class Principle(models.Model):
    name = models.CharField(max_length=20)
    des = models.CharField(max_length=100)
    def get_params():
        return ["name", "des"]

class Tongue(models.Model):
    name = models.CharField(max_length=20)
    des = models.CharField(max_length=100)

class SkillLabel(models.Model):
    name = models.CharField(max_length=20)
    des = models.CharField(max_length=100)   

class ObjectLabel(models.Model):
    name = models.CharField(max_length=20)
    des = models.CharField(max_length=100)

class Object(models.Model):
    name = models.CharField(max_length=50)
    des = models.CharField(max_length=200)
    principles = models.ManyToManyField(Principle, through='ObjectHasPrinciple')
    aspects = models.ManyToManyField(ObjectLabel)

class Skill(models.Model):
    name = models.CharField(max_length=50)
    des = models.CharField(max_length=200)
    principle1 = models.ForeignKey(Principle, related_name="primary", on_delete=models.CASCADE)
    principle2 = models.ForeignKey(Principle, related_name="secondary", on_delete=models.CASCADE)
    products = models.ManyToManyField(Object, through='Craft', through_fields=('skill', 'product'))

class Memory(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)

class Beast(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)
    talking = models.ForeignKey(Memory, on_delete=models.PROTECT)

class WallArt(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)
    considering = models.ForeignKey(Memory, on_delete=models.PROTECT)

class Thing(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)
    consider = models.ForeignKey(Memory, on_delete=models.PROTECT)

class Book(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)
    abv = models.CharField(max_length=30)
    tally = models.IntegerField()
    dificulty = models.IntegerField()
    tongue = models.ForeignKey(Tongue, on_delete=models.PROTECT)
    mistery = models.ForeignKey(Principle, on_delete=models.CASCADE)
    reading = models.TextField()
    read = models.TextField()

class ObjectHasPrinciple(models.Model):
    obj = models.ForeignKey(Object, on_delete=models.PROTECT)
    principle = models.ForeignKey(Principle, on_delete=models.CASCADE)
    qty = models.IntegerField()

class Craft(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    product = models.ForeignKey(Object, related_name="recipe", on_delete=models.CASCADE)
    principle = models.ForeignKey(Principle, on_delete=models.CASCADE)
    level = models.IntegerField()
    req_label = models.ForeignKey(ObjectLabel, on_delete=models.CASCADE)
    req_object = models.ForeignKey(Object, related_name="needed_for", on_delete=models.CASCADE)
