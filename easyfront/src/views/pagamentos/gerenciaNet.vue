<template>
<div v-loading.fullscreen.lock="loading">
<el-main>
    <el-row>
        <el-col :span="12"  style="text-align: left;">
            <el-button v-if="form.tipoCobranca[0] != 1" type="primary" @click="gerarBoleto()" size="medium">Gerar cobrança</el-button>
            <el-button v-if="form.tipoCobranca[0] == 1" type="primary" @click="gerarCarne()" size="medium">Gerar cobrança</el-button>
        </el-col>
    </el-row>
</el-main> 

    <el-form :rules="rules" ref="form" :model="form" id="form" method="POST" action="">
    <el-tabs type="border-card" class="el-menu-window-form"> 
        <el-tab-pane label="EMITIR COBRANÇA">
            <el-row :gutter="2">
                <el-col>
                <legend style="font-size: large; font-weight: bold;">ESCOLHA A FORMA DE COBRANÇA</legend> 
                <fieldset>
                    <el-card class="box-card" shadow="hover">
                        
                        <el-col :span="8">
                            <el-checkbox-group v-model="form.tipoCobranca" :max="1" size="large">
                                <el-checkbox :label="0" border>
                                    <font-awesome-icon icon="file-invoice" size="2x"/>
                                    BOLETO
                                </el-checkbox>
                                <el-checkbox :label="1" border>
                                    <font-awesome-icon icon="pager" size="2x"/>
                                    CARNÊ 
                                </el-checkbox>
                            </el-checkbox-group>
                         </el-col>
                        <el-col :span="2">
                            <el-button style="margin-top: 5px" type="success" @click="dialogTipoPessoa = true" size="medium" plain>SELECIONAR CLIENTE</el-button>
                        </el-col>
<br><br>
                    </el-card>
                    </fieldset>
                </el-col>
            </el-row>

            <el-dialog width="85%" style="font-weight: bold; font-size: xx-large;" :visible.sync="dialogTipoPessoa" :before-close="popUpDialogPessoa">
                <el-row>
                    <el-checkbox-group v-model="form.tipoPessoa" :max="1" size="large">
                        <el-checkbox :label="0" border>
                            PESSOA FÍSICA
                        </el-checkbox>
                        <el-checkbox :label="1" border>
                            PESSOA JURÍDICA 
                        </el-checkbox>
                    </el-checkbox-group>
<br>
                    <el-col v-if="form.tipoPessoa[0] != 1">
                            <legend style="font-size: large; font-weight: bold;">DADOS DO CLIENTE</legend>  
                        <fieldset>
                        <el-card class="box-card" shadow="hover">

                            <el-col>
                                <el-col :span="12">
                                    <el-form-item label="NOME COMPLETO" size="mini" prop="nomeCompleto">
                                        <el-input v-model="form.nomeCompleto" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :offset="1" :span="11">
                                    <el-form-item label="CPF" size="mini" prop="cpf">
                                        <el-input v-model="form.cpf" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            
                            <el-col :span="12">
                                <el-form-item label="CELULAR" size="mini">
                                    <el-input v-model="form.celular" size="mini"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col></el-col>

                            <el-col :span="12">
                                 <el-form-item label="CEP" size="mini">
                                    <el-input v-model="form.endereco.cep" size="mini"></el-input>
                                </el-form-item>
                            </el-col>


                            <el-col :offset="1" :span="4">
                                <el-button style="margin-top: 32px" type="success" @click="searchCep()" size="mini" plain>COMPLETAR ENDEREÇO</el-button>
                            </el-col>
                        </el-card>
                        </fieldset>
