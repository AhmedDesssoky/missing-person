<template>
  <SignUpForm />
</template>

<script>
import SignUpForm from "../components/Signup/Signup.vue";
import { mapActions } from "vuex";
export default {
  name: "SignUp",
  components: {
    SignUpForm,
  },
  async mounted() {
    let user = localStorage.getItem("user-Info");
    let token = localStorage.getItem("token");
    if (user || token) {
      this.redirectTo({ val: "MainPage" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>

<style></style>
