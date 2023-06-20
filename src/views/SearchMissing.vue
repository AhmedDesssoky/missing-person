<template>
  <SearchMissing />
</template>

<script>
import { mapActions } from "vuex";
import SearchMissing from "../components/SearchForMissing/SearchForMissing.vue";
export default {
  name: "SearchMissingPage",
  components: { SearchMissing },
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
