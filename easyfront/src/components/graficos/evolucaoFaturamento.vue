<script>
import { Line } from "vue-chartjs";
import axios from 'axios';
export default {
  extends: Line,
  async mounted() {
    let mes = []
    let data = []

    await axios.get('/api/v1/graficosVendaPeriodo/').then(response => {
        console.log(response.data)
        response.data.results.forEach(element => {
          mes.push(element.mes)
          data.push(element.valor)
        });
      }).catch(error => {
        console.log(error)
    })

    this.renderChart(
      {
        labels: mes,
        datasets: [
          {
            label: "R$",
            data: data,
            backgroundColor: "transparent",
            borderColor: "#50a5fb",
            pointBackgroundColor: "blue"
          }
        ]
      },
      
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Evolução do faturamento"
        }
      }
    );
  }
};
</script>