<template>
<div>
<el-form :rules="rules" ref="form" :model="form" id="form" method="POST" action="">
    
<el-dialog  style="font-weight: bold; text-align: center;" title="Abertura do caixa" :visible.sync="dialogAberturaCaixa">
    
<el-row :gutter="4">

    <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
        <el-form-item label="Saldo inicial(Gaveta)" size="mini">
            <el-input v-model="form.aberturaCaixa.saldoInicial" size="mini"></el-input>
        </el-form-item>
    </el-col>


    <el-col :xs="24" :sm="13" :md="13" :lg="13" :xl="13">
        <el-form-item label="Funcionario" size="mini">
            <el-select v-model="form.aberturaCaixa.funcionario" name="operação" placeholder="Escolher" size="mini">
                <el-option label="funcionario1" value="1"></el-option>
                <el-option label="funcionario2" value="2"></el-option>
            </el-select>
        </el-form-item>
    </el-col>


    <el-col>
        <el-button type="primary" @click="aberturaCaixa()" size="mini">Confirmar</el-button>
        <el-button @click="dialogAberturaCaixa = false" size="mini">Cancelar(ESC)</el-button>
    </el-col>

</el-row>
</el-dialog>
  
<el-tabs v-model="editableTabsValue" type="border-card" @tab-click="menuClickTab" class="el-menu-window-form">

<el-row v-hotkey="keymap">
    
    <el-row @click="exibirHome" style="cursor: pointer; background-color: #50a5fb;  border-radius: 20px 20px 20px 20px;">  
        <legend v-if="form.statusCaixa == true" style="font-size: 200%; text-align: center; color: #ffffff; font-weight: 1000;">CAIXA DISPONÍVEL</legend>
    </el-row>

    <el-row @click="exibirHome" style="cursor: pointer; background-color: #50a5fb;  border-radius: 20px 20px 20px 20px;">
        <legend v-if="form.statusCaixa == false" style="font-size: 200%; text-align: center; color: #ffffff; font-weight: 1000;">CAIXA  INDISPONÍVEL</legend>
      <!--   <legend v-if="form.totalCaixa < 0 || form.statusCaixa == false" style="font-size: 90%; text-align: center; color: #ffffff;">Faça um suprimento inicial ou modifique o status do caixa em configurações...</legend> -->
    </el-row>
        
 <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
<br>
    <fieldset>
        <el-card  style="height: 595px;" class="box-card" shadow="hover">

        <el-row v-if="form.alter == ''">

            <el-col>
              <!--   <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                    <legend style="font-weight: bold; cursor: pointer;" @click="exibirClientes = true">Definir Cliente(F1)</legend>
                </el-col> -->

                <!--Selecionar Cliente-->
                <el-dialog  style="font-weight: bold; text-align: center;" title="Dados do Consumidor" :visible.sync="exibirClientes">
                    <el-row :gutter="2">

                        <el-row>
                             <!--Buscar no banco clientes cadastrados (v-for="(item, k) in clientes" :key="k"  v-if="clientes") -->
                            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                                <el-form-item label="Pessoa" size="mini">
                                    <el-select filterable v-model="form.produtos" name="produtos" placeholder='selecione'>
                                        <i style="font-size: 120%;" slot="prefix" class="el-input__icon el-icon-search"></i>
                                        <el-option
                                        v-for="item in tipoPessoa"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                    
                            <el-col :offset="1" :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                                <el-form-item label="CPF" size="mini">
                                    <i style="font-size: 120%;" slot="prefix" class="el-input__icon el-icon-search"></i>
                                    <el-input v-model="form.cpf" size="mini" name="cpf"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>    

                        <el-col>
                            <el-form-item label="Nome" size="mini">
                                <el-input v-model="form.nomeCliente" size="mini" name="nomeCliente"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col >
                            <el-form-item label="Endereço" size="mini">
                                <el-input v-model="form.endereco" size="mini" name="endereco"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col >
                            <el-form-item label="Endereço" size="mini">
                                <el-input type="textarea" v-model="form.observacaoCliente" size="mini" name="observacaoCliente"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="exibirClientes = false">Cancelar</el-button>
                        <el-button type="primary" @click="exibirClientes = false;">Concluir</el-button>
                    </div>
                </el-dialog>
                <!--Fim Definir Clientes-->

          <!--       <el-col :offset="10" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                    <legend style="font-weight: bold; cursor: pointer;" @click="exibirVendedores = true" >Definir Vendedor(F2)</legend>
                </el-col> -->


                <!--Selecionar Vendedores-->
                <el-dialog style="font-weight: bold; text-align: center;" title="Seleção de vendedor" :visible.sync="exibirVendedores">

                    <el-row>

                        <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                            <el-form-item label="Nome usúario" size="mini">
                                <i style="font-size: 120%;" slot="prefix" class="el-input__icon el-icon-search"></i>
                                <el-input v-model="form.nomeUsuario" size="mini" name="nomeUsuario"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col>
                            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                                <fieldset  style="font-weight: bold; text-align: center;">Login</fieldset>
                            </el-col>
                
                            <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                                <fieldset style="font-weight: bold; text-align: center;">Nome</fieldset>
                            </el-col>
                        </el-col>

                       
                        <!--Buscar no banco vendedores cadastrados (v-for="(item, k) in vendedores" :key="k"  v-if="vendedores") -->
                        <el-col>                    
                            <el-scrollbar wrap-style="max-height: 350px;"> 
                                <el-row :gutter="2">
            
                                    <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                                        <fieldset style="font-weight: bold; text-align: center;">[['login']]</fieldset>
                                    </el-col>
                        
                                    <el-col  :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                                        <fieldset style="font-weight: bold; text-align: center;">[['nome']]</fieldset>
                                    </el-col>

                                </el-row>
                            </el-scrollbar> 
                        </el-col>
   

                    </el-row>
                        
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="exibirVendedores = false">Cancelar</el-button>
                        <el-button type="primary" @click="exibirVendedores = false;">Concluir</el-button>
                    </div>
                  </el-dialog>
                  <!--Fim Definir Vendedores-->

                <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                    <legend>Não selecionado</legend>
                </el-col>

                <el-col :offset="10" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                    <legend>Não selecionado</legend>
                </el-col>

            </el-col>
        </el-row>
