<template>
<div >

  <el-header style="background: radial-gradient(ellipse at left top,transparent, #50a5fb); line-height:12px; height: 75px;">
    <el-row style="display: contents;"> 
        <el-col :span="1" style="text-align: left; margin-top: 30px; font-weight: 900; font-size: x-large">
            <span>EasyClient</span>
        </el-col>

        <el-col :offset="21" :span="1">
          <router-link to="/logout">
              <font-awesome-icon style="margin-left: 90px; margin-top: 20px; color: rgb(90 84 101);" icon="sign-out-alt" size="2x"/>
              <legend style="margin-left: 85px; margin-top: 5px; color: rgb(90 84 101); font-weight: 900;">Sair</legend>
          </router-link>
        </el-col>
    </el-row>
  </el-header>

<el-row class="tac">
<el-col :span="24" style="border-style: groove;  border-width: 6px;">
  <!-- <el-col :span="3" v-for="(item, k) in icons" :key="k" style="border-right: groove; text-align: center; color: rgb(228, 231, 237) !important">
      <legend style="font-size: large; color: #5e3c97;  text-align: center; text-transform: uppercase;">{{ item.label }}</legend>
      <router-link :to="{name: item.label}">
        <i style="font-size: 50px; color: rgb(90 84 101); cursor: pointer" :class="item.value"></i>
      </router-link>
  </el-col> -->
    
  <el-col :offset="4" :span="5">
<br>
        <el-select v-model="graf" placeholder="Select" size="mini">
          <el-option-group
            v-for="group in tipoGraf"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.tipoGraf"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
  </el-col>