<br>


                    </el-col>

                    <el-col v-if="form.tipoPessoa[0] == 1">
                            <legend style="font-size: large; font-weight: bold;">DADOS DO CLIENTE</legend>  
                        <fieldset>
                        <el-card class="box-card" shadow="hover">

                            <el-col>
                                <el-col :span="12">
                                    <el-form-item label="NOME COMPLETO" size="mini" prop="nomeCompleto">
                                        <el-input v-model="form.nomeCompleto" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :offset="1" :span="11">
                                    <el-form-item label="CPF" size="mini" prop="cpf">
                                        <el-input v-model="form.cpf" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>

                            <el-col>
                                <el-col :span="12">
                                    <el-form-item label="RAZÃO SOCIAL" size="mini">
                                        <el-input v-model="form.razaoSocial" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :offset="1" :span="8">
                                    <el-form-item label="CNPJ" size="mini" prop="cnpj">
                                        <el-input v-model="form.cnpj" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="2">
                                    <el-button style="margin-top: 32px; margin-left: 10px" type="primary" @click="consultaCNPJ(form.cnpj)" size="mini" plain>Buscar</el-button>
                                </el-col>
                            </el-col>
                            
                            <el-col :span="12">
                                <el-form-item label="CELULAR" size="mini">
                                    <el-input v-model="form.celular" size="mini"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col></el-col>

                            <el-col :span="12">
                                 <el-form-item label="CEP" size="mini">
                                    <el-input v-model="form.endereco.cep" size="mini"></el-input>
                                </el-form-item>
                            </el-col>


                            <el-col :offset="1" :span="4">
                                <el-button style="margin-top: 32px" type="success" @click="searchCep()" size="mini" plain>COMPLETAR ENDEREÇO</el-button>
                            </el-col>
                        </el-card>
                        </fieldset>
<br>
                    </el-col>

                    <el-col>
                            <legend style="font-size: large; font-weight: bold;">ENDEREÇO</legend> 
                            <fieldset>
                                <el-card class="box-card" shadow="hover">

                                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                        <el-form-item label="BAIRRO" size="mini">
                                            <el-input v-model="form.endereco.bairro" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :offset="1" :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                                        <el-form-item label="NÚMERO" size="mini">
                                            <el-input v-model="form.endereco.numero" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
  
                                    <el-col :offset="1"  :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                                        <el-form-item label="ESTADO" size="mini" prop="estado">
                                            <el-select fieltrable v-model="form.endereco.uf" placeholder="Escolher"
                                                size="mini">
                                                <el-option v-for="item in uf" :key="item.sigla" :label="item.nome"
                                                    :value="item.sigla">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                        <el-form-item label="LOGRADOURO" size="mini">
                                            <el-input v-model="form.endereco.logradouro" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    
                                    <el-col  :offset="1"  :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                                        <el-form-item label="CIDADE" size="mini">
                                            <el-input v-model="form.endereco.localidade" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>


                                    <el-col>
                                        <el-form-item label="COMPLEMENTO" size="mini">
                                            <el-input v-model="form.endereco.complemento" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>

                                     <el-col :offset="20" :span="4">
                                        <el-button @click="dialogTipoPessoa = false" type="success" size="mini" plain>Concluir</el-button>
                                        <el-button @click="dialogTipoPessoa = false" type="default" size="mini">Cancelar</el-button>
<br><br>
                                    </el-col>
                                </el-card>
                            </fieldset>
                        </el-col>

                </el-row>
            </el-dialog>

            <el-row v-if="form.tipoCobranca.length > 0">
<br>
                <legend style="font-size: large; font-weight: bold;">ESCOLHA A FORMA DE ENVIO</legend>
                <fieldset>
                    <el-card class="box-card" shadow="hover">

                            <el-col :span="10">
                                <el-checkbox-group v-model="form.formaEnvio" size="large">
                                    <el-checkbox :label="0" border>
                                        <font-awesome-icon icon="file-pdf" size="2x"/>
                                        IMPRIMIR PDF
                                    </el-checkbox>
                                    <el-checkbox :label="1" border>
                                        <font-awesome-icon icon="envelope" size="2x"/>
                                        ENVIAR POR e-mail
                                    </el-checkbox>
                                </el-checkbox-group> 
                            </el-col>

                            <el-col v-if="form.formaEnvio[0] == 1" style="margin-right: 130px" :span="12">
                                <el-form-item label="Email" size="mini" label-width="240px">
                                    <el-input v-model="form.email" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
<br><br>
                    </el-card>
                </fieldset>
            </el-row>

            <el-row :gutter="2" v-if="form.formaEnvio.length > 0">
