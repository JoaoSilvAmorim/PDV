<script>
import { Pie } from "vue-chartjs";
import axios from 'axios';
export default {
  extends: Pie,
  async mounted() {
    let data = []
    let labels = []
    await axios.get('/api/v1/graficosProdutoVendidos/').then(response => {
       response.data.results.forEach(element => {
           data.push(element.quantidade)
           labels.push(element.produto)
       });
      }).catch(error => {
        console.log(error)
    });

    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(0, 231, 255, 0.9)"); 
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
    this.gradient2.addColorStop(0, "rgba(255, 0,0, 0.5)"); 
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    this.renderChart(
      {
        labels: labels,
        datasets: [
          {
            backgroundColor: [this.gradient, this.gradient2, "#00D8FF"],
            data: data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false,
        title: {
          display: true,
          text: "Produtos mais vendidos"
        }
    }
    );
  }
};
</script>