</el-col>

  <el-col :span="4">
    <el-menu
      style="border-style: groove;"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="white"
      text-color="black"
      active-text-color="blue">

      <el-submenu index="0">
         <template slot="title">
          <i class="el-icon-menu"></i>
          CADASTROS
        </template>
     <!--  <el-submenu index="1">
        <template slot="title">
          <i class="fi-rr-edit"></i>
          CLIENTES
        </template>
        <router-link to="/cadastros/cadastroCliente/cliente"><el-menu-item index="0.1-1" :route="{name: 'CadastroCliente'}">Clientes</el-menu-item></router-link>
        <el-menu-item index="1-2">Classificação de clientes</el-menu-item>
        <el-menu-item index="1-3">Fornecedores</el-menu-item>
        <el-menu-item index="1-4">Transportadoras</el-menu-item>
        <el-menu-item index="1-5">Representantes</el-menu-item>
        <el-menu-item index="1-6">Funcionários</el-menu-item>
        <el-menu-item index="1-7">Parceiros comerciais</el-menu-item>
      </el-submenu> -->

       <el-submenu index="2">
          <template slot="title">
          <i class="fi-rr-shopping-bag"></i>
            PRODUTOS
          </template>
          
          <router-link to="/cadastros/cadastroProduto/produtoCadastro">
            <el-menu-item index="0.2-1" :route="{name: 'ProdutoCadastro'}">Cadastrar Produto</el-menu-item>
          </router-link>

          <router-link to="/cadastros/produtosLista">
            <el-menu-item index="2-2" :route="{name: 'listaProdutos'}">Produtos</el-menu-item> 
          </router-link>

      </el-submenu>

    <!--   <el-submenu index="3">
        <template slot="title">
        <i class="fi-rr-mode-portrait"></i>
          SERVIÇOS
        </template>
        <el-menu-item index="5-1">item one</el-menu-item>
        <el-menu-item index="5-2">item two</el-menu-item>
        <el-menu-item index="5-3">item three</el-menu-item>
        <el-submenu index="5-4">
          <template slot="title">item four</template>
          <el-menu-item index="5-4-1">item one</el-menu-item>
          <el-menu-item index="5-4-2">item two</el-menu-item>
          <el-menu-item index="5-4-3">item three</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
        <i class="fi-rr-mode-portrait"></i>
          FUNCIONÁRIOS
        </template>
        <el-menu-item index="5-1">item one</el-menu-item>
        <el-menu-item index="5-2">item two</el-menu-item>
        <el-menu-item index="5-3">item three</el-menu-item>
        <el-submenu index="5-4">
          <template slot="title">item four</template>
          <el-menu-item index="5-4-1">item one</el-menu-item>
          <el-menu-item index="5-4-2">item two</el-menu-item>
          <el-menu-item index="5-4-3">item three</el-menu-item>
        </el-submenu>
    </el-submenu>

    <el-submenu index="5">
        <template slot="title">
        <i class="fi-rr-cloud-download"></i>
          IMPORTAÇÃO
        </template>
        <el-menu-item index="6-1">item one</el-menu-item>
        <el-menu-item index="6-2">item two</el-menu-item>
        <el-menu-item index="6-3">item three</el-menu-item>
        <el-submenu index="6-4">
          <template slot="title">item four</template>
          <el-menu-item index="6-4-1">item one</el-menu-item>
          <el-menu-item index="6-4-2">item two</el-menu-item>
          <el-menu-item index="6-4-3">item three</el-menu-item>
        </el-submenu>
    </el-submenu>

    <el-submenu index="6">
        <template slot="title">
        <i class="fi-rr-mode-portrait"></i>
          FUNCIONÁRIOS
        </template>
        <el-menu-item index="5-1">item one</el-menu-item>
        <el-menu-item index="5-2">item two</el-menu-item>
        <el-menu-item index="5-3">item three</el-menu-item>
        <el-submenu index="5-4">
          <template slot="title">item four</template>
          <el-menu-item index="5-4-1">item one</el-menu-item>
          <el-menu-item index="5-4-2">item two</el-menu-item>
          <el-menu-item index="5-4-3">item three</el-menu-item>
        </el-submenu>
    </el-submenu>

    <el-submenu index="7">
        <template slot="title">
        <i class="fi-rr-settings"></i>
          Geral
        </template>
        <el-menu-item index="7-1">item one</el-menu-item>
        <el-menu-item index="7-2">item two</el-menu-item>
        <el-menu-item index="7-3">item three</el-menu-item>
        <el-submenu index="7-4">
          <template slot="title">item four</template>
          <el-menu-item index="7-4-1">item one</el-menu-item>
          <el-menu-item index="7-4-2">item two</el-menu-item>
          <el-menu-item index="7-4-3">item three</el-menu-item>
        </el-submenu>
    </el-submenu> -->
  </el-submenu>

  <el-submenu index="2-1">
         <template slot="title">
          <i class="el-icon-shopping-cart-2"></i>
          VENDAS
        </template>
      
       <router-link to="/vendas/pdv">
        <el-menu-item index="2-5">
        PDV</el-menu-item>
       </router-link>

   <!--    <el-submenu index="2-2">
          <template slot="title">
          <i class="fi-rr-dollar"></i>  
            Orçamentos/Pedidos
          </template>

          <router-link to="/cadastros/orcamentos/orcamentosCad">
                  <el-menu-item index="2-3" :route="{name: 'OrcamentoCad'}">Lançar orçamento/pedido</el-menu-item>
          </router-link>

          <router-link to="/cadastros/orcamentos/listaOrcamentos">
                  <el-menu-item index="2-4" :route="{name: 'listaOrcamentos'}">Listar orçamentos/pedido</el-menu-item>
          </router-link>

      </el-submenu> -->
  </el-submenu>

  <el-submenu index="3-1">
         <template slot="title">
          <i class="el-icon-shopping-cart-full"></i>
          PAGAMENTOS
        </template>

        <router-link to="/pagamentos/gerenciaNet">
            <el-menu-item index="3-2" :route="{name: 'listaOrcamentos'}">GERENCIA NET</el-menu-item>
        </router-link>
