<template>
  <div class="container">
    <br />
    <br />
    <h1 class="text-center">MUERTES</h1>
    <div v-if="this.datosGraficos">
      <LineChart
        :labels="this.labels"
        :data="this.data"
        :nombre_label="this.nombre_label"
        :color="this.color"
      />
    </div>

    <table class="table table-striped table-responsive">
      <thead>
        <th>ID</th>
        <th>NOMBRE</th>
      </thead>
      <tbody>
        <tr v-for="dia in muertes" v-bind:key="dia.total">
          <td>{{ dia.fecha }}</td>
          <td>{{ dia.muertes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Covid_Service from "../services/Covid_Service";

import LineChart from "../components/LineChart.ts";

export default {
  name: "Covid_MuertesScript",
  components: {
    LineChart,
  },
  data() {
    return {
      muertes: [],
      datosGraficos: false,
      labels: [],
      data: [],
      nombre_label: "",
      color: "",
    };
  },
  methods: {
    getMuertes() {
      let estado = "ca";
      Covid_Service.getMuertes(estado).then((response) => {
        console.log(response.data);
        this.muertes = response.data;

        this.muertes.forEach((a) => {
          this.labels.push(a.fecha);
          this.data.push(a.muertes);
        });

        this.nombre_label = "Muertes";
        this.color = "#000000";

        this.datosGraficos = true;
      });
    },
  },
  created() {
    this.getMuertes();
  },
};
</script>
