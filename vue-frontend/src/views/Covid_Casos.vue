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
        <tr v-for="dia in casos" v-bind:key="dia.total">
          <td>{{ dia.fecha }}</td>
          <td>{{ dia.casos }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Covid_Service from "../services/Covid_Service";

import LineChart from "../components/LineChart.ts";

export default {
  name: "Covid_CasosScript",
  components: {
    LineChart,
  },
  data() {
    return {
      casos: [],
      datosGraficos: false,
      labels: [],
      data: [],
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
