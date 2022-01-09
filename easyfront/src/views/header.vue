<template>
    <div>
        <el-row style="background-color: #50a5fb !important">
        <el-col id="topoTxt" style="background-color: #50a5fb !important; line-height:12px; height: 70px; ">
            <el-col  :span="1" style="text-align: left;">
                <legend style="margin-top: 25px">EasyCli</legend>
            </el-col>
     
            <el-col style="margin-top: 25px; margin-left: 30px" :span="21">
                <legend id="teste"></legend>
            </el-col>

            <el-col :span="1">
                <router-link to="/home">
                    <font-awesome-icon style="margin-left: 55px; margin-top: 10px; color: white" icon="arrow-alt-circle-left" size="1x"/>
                    <legend style="margin-left: 50px; margin-top: 5px; color: white; font-size: 10px;">Voltar</legend>
                </router-link>
            </el-col>
        </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        teste(){
            alert("DEBUG")
        }
    }
}
</script>

<style scoped>

#topoTxt{
    font-size: xx-large;
    font-family: Lucida Console, Courier New, monospace;
    /* background-color:#644697 !important; */
    background-color: #644697 !important;
    color: white;
    height: 50px;
}

#barraTopo{
    background:#644697;
    color: white;
    height: 50px;
}

#iconTopo{
    background-color: white; color: #644697; 
    border-radius: 20px 20px 20px 20px; 
    cursor: pointer;
}

</style>