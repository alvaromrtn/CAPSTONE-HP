import { defineComponent, h } from "vue";

import { Line } from "vue-chartjs";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale
);

export default defineComponent({
  name: "LineChart",
  components: {
    Line,
  },
  props: {
    labels: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    nombre_label: {
      type: String,
      default: "Datos",
    },
    color: {
      type: String,
      default: "#005DFF",
    },
    chartId: {
      type: String,
      default: "line-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
  },
  setup(props) {
    const chartData = {
      labels: props.labels,
      datasets: [ 
        {
          label: props.nombre_label,
          backgroundColor: props.color,
          data: props.data,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      h(Line, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
      });
  },
});
