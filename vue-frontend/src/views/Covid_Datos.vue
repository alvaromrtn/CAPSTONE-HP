<template>
  <div class="container">
    <br />
    <br />
    <h1 class="text-center">DATOS COVID</h1>
    <div v-if="this.datosCargados">
      <LineChart
        :labels="this.labels"
        :casos="this.data_casos"
        :muertes="this.data_muertes"
        :tests="this.data_tests"
      />
    </div>
    <div v-else>
      <ProcesoCarga />
    </div>
  </div>
</template>

<script>
import Covid_Service from "../services/Covid_Service";
import LineChart from "../components/DatosLineChart.ts";
import ProcesoCarga from "./ProcesoCarga";

export default {
  name: "Covid_DatosScript",
  components: {
    LineChart,
    ProcesoCarga,
  },
  data() {
    return {
      casos: [],
      muertes: [],
      test: [],
      datosCargados: false,
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
        this.casos = response.data;

        this.casos.forEach((a) => {
          this.labels.push(a.fecha);
          this.data_casos.push(a.casos);
        });

        Covid_Service.getMuertes(estado).then((response) => {
          this.muertes = response.data;

          this.muertes.forEach((a) => {
            this.data_muertes.push(a.muertes);
          });

          Covid_Service.getTests(estado).then((response) => {
            this.tests = response.data;

            this.tests.forEach((a) => {
              this.data_tests.push(a.tests);
            });

            this.datosCargados = true;
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