<br>
        <!--Home-->
        <el-row v-if="form.alter == ''">
            <!-- <el-col>
                <el-form-item label="Produtos" prop="produtos">
                    <el-select @change="preecherProduto" filterable v-model="form.produtos" name="produtos" id="produtos" size="large" placeholder="selecione">
                        <i style="font-size: 120%;" slot="prefix" class="el-input__icon el-icon-search"></i>
                        <el-option value="1" label="Selecionar"></el-option>
                        <el-option
                        v-for="item in produtos"
                        :key="item.value"
                        :label="item.descricao"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col> -->

             <el-form-item label="Produtos" prop="produtos">
                <el-select  @change="preecherProduto" v-model="form.produtos" filterable :filter-method="value => (keyword = value)">
                    <i style="font-size: 120%;" slot="prefix" class="el-input__icon el-icon-search"></i>
                        <el-option v-for="item in list" :key="item.value" :label="item.descricao" :value="item"/>
                </el-select>
             </el-form-item>

            <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                <el-form-item label="Quantidade" size="mini" >
                    <el-input @keyup.enter.native="addProdutos" v-model="form.quantidade" size="mini" name="quantidade"></el-input>
                </el-form-item>
            </el-col>

            <el-col :offset="2" :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
                <el-form-item label="Valor do Item" size="mini">
                    <el-input @keyup.enter.native="addProdutos" v-model="form.valorItem" size="mini" name="valorItem"></el-input>
                </el-form-item>
            </el-col>

            <!-- <el-col :offset="1" :span="5">
                <el-form-item label="Desconto" size="mini">
                    <el-input  @keyup.enter.native="addProdutos" v-model="form.descontoItem" name="descontoItem" placeholder="%"></el-input>
                </el-form-item>
            </el-col> -->

            <el-col class="demo-image"> 
                <br><br>
               <el-col :span="1" :offset="9" style="text-align: left; margin-top: 30px; font-weight: 900; font-size: xxx-large; color: #50a5fb">
                    <span>EasyCli</span>
                </el-col>
            </el-col>

            <el-dialog
                title="Aviso"
                :visible.sync="avisoProdutos"
                width="20%"
                center>
                <legend style="text-align: center;">Preencha todos os Campos</legend>
                
                <span slot="footer" class="dialog-footer">
                <el-button @click="avisoProdutos = false">Fechar</el-button>
                </span>
            </el-dialog>


            <el-dialog style="font-weight: bold;" title="Definir meio de pagamento" :visible.sync="meioPagamento">

                <el-row>

                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
<br>
                        <el-checkbox-group v-model="form.formaPagamento">
                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox @change="calcTotal" label="Dinheiro">Dinheiro(1)</el-checkbox>
                            </el-col>

                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox @change="calcTotal" label="Credito">Credito(2)</el-checkbox>
                            </el-col>

                            
                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox  @change="calcTotal" label="Debito">Debito(3)</el-checkbox>
                            </el-col>
                            
                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox label="Crediario">Crediario(4)</el-checkbox>
                            </el-col> 

                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox label="QRCode Pix">QRCode Pix(5)</el-checkbox>
                            </el-col>


                      <!-- <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox label="Cheque">Cheque(3)</el-checkbox>
                            </el-col>

                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox label="Devolucao">Devolucao(4)</el-checkbox>
                            </el-col> 

                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox label="Desconto">Desconto(8)</el-checkbox>
                            </el-col> -->

                        </el-checkbox-group>
                    </el-col>
                    

                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">

                        <el-col v-if="form.formaPagamento == 'Dinheiro'" :xs="24" :sm="12" :md="12" :lg="12" :xl="12"> 
                            <el-form-item label="Informe o valor" size="mini">
                                <el-input @blur="calcTotal" @keyup.enter.native="selecionarMeioPagamento" v-model="form.valorPago" size="mini" name="valorPago"></el-input>
                            </el-form-item>
                        </el-col>
                  
                        <el-col :offset="2" :xs="24" :sm="10" :md="10" :lg="10" :xl="10"> 
                            <el-form-item label="Total" size="mini">
                                <el-input :disabled = true v-model="form.totalLista" size="mini" name="totalLista"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col v-if="form.formaPagamento == 'Dinheiro'" :xs="24" :sm="10" :md="10" :lg="10" :xl="10"> 
                            <el-form-item label="Troco" size="mini">
                               <legend v-if="form.troco == 'Dinheiro' && form.valorPago == ''" style="font-weight: bold;">{{ form.troco }}</legend>
                               <legend v-if="form.troco != 'Dinheiro' && form.valorPago != ''" style="font-weight: bold;">{{form.troco}}</legend>
                            </el-form-item>
                        </el-col>

                    </el-col>       

                </el-row>

                <div slot="footer" class="dialog-footer"> 
                    <el-button style="margin-top: 10ox;" type="primary" @click="selecionarMeioPagamento">Finalizar Compra</el-button>
                    <el-button style="margin-top: 10px;" @click="meioPagamento = false;">Cancelar</el-button>
                </div>
            </el-dialog>

            <el-dialog
            title="Selecione a Banderira do Cartão"
            :visible.sync="checarFormaPagamento">
                    <el-row>
                        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
<br>
                            <el-checkbox-group  size="small" :max="2" v-model="form.tipoBandeira" v-for="(item, k) in bandeiras" :key="k">
                                <el-checkbox @change="checar()" style="font-weight: bold;" :label="item.configuracaoBandeira.nomeBandeira"></el-checkbox>
                            </el-checkbox-group>
                        </el-col>

                       <!--  <el-col  :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                            <el-form-item  label="Parcelas" size="mini">
                                <el-input v-model="form.parcelas" size="mini"></el-input>
                            </el-form-item>
                        </el-col> -->

                        <el-col :offset="1" :xs="24" :sm="6" :md="6" :lg="6" :xl="6"> 
                            <el-form-item label="Total" size="mini">
                                <el-input :disabled = true v-model="form.totalLista" size="mini" name="totalLista"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                      
                    <span slot="footer" class="dialog-footer">
                        <el-button type="success" @click="checarFormaPagamento = false;  meioPagamento = false; compraFinalizada = true" plain>Finalizar</el-button>
                        <el-button @click="checarFormaPagamento = false; meioPagamento = false;" plain>Cancelar</el-button>
                    </span>
            </el-dialog>


            <el-dialog
                title=""
                :visible.sync="compraFinalizada"
                width="40%"
                center>
                <legend style="text-align: center;">Compra Finalizada</legend>
                
                <span slot="footer" class="dialog-footer">
                    <legend style="font-weight: bold;">Selecione o documento de emissão</legend>
