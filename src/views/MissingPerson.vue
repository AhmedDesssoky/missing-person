<template>
  <MissingPerson />
</template>

<script>
import { mapActions } from "vuex";
import MissingPerson from "../components/MissingPerson/MissingPerson.vue";
export default {
  name: "MissingPersonPage",
  components: { MissingPerson },
  async mounted() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.redirectTo({ val: "SignUp" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>

<style></style>
