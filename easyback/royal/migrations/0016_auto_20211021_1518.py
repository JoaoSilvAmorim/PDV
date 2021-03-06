# Generated by Django 3.2.6 on 2021-10-21 18:18

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('royal', '0015_auto_20211020_1638'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConfiguracoesSistema',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cnpj', models.CharField(max_length=18)),
                ('razaoSocial', models.CharField(max_length=38)),
                ('status', models.PositiveIntegerField()),
                ('nomeFantasia', models.CharField(max_length=32)),
                ('apelido', models.CharField(blank=True, max_length=32, null=True)),
                ('suframa', models.CharField(blank=True, max_length=18, null=True)),
                ('dataFundacao', models.DateField(null=True)),
                ('inscricaoEstadual', models.CharField(blank=True, max_length=15, null=True)),
                ('inscricaoMunicipal', models.CharField(blank=True, max_length=15, null=True)),
                ('isentoIe', models.PositiveIntegerField(blank=True, null=True)),
                ('icones', models.JSONField(blank=True, null=True)),
                ('enderecos', models.JSONField(blank=True, null=True)),
                ('dadosProp', models.JSONField(blank=True, null=True)),
                ('customizacao', models.JSONField(blank=True, null=True)),
                ('tributacao', models.JSONField(blank=True, null=True)),
                ('substituicaoTributaria', models.JSONField(blank=True, null=True)),
                ('cfops', models.JSONField(blank=True, null=True)),
                ('cupomFiscal', models.JSONField(blank=True, null=True)),
                ('configNfce', models.JSONField(blank=True, null=True)),
                ('opcoesVenda', models.JSONField(blank=True, null=True)),
                ('configuracaoBandeiraArr', models.JSONField(blank=True, null=True)),
                ('serieFiscal', models.JSONField(blank=True, null=True)),
                ('credenciaisGerenciaNet', models.JSONField(blank=True, null=True)),
                ('contaGerenciaNet', models.JSONField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('created_at',),
            },
        ),
        migrations.AlterField(
            model_name='contapagarreceber',
            name='vencimento',
            field=models.DateField(blank=True, null=True),
        ),
    ]
