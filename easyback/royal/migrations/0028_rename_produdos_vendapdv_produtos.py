# Generated by Django 3.2.6 on 2021-10-26 18:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0027_auto_20211026_1500'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vendapdv',
            old_name='produdos',
            new_name='produtos',
        ),
    ]