<br>
                <el-button v-if="cfe === true" type="primary" @click="emitirDocumento;">CFE</el-button>
                <el-button v-if="nfce === true" type="success" @click="emitirDocumento">NFC-E</el-button>
                <el-button v-if="dav === true" type="warning" @click="emitirDocumento">DAV</el-button>
                <el-button v-if="mfe === true" @click="emitirDocumento">MFE</el-button>
               </span>
            </el-dialog>
            
            <el-dialog  :visible.sync="selecionarBandeira">

            </el-dialog>


            <!--Fechar Caixa-->
            <el-dialog width="80%" style="font-weight: bold; text-align: center;" title="Fechar Caixa" :visible.sync="fecharCaixa">

                <el-row :gutter="2">
                 
                    <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                        <el-form-item label="Operador de Caixa" size="mini">
                            <el-input v-model="form.nomeOperador" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
        <!-- 
                    <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <el-form-item label="Data" size="mini"> 
                            <el-date-picker
                                size="mini"
                                name="dataFechamento"
                                style="width:100%"
                                v-model="form.dataFechamento"
                                type="date"
                                format="dd/MM/yyyy"
                                placeholder="">
                            </el-date-picker>
                        </el-form-item>
                    </el-col> -->
        <!-- 
                    <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                        <el-form-item label="Turno" size="mini">
                            <el-select v-model="form.turno" name="operação" placeholder="Escolher" size="mini">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                                <el-option label="4" value="4"></el-option>
                                <el-option label="5" value="5"></el-option>
                                <el-option label="6" value="6"></el-option>
                                <el-option label="7" value="7"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
        
      <!--               <el-col :offset="2" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <el-form-item size="mini">
                            <el-checkbox style="margin-top: 32px;" v-model="form.sicronizarGestao" name="sicronizarGestao">Sicronizar com Gestão</el-checkbox>
                        </el-form-item>
                    </el-col>
         -->
                    <el-col>
                        <fieldset style="font-weight: bold; text-align: center;">Dados do fechamento</fieldset>
<br>
                    </el-col>
        
                    <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                        <fieldset style="font-weight: bold; text-align: center;">PAGAMENTO</fieldset>
                    </el-col>
         
                    <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                        <fieldset style="font-weight: bold; text-align: center;">ENTRADA</fieldset>
                    </el-col> 
        
                    <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                        <fieldset style="font-weight: bold; text-align: center;">VALOR</fieldset>
                    </el-col>
        
                    <el-col  :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <fieldset style="font-weight: bold; text-align: center;">GAVETA</fieldset>
                    </el-col>
        
                    <el-col  :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <fieldset style="font-weight: bold; text-align: center;">FALTA/SOBRA</fieldset>
                    </el-col>
        
                    <el-col>
        
                        <el-card style="height: 260px;" class="box-card" shadow="hover">
        
                            <el-row :gutter="2" v-for="(item, k) in this.operacoesCaixa" :key="k">
        
                                <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                                    <fieldset style="font-weight: bold; text-align: center;">{{ item.formaPagamento }}</fieldset>
                                </el-col>
                     
                                <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                                    <fieldset style="font-weight: bold; text-align: center; height: 15px">{{  }}</fieldset>
                                </el-col> 
                    
                                <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                                    <fieldset style="font-weight: bold; text-align: center;">{{ item.total }}</fieldset>
                                </el-col>
                    
                                <el-col v-if="item.formaPagamento == 'Dinheiro'" :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                                   <el-input @blur="calcSobraGaveta()" v-model="form.valorGaveta" name="valorGaveta" size="small"></el-input>
                                </el-col>

                    
                                <el-col  v-if="item.formaPagamento == 'Dinheiro'" :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                                    <fieldset style="font-weight: bold; text-align: center; height: 15px">{{sobra}}</fieldset>
                                </el-col>
        
                            </el-row>
                        
                        </el-card>
        
                   </el-col>
        
                   <el-col>
<br><!-- 
                        <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                            <legend>Entradas no sistema</legend>
                                <fieldset style="font-weight: bold; text-align: center;">[['R$']]</fieldset>
                        </el-col>
         -->
<!--                         <el-col  :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                            <legend>Valores já Lançados</legend>
                                <fieldset style="font-weight: bold; text-align: center;">[['R$']]</fieldset>
                        </el-col> -->
        
                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <legend>Total Gaveta</legend>
                                <fieldset style="font-weight: bold; text-align: center; height: 15px">{{ form.valorGaveta }}</fieldset>
                        </el-col>
        
                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <legend>Falta/Sobra</legend>
                                <fieldset style="font-weight: bold; text-align: center; height: 15px">{{ sobra }}</fieldset>
                        </el-col>
        
                   </el-col>
                </el-row>
        
            <div slot="footer" class="dialog-footer"> 
                <el-button style="margin-top: 10ox;" type="primary" @click="fechamentoCaixa();">Concluir</el-button>
                <el-button style="margin-top: 10px;" @click="fecharCaixa = false">Cancelar</el-button>
            </div>

            </el-dialog>
            <!-- Fim Fechar Caixa-->

            <!--Configuracoes-->
        <el-dialog width="80%" style="font-weight: bold; text-align: center;" title="Configurações do Caixa" :visible.sync="exibirConfiguracoes">
        <el-row :gutter="2">

            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-col>
                    <legend style="font-weight: bold; text-align: left;">Tipo de documento</legend>
                    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">

                   <!--  <el-checkbox-group v-model="form.configuracoes.tipoEmissaoArr" name="configuracoes.tipoEmissao">
                        
                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox label="nfce" :value="1">NFC-E</el-checkbox>
                            </el-col>

                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox label="cfe" :value="2">CFE</el-checkbox>
                            </el-col>

                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox label="dav" :value="3">DAV</el-checkbox>
                            </el-col>

                            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                                <el-checkbox label="mfe" :value="4">MFE</el-checkbox>
                            </el-col>
                        
                    </el-checkbox-group> -->

                    <!-- <el-select
                        size="mini"
                        v-model="form.configuracoes.tipoDocumento"
                        multiple
                        collapse-tags
                        placeholder="Select">
                        <el-option label="NFC-E" value="nfce"></el-option>
                        <el-option label="CFE" value="cfe"></el-option>
                        <el-option label="DAV" value="dav"></el-option>
                        <el-option label="MFE" value="mfe"></el-option>

                    </el-select> -->

                    <el-checkbox style="margin-top: 32px;" v-model="nfce">NFC-E</el-checkbox>
                    <el-checkbox style="margin-top: 32px;" v-model="cfe">CFE</el-checkbox>
                    <el-checkbox style="margin-top: 32px;" v-model="dav">DAV</el-checkbox>
                    <el-checkbox style="margin-top: 32px;" v-model="mfe">MFE</el-checkbox>

                    
                    </el-col>
                </el-col>
                <el-col>
