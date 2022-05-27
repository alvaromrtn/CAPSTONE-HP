<template>
  <div class="container">
    <h1 class="text-center">LISTA DE PAÍSES</h1>
    <table class="table table-striped">
      <thead>
        <th>País</th>
        <th>Esperanza de vida general</th>
        <th>Esperanza de vida en hombre</th>
        <th>Esperanza de vida en mujeres</th>
      </thead>
      <tbody>
        <tr v-for="pais in data" v-bind:key="pais.nombre">
          <td>{{ pais.nombre }}</td>
          <td>{{ pais.general }}</td>
          <td>{{ pais.hombres }}</td>
          <td>{{ pais.mujeres }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import EsperanzaVida_Service from "../services/EsperanzaVida_Service";

export default {
  name: "EsperanzaVidaScript",
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getEsperanzaVida() {
      EsperanzaVida_Service.getEsperanzaVida().then((response) => {
        this.data = response.data;
      });
    },
  },
  created() {
    this.getEsperanzaVida();
  },
};
</script>
