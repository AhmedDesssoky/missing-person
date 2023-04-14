<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 mx-auto border mt-4">
        <h3 class="text-center p-3">انشاء حساب</h3>
        <form @click.prevent>
          <div class="row align-items-center">
            <div class="form-group mx-auto col-8 d-block">
              <input
                type="text"
                class="form-control rounded-pill"
                placeholder="الاسم الكامل"
                @input="v$.name.$touch()"
                v-model="name"
              />
              <span class="error-feedback text-danger" v-if="v$.name.$error">{{
                nameErrorMessage(v$.name)
              }}</span>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group mx-auto col-8 d-block">
              <input
                type="email"
                class="form-control rounded-pill"
                placeholder="البريد الالكتروني"
                @input="v$.email.$touch()"
                v-model="email"
                @keyup="handleKeyUp"
              />
              <span class="error-feedback text-danger" v-if="v$.email.$error">{{
                emailErrorMessage(v$.email)
              }}</span>
              <span class="error-feedback text-danger" v-if="emailTaken">
                {{ emailTaken }}
              </span>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-8 mx-auto d-block">
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
          <div class="row align-items-center">
            <div class="form-group col-8 mx-auto">
              <button
                type="submit"
                class="btn btn-info bg-info btn-block rounded-pill"
                @click="signup()"
              >
                تسجيل
              </button>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-8 mx-auto d-flex align-items-center">
              هل قمت بالتسجيل سابقاً؟
              <button
                class="btn btn-link text-decoration-none text-info log rounded-pill"
                @click="redirectTo({ val: 'LoginPage' })"
              >
                دخول
              </button>
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
  name: "SignUpForm",
  data() {
    return {
      v$: useValidate(),
      name: "",
      password: "",
      email: "",
      emailTaken: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
      password: { required, minLength: minLength(6) },
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
    nameErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن يحتوي الاسم على 3 أحرف على الأقل.";
      }
      return "";
    },
    emailErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب ";
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
    async signup() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .post("https://missing-person.online/public/api/auth/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          })

          .then((response) => {
            // save data user in local storage
            localStorage.setItem("user-Info", JSON.stringify(response.data));
            // redirect to home page
            this.redirectTo({ val: "ThePerson" });
          })
          .catch((error) => {
            // console.log(error.response.data);
            this.emailTaken = error.response.data.email[0];
          });
      }
    },
    handleKeyUp() {
      this.emailTaken = "";
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
input:focus {
  outline: none !important;
  box-shadow: none !important;
}
h3 {
  font-size: 30px;
}
</style>
