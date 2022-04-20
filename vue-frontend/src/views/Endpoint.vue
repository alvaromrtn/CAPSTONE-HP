<template>
  <div class="container">
    <h1 class="text-center">{{ this.data }}</h1>
  </div>
</template>

<script>
import Endpoint_Service from "../services/Endpoint_Service";

export default {
  name: "EndpointScript",
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getEndpoint() {
      Endpoint_Service.getEndpoint().then((response) => {
        this.data = response.data;
      });
    },
  },
  created() {
    this.getEndpoint();
  },
};
</script>