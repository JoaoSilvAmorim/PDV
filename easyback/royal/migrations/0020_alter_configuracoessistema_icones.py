# Generated by Django 3.2.6 on 2021-10-21 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0019_auto_20211021_1355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='configuracoessistema',
            name='icones',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
