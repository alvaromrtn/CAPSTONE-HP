<template>
  <div class="container">
    <br />
    <br />
    <h1 class="text-center">CASOS</h1>
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
        <th style="width: 50%">Fecha</th>
        <th style="width: 50%">Número de casos</th>
      </thead>
      <tbody>
        <tr v-for="dia in casos" v-bind:key="dia.total">
          <td style="width: 50%">{{ dia.fecha }}</td>
          <td style="width: 50%">{{ dia.casos }}</td>
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
      nombre_label: "",
      color: "",
    };
  },
  methods: {
    getCasos() {
      let estado = "ca";
      Covid_Service.getCasos(estado).then((response) => {
        this.casos = response.data;

        this.casos.forEach((a) => {
          this.labels.push(a.fecha);
          this.data.push(a.casos);
        });

        this.nombre_label = "Casos";
        this.color = "#005DFF";

        this.datosGraficos = true;
      });
    },
  },
  created() {
    this.getCasos();
  },
};
</script>
