# Generated by Django 3.2.6 on 2021-10-26 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0026_produto_vendido'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='produto',
            name='vendido',
        ),
        migrations.AddField(
            model_name='vendapdv',
            name='produdos',
            field=models.ManyToManyField(to='royal.Produto'),
        ),
    ]