<br><br>
                        <legend style="font-weight: bold; text-align: left;">Identificação do Caixa</legend>
                  <!--   <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item size="mini" label="CNPJ" >
                            <el-select v-model="form.configuracoes.tipoDocumento" name="tipoDocumento" placeholder="Escolher" size="mini">
                                 <el-option label="Cupom Fiscal" value="cupom"></el-option>
                                <el-option label="NFC-E" value="NFCE"></el-option>
                                <el-option label="DAV" value="DAV"></el-option> 
                            </el-select>
                        </el-form-item>
                    </el-col> -->

                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item size="mini" label="Número do caixa" >
                            <el-input v-model="form.configuracoes.numeroCaixa"  name="cnpj" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
           
            <el-col>
<br>
                <legend style="font-weight: bold; text-align: left;">Configuraração da Impressora</legend>

                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item size="mini" label="Modelo da Impressora" >
                        <el-select v-model="form.configuracoes.impressora" name="impressora" placeholder="Escolher" size="mini">
                            <el-option label="Impressora do Windows" value="windows"></el-option>
                            <el-option label="Outras" value="outras"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :offset="2" :xs="24" :sm="2" :md="2" :lg="2" :xl="2">
                   <el-button style="margin-top: 33px;" size="mini"  type="success" plain> Localizar</el-button>
                </el-col>
<!-- 
                <el-col :offset="2" style="margin-top: 5px" :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                     <el-checkbox style="margin-top: 32px;" v-model="form.statusCaixa">Status do caixa</el-checkbox>
                </el-col> -->
            </el-col>

             <el-col :span="8">
                <el-form-item label="Desconto" size="mini">
                    <el-radio-group style="margin-top: 30px;" v-model="form.configuracoes.tipoDesconto" name="tipo" size="mini">
                        <el-radio-button label="0">Percentual</el-radio-button>
                        <el-radio-button label="1">Dinheiro</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-col>
               
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                
<br><br>
<legend style="font-weight: bold; text-align: left;">Arquivo do certificado digital</legend>
            <el-col>
                <el-form-item size="mini" label="">
                    <el-input type="file" size="mini" v-model="form.configuracoes.caminhoCertificado"></el-input>
                </el-form-item>
            </el-col>
            
            <el-col>
<br>
                  <legend style="font-weight: bold; text-align: left; margin-top: 21px">Senha de acesso do certificado</legend>
                <el-col>
                    <el-form-item size="mini">
                        <el-input v-model="form.configuracoes.senha" name="senha" type="password" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-col>
            
        </el-col>

     
        </el-row>

        <div slot="footer" class="dialog-footer"> 
            <el-button style="margin-top: 10ox;" type="primary" @click="cadastrarConfiguracaoPdv()">Finalizar Configuraração</el-button>
            <el-button style="margin-top: 10px;" @click="exibirConfiguracoes = false; ">Cancelar</el-button>
        </div>
        
        </el-dialog>
            <!--Fim configuracoes-->
        </el-row>
        <!--Fim home-->


        <!--Consultar preço-->
        <el-row v-if="form.alter == 4" :gutter="4" >
            <legend style="font-weight: bold">Consultar Preço</legend>
<br>
            <el-col>
                <el-form-item label="" size="small">
                    <el-select filterable @change="preecherConsultaPreco()" v-model="form.produtos" placeholder="selecionar" name="produtos">
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

            <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                <el-form-item label="Código" size="mini">
                    <el-input :disabled="true" v-model="codigoConsulta" size="mini"></el-input>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                <el-form-item label="Nome" size="mini">
                    <el-input :disabled="true" v-model="descricaoConsulta" size="mini"></el-input>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="Preço" size="mini">
                    <el-input :disabled="true" v-model="precoConsulta" size="mini"></el-input>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                <el-form-item label="Estoque" size="mini">
                    <el-input :disabled="true"  v-model="estoqueConsulta" size="mini"></el-input>
                </el-form-item>
            </el-col>

            
            <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                <el-form-item label="Situação" size="mini">
                    <el-input :disabled="true" v-model="situacaoConsulta" size="mini"></el-input>
                </el-form-item>
            </el-col>
         
            <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="UN" size="mini">
                    <el-input :disabled="true" v-model="unidadeConsulta" size="mini"></el-input>
                </el-form-item>
            </el-col>


        </el-row>
        <!--Fim consultar preço-->


        <!--Pedido-->
            <el-dialog width="80%" style="font-weight: bold; text-align: center;" title="Pedido" :visible.sync="pedido">
                
           
                <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                    <el-form-item label="Tipo de data" size="mini">
                        <el-select size="mini" filterable v-model="form.tipoData" name="tipoData" placeholder="selecione">
                            <i style="font-size: 120%;" slot="prefix" class="el-input__icon el-icon-search"></i>
                            <el-option
                            v-for="item in tipoData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :offset="3" :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                    <el-form-item label="Período" size="mini"> 
                        <el-date-picker
                            size="mini"
                            name="dataPedidoInicio"
                            style="width:100%"
                            v-model="form.dataPedidoInicio"
                            type="date"
                            format="dd/MM/yyyy"
                            placeholder="">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                    <el-form-item label="Até" size="mini"> 
                        <el-date-picker
                            size="mini"
                            name="dataPedidoFim"
                            style="width:100%"
                            v-model="form.dataPedidoFim"
                            type="date"
                            format="dd/MM/yyyy"
                            placeholder="">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="2">
                   <el-button type="primary" style="margin-top: 33px;" size="mini">Filtrar</el-button>
<br><br>
                </el-col>
            
                    
            <el-table
                style="width: 100%"
                @select = "selectItem"
                :data="form.tabelaPedido">

                 
                <el-table-column
                    type = "selection"
                    width="45">
                </el-table-column>
                
                <el-table-column
                    prop="numero"
                    label="Número"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="cliente"
                    label="Cliente"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="geracao"
                    label="Geração"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="situacao"
                    label="Situação"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="valorTotal"
                    label="Valor Total"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="saldo"
                    label="Saldo"
                    width="180">
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer"> 
                <el-button style="margin-top: 10ox;" type="primary" @click="pedido = false;">Selecionar</el-button>
                <el-button style="margin-top: 10px;" @click="pedido = false">Fechar</el-button>
            </div>
        
        </el-dialog>
        <!--Fim Pedido-->


         <!--Gaveta-->
         <el-row v-if="form.alter == 6">
            Gaveta
        </el-row>
        <!--Fim Gaveta-->


         <!--Devolução-->
         <el-row v-if="form.alter == 7">

            <legend style="font-weight: bold;">Devolução</legend>
            <el-col>
