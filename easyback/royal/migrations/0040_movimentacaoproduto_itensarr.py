# Generated by Django 3.2.6 on 2021-11-03 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0039_movimentacaoproduto_tipo'),
    ]

    operations = [
        migrations.AddField(
            model_name='movimentacaoproduto',
            name='itensArr',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
