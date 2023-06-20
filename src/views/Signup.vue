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
