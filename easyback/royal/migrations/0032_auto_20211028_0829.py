# Generated by Django 3.2.6 on 2021-10-28 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0031_auto_20211027_0904'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vendaproduto',
            name='venda',
        ),
        migrations.AddField(
            model_name='vendaproduto',
            name='quantidade',
            field=models.PositiveBigIntegerField(default=1),
            preserve_default=False,
        ),
    ]