<br>
                <legend style="font-size: large; font-weight: bold;">SELECIONE OS PRODUTOS/SERVIÇOS DA COBRANÇA</legend>
            <fieldset>
            <el-card class="box-card" shadow="hover">
                <el-col :span="4">
                    <el-form-item label="Descrição" size="mini">
                        <el-input v-model="descricao" size="mini"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-form-item label="Quantidade" size="mini">
                        <el-input v-model="quantidade" size="mini"></el-input>
                    </el-form-item>
                </el-col>
                
                <el-col :span="4">
                    <el-form-item label="Preço" size="mini">
                        <el-input v-model="preco" size="mini"></el-input>
                    </el-form-item>
                </el-col>
                 
                <el-col>
                    <el-button @click="addProdutoAvulso()" style="margin-top: 32px" type="success" icon="el-icon-circle-plus" plain>
                        INSERIR
                    </el-button>
                    <el-button @click="dialogCatalogo = true">
                        <font-awesome-icon icon="table" size="1x"/>
                        INSERIR DO CATÁLOGO
                    </el-button>
<br><br>
                </el-col>
            </el-card>
            </fieldset>
            </el-row>

           
            <el-dialog width="85%" style="font-weight: bold; font-size: xx-large;" title="CATALOGO" :visible.sync="dialogCatalogo">
                <el-row :gutter="2">
                    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <el-form-item label="Produto" size="mini">
                            <el-select @change="preecherProduto()" filterable v-model="itemCobranca" name="produtos" placeholder='selecione'>
                                <i style="font-size: 120%;" slot="prefix" class="el-input__icon el-icon-search"></i>
                                <el-option
                                v-for="item in produtos"
                                :key="item.value"
                                :label="item.descricao"
                                :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <el-form-item label="Quantidade" size="mini">
                           <el-input v-model="itemQuantidade" size="mini"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <el-form-item label="VALOR UN" size="mini">
                           <el-input v-model="itemValor" size="mini"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-button @click="addProdutoCatalogo()" style="margin-top: 32px" type=success size="mini" icon="el-icon-circle-plus" plain>
                            INSERIR
                    </el-button>
                </el-row>
            </el-dialog>


            <el-row :gutter="2" v-if="form.formaEnvio.length > 0">
<br>
                    <legend style="font-size: large; font-weight: bold;">PRODUTOS/SERVIÇOS</legend>
                <fieldset>
                <el-card class="box-card" shadow="hover">

                    <el-row>
                       <el-col>
                            <el-col :span="9">
                                <fieldset>
                                    <el-col>
                                        <legend>Produto/Serviço</legend>
                                    </el-col>
                                </fieldset>
                            </el-col>

                           <el-col :span="5">
                                <fieldset>
                                    <el-col>
                                        <legend>Quantidade</legend>
                                    </el-col>
                                </fieldset>
                           </el-col>

                            <el-col :span="5">
                                    <fieldset>
                                        <el-col>
                                            <legend>Valor Unitário</legend>
                                        </el-col>
                                    </fieldset>
                            </el-col>

                       
                            <el-col :span="5">
                                    <fieldset>
                                        <el-col>
                                            <legend>Total</legend>
                                        </el-col>
                                    </fieldset>
                            </el-col>
                       </el-col>
                    </el-row>

                    <el-col v-for="(item, k) in form.itens" :key="k">

                        <el-col :span="9">
                            <el-card class="box-card" shadow="hover">
                              <legend>{{ item.name }}</legend>
                            </el-card>
                        </el-col>

                        
                        <el-col :span="5">
                            <el-card class="box-card" shadow="hover">
                              <legend>{{ item.amount }}</legend>
                            </el-card>
                        </el-col>

                        <el-col :span="5">
                            <el-card class="box-card" shadow="hover">
                              <legend>{{ item.value }}</legend>
                            </el-card>
                        </el-col>

                        
                        <el-col :span="5">
                            <el-card class="box-card" shadow="hover">
                              <legend>{{ (item.value * item.amount) }}</legend>
                            </el-card>
                        </el-col>
                    </el-col>
                </el-card>
                </fieldset>
