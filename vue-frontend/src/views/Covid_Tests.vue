<template>
  <div class="container">
    <br />
    <br />
    <h1 class="text-center">TESTS</h1>
    <div v-if="this.datosGraficos">
      <LineChart :labels="this.labels" :data="this.data" />
    </div>

    <table class="table table-striped table-responsive">
      <thead>
        <th>ID</th>
        <th>NOMBRE</th>
      </thead>
      <tbody>
        <tr v-for="dia in tests" v-bind:key="dia.total">
          <td>{{ dia.fecha }}</td>
          <td>{{ dia.tests }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Covid_Service from "../services/Covid_Service";

import LineChart from "../components/LineChart.ts";

export default {
  name: "Covid_TestsScript",
  components: {
    LineChart,
  },
  data() {
    return {
      tests: [],
      datosGraficos: false,
      labels: [],
      data: [],
    };
  },
  methods: {
    getTests() {
      let estado = "ca";
      Covid_Service.getTests(estado).then((response) => {
        console.log(response.data);
        this.tests = response.data;

        this.tests.forEach((a) => {
          this.labels.push(a.fecha);
          this.data.push(a.tests);
        });

        this.datosGraficos = true;
      });
    },
  },
  created() {
    this.getTests();
  },
};
</script>
