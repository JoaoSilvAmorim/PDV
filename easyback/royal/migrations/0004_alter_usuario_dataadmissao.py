# Generated by Django 3.2.6 on 2021-10-19 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0003_auto_20211019_1101'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='dataAdmissao',
            field=models.DateField(blank=True, null=True),
        ),
    ]