<br>
            </el-row>


            <el-row v-if="form.tipoCobranca[0] == 1 && form.itens.length > 0">
                <legend  style="font-size: large; font-weight: bold;">Primeiro Vencimento</legend>
                <fieldset>
                <el-card class="box-card" shadow="hover">
                     <el-col :span="6">
                        <el-form-item label="" size="mini">
                            <el-date-picker
                                style="width:100%"
                                v-model="form.primeiroVencimento"
                                type="date"
                                format="yyyy-MM-dd" 
                                value-format="yyyy-MM-dd"
                                placeholder="data">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-card>
                </fieldset>
            </el-row>

            <el-row v-if="form.tipoCobranca[0] == 1 && form.itens.length > 0">
                <legend  style="font-size: large; font-weight: bold;">Configurações de parcelas</legend>
                <fieldset>
                <el-card class="box-card" shadow="hover">
                     <el-col :span="6">
                        <el-form-item label="Número de parcelas" size="mini">
                           <el-select @change="teste" fieltrable v-model="form.numeroParcelas" placeholder="Escolher"
                                size="mini">
                                <el-option v-for="item in 12" :key="item" :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item> 
                    </el-col>

                    <el-col></el-col>

                    <el-col :span="6">
                        <legend>Tipo desconto</legend>
                        <el-checkbox-group @change="teste" style="margin-top: 13px" v-model="form.tipoDesconto" :max="1" size="mini">
                            <el-checkbox label="currency" border>
                                DINHEIRO
                            </el-checkbox>
                            <el-checkbox label="percentage" border>
                                PORCENTAGEM 
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="Desconto" size="mini">
                             <el-input v-model="form.desconto" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                     
                    <el-col :span="24">
                        <el-form-item label="Observações" size="mini">
                             <el-input
                                placeholder="observações"
                                v-model="form.observacoes"
                                type="textarea"
                                :rows="4">
                            </el-input>
                        </el-form-item>
                    </el-col>

                </el-card>
                </fieldset>
            </el-row>
            

            <el-row v-if="form.itens.length > 0 && form.tipoCobranca[0] == 0">
                    <legend style="font-size: large; font-weight: bold;">DATA VENCIMENTO</legend>
                <fieldset>
                <el-card class="box-card" shadow="hover">
                     <el-col :span="6">
                        <el-form-item label="Data de Vencimento" size="mini">
                            <el-date-picker
                                style="width:100%"
                                v-model="form.dataVencimento"
                                type="date"
                                format="yyyy-MM-dd" 
                                value-format="yyyy-MM-dd"
                                placeholder="">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-card>
                </fieldset>
            </el-row>

            <el-row :gutter="2" v-if="form.dataVencimento">
                    <legend style="font-size: large; font-weight: bold;">CONFIGURAÇÕES ADICIONAIS</legend>
                <fieldset>
                <el-card class="box-card" shadow="hover">

                    <el-col :span="6">
                        <el-form-item label="Frete" size="mini">
                             <el-input v-model="form.frete" size="mini"></el-input>
                        </el-form-item>
                    </el-col>

                     <el-col :span="18">
                        <el-form-item label="Detalhes do frete" size="mini">
                             <el-input v-model="form.detalhesFrete" size="mini"></el-input>
                        </el-form-item>
                    </el-col>

<el-col></el-col>

                    <el-col :span="6">
                        <legend>Tipo desconto</legend>
                        <el-checkbox-group @change="teste" style="margin-top: 13px" v-model="form.tipoDesconto" :max="1" size="mini">
                            <el-checkbox label="currency" border>
                                DINHEIRO
                            </el-checkbox>
                            <el-checkbox label="percentage" border>
                                PORCENTAGEM 
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="Desconto" size="mini">
                             <el-input v-model="form.desconto" size="mini"></el-input>
                        </el-form-item>
                    </el-col>

                    
                    <el-col :span="24">
                        <el-form-item label="Observações" size="mini">
                             <el-input
                                placeholder="observações"
                                v-model="form.observacoes"
                                type="textarea"
                                :rows="4">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-card>
                </fieldset>
            </el-row>
            
            <el-row v-if="form.itens.length > 0">
                <fieldset>
                <el-card class="box-card" shadow="hover"> 
                    <el-col :span="9">
                        <legend style="font-size: xx-large; font-weight: bold;">VALOR TOTAL DA COBRANÇA</legend>
                    </el-col> 

                    <el-col style="font-size: xx-large;" :span="4">
                        {{ 'R$ ' + calcTotalCobranca  }}
