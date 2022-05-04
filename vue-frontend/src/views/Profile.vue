<template>
  <div class="container-xl px-4 mt-4">
    <hr class="mt-0 mb-4" />
    <div class="row">
      <!--<div class="col-xl-4">
                 Profile picture card
                    <div class="card mb-4 mb-xl-0">
                    <div class="card-header">Foto de perfil</div>
                    <div class="card-body text-center">
                        <form @submit.prevent= "changePhoto">
                            Profile picture image
                            <img class="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="">
                            Profile picture help block
                            <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            Profile picture upload button
                            <input class="form-group" type="file" accept="image/*" @change="uploadImage">
                            <button class="btn btn-primary">Cambiar imagen</button>
                        </form>
                    </div>
                </div>
            </div>-->
      <div class="col-xl-8">
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
                  />
                </div>
                <div class="col-md-6">
                  <label class="small mb-1">Nueva contraseña</label>
                  <input
                    class="form-control"
                    type="password"
                    v-model="user.newPassword"
                    placeholder="Nueva Contraseña"
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
              <button class="btn btn-primary">Guardar cambios</button>
            </form>
          </div>
        </div>
      </div>
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
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      Profile_Service.getData().then((response) => {
        this.user = response.data;
        console.log(response.data);
      });
    },
    sendData() {
      if (this.user.newPassword != this.user.confirmPassword) {
        alert("Las contraseñas no coinciden");
        this.$router.push({
          name: "profile",
        });
      } else {
        Profile_Service.sendData(this.user).then((response) => {
          this.data = response.data;

          console.log("DATA: " + this.data.user);
          console.log("DATA: " + this.data.status);

          // MOSTRAR POPUP
        });
      }
    },
  },
};
</script>

<style lan="css">
body {
  margin-top: 20px;
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
