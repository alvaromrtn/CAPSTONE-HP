<template>
  <div class="container">
    <br />
    <br />
    <h1 class="text-center">TESTS</h1>
    <div v-if="this.datosCargados">
      <LineChart
        :labels="this.labels"
        :data="this.data"
        :nombre_label="this.nombre_label"
        :color="this.color"
      />

      <table class="table table-striped table-responsive">
        <thead>
          <th style="width: 50%">Fecha</th>
          <th style="width: 50%">Número de tests</th>
        </thead>
        <tbody>
          <tr v-for="dia in tests" v-bind:key="dia.total">
            <td style="width: 50%">{{ dia.fecha }}</td>
            <td style="width: 50%">{{ dia.tests }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <ProcesoCarga />
    </div>
  </div>
</template>

<script>
import Covid_Service from "../services/Covid_Service";
import LineChart from "../components/LineChart.ts";
import ProcesoCarga from "./ProcesoCarga";

export default {
  name: "Covid_TestsScript",
  components: {
    LineChart,
    ProcesoCarga,
  },
  data() {
    return {
      tests: [],
      datosCargados: false,
      labels: [],
      data: [],
      nombre_label: "",
      color: "",
    };
  },
  methods: {
    getTests() {
      let estado = "ca";
      Covid_Service.getTests(estado).then((response) => {
        this.tests = response.data;

        this.tests.forEach((a) => {
          this.labels.push(a.fecha);
          this.data.push(a.tests);
        });

        this.nombre_label = "Tests";
        this.color = "#6ACB23";

        this.datosCargados = true;
      });
    },
  },
  created() {
    this.getTests();
  },
};
</script>