<br>
                <el-form-item label="" size="small">
                    <el-select @change="preecherProduto()" @keyup.enter.native="addProdutosDevolucao" filterable v-model="form.produtos" name="produtos" placeholder="selecione">
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

            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                <el-form-item label="Quantidade" size="mini"> 
                    <el-input  @keyup.enter.native="addProdutosDevolucao" v-model="form.quantidade" size="mini" name="quantidade"></el-input>
                </el-form-item>
            </el-col>

            <el-col :offset="1" :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                <el-form-item label="Valor Unitário" size="mini"> 
                    <el-input  @keyup.enter.native="addProdutosDevolucao" v-mask="['#.##', '##.##', '###.##', '####.##', '##.###.##', '###.###.##']" v-model="form.valorItem" size="mini" name="quantidade"></el-input>
                </el-form-item>
            </el-col>

            <el-col :offset="1"  :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-radio-group style="margin-top: 30px;" v-model="form.tipoDevolucao" name="tipo" size="mini">
                    <el-radio-button label="0">Trocar</el-radio-button>
                    <el-radio-button label="1">Devolver</el-radio-button>
                </el-radio-group>
            </el-col>


            <el-col>
                <fieldset>
                    <el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="2">
                        <el-col>
                            <legend style="font-weight: bold;  text-align: center;">Item</legend>
                        </el-col>
                    </el-col>

                   <!--  <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <el-col>
                            <legend style="font-weight: bold; text-align: center;">Código</legend>
                        </el-col>
                    </el-col> -->

                    <el-col  :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                        <el-col>
                            <legend style="font-weight: bold; text-align: center;">Descrição</legend>
                        </el-col>
                    </el-col>

                    <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                        <el-col>
                            <legend style="font-weight: bold; text-align: center;">Qtd</legend>
                        </el-col>
                    </el-col>

                    <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <el-col>
                            <legend style="font-weight: bold; text-align: center;">Valor UN</legend>
                        </el-col>
                    </el-col>

                    <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                        <el-col>
                            <legend style="font-weight: bold; text-align: center;">Total</legend>
                        </el-col>
                    </el-col>
                </fieldset>
            </el-col>
             
            <el-col>
          
           <el-card style="height: 300px;" class="box-card" shadow="hover">
            <el-scrollbar wrap-style="max-height: 425px;"> 
                <el-row  v-for="(itemk, k) in form.listaDevolucao" :key="k"  v-if="form.listaDevolucao && form.tipoDevolucao == 1">
<br>
               
                    <el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="2">
                        <fieldset style="margin-top: -10px;"> 
                            {{ k + 1 }}
                        </fieldset>
                    </el-col> 

                    <!-- <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <fieldset style="margin-top: -10px;"> 
                            {{ 'Codigo' }}
                        </fieldset>
                    </el-col>   -->

                    <el-col  :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                        <fieldset style="margin-top: -10px;"> 
                           {{  itemk.nomeProduto  }}
                        </fieldset>
                    </el-col>

                    <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                        <fieldset style="margin-top: -10px;"> 
                            {{ itemk.quantidade }}
                        </fieldset>
                    </el-col>

                    <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <fieldset style="margin-top: -10px;"> 
                            {{ itemk.valor }}
                        </fieldset>
                    </el-col>

                    <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                        <fieldset style="margin-top: -10px;"> 
                            {{ itemk.quantidade * itemk.valor }}
                        </fieldset>
                    </el-col>

                    <el-col :xs="24" :sm="1" :md="1" :lg="1" :xl="1"> 
                        <el-button style="margin-top: -12px; padding: 7px;" type="danger" size="mini"
                            icon="el-icon-delete" @click="removeListaDevolucao(k)"
                            v-show="k || (!k && form.listaDevolucao.length > 0)">
                        </el-button>
                    </el-col>

                    <!-- <el-col :xs="24" :sm="1" :md="1" :lg="1" :xl="1"> 
                        <el-button style="margin-top: -12px; padding: 7px;  margin-left: 2;" type="warning" size="mini"
                            icon="el-icon-edit" @click="editListaDevolucao(k);"
                            v-show="k || (!k && form.listaDevolucao.length > 0)">
                        </el-button>
                    </el-col>
 -->
             
              
                </el-row >


                <el-row  v-for="(itemw, w) in form.listaTroca" :key="w"  v-if="form.listaTroca && form.tipoDevolucao == 0">
<br>
                    <el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="2">
                        <fieldset style="margin-top: -10px;"> 
                          {{   w + 1 }}
                        </fieldset>
                    </el-col> 

                    <!-- <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <fieldset style="margin-top: -10px;"> 
                            {{ 'Codigo' }}
                        </fieldset>
                    </el-col>  -->

                    <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                        <fieldset style="margin-top: -10px;"> 
                            {{ itemw.nomeProduto  }}
                        </fieldset>
                    </el-col>

                    <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                        <fieldset style="margin-top: -10px;"> 
                            {{ itemw.quantidade }}
                        </fieldset>
                    </el-col>

                    <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <fieldset style="margin-top: -10px;"> 
                            {{ itemw.valor }}
                        </fieldset>
                    </el-col>

                    <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
                        <fieldset style="margin-top: -10px;"> 
                            {{ itemw.quantidade * itemw.valor }}
                        </fieldset>
                    </el-col>

                    <el-col :xs="24" :sm="1" :md="1" :lg="1" :xl="1"> 
                        <el-button style="margin-top: -12px; padding: 7px;" type="danger" size="mini"
                            icon="el-icon-delete" @click="removeListaTroca(w)"
                            v-show="w || (!w && form.listaTroca.length > 0)">
                        </el-button>
                    </el-col>
<!-- 
                    <el-col :xs="24" :sm="1" :md="1" :lg="1" :xl="1"> 
                        <el-button style="margin-top: -12px; padding: 7px;" type="warning" size="mini"
                            icon="el-icon-edit" @click="editListaTroca(w);"
                            v-show="w || (!w && form.listaTroca.length > 0)">
                        </el-button>
                    </el-col> -->
                            
                </el-row >

            </el-scrollbar>
            
                </el-card>
