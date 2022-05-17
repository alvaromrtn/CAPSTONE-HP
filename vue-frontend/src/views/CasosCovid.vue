<template>
  <div class="container">
    <br />
    <br />
    <h1 class="text-center">CASOS</h1>

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

export default {
  name: "MuertesCovidScript",
  data() {
    return {
      casos: [],
    };
  },
  methods: {
    getCasos() {
      let estado = "ca";
      Covid_Service.getCasos(estado).then((response) => {
        console.log(response.data);
        this.casos = response.data;
      });
    },
  },
  created() {
    this.getCasos();
  },
};
</script>
