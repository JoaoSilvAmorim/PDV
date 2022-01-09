# Generated by Django 3.2.6 on 2021-10-18 16:02

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AjusteEstoque',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('tipo', models.PositiveIntegerField(blank=True, null=True)),
                ('numero', models.CharField(max_length=14, null=True)),
                ('situacao', models.CharField(blank=True, max_length=16, null=True)),
                ('dataCriacao', models.CharField(max_length=18, null=True)),
                ('dataConfirmacao', models.CharField(max_length=18, null=True)),
                ('dataVencimento', models.CharField(blank=True, max_length=18, null=True)),
                ('clienteFornecedor', models.CharField(max_length=34, null=True)),
                ('cpfCnpj', models.CharField(max_length=16, null=True)),
                ('itensArr', models.JSONField(blank=True, default={}, null=True)),
                ('observacoes', models.TextField(blank=True, null=True)),
                ('valorFrete', models.PositiveIntegerField(blank=True, null=True)),
                ('outrasDespesas', models.PositiveIntegerField(blank=True, null=True)),
                ('totalAjusteGeral', models.PositiveIntegerField(blank=True, null=True)),
                ('valorPago', models.PositiveIntegerField(blank=True, null=True)),
                ('valorRecebido', models.PositiveIntegerField(blank=True, null=True)),
                ('valorParcela', models.PositiveIntegerField(blank=True, null=True)),
                ('quantidadeParcelas', models.PositiveIntegerField(blank=True, null=True)),
                ('parcelasArr', models.JSONField(blank=True, default={}, null=True)),
                ('formaPagamento', models.CharField(max_length=18, null=True)),
                ('totalItens', models.PositiveIntegerField(null=True)),
                ('url', models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='BanderiraCartao',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('configuracaoBandeira', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Caixa',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('numero', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='CaixasPdv',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('status', models.BooleanField(blank=True, null=True)),
                ('abertura', models.CharField(max_length=18, null=True)),
                ('fechamento', models.CharField(max_length=18, null=True)),
                ('saldo', models.PositiveIntegerField(null=True)),
                ('saldoFinal', models.PositiveIntegerField(null=True)),
                ('gaveta', models.PositiveIntegerField(null=True)),
                ('turno', models.PositiveIntegerField(null=True)),
                ('funcionario', models.JSONField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('created_at',),
            },
        ),
        migrations.CreateModel(
            name='CategoriaConta',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('categoria', models.CharField(max_length=21)),
            ],
        ),
        migrations.CreateModel(
            name='configIcones',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('icones', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='ContaPagarReceber',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('tipoLancamento', models.CharField(blank=True, max_length=8)),
                ('situacao', models.CharField(max_length=10)),
                ('categorias', models.CharField(max_length=24, null=True)),
                ('codIdentificador', models.CharField(blank=True, max_length=12, null=True)),
                ('parcelas', models.JSONField(default={}, null=True)),
                ('vencimento', models.CharField(blank=True, max_length=11, null=True)),
                ('funcionario', models.CharField(blank=True, max_length=18, null=True)),
                ('formaPagamento', models.CharField(max_length=12, null=True)),
                ('descricao', models.CharField(max_length=28)),
                ('valorBruto', models.CharField(max_length=10)),
                ('valorRecebido', models.CharField(blank=True, max_length=10, null=True)),
                ('valorPago', models.CharField(blank=True, max_length=10, null=True)),
                ('observacoes', models.TextField(blank=True, null=True)),
                ('categoria', models.CharField(blank=True, max_length=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('created_at',),
            },
        ),
        migrations.CreateModel(
            name='DevolucaoTroca',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('tipoOperacao', models.PositiveIntegerField()),
                ('totalTroca', models.PositiveIntegerField(blank=True, null=True)),
                ('listaTroca', models.JSONField(blank=True, null=True)),
                ('listaDevolucao', models.JSONField(blank=True, null=True)),
                ('totalDevolucao', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Empresa',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cpnj_cpf', models.CharField(max_length=14)),
                ('razao_social', models.CharField(max_length=255)),
                ('fantasia', models.CharField(max_length=255)),
                ('ie', models.CharField(max_length=9)),
                ('seguimento', models.PositiveIntegerField()),
                ('isento', models.BooleanField()),
                ('data_instituicao', models.DateField()),
                ('tipo', models.PositiveIntegerField()),
                ('crt', models.PositiveIntegerField()),
                ('imunicipal', models.CharField(blank=True, max_length=15, null=True)),
                ('rntrc', models.CharField(blank=True, max_length=10, null=True)),
                ('ciot', models.CharField(blank=True, max_length=10, null=True)),
                ('endereco', models.JSONField(default={}, null=True)),
                ('metadata', models.JSONField(default=None, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('fantasia',),
            },
        ),
        migrations.CreateModel(
            name='GerenciaNet',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('url', models.URLField()),
                ('historico', models.JSONField(blank=True, default={}, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ncm',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('codigo', models.CharField(max_length=10)),
                ('descricao', models.TextField()),
                ('tributacao', models.JSONField(default={}, null=True)),
                ('grupoComb', models.JSONField(default={}, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('descricao',),
            },
        ),
        migrations.CreateModel(
            name='Orcamentos',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('numero', models.CharField(max_length=14, null=True)),
                ('dataCriacao', models.CharField(max_length=18, null=True)),
                ('dataConfirmacao', models.CharField(max_length=18, null=True)),
                ('status', models.CharField(max_length=18, null=True)),
                ('departamento', models.CharField(max_length=18, null=True)),
                ('vendedor', models.CharField(max_length=24, null=True)),
                ('cliente', models.CharField(max_length=32, null=True)),
                ('cpfCnpj', models.CharField(max_length=16, null=True)),
                ('data', models.CharField(max_length=18, null=True)),
                ('itens', models.JSONField(default={}, null=True)),
                ('observacoes', models.TextField(null=True)),
                ('descontoMonetario', models.PositiveIntegerField(null=True)),
                ('descontoPercentual', models.PositiveIntegerField(null=True)),
                ('valorFrete', models.PositiveIntegerField(null=True)),
                ('endereco', models.JSONField(default={}, null=True)),
                ('total', models.PositiveIntegerField()),
                ('formaPagamento', models.CharField(max_length=18, null=True)),
                ('quantidadeParcelas', models.PositiveIntegerField(null=True)),
                ('parcelas', models.JSONField(default={}, null=True)),
                ('valorPedidoOrcamento', models.PositiveIntegerField(null=True)),
                ('url', models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('descricao', models.CharField(max_length=255)),
                ('categoria', models.PositiveIntegerField(blank=True, null=True)),
                ('tipo', models.PositiveIntegerField(blank=True, null=True)),
                ('codInterno', models.CharField(max_length=20)),
                ('codBarras', models.CharField(max_length=20)),
                ('codTributavel', models.CharField(max_length=20)),
                ('ativo', models.BooleanField(blank=True, null=True)),
                ('uniEntrada', models.PositiveIntegerField(null=True)),
                ('saida', models.PositiveIntegerField(null=True)),
                ('uniSaida', models.PositiveIntegerField(null=True)),
                ('finalidade', models.PositiveIntegerField(blank=True, null=True)),
                ('movimentar', models.BooleanField(blank=True, null=True)),
                ('imobilizado', models.PositiveIntegerField(blank=True, null=True)),
                ('consumo', models.PositiveIntegerField(blank=True, null=True)),
                ('revenda', models.PositiveIntegerField(blank=True, null=True)),
                ('minimoRevenda', models.PositiveIntegerField(blank=True, null=True)),
                ('maximoRevenda', models.PositiveIntegerField(blank=True, null=True)),
                ('valor', models.DecimalField(decimal_places=4, max_digits=10, null=True)),
                ('infoFiscais', models.JSONField(default={}, null=True)),
                ('tributacao', models.JSONField(default={}, null=True)),
                ('grupoComb', models.JSONField(default={}, null=True)),
                ('valCustos', models.JSONField(default={}, null=True)),
                ('atributosArray', models.JSONField(default={}, null=True)),
                ('composicoesArray', models.JSONField(default={}, null=True)),
                ('totalComp', models.DecimalField(decimal_places=4, max_digits=10, null=True)),
                ('fornecedoresArray', models.JSONField(default={}, null=True)),
            ],
            options={
                'ordering': ('descricao',),
            },
        ),
        migrations.CreateModel(
            name='SerieFiscal',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cnpj', models.CharField(max_length=14)),
                ('codSerieFiscal', models.PositiveIntegerField(null=True)),
                ('sequencia', models.PositiveIntegerField(null=True)),
                ('modeloDocumentoFiscal', models.CharField(max_length=10, null=True)),
                ('sistema', models.CharField(max_length=10, null=True)),
                ('infoComplementares', models.CharField(max_length=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='tokenGerenciaNet',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('sandbox', models.BooleanField()),
                ('client_id', models.CharField(blank=True, max_length=255)),
                ('client_secret', models.CharField(blank=True, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='VendaPdv',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('listaProdutos', models.JSONField(default={}, null=True)),
                ('valorVenda', models.CharField(max_length=8)),
                ('valorPago', models.CharField(max_length=8)),
                ('valorRecebido', models.CharField(max_length=8)),
                ('troco', models.CharField(max_length=8)),
                ('tipoDocumento', models.CharField(max_length=8)),
                ('turno', models.PositiveIntegerField(blank=True, null=True)),
                ('numero', models.PositiveIntegerField(blank=True, null=True)),
                ('operacao', models.CharField(max_length=22)),
                ('dataRegistro', models.CharField(max_length=11, null=True)),
                ('dataPagamento', models.CharField(max_length=11, null=True)),
                ('formaPagamento', models.CharField(max_length=12, null=True)),
                ('tipoBandeira', models.CharField(max_length=12, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('caixa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='caixas', to='royal.caixaspdv')),
            ],
            options={
                'ordering': ('created_at',),
            },
        ),
        migrations.CreateModel(
            name='ConfiguracaoPDV',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cnpj', models.CharField(blank=True, max_length=18, null=True)),
                ('cfe', models.BooleanField(blank=True, null=True)),
                ('nfce', models.BooleanField(blank=True, null=True)),
                ('mfe', models.BooleanField(blank=True, null=True)),
                ('dav', models.BooleanField(blank=True, null=True)),
                ('tipoDesconto', models.PositiveIntegerField(null=True)),
                ('senhaCertificado', models.CharField(blank=True, max_length=12, null=True)),
                ('numeroCaixa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='royal.caixa')),
            ],
        ),
        migrations.AddField(
            model_name='caixa',
            name='serie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='caixas', to='royal.seriefiscal'),
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('department', models.CharField(max_length=100)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
