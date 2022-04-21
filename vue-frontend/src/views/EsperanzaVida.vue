<template>
  <div class="container">
    <h1 class="text-center">Lista de paises</h1>
    <table class="table table-striped">
      <thead>
        <th>PAÍS</th>
        <th>ESPERANZA DE VIDA GENERAL</th>
        <th>ESPERANZA DE VIDA HOMBRE</th>
        <th>ESPERANZA DE VIDA MUJERES</th>
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
        console.log(response.data);
      });
    },
  },
  created() {
    this.getEsperanzaVida();
  },
};
</script>
