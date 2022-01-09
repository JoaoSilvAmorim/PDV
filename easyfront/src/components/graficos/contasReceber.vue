<script>
import { Bar } from "vue-chartjs";
import axios from 'axios';

export default {
  extends: Bar,
  result: '',
  async mounted() {
    let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    let mes = []
    let data = []

    let mesData = []
    let dataMes = []

    await axios.get('/api/v1/graficosContasReceber/').then(response => {
        console.log(response.data)
        response.data.results.forEach(element => {
          mes.push(element.mes)
          data.push(element.valor)
        });

        meses.forEach(elementmeses => {
          let indexMes = mes.findIndex(i => i == elementmeses);
          console.log(indexMes)
          if(indexMes > -1){
            mesData.push(mes[indexMes])
            dataMes.push(data[indexMes])
          }else{
            mesData.push(elementmeses)
            dataMes.push(0)
          }
        });

      }).catch(error => {
        console.log(error)
    })

    this.renderChart(
      
      {
        labels: mesData,
        datasets: [
          {
            label: "Valor",
            data: dataMes,
            backgroundColor: "#50a5fb",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Contas a Receber"
        }
      }
    ); 
  }
};
</script>