# Generated by Django 3.2.6 on 2021-10-20 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0013_alter_orcamentos_dataconfirmacao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orcamentos',
            name='data',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='orcamentos',
            name='dataCriacao',
            field=models.DateField(blank=True, null=True),
        ),
    ]
