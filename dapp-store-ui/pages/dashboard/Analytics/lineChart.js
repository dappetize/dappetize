// CommitChart.js
import { Line } from 'vue-chartjs'

export default {
    props: ['data'],
    extends: Line,
    methods: {

        plot: function (data) {
        
            this.renderChart({
                labels: data.labels,
                datasets: data.datasets,
            }, {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: data.datasets[0].title,
                }
            })
        }
    },
    mounted() {
        // Overwriting base render method with actual data.
      
        this.renderChart({
            labels: this.data.labels,
            datasets: this.data.datasets,



        }, {
            responsive: true, maintainAspectRatio: false, title: {
                display: true,
                text: "Chart Title",
            }
        })
    }
}