<template>
  <div class="container-xl px-4 mt-4">
    <hr class="mt-0 mb-4" />
    <div class="row">
      <div class="col-xl" style="align: middle">
        <!-- Account details card-->
        <div class="card mb-4">
          <div class="card-header">Datos personales</div>
          <div class="card-body">
            <form @submit.prevent="sendData">
              <!-- Form Group (username)-->
              <div class="mb-3">
                <label class="small mb-1" for="inputUsername">Email</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="user.email"
                  placeholder="Email"
                />
              </div>
              <!-- Form Row-->
              <div class="row gx-3 mb-3">
                <!-- Form Group (first name)-->
                <div class="col-md-6">
                  <label class="small mb-1" for="inputFirstName">Nombre</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="user.name"
                    placeholder="Nombre"
                  />
                </div>
                <div class="col-md-6">
                  <label class="small mb-1" for="inputLastName"
                    >Apellidos</label
                  >
                  <input
                    class="form-control"
                    type="text"
                    v-model="user.lastName"
                    placeholder="Apellidos"
                    autocomplete="apellidos"
                  />
                </div>
                <div class="col-md-6">
                  <label class="small mb-1">Nueva contraseña</label>
                  <input
                    class="form-control"
                    type="password"
                    v-model="user.newPassword"
                    placeholder="Nueva Contraseña"
                    autocomplete="current-password"
                  />
                </div>
                <div class="col-md-6">
                  <label class="small mb-1">Confirmar contraseña</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="user.confirmPassword"
                    placeholder="Confirmar contraseña"
                  />
                </div>
              </div>
              <button class="btn btn-primary" style="background-color: #333c87">
                Guardar cambios
              </button>
            </form>
            <button @click="showModal = true" class="btn btn-danger">
              Eliminar usuario
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modales -->
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Usuario eliminado</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" @click="showModal = false"
                      >&times;</span
                    >
                  </button>
                </div>
                <div class="modal-body">
                  <p>¿Estás seguro de querer eliminar el usuario?</p>
                </div>
                <div class="modal-footer">
                  <a href="/">
                    <button>Página de inicio</button>
                  </a>
                </div>
                <button @click="deleteUser(user._id)" class="btn btn-danger">
                  Eliminar
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="showModal = false"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Profile_Service from "../services/Profile_Service";

class User {
  constructor(email, lastName, newPassword, confirmPassword, name, profileUrl) {
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
    this.profileUrl = profileUrl;
  }
}

export default {
  name: "ProfileScript",
  data() {
    return {
      user: new User(),
      showModal: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      Profile_Service.getData().then((response) => {
        this.user = response.data;
      });
    },
    sendData() {
      if (this.user.newPassword != this.user.confirmPassword) {
        alert("Las contraseñas no coinciden");
        this.$router.push({
          name: "profile",
        });
      } else {
        Profile_Service.sendData(this.user).then(() => {
          this.$router.push({
            name: "esperanza_de_vida",
          });
        });
      }
    },
    deleteUser(id) {
      Profile_Service.deleteUser(id).then(() => {
        this.showModal = false;
        this.$router.push({
          name: "login",
        });
      });
    },
  },
};
</script>

<style lan="css">
body {
  background-color: #f2f6fc;
  color: #69707a;
}

.img-account-profile {
  height: 10rem;
}

.rounded-circle {
  border-radius: 50% !important;
}

.card {
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}

.card .card-header {
  font-weight: 500;
}

.card-header:first-child {
  border-radius: 0.35rem 0.35rem 0 0;
}

.card-header {
  padding: 1rem 1.35rem;
  margin-bottom: 0;
  background-color: rgba(33, 40, 50, 0.03);
  border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}

.form-control,
.dataTable-input {
  display: block;
  width: 100%;
  padding: 0.875rem 1.125rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  color: #69707a;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #c5ccd6;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.35rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.nav-borders .nav-link.active {
  color: #0061f2;
  border-bottom-color: #0061f2;
}

.nav-borders .nav-link {
  color: #69707a;
  border-bottom-width: 0.125rem;
  border-bottom-style: solid;
  border-bottom-color: transparent;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0;
  padding-right: 0;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
