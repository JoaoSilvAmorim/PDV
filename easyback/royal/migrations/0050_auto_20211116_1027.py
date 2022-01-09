# Generated by Django 3.2.6 on 2021-11-16 13:27

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0049_auto_20211116_0944'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='gerencianetbolix',
            options={'ordering': ('created_at',)},
        ),
        migrations.AlterModelOptions(
            name='gerencianetcarnes',
            options={'ordering': ('created_at',)},
        ),
        migrations.AddField(
            model_name='gerencianetbolix',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='gerencianetbolix',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='gerencianetcarnes',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='gerencianetcarnes',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='gerencianetbolix',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='gerencianetcarnes',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]