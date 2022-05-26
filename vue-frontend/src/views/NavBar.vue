<template>
  <!-- navbar -->
  <div id="nav">
    <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light">
      <a title="Universidad de Salamanca" href="http://localhost:8081/">
        <img
          src="../../static/images/logo_capstone.png"
          alt="Universidad de Salamanca"
          height="100"
        />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav mr-auto">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="nav-link">Register</router-link>
          <router-link to="/esperanza_de_vida" class="nav-link"
            >Esperanza de vida</router-link
          >
          <router-link to="/profile" class="nav-link">Profile</router-link>
          <router-link to="/covid_casos" class="nav-link"
            >CASOS COVID</router-link
          >
          <router-link to="/covid_muertes" class="nav-link"
            >MUERTES COVID</router-link
          >
          <router-link to="/covid_tests" class="nav-link"
            >TESTS COVID</router-link
          >
          <router-link to="/covid_datos" class="nav-link"
            >DATOS COVID</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<style>
#nav {
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: #333c87;
  border-radius: 0.5rem;
}
</style>
