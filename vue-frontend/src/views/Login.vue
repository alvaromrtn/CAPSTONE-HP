<template>
  <main class="form-signin">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="login">
          <h2 class="h3 mb-3 fw-normal text-center">Iniciar sesión</h2>
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
              autocomplete="current-password"
            />
          </div>
          <br />
          <div class="checkbox mb-3">
            <label
              ><input type="checkbox" value="remember-me" /> Recordarme</label
            >
          </div>
          <button class="w-100 btn btn-success btn-block" style="background-color:#333c87;">
            Iniciar sesion
          </button>

          <br /><br />
          <div>
            ¿Aún no estás registrado?
            <a class="" href="/register">Registrate aqui</a>
          </div>
        </form>
      </div>
    </div>
    <p class="mt-3 mb-3 text-muted text-center">© 2020–2025</p>
  </main>
</template>

<script>
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

import Login_Service from "../services/Login_Service";
export default {
  name: "LoginScript",
  data() {
    return {
      user: new User(),
    };
  },
  methods: {
    login() {
      Login_Service.getLogin(this.user).then(() => {
        this.$router.push({
          name: "esperanza_de_vida",
        });
      });
    },
  },
};
</script>

<style>
body {
  align-items: center;
  background-color: #fcfcfc;
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