<!-- 
        <router-link to="">
            <el-menu-item index="3-3" :route="{name: 'listaOrcamentos'}">LIBERTY</el-menu-item>
        </router-link> -->
  </el-submenu>
  <!-- 
  <el-submenu index="4-1">
         <template slot="title">
            <i class="el-icon-sort"></i>
          ESTOQUE
        </template>

        <router-link to="/cadastros/estoque">
          <el-menu-item index="4-2" :route="{name :'Estoque'}">ATUALIZAÇÃO DE ESTOQUE</el-menu-item>
        </router-link>

        <router-link to="/cadastros/estoque/listaEstoque">
          <el-menu-item index="4-3" :route="{name :'listaEstoque'}">MOVIMENTAÇÕES</el-menu-item>
        </router-link>

  </el-submenu> -->
 <!--  
  <el-submenu index="5-1">
        <template slot="title">
            <i class="el-icon-files"></i>
          RELATÓRIOS
        </template>

        <router-link to="/relatorio/vendas/relatorioVendas">
            <el-menu-item index="5-2" :route="{name: 'RelatorioVendas'}">Vendas</el-menu-item>
        </router-link>

        <router-link to="/relatorio/financeiro/relatoriFinanceiro">
            <el-menu-item index="5-3" :route="{name: 'RelatorioFinanceiro'}">Financeiro</el-menu-item> 
        </router-link>

        <router-link to="/relatorio/estoque/relatorioEstoque">
            <el-menu-item index="5-4" :route="{name: 'RelatorioEstoque'}">Estoques</el-menu-item> 
        </router-link>

        <router-link to="/relatorio/fiscal/relatorioFiscal">
          <el-menu-item index="5-5" :route="{name: 'RelatorioFiscal'}">Fiscal</el-menu-item>
        </router-link>
  </el-submenu> -->
  <!-- 
  <el-submenu index="6-1">
        <template slot="title">
          <i class="el-icon-money"></i>
          FINANCEIRO
        </template>

        <router-link to="/financeiro/contasPagarReceber">
          <el-menu-item index="7-2" :route="{name: 'ContasPagarReceber'}">Contas a Pagar/Receber</el-menu-item> 
        </router-link>

  </el-submenu> -->
  <!-- 
  <el-submenu index="7-1">
        <template slot="title">
          <i class="el-icon-document"></i>
          FISCAL
        </template>
  </el-submenu>
  
  <el-submenu index="8-1">
        <template slot="title">
          <i class="el-icon-bank-card"></i>
          CONTABILIDADE
        </template>
  </el-submenu> -->

  <el-submenu index="9-1">
        <template slot="title">
            <i class="el-icon-setting"></i>
          DADOS
        </template>
 <!-- 
      <el-submenu index="9-2">
        <template slot="title">
          EMPRESAS
        </template>
          <router-link to="/configuracoes/usuarios"> 
                <el-menu-item index="9-3" :route="{name: 'Usuarios'}">USUÁRIOS</el-menu-item>
          </router-link>
      </el-submenu> -->

        <router-link to="/configuracoes/sistema">
            <el-menu-item index="9-6" :route="{name: 'Sistema'}">EMPRESAS</el-menu-item>
        </router-link>

    </el-submenu>
    </el-menu>
  </el-col>

<el-col :span="20" style="border-style: groove; text-align: center; color: #fef0f0 !important; border-color: #fef0f0">
  <component :is="graf" :styles="myStyles"></component>
</el-col>

<el-col><br><br></el-col>
<el-footer style="font-size: 12px; text-align: center;">mwti.com.br / royalsistema.com.br</el-footer>

</el-row>

</div>
</template>



<script>
import base from '../js/cadastros/base' 
import VendasAnual from "../components/graficos/vendasAnual.vue"
import ProdutosVendidos from "../components/graficos/produtosVendidos.vue"
import HistoricoFaturamento from "../components/graficos/historicoFaturamento.vue"
import EvolucaoFaturamento from "../components/graficos/evolucaoFaturamento.vue"
import ContasPagar from "../components/graficos/contasPagar.vue"
import ContasReceber from "../components/graficos/contasReceber.vue"



