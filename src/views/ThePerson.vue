<template>
  <ThePerson />
</template>

<script>
import { mapActions } from "vuex";
import ThePerson from "../components/ThePerson/ThePerson.vue";
export default {
  name: "ThePersonPage",
  components: {
    ThePerson,
  },
  async mounted() {
    let user = localStorage.getItem("user-Info");
    let token = localStorage.getItem("token");
    if (!user && !token) {
      this.redirectTo({ val: "SignUp" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>

<style></style>
