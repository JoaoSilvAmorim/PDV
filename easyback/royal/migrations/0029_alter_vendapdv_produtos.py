# Generated by Django 3.2.6 on 2021-10-26 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0028_rename_produdos_vendapdv_produtos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendapdv',
            name='produtos',
            field=models.ManyToManyField(blank=True, null=True, to='royal.Produto'),
        ),
    ]