export default {
    //name: 'Componente',
    name: "App",
    components: {
      VendasAnual,
      ProdutosVendidos,
      HistoricoFaturamento,
      EvolucaoFaturamento,
      ContasPagar,
      ContasReceber
    },
    mixins: [base],
    created(){
    },
   
}
</script>



<style>
#Base{
    text-align: center;
}

a {
  text-decoration: none;
}

LineChart {
  height: 50px !important;
  background: black !important;
}
.el-input__inner{
  color: black !important;
  font-size: medium !important
}

  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

.el-tooltip__popper {
  font-size: 16px !important;
}
body{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f2f4f8;
    user-select: text !important; /* supported by Chrome and Opera */
}
.el-tabs__nav-scroll{
  background: #E4E7ED;
}


.el-tabs__item{
  color: red;
  
}

/* New Items */
.errorlist{
  background-color: #fef0f0;
  color: #f56c6c;
  padding: 20px 60px;
  border-radius: 10px;
}
.errorlist li .errorlist{
  padding:5px;
}
.cliente-info span{
  padding: 4px 0;
  display: inline-block;
}
.licencas td {
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  padding: 10px 0;
}

.licencas td:nth-child(2){
  border-right:none;
  color: rgb(11, 202, 11);
}
.home-icon{
  text-align: center;
  cursor: pointer;
  color: #5e3c97;
}
.home-icon i {
  font-size: 35px;
}
.home-icon span {
  font-weight: 600;
}

.home-icon:hover{
  transform: scale(1.1);
  color: #ccc;
}
.menu-button-home {
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}
.el-input__inner-mini{
  height: 28px;
  line-height: 28px;
  font-size: 12px
}
fieldset
{
    border:1px solid #e9dff8;
    -moz-border-radius:3px;
    -webkit-border-radius:3px;	
    border-radius:3px;	
}
.el-menu-principal .el-submenu,
.el-menu-principal .el-menu-item {
  border-right: 1px solid #cccccc2e;
}
.el-menu-principal .el-submenu:last-child,
.el-menu-principal .el-menu-item:last-child {
  border-right: none;
}
.el-menu-principal .el-tabs__content{
  padding: 0;
  text-align: center;
  color: #5e3c97;
}
.el-menu-window-form fieldset {
  background: #f2f4f8;
}


/* Modify css  */
.el-step__title{
  font-size: 13px;
  color: #4a4a4a;
}
.el-header, .el-footer {
    color: #333;
    font-size: 11px;
    background-color: #fff;
}
.el-footer{
  height: 30px!important;
  line-height: 32px;
  bottom: 0;
  position: fixed;
  width: 100%;
}
.el-header {
  background-color: #5e3c97;
}
.el-form-item__label{
  font-size: 13px;
  margin-bottom: 5px;
  color: #4a4a4a;
  font-weight: 600;
}
.el-menu-vertical-demo{
  border-right: none;
  background-color: transparent;
}
.el-menu-vertical-demo .el-submenu__title i, 
.el-menu-vertical-demo .el-menu-item i{
  color: #5e3c97;
}
.el-menu-vertical-demo .el-menu-item, 
.el-menu-vertical-demo .el-submenu__title{
  color: #5e3c97;
  height: 45px;
  line-height: 45px;
  font-size: 12px;
  text-transform: uppercase;
}
.el-menu-vertical-demo .el-menu-item a{
  color: #5e3c97 !important;
  text-decoration: none;
}
.el-form-item__label{
  font-weight: 100;
}
.el-select {
  width: 100%;
}
h1,h2,h3,h4,h5,h6 {
  color: #5e3c97
}
.el-button a {
  color: #fff !important;
  text-decoration: none;
}
.el-table thead {
  color: #fff;
  background: #a0a0a0!important;
}
.el-table th, .el-table tr {
  background-color: transparent;
}
.el-table_1_column_1 .cell {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.el-loading-mask{
  background-color: rgb(255, 255, 255);
}


</style>