<br><br>
                    </el-col>
                </el-card>
                </fieldset>
            </el-row>
        </el-tab-pane>

        <el-tab-pane label="COBRANÇAS">

            <!-- <el-row :gutter="4" >
                <legend style="font-size: large; font-weight: bold;"></legend> 
                <fieldset>
                    <el-card style="heigth: 85px" class='box-card' shadow='hover'>
                        <el-col :span="4">
                            <el-form-item label="Buscar" size="mini">
                                <el-input v-model="bolixBusca.busca" size="mini"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="4">
                            <el-form-item label="Status" size="mini">
                                <el-input v-model="bolixBusca.status" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-card>
                </fieldset>
            </el-row> -->

            <el-row>
                <el-col :span="8">
                <legend style="font-size: large; font-weight: bold;">FILTROS</legend> 
                    <el-checkbox-group v-model="filtroTipoCobranca" :max="1" size="large">
                        <el-checkbox :label="0" border>
                            <font-awesome-icon icon="file-invoice" size="2x"/>
                            BOLETO
                        </el-checkbox>
                        <el-checkbox :label="1" border>
                            <font-awesome-icon icon="pager" size="2x"/>
                            CARNÊ 
                        </el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>

<el-col><br></el-col>

            <el-row v-if="filtroTipoCobranca[0] == 0">
                <el-col style="max-width: 100%">
                <legend style="font-size: large; font-weight: bold;">LISTA DE COBRANÇAS(BOLETOS)</legend> 
                <fieldset>
                <el-table
                    :data="tabelaCobrancasBoletos"
                    border
                    lazy
                    style="width: 100%; text-align: center; font-size: medium; color: ##2b2438">

                    <el-table-column
                    prop="charge_id"
                    label="ID">
                    </el-table-column>

                    <el-table-column
                    prop="cliente.payment.banking_billet.customer.name"
                    label="CLIENTE">
                    </el-table-column>

                    <el-table-column
                    prop="cliente.payment.banking_billet.customer.cpf"
                    label="CPF">
                    </el-table-column>

                    <el-table-column
                    prop="expire_at"
                    label="VENCIMENTO">
                    </el-table-column>

                    <el-table-column
                    prop="total"
                    label="TOTAL">
                    </el-table-column>

                    <el-table-column width="100" type="expand" label="Outros">
                        <template slot-scope="props">
                            <a v-bind:href=" props.row.pdf.charge ">- Clique para abrir o PDF</a>
                            <p v-if="props.row.status == 'waiting'">- Status: Pendente</p>
                            <p v-if="props.row.status != 'waiting'">- Status: Pago</p>
                            <el-button @click="transacaoId = props.row.charge_id; dialogReevioEmailBolix = true" size="medium" type="text" plain>
                                        <font-awesome-icon icon="envelope" size="1x"/> Reenviar bolix por email</el-button>
<br>
                            <el-button @click="marcarComoPagoTransacao(props.row.charge_id)" size="medium" type="text" plain>- Marcar como pago</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </fieldset>
                </el-col>
            </el-row>

            <el-row v-if="filtroTipoCobranca[0] == 1">
                <el-col style="max-width: 100%">
                <legend style="font-size: large; font-weight: bold;">LISTA DE COBRANÇAS(CARNÊS)</legend> 
                <fieldset>
                <el-table
                    :data="tabelaCobrancasCarnes"
                    border
                    lazy
                    style="width: 100%; text-align: center; font-size: medium; color: ##2b2438">

                   <el-table-column
                    prop="carnet_id"
                    label="ID">
                    </el-table-column>

                    <el-table-column
                    prop="cliente.customer.name"
                    label="CLIENTE">
                    </el-table-column>

                    <el-table-column
                    prop="cliente.customer.cpf"
                    label="CPF">
                    </el-table-column>

                    <el-table-column width="120"  type="expand" label="Outros">
                        <template slot-scope="props">
                            <a v-bind:href=" props.row.link "> - Link: Abrir o PDF</a>
