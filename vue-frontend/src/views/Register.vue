<template>
  <main class="form-signin">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="sendUser">
          <h2 class="h3 mb-3 fw-normal text-center">Registro</h2>
          <div class="form-group">
            <label>Nombre</label>
            <input
              type="text"
              class="form-control form-control-lg"
              v-model="user.name"
              placeholder="Nombre"
            />
          </div>
          <br />
          <div class="form-group">
            <label>Apellidos</label>
            <input
              type="text"
              class="form-control form-control-lg"
              v-model="user.lastName"
              placeholder="Apellidos"
            />
          </div>
          <br />
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-control form-control-lg"
              v-model="user.email"
              placeholder="Email"
              autocomplete="username"
            />
          </div>
          <br />
          <div class="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              class="form-control form-control-lg"
              v-model="user.password"
              placeholder="Contraseña"
              autocomplete="new-password"
            />
          </div>
          <br />
          <div class="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              class="form-control form-control-lg"
              v-model="user.confirm_password"
              placeholder="Confirmar contraseña"
              autocomplete="new-password"
            />
          </div>
          <br />
          <button
            class="w-100 btn btn-success btn-block"
            style="background-color: #333c87"
          >
            Enviar
          </button>
          <!--<router-link class="w-100 btn btn-lg btn-primary" type="submit" to="/signup">Iniciar sesion</router-link>-->
          <br /><br />
          <div>
            ¿Ya estás registrado?
            <a class="" href="/login">Inicia sesión aqui</a>
          </div>
          <!-- <router-link class="w-100 btn btn-lg btn-primary" type="submit" to="/signin">Sign up</router-link>-->
        </form>
      </div>
    </div>
    <p class="mt-3 mb-3 text-muted text-center">© 2022</p>
  </main>
</template>

<script>
class User {
  constructor(name, lastName, email, password, confirm_password) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirm_password = confirm_password;
  }
}

import Register_Service from "../services/Register_Service";

export default {
  name: "RegisterScript",
  data() {
    return {
      user: new User(),
    };
  },
  methods: {
    sendUser() {
      if (this.user.password == this.user.confirm_password) {
        Register_Service.getRegister(this.user).then((response) => {
          this.data = response;

          this.$router.push({
            name: "login",
          });
        });
      } else {
        console.log("Las contraseñas no son iguales");
      }
    },
  },
};
</script>

<style lang="css">
body {
  align-items: center;
  background-color: #f6f6f6;
}
.form-signin {
  width: 100%;
  max-width: 450px;
  margin: auto;
}
label {
  font-weight: 600;
}
</style>