<br>
                <el-col>

                    <el-col :offset="12" :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                        <fieldset  v-if="form.listaDevolucao && form.tipoDevolucao == 1" style="margin-top: -10px;"> 
                           {{  'Itens: ' + form.listaDevolucao.length }}
                        </fieldset> 

                        <fieldset  v-if="form.listaTroca && form.tipoDevolucao == 0" style="margin-top: -10px;"> 
                           {{  'Itens: ' + form.listaTroca.length }}
                        </fieldset>
                    </el-col>

                    <!-- <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <fieldset style="margin-top: -10px;"> 
                           {{'Quantidade: 0' }}
                        </fieldset>
                    </el-col> -->

                    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <fieldset v-if="form.listaDevolucao && form.tipoDevolucao == 1" style="margin-top: -10px;"> 
                            {{ 'Valor Total: ' +  form.totalDevolucao }}
                        </fieldset> 

                        <fieldset  v-if="form.listaTroca && form.tipoDevolucao == 0" style="margin-top: -10px;"> 
                           {{  'Valor Total: ' + form.totalTroca }}
                        </fieldset>
                    </el-col>

                </el-col>
                
            </el-col>


            <el-dialog width="85%" style="font-weight: bold; text-align: center;" title="Dados da Troca" :visible.sync="confirmarTroca">
            <el-row :gutter="2">
               
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="form.listaTroca">
<br> 
                    <legend style="font-weight: bold; text-align: center;">Troca</legend>
<br>

                    <el-col  :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                            <fieldset style="margin-top: -10px;"> 
                               Produto
                            </fieldset>
                        </el-col>

                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <fieldset style="margin-top: -10px;"> 
                               Qtd
                            </fieldset>
                        </el-col>

                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <fieldset style="margin-top: -10px;"> 
                                Valor
                            </fieldset>
<br>
                    </el-col>
                    
                    <el-col v-for="(itemj, j) in form.listaTroca" :key="'itemj' + j">
                        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                            <fieldset style="margin-top: -10px;"> 
                                {{ itemj.nomeProduto }}
                            </fieldset>
                        </el-col>

                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <fieldset style="margin-top: -10px;"> 
                                {{ itemj.quantidade }}
                            </fieldset>
                        </el-col>

                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <fieldset style="margin-top: -10px;"> 
                                {{ itemj.valor }}
                            </fieldset>
<br>
                        </el-col>
                    </el-col>

                    <el-col>
                        <fieldset style="margin-top: -10px;"> 
                            {{ form.totalTroca }}
                        </fieldset>
                    </el-col>

                </el-col>
     
                
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="form.listaDevolucao">
<br>
                    <legend style="font-weight: bold; text-align: center;">Devolução</legend>
<br>

                        <el-col  :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                            <fieldset style="margin-top: -10px;"> 
                               Produto
                            </fieldset>
                        </el-col>

                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <fieldset style="margin-top: -10px;"> 
                               Qtd
                            </fieldset>
                        </el-col>

                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <fieldset style="margin-top: -10px;"> 
                                Valor
                            </fieldset>
<br>
                    </el-col>

                    <el-col v-for="(itemz, z) in form.listaDevolucao" :key="'itemz' + z">
                        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                            <fieldset style="margin-top: -10px;"> 
                                {{ itemz.nomeProduto }}
                            </fieldset>
                        </el-col>

                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <fieldset style="margin-top: -10px;"> 
                                {{ itemz.quantidade }}
                            </fieldset>
                        </el-col>

                        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <fieldset style="margin-top: -10px;"> 
                                {{ itemz.valor }}
                            </fieldset>
<br>
                        </el-col>
                </el-col>

                <el-col>
                    <fieldset style="margin-top: -10px;"> 
                        {{ form.totalDevolucao }}
                    </fieldset>
                </el-col>

                </el-col>      
            </el-row>
                <div slot='footer' style="float: left">
                    <h5 v-if="form.totalDevolucao < form.totalTroca">Falta de: R$ {{ form.totalTroca - form.totalDevolucao }}</h5>
                    <h5 v-if="form.totalDevolucao > form.totalTroca">Devolva ao cliente:  {{ form.totalDevolucao - form.totalTroca }}</h5>
                    <h5 v-if="form.totalDevolucao == form.totalTroca">Retorno:  0</h5>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="confirmarTroca = false">Cancelar</el-button>
                    <el-button type="primary" @click="trocaDevolucao()">Concluir</el-button>
                </div>
            </el-dialog>  

        </el-row>
        <!--Fim Devolução-->


        <!--Sangria-->
        <el-row :gutter="4" v-if="form.alter == 8">
    
            <el-col>
                <legend style="font-weight: bold;">Sangria/Suprimento</legend>
