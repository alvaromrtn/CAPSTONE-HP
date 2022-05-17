<template>
  <div class="container">
    <br />
    <br />
    <h1 class="text-center">CASOS</h1>
    <div v-if="this.datosGraficos">
      <LineChart :labels="this.labels" :data="this.data" />
    </div>

    <table class="table table-striped table-responsive">
      <thead>
        <th>ID</th>
        <th>NOMBRE</th>
      </thead>
      <tbody>
        <tr v-for="caso in casos" v-bind:key="caso.total">
          <td>{{ caso.fecha }}</td>
          <td>{{ caso.casos }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Covid_Service from "../services/Covid_Service";

import LineChart from "../components/LineChart.ts";

export default {
  name: "MuertesCovidScript",
  components: {
    LineChart,
  },
  data() {
    return {
      casos: [],
      ///////
      labels: [],
      data: [],
      ///
      datosGraficos: false,
    };
  },
  methods: {
    getCasos() {
      let estado = "ca";
      Covid_Service.getCasos(estado).then((response) => {
        console.log(response.data);
        this.casos = response.data;

        this.casos.forEach((a) => {
          this.labels.push(a.fecha);
          this.data.push(a.casos);
        });

        this.datosGraficos = true;
      });
    },
  },
  created() {
    this.getCasos();
  },
};
</script>
