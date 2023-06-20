<template>
  <LoginForm />
</template>

<script>
import LoginForm from "../components/Login/Login.vue";
import { mapActions } from "vuex";
export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
  async mounted() {
    let token = localStorage.getItem("token");
    if (token) {
      this.redirectTo({ val: "MainPage" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>

<style></style>
