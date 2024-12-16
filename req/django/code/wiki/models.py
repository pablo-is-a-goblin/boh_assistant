from django.db import models

# Create your models here.

class Principle(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='principles', blank=True)

    def get_params():
        return ["name", "description", "image"]
    def __str__(self):
        return self.name

class Tongue(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='tongues', blank=True)

    def get_params():
        return ["name", "description", "image"]
    def __str__(self):
        return self.name

class SkillLabel(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='skill_labels', blank=True)

    def get_params():
        return ["name", "description", "image"] 
    def __str__(self):
        return self.name

class ObjectLabel(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='object_labels', blank=True)

    def get_params():
        return ["name", "description", "image"]
    def __str__(self):
        return self.name

class Object(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    principles = models.ManyToManyField(Principle, through='ObjectHasPrinciple')
    aspects = models.ManyToManyField(ObjectLabel, blank=True)
    image = models.ImageField(upload_to='objects', blank=True)

    def get_params():
        return ["name", "description", "principles", "aspects", "image"]
    def __str__(self):
        return self.name

class Skill(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    principle1 = models.ForeignKey(Principle, related_name="primary_principle", on_delete=models.CASCADE)
    principle2 = models.ForeignKey(Principle, related_name="secondary_principle", on_delete=models.CASCADE)
    products = models.ManyToManyField(Object, through='Craft', through_fields=('skill', 'product'), blank=True)
    aspects = models.ManyToManyField(SkillLabel, blank=True)
    image = models.ImageField(upload_to='skills', blank=True)

    def get_params():
        return ["name", "description", "principle1", "principle2", "aspects", "image"]
    def __str__(self):
        return self.name

class Memory(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)

    def get_params():
        return Object.get_params()
    def __str__(self):
        return self.obj.name

class Beast(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)
    talking = models.ForeignKey(Memory, on_delete=models.PROTECT, blank=True)

    def get_params():
        fields = Object.get_params()
        fields.append("talking")
        return fields
    def __str__(self):
        return self.obj.name

class WallArt(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)
    considering = models.ForeignKey(Memory, on_delete=models.PROTECT, blank=True)

    def get_params():
        fields = Object.get_params()
        fields.append("considering")
        return fields
    def __str__(self):
        return self.obj.name

class Thing(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)
    consider = models.ForeignKey(Memory, on_delete=models.PROTECT, blank=True)

    def get_params():
        fields = Object.get_params()
        fields.append("consider")
        return fields
    def __str__(self):
        return self.obj.name

class Book(models.Model):
    obj = models.OneToOneField(Object, primary_key=True, on_delete=models.CASCADE)
    abv = models.CharField(max_length=30)
    tally = models.IntegerField()
    dificulty = models.IntegerField()
    tongue = models.ForeignKey(Tongue, on_delete=models.PROTECT, blank=True)
    mistery = models.ForeignKey(Principle, on_delete=models.CASCADE)
    reading = models.TextField(blank=True)
    read = models.TextField(blank=True)

    def get_params():
        fields = Object.get_params()
        fields.append("abv", "tally", "dificulty", "tongue", "mistery", "reading", "read")
        return fields
    def __str__(self):
        return self.obj.name

class ObjectHasPrinciple(models.Model):
    obj = models.ForeignKey(Object, on_delete=models.PROTECT)
    principle = models.ForeignKey(Principle, on_delete=models.CASCADE)
    qty = models.IntegerField()

class Craft(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    product = models.ForeignKey(Object, related_name="recipe", on_delete=models.CASCADE)
    principle = models.ForeignKey(Principle, on_delete=models.CASCADE)
    level = models.IntegerField()
    req_label = models.ForeignKey(ObjectLabel, on_delete=models.CASCADE, blank=True)
    req_object = models.ForeignKey(Object, related_name="needed_for", on_delete=models.CASCADE, blank=True)
    def get_params():
        return ["skill", "product", "principle", "levle", "req_label", "req_object"]
    def __str__(self):
        return "Crafting " + self.product
