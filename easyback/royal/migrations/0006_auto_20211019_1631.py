# Generated by Django 3.2.6 on 2021-10-19 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0005_usuario_diastrabalhados'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='comissao',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='desconto',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]