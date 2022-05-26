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
    casos: {
      type: Array,
      default: [],
    },
    muertes: {
      type: Array,
      default: [],
    },
    tests: {
      type: Array,
      default: [],
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
          label: "Casos",
          backgroundColor: "#005DFF",
          data: props.casos,
        },
        {
          label: "Muertes",
          backgroundColor: "#000000",
          data: props.muertes,
        },
        {
          label: "Test",
          backgroundColor: "#6ACB23",
          data: props.tests,
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