<br>
                            <el-button size="medium" type="text" @click="exibirDialogCarneParcelas(props.row)"> - Parcelas</el-button>
<br> 
                            <el-button @click="transacaoId = props.row.carnet_id; dialogReevioEmailCarne = true" size="medium" type="text" plain>
                            <font-awesome-icon icon="envelope" size="1x"/> Reenviar carnê por email</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </fieldset>
                </el-col>
            </el-row>

            <el-dialog width="50%" style="font-weight: bold; font-size: xx-large;" title="Enviar email" :visible.sync="dialogReevioEmailBolix">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Email" size="mini">
                            <el-input v-model="form.email" size="mini"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-button style="margin-top: 33px; margin-left: 5px" @click="reenvioEmailBolix()" size="mini" type="success">Enviar</el-button>
                    </el-col>

                </el-row>
            </el-dialog>

            <el-dialog width="50%" style="font-weight: bold; font-size: xx-large;" title="Enviar email" :visible.sync="dialogReevioEmailCarne">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Email" size="mini">
                            <el-input v-model="form.email" size="mini"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-button style="margin-top: 33px; margin-left: 5px" @click="reenvioEmailCarne()" size="mini" type="success">Enviar</el-button>
                    </el-col>
                </el-row>
            </el-dialog>

            <el-dialog width="50%" style="font-weight: bold; font-size: xx-large;" title="Enviar email" :visible.sync="dialogReevioEmailParcela">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Email" size="mini">
                            <el-input v-model="form.email" size="mini"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-button style="margin-top: 33px; margin-left: 5px" @click="reenvioEmailParcela()" size="mini" type="success">Enviar</el-button>
                    </el-col>
                </el-row>
            </el-dialog>

            <el-dialog width="85%" style="font-weight: bold; font-size: xx-large;" :visible.sync="dialogParcelasCarne">
                <legend style="font-size: large; font-weight: bold;">PARCELAS</legend> 
                
                <el-row :gutter="4" v-for="(item, k) in carneParcelas.charges" :key="k">
                    <el-card class="box-card" shadow="hover">
                    <fieldset>
                    <el-col :span="2">
                        <el-form-item label="ID"  size="mini">
                            <el-input  v-model="item.charge_id" size="mini" readonly></el-input>
                        </el-form-item>
                    </el-col>

                     <el-col :span="2">
                        <el-form-item label="Parcela"  size="mini">
                            <el-input v-model="item.parcel" size="mini" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="3">
                        <el-form-item label="Vencimento"  size="mini">
                            <el-input v-model="item.expire_at" size="mini" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" style="cursor: pointer">
                        <el-form-item label="URL" size="mini">
                            <a v-bind:href=" item.url ">
                                <el-input type="button" v-model="item.url" size="mini" readonly></el-input>
                            </a>
                        </el-form-item>
                    </el-col>

                    <el-col :span="3" v-if="s = item.status == 'waiting' ? 'Pendente' : 'Pago'">
                        <el-form-item label="Status" size="mini">
                            <el-input v-model="s" size="mini" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="2">
                        <el-form-item label="Valor"  size="mini">
                            <el-input v-model="item.value" size="mini" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="1">
                        <el-button @click="dialogReevioEmailParcela = true; parcela = item.parcel" style="margin-top: 33px" size="mini" type="warning" plain>- Reenviar email</el-button>
                    </el-col> 
                    
                    <el-col :offset="2" :span="1">
                        <el-button @click="marcarPagoParcelaCarne(carneId, item.parcel)" style="margin-top: 33px" size="mini" type="success" plain>- Marcar como pago</el-button>
                    </el-col>

                    </fieldset>
                    </el-card>
                </el-row>

            </el-dialog>

        </el-tab-pane>

    </el-tabs>
    </el-form>
</div>
</template>

<script>
import gerenciaNet from '../../js/pagamentos/gerenciaNet.js'
export default {
    mixins: [gerenciaNet],
}
</script>

<style lang="sss" scoped>
</style>