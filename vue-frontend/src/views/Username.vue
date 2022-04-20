<template>
  <div class="container">
    <h1 class="text-center">{{ this.data }}</h1>
  </div>
</template>

<script>
import Username_Service from "../services/Username_Service";

export default {
  name: "UsernameScript",
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getUsername() {
      Username_Service.getUsername().then((response) => {
        this.data = response.data;
      });
    },
  },
  created() {
    this.getUsername();
  },
};
</script>