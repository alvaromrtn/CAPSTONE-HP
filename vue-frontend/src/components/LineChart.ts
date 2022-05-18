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
      type: Object,
      default: [],
    },
    data: {
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
          label: "Data One",
          backgroundColor: "#f87979",
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
