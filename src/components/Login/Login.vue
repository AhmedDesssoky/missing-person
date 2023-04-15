<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 mx-auto border mt-4">
        <h1 class="text-center p-3">تسجيل الدخول</h1>
        <form @click.prevent>
          <div class="row align-items-center">
            <div class="form-group mx-auto col-8 d-block">
              <input
                type="email"
                class="form-control rounded-pill"
                placeholder="البريد الالكتروني"
                v-model="email"
                @input="v$.email.$touch()"
              />
              <span class="error-feedback text-danger" v-if="v$.email.$error">{{
                emailErrorMessage(v$.email)
              }}</span>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group mx-auto col-8 text-danger d-block">
              <input
                type="password"
                class="form-control rounded-pill"
                placeholder="كلمه المرور"
                @input="v$.password.$touch()"
                v-model="password"
              />
              <span
                class="error-feedback text-danger"
                v-if="v$.password.$error"
                >{{ passwordErrorMessage(v$.password) }}</span
              >
            </div>
          </div>
          <div class="row align-items-cente">
            <div class="form-group col-8 mx-auto">
              <input
                type="submit"
                value="دخول"
                @click="login()"
                class="btn btn-info bg-info btn-block rounded-pill"
              />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-8 mx-auto d-flex align-items-center">
              لم تقم بالتستجيل بعد؟
              <button
                class="btn btn-link text-decoration-none text-info log"
                @click="redirectTo({ val: 'SignUp' })"
              >
                سجل الآن
              </button>
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="form-group col-auto mx-auto d-block text-danger">
              {{ userNotFound }}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "LoginForm",

  data() {
    return {
      v$: useValidate(),
      password: "",
      email: "",
      userNotFound: "",
    };
  },
  validations() {
    return {
      password: { required, minLength: minLength(5) },
      email: { email, required },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-Info");
    if (user) {
      this.redirectTo({ val: "ThePerson" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    emailErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.email.$invalid) {
        return "الرجاء إدخال عنوان بريد إلكتروني صحيح";
      }
      return "";
    },
    passwordErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل.";
      }
      return "";
    },
    async login() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .post("https://missing-person.online/public/api/auth/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            const token = response.data.access_token;
            localStorage.setItem("token", token);
            this.redirectTo({ val: "ThePerson" });
          })
          .catch(() => {
            this.userNotFound = "المستخدم غير موجود ";
          });
      }
    },
  },
};
</script>

<style scoped>
* {
  text-decoration: rtl;
  text-align: right;
  overflow: hidden;
  font-size: 20px;
}
.log {
  color: #24baef !important;
  font-size: 18px;
  font-weight: bold;
}
input:visited {
  background: red !important;
}
input:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>
