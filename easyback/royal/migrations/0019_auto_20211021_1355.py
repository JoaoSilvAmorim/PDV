# Generated by Django 3.2.6 on 2021-10-21 16:55

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0018_rename_ativo_configuracoessistema_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='configuracoessistema',
            options={'ordering': ('created_at',)},
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='cfops',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='configNfce',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='configuracaoBandeira',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='contaGerenciaNet',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='credenciaisGerenciaNet',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='cupomFiscal',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='customizacao',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='dadosProp',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='enderecos',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='icones',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='royal.configicones'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='opcoesVenda',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='serieFiscal',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='substituicaoTributaria',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='tributacao',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='configuracoessistema',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
