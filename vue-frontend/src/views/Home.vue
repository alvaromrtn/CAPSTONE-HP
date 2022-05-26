<template>
  <!-- Feature Start -->
  <div class="home">
    <!--CARROUSEL HOME-->
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src="http://localhost:8080/static/images/carousel1.jpg"
            alt="First slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h3>Descubre todos los datos de la pandemia en EEUU</h3>
            <p>Registrate y descubre toda la información acerca del COVID 19</p>
            <div>
              <a
                href="/login"
                class="btn btn-primary btn-lg active mx-3"
                role="button"
                aria-pressed="true"
                style="background-color:#333c87;"
                >Inicia sesion</a
              >
              <a
                href="/register"
                class="btn btn-primary btn-lg active mx-3"
                role="button"
                style="background-color:#333c87;"
                aria-pressed="true"
                >Registrate</a
              >
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="http://localhost:8080/static/images/carousel2.jpg"
            alt="Second slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Descubre todos los datos de la pandemia en EEUU</h5>
            <p>Registrate y descubre toda la información acerca del COVID 19</p>
            <div>
              <a
                href="/login"
                class="btn btn-primary btn-lg active mx-3"
                role="button"
                style="background-color:#333c87;"
                aria-pressed="true"
                >Inicia sesion</a
              >
              <a
                href="/register"
                class="btn btn-primary btn-lg active mx-3"
                role="button"
                style="background-color:#333c87;"
                aria-pressed="true"
                >Registrate</a
              >
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100 "
            src="http://localhost:8080/static/images/carousel3.png"
            alt="Third slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Descubre todos los datos de la pandemia en EEUU</h5>
            <p>Registrate y descubre toda la información acerca del COVID 19</p>
            <div>
              <a
                href="/login"
                class="btn btn-primary btn-lg active mx-3"
                type="button"
                aria-pressed="true"
                style="background-color:#333c87;"
                >Inicia sesion</a
              >
              <a
                href="/register"
                class="btn btn-primary btn-lg active mx-3"
                type="button"
                aria-pressed="true"
                style="background-color:#333c87;"
                >Registrate</a
              >
            </div>
          </div>
        </div>
      </div>

      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <!-- -->
    <div class="container-fluid bg-light overflow-hidden my-5 px-lg-0">
      <div class="container feature px-lg-0">
        <div class="row g-0 mx-lg-0">
          <div
            class="col-lg-6 feature-text py-5 wow fadeIn"
            data-wow-delay="0.1s"
            style="text-align: left"
          >
            <div class="p-lg-5 ps-lg-0">
              <h6 class="text-primary">¿ Por qué nosotros?</h6>
              <h1 class="mb-4">Datos de covid actualizados</h1>
              <p class="mb-4 pb-2">
                ¿Quieres saber los nuevos positivos, fallecidos o los test realizados en tu estado?
              </p>
            </div>
          </div>
          <div
            class="col-lg-6 pe-lg-0 wow fadeIn"
            data-wow-delay="0.5s"
            style="min-height: 400px"
          >
            <div class="position-relative h-100">
              <img
                class="img-fluid w-100 h-100"
                src="http://localhost:8080/static/images/home1.jpg"
                style="object-fit: cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Feature End -->

    <!-- Feature Start -->
    <div class="container-fluid bg-light overflow-hidden my-5 px-lg-0">
      <div class="container feature px-lg-0">
        <div class="row g-0 mx-lg-0">
          <div
            class="col-lg-6 pe-lg-0 wow fadeIn"
            data-wow-delay="0.5s"
            style="min-height: 400px"
          >
            <div class="position-relative h-100">
              <img
                class="img-fluid w-100 h-100"
                src="http://localhost:8080/static/images/home2.jpg"
                style="object-fit: cover"
                alt=""
              />
            </div>
          </div>
          <div
            class="col-lg-6 feature-text py-5 wow fadeIn"
            data-wow-delay="0.1s"
            style="text-align: right"
          >
            <div class="p-lg-5 ps-lg-0">
              <h6 class="text-primary">Visualizacion sencilla de los datos</h6>
              <h1 class="mb-4">Graficos covid</h1>
              <p class="mb-4 pb-2">
                En nuestra aplicación podrás visualizar de manera sencilla los datos mas relevantes de la pandemia por estados. 
                Enterate de la situación actual de tu estado en solo click
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Feature End -->
  </div>
</template>

<script>
export default {
  name: "homeScript",
};
</script>