<br>
            </el-col>

            <el-col :span="9">
                <el-form-item label="Data" size="mini"> 
                    <el-date-picker
                        size="mini"
                        name="dataSangria"
                        style="width:100%"
                        v-model="form.dataSangria"
                        type="date"
                        format="dd/MM/yyyy"
                        placeholder="">
                    </el-date-picker>
                </el-form-item>
            </el-col>

            <!-- <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="Caixa" size="mini">
                    <el-input v-model="form.caixa" size="mini" name="caixa"></el-input>
                </el-form-item>
            </el-col> -->

            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="Operação" size="mini">
                    <el-select v-model="form.operacao" name="operação" placeholder="Escolher" size="mini">
                        <el-option label="Sangria" :value="1"></el-option>
                        <el-option label="Suprimento" :value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>


            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="Especie" size="mini">
                    <el-select v-model="form.especie" name="especie" placeholder="Escolher" size="mini">
                        <el-option label="Dinheiro" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="Valor" size="mini">
                    <el-input v-model="form.valorSangriaSuprimento" size="mini" name="valor"></el-input>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
                <el-form-item label="Observações" size="mini">
                    <el-input type="textarea" rows="4" v-model="form.observacao" size="mini" name="observacao"></el-input>
                </el-form-item>
            </el-col>

            <el-col>
                <el-button type="primary" @click="addSangria()" size="mini">Confirmar</el-button>
                <el-button @click="" size="mini">Cancelar(ESC)</el-button>
            </el-col>

        </el-row>
        <!--Fim Sangria-->

        <!--Mais Funções
        <el-row v-if="form.alter == 9">
            Mais Funções
        </el-row>
        Fim Mais Fuções-->

        <!--Menu Fiscal-->
      <!--   <el-row v-if="form.alter == 10"> -->
           <el-dialog  width="85%" style="font-weight: bold;" title="Menu fiscal" :visible.sync="exibirMenuFiscalVar">
                <el-tabs tab-position="left">
                    <el-tab-pane label="Operações">
                        <el-row :gutter="4">

                            <el-card class="box-card" shadow="hover">
                                <el-col :span="6">
                                    <el-form-item label="Tipo operação" size="mini">
                                    <el-select v-model="form.operacoes.tipoOperacao" name="operação" placeholder="Escolher" size="mini">
                                            <el-option label="(todos os tipos de operações)" :value="1"></el-option>
                                            <el-option label="Venda não concluída" :value="2"></el-option>
                                            <el-option label="Venda" :value="3"></el-option>
                                            <el-option label="Recebimento" :value="4"></el-option>
                                            <el-option label="Sobra de caixa" :value="5"></el-option>
                                            <el-option label="Suprimento" :value="6"></el-option>
                                            <el-option label="Sangria" :value="7"></el-option>
                                            <el-option label="Recebimento" :value="8"></el-option>
                                            <el-option label="Fechamento de caixa" :value="9"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="Data incial" size="mini">
                                        <el-date-picker
                                            size="mini"
                                            v-model="form.operacoes.filtroData"
                                            type="daterange"
                                            range-separator="a"
                                            start-placeholder="Inicio"
                                            end-placeholder="Fim"
                                            format="dd/MM/yyyy"
                                            value-format="dd/MM/yyyy">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>

                                <el-col :offset="2" :span="3">
                                    <el-form-item label="Nº doc. fiscal" size="mini">
                                        <el-input v-model="form.operacoes.nDocFiscal1" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>
                                
                                <el-col :span="1">
                                    <legend style="margin-top: 35px; margin-left: 5px ;font-weight: bold;">até</legend>
                                </el-col>

                                <el-col :span="3">
                                    <el-form-item label="" size="mini">
                                        <el-input  style="margin-top: 33px;" v-model="form.operacoes.nDocFiscal2" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-button style="margin-top: 33px" type="success" @click="intervalData()" size="mini">Aplicar filtros</el-button>
                            </el-card>

                            <el-col>
                                <el-form-item style="font-weight: bold;" label="Pesquisar">
                                    <el-input v-model="pesquisar"></el-input>
                                </el-form-item>
                            </el-col>

                            <template>
                                <el-table
                                    :data="listOperacoes"
                                    border
                                    style="width: 100%; background: #e9dff8;">
                                    <el-table-column
                                    type="index"
                                    label="Seq"
                                    width="60">
                                    </el-table-column>

                                    <el-table-column
                                    prop="turno"
                                    label="Turno"
                                    width="60">
                                    </el-table-column>

                                    <el-table-column
                                    prop="dataRegistro"
                                    label="Data">
                                    </el-table-column>

                                    <el-table-column
                                    prop="tipoDocumento"
                                    label="Doc. Fiscal">
                                    </el-table-column>

                                    <el-table-column
                                    prop="numero"
                                    label="Número">
                                    </el-table-column>

                                     <el-table-column
                                    prop="operacao"
                                    label="Operação">
                                    </el-table-column>

                                    <el-table-column
                                    prop="valorVenda"
                                    label="Valor total bruto">
                                    </el-table-column>

                                    <el-table-column
                                    prop="valortotalLiquido"
                                    label="Valor total líquido">
                                    </el-table-column>
                                </el-table>
                            </template>

                        </el-row>
                    </el-tab-pane>
                </el-tabs>
           </el-dialog> 
       <!--  </el-row> -->
        <!--Fim Menu Fiscal-->
    
        <!--Fechamento de Caixa-->
        <el-row v-if="form.alter == 11" :gutter="1">
            <el-col>
                <legend style="font-weight: bold; text-align: center;">Fechamento de Caixa</legend>
<br>
            </el-col>

            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="Operador de Caixa" size="mini">
                    <el-input v-model="form.nomeOperador" name="nomeOperador" size="mini"></el-input>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label="Data" size="mini"> 
                    <el-date-picker
                        size="mini"
                        name="dataFechamento"
                        style="width:100%"
                        v-model="form.dataFechamento"
                        type="date"
                        format="dd/MM/yyyy"
                        placeholder="">
                    </el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <el-form-item label="Turno" size="mini">
                    <el-select v-model="form.turno" name="operação" placeholder="Escolher" size="mini">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :offset="2" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item size="mini">
                    <el-checkbox style="margin-top: 32px;" v-model="form.sicronizarGestao" name="sicronizarGestao">Sicronizar com Gestão</el-checkbox>
                </el-form-item>
            </el-col>

            <el-col>
                <fieldset style="font-weight: bold; text-align: center;">CAIXA FECHADO</fieldset>
<br>
            </el-col>

            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <fieldset style="font-weight: bold; text-align: center;">PAGAMENTO</fieldset>
            </el-col>

            <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <fieldset style="font-weight: bold; text-align: center;">ENTRADA</fieldset>
            </el-col>

            <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <fieldset style="font-weight: bold; text-align: center;">VALOR</fieldset>
            </el-col>

            <el-col  :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                <fieldset style="font-weight: bold; text-align: center;">GAVETA</fieldset>
            </el-col>

            <el-col  :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                <fieldset style="font-weight: bold; text-align: center;">FALTA/SOBRA</fieldset>
            </el-col>

            <el-col>

                <el-card style="height: 240px;" class="box-card" shadow="hover">

                    <el-row :gutter="2">

                        <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                            <fieldset style="font-weight: bold; text-align: center;">[['tipoTransacao']]</fieldset>
                        </el-col>
            
                        <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                            <fieldset style="font-weight: bold; text-align: center;">[['R$']]</fieldset>
                        </el-col>
            
                        <el-col  :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                            <fieldset style="font-weight: bold; text-align: center;">[['R$']]</fieldset>
                        </el-col>
            
                        <el-col  :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                           <el-input v-model="form.valorGaveta" name="valorGaveta" size="small"></el-input>
                        </el-col>
            
                        <el-col  :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                            <fieldset style="font-weight: bold; text-align: center;">[['R$']]</fieldset>
                        </el-col>

                    </el-row>
                
                </el-card>

           </el-col>

           <el-col>

                <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                    <legend>Entradas no sistema</legend>
                        <fieldset style="font-weight: bold; text-align: center;">[['R$']]</fieldset>
                </el-col>

                <el-col  :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                    <legend>Valores já Lançados</legend>
                        <fieldset style="font-weight: bold; text-align: center;">[['R$']]</fieldset>
                </el-col>

                <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                    <legend>Total Gaveta</legend>
                        <fieldset style="font-weight: bold; text-align: center;">[['R$']]</fieldset>
                </el-col>

                <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
                    <legend>Falta/Sobra</legend>
                        <fieldset style="font-weight: bold; text-align: center;">[['R$']]</fieldset>
                </el-col>

           </el-col>

            <el-col :offset="2">
                <el-button style="margin-top: 10ox;" type="primary" @click="exibirClientes = false;">Concluir</el-button>
                <el-button style="margin-top: 10px;" @click="exibirClientes = false">Cancelar</el-button>
            </el-col>
                
        
        </el-row>
        <!--Fechar-->
        </el-card>
    </fieldset>

<br>

