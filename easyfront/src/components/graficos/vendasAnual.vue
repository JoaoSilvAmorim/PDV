<script>
import { Bar } from "vue-chartjs";
import axios from 'axios';

export default {
  extends: Bar,
  result: '',
  async mounted() {
    let mes = []
    let data = []

    await axios.get('/api/v1/graficosVendaPeriodo/').then(response => {
        console.log(response.data)
        response.data.results.forEach(element => {
          mes.push(element.mes)
          data.push(element.contador)
        });
      }).catch(error => {
        console.log(error)
    })

    this.renderChart(
      
      {
        labels: mes,
        datasets: [
          {
            label: "Vendas",
            data: data,
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
          text: "Resumo dos últimos 12 meses"
        }
      }
    ); 
  }
};
</script>