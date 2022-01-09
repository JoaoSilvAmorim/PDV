<template>
    <div>
   
    
  <MyComponent/>
  <my-component />

        <el-table
        :data="tabelaProdutos"
        show-summary
        border
        lazy
        style="width: 100%; text-align: center; font-size: medium; color: ##2b2438">
        <el-table-column
            prop="descricao"
            label="Nome"
            width="300">
        </el-table-column>

        <el-table-column
            prop="categoria"
            label="Categoria">
        </el-table-column>

        <el-table-column
            prop="valor"
            label="Valor Venda">
        </el-table-column>

       <!--  <el-table-column
            prop=""
            label="Valor compra">
        </el-table-column> -->

        <el-table-column
            prop="saida"
            label="UN. Saída">
        
        </el-table-column>

        <el-table-column
            prop="ativo"
            label="Gerenciar estoque">
        </el-table-column>

        <el-table-column
            prop=""
            label="Grade">
        </el-table-column>

        <el-table-column
            prop="revenda"
            label="Estoque">
        </el-table-column>

        <el-table-column
            prop=""
            label="Ações"
            width="300">
        <template slot-scope="scope">
            <el-button type="warning" @click="abrirEdicao(scope.row.id)" size="mini">Editar</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deletarProduto(scope.row.id)" size="mini"></el-button>
        </template>

        
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
import listaProdutos from '../../../js/cadastros/cadastroProdutos/listaProdutos'

export default {
    //name: 'Componente',
    mixins: [listaProdutos],
    created(){
        console.log(this.$data)
    }
}
</script>

<style scoped>

#topoTxt{
    font-size: xx-large;
    margin-left: 10px;
    margin-top: 10px;
    font-family: Lucida Console, Courier New, monospace;
}

#barraTopo{
    background:#644697;
    color: white;
    height: 50px;
}

</style>