</el-col>
<br>
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-row :gutter="2">   
            <el-card style="height: 500px;" class="box-card" shadow="hover">

            <el-row v-if="form.alter == ''">
                        <div style="width:25%" id="menuTop">
                            <h2 style="color: black;">Produto</h2>  
                        </div>
               
                        <div id="menuTop">
                            <h2 style="color: black">Quantidade</h2>  
                        </div>

                         <div id="menuTop">
                            <h2 style="color: black">Valor</h2>  
                        </div>
                         
                         <div id="menuTop">
                            <h2 style="color: black">Total</h2>  
                        </div>
                    <br>
            </el-row>

            <el-scrollbar wrap-style="max-height: 450px;"> 
                <el-row v-for="(item, k) in form.listaProdutos" :key="k" v-if="form.listaProdutos">
<br>
                        <div @click="abrirDescontoItemFunc(item)" style="width:25%" id="menuTop">
                            <h2 style="color: black;">{{ item.nomeProduto }}</h2>  
                        </div>
                   
                        <div id="menuTop">
                            <h2 style="color: black">{{ item.quantidade }}</h2>  
                        </div>

                        <div id="menuTop">
                            <h2 style="color: black">{{ item.valor }}</h2>  
                        </div>

                        <div id="menuTop">
                            <h2 style="color: black">{{ item.valor * item.quantidade  }}</h2>  
                        </div>

                        <el-button style="margin-top: 5px; margin-left: 5px" type="danger" size="mini"
                            icon="el-icon-delete" @click="removeProduto(k)"
                            v-show="k || (!k && form.listaProdutos.length > 0)">
                        </el-button>

                        <el-button style="margin-top: 5px" type="warning" size="mini"
                            icon="el-icon-edit" @click="editProduto(k);"
                            v-show="k || (!k && form.listaProdutos.length > 0)">
                        </el-button>

                </el-row>
            </el-scrollbar>
            
            </el-card>

           <!-- Desconto -->
            <el-dialog  style="font-weight: bold; " title="Desconto em item" :visible.sync="abrirDescontoItem">
                <el-row>   
                    <el-col>
                        <fieldset>
                            <el-card class="card-box" shadow="hover">
                                <el-col>
                                    <el-form-item label="Produto">
                                        <legend>{{form.produtoDesconto.nomeProduto}}</legend>
                                    </el-form-item>
                                </el-col>

                                <el-col>
                                    <el-form-item label="Valor bruto">
                                        <legend>{{form.produtoDesconto.valor}}</legend>
                                    </el-form-item>
                                </el-col>

                                <el-col>
                                    <el-form-item label="Desconto(R$)">
                                        <el-input v-model="form.descontoBruto"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col>
                                    <el-form-item label="Desconto(%)">
                                        <el-input v-model="form.descontoPercentual"></el-input>
                                    </el-form-item>
                                </el-col>

                            </el-card>
                        </fieldset>
                    </el-col>
                </el-row>

                <div slot="footer" class="dialog-footer"> 
                    <el-button style="margin-top: 10ox;" type="primary" @click="descontoItem()">Confirmar</el-button>
                    <el-button style="margin-top: 10px;" @click="abrirDescontoItem = false">Fechar</el-button>
                </div>
            
            </el-dialog>

        </el-row>
<br>    
        <el-row :gutter="2">
           
            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <fieldset style="margin-top: -9px;">
                    {{ 'Itens: ' + form.listaProdutos.length }}
                </fieldset>
            </el-col>


            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <el-input style="height: 28px; margin-top: -18px; border-style: groove;" @change="calcDescontoTotal()" v-model="form.descontoBruto" size="mini" placeholder="Desconto(R$)"></el-input>
            </el-col>

            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <el-input style="height: 28px; margin-top: -18px; border-style: groove;" @change="calcDescontoTotal()" v-model="form.descontoPercentual" size="mini" placeholder="Desconto(%)"></el-input>
            </el-col>
            
            <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                <fieldset style="margin-top: -9px; margin-left: 7px">
                    {{ 'Total: ' + 'R$'  + this.form.totalLista}}
                </fieldset>
            </el-col>

        </el-row>
<br>
        <el-row @click.native="finalizar"  style="cursor: pointer; margin-left: 3px; background-color: #50a5fb; border-radius: 20px 20px 20px 20px;"> 

            <el-col style="cursor: pointer; text-align: center; ;background-color: #50a5fb; padding: 5px; padding-bottom: 10px;" :offset="6" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <legend style="font-size: 150%; color: #ffffff; font-weight: 1000;">Finalizar(F3)</legend>
            </el-col>

        </el-row>
        <br>
</el-col>

</el-row>
    <el-row :gutter="4">

      <!--   <div @click="exibirHome" id="menubBaixo">
            <h2>Cancelar(ESC)</h2>
        </div>


          <div @click="exibirConsulta" id="menubBaixo">
            <h2>Preços(F4)</h2>
        </div>


        <div @click="exibirPedido" id="menubBaixo">
            <h2>Pedido(F5)</h2>
        </div> 


          <div @click="exibirDevolucao" id="menubBaixo">
            <h2>Devolução(F7)</h2>
        </div>


        <div @click="exibirSangria" id="menubBaixo">
            <h2>Sangria(F8)</h2>
        </div>


          <div @click="exibirMenuFiscal" id="menubBaixo">
            <h2>Menu Fiscal(F10)</h2>
        </div>

        <div @click="exibirFuncoes"  id="menubBaixo">
            <h2>Mais Funções(F9)</h2>
        </div>

        <div @click="configuracoes" id="menubBaixo">
            <h2>Configurações</h2>
        </div>
 -->
    </el-row>

</el-tabs>

</el-form>
</div> 
</template>

<script>
import pdv from '../../js/vendas/pdv'

export default {
    //name: 'Componente',
    mixins: [pdv],
    created(){
        console.log(this.$data)
    }
}
</script>

<style scoped>

#menubBaixo{
    color: #5e3c97;
    border:1px solid rgb(100, 100, 100);
    -moz-border-radius:3px;
    -webkit-border-radius:3px;	
    border-radius:3px;	
    font-size: xx-small;
    float: left;
    width: 10%;
    text-align: center;
    cursor: pointer;
    margin-left: 5px;
    word-wrap: break-word;
}

#menuTop{
    color: black !important;
    border:1px solid rgb(100, 100, 100);
    -moz-border-radius:3px;
    -webkit-border-radius:3px;	
    border-radius:3px;	
    font-size: xx-small;
    float: left;
    width: 17%;
    text-align: center;
    cursor: pointer;
    margin-left: 5px;
    word-wrap: break-word;
}


.el-table th, .el-table tr {
     background-color: #909399 !important
}
</style>

