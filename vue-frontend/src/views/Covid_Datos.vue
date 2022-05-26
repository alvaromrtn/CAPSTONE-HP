<template>
  <div class="container">
    <br />
    <br />
    <h1 class="text-center">DATOS COVID</h1>
    <div v-if="this.datosGraficos">
      <LineChart
        :labels="this.labels"
        :casos="this.data_casos"
        :muertes="this.data_muertes"
        :tests="this.data_tests"
      />
    </div>
  </div>
</template>

<script>
import Covid_Service from "../services/Covid_Service";

import LineChart from "../components/DatosLineChart.ts";

export default {
  name: "Covid_DatosScript",
  components: {
    LineChart,
  },
  data() {
    return {
      casos: [],
      muertes: [],
      test: [],
      datosGraficos: false,
      labels: [],
      data_casos: [],
      data_muertes: [],
      data_tests: [],
    };
  },
  methods: {
    getDatos() {
      let estado = "ca";
      Covid_Service.getCasos(estado).then((response) => {
        console.log(response.data);
        this.casos = response.data;

        this.casos.forEach((a) => {
          this.labels.push(a.fecha);
          this.data_casos.push(a.casos);
        });

        Covid_Service.getMuertes(estado).then((response) => {
          console.log(response.data);
          this.muertes = response.data;

          this.muertes.forEach((a) => {
            this.data_muertes.push(a.muertes);
          });

          Covid_Service.getTests(estado).then((response) => {
            console.log(response.data);
            this.tests = response.data;

            this.tests.forEach((a) => {
              this.data_tests.push(a.tests);
            });

            this.datosGraficos = true;
          });
        });
      });
    },
  },
  created() {
    this.getDatos();
  },
};
</script>
