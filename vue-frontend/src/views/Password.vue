<template>
  <div class="container">
    <h1 class="text-center">{{ this.data }}</h1>
  </div>
</template>

<script>
import Password_Service from "../services/Password_Service";

export default {
  name: "PasswordScript",
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getPassword() {
      Password_Service.getPassword().then((response) => {
        this.data = response.data;
      });
    },
  },
  created() {
    this.getPassword();
  },
};
</script>