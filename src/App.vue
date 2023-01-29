<template>
  <div
    class="container-fluid d-flex justify-content-between align-items-center"
  >
    <div class="d-flex">
      <router-link to="/login" class="nav-link">دخول</router-link>
      <router-link to="/signup" class="nav-link">تسجيل</router-link>
    </div>
    <div class="d-flex">
      <button @click="logout()" class="nav-link btn btn-info bg-info mt-1">
        خروج
      </button>
    </div>
  </div>
  <section class="shared">
    <nav class="navbar navbar-expand-lg">
      <router-link to="/" class="nav-link">
        <a
          class="navbar-brand brand d-flex justify-content-center align-items-center"
          >logo</a
        >
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span><font-awesome-icon icon="bars" /> </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/missing-person"
              >بلّغ عن شخص مفقود</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search-person"
              >بحث عن شخص مفقود</router-link
            >
          </li>
        </ul>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/ThePerson" class="nav-link"
              >الأشخاص المفقودون
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Aboutus" class="nav-link"> من نحن</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ContactUs" class="nav-link">
              اتصل بنا
            </router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2 rounded-pill"
            type="search"
            placeholder="ابحث عن شخص مفقود"
            aria-label="Search"
          />
          <input
            id="search"
            class="m-2 my-sm-0 px-2 py-1 rounded-pill"
            type="submit"
            value="ابحث"
          />
        </form>
      </div>
    </nav>
  </section>

  <router-view />
  <footer class="mt-5">
    <p class="text-center">جميع الحقوق محفوظة © 2023 MissingPerson</p>
  </footer>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["redirectTo"]),
    logout() {
      localStorage.clear();
      this.redirectTo({ val: "LoginPage" });
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300&display=swap");
* {
  direction: rtl;
  color: #fff !important;
  font-family: "Montserrat Alternates", sans-serif !important;
  font-weight: 18px;
}
body {
  background-color: #112031 !important;
}
input {
  color: #3a7852 !important  ;
  border-color: #152d35 !important;
}
input:focus {
  outline: none !important;
  box-shadow: none !important;
}
nav {
  background: linear-gradient(30deg, rgb(0, 0, 0, 0.1) 5%, #345b63) !important;
  font-size: 20px;
}
footer {
  background-attachment: fixed;
  background-position: 100% !important;
}
.btn {
  text-align: center !important;
  color: white !important;
  /* background-color: #345b63;
  border-color: #d4ecdd; */
}
</style>
