<template>
  <div class="container">
    <h1 class="text-center">اتصل بنا</h1>
    <h1 class="text-center">ابقى على تواصل معنا... فنحن نريد أن نسمع منك</h1>
  </div>
  <div class="container">
    <div class="row">
      <!-- <div class="container">
        <div class="row"> -->
      <div class="col-6 mt-5 text-right">
        <form class="row g-3 needs-validation" @click.prevent>
          <div class="col-md-6">
            <label for="validationCustom01" class="form-label"
              >الاسم الاول</label
            >
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              v-model="firstName"
              @input="v$.firstName.$touch()"
            />
            <span
              class="error-feedback text-danger"
              v-if="v$.firstName.$error"
              >{{ firstnameErrorMessage(v$.firstName) }}</span
            >
          </div>
          <div class="col-md-6 text-right">
            <label for="validationCustom02" class="form-label"
              >الاسم الاخير</label
            >
            <input
              type="text"
              class="form-control"
              id="validationCustom02"
              v-model="lastName"
              @input="v$.lastName.$touch()"
            />
            <span
              class="error-feedback text-danger"
              v-if="v$.lastName.$error"
              >{{ lastnameErrorMessage(v$.lastName) }}</span
            >
          </div>
          <br />
          <div class="col-md-12 mt-3">
            <label for="validationCustomUsername" class="form-label"
              >البريد الالكتروني</label
            >
            <div class="input-group has-validation">
              <input
                type="email"
                class="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                v-model="email"
                @input="v$.email.$touch()"
              />
            </div>
            <span class="error-feedback text-danger" v-if="v$.email.$error">{{
              emailErrorMessage(v$.email)
            }}</span>
          </div>
          <div class="col-md-8 mt-3">
            <label for="validationCustom03" class="form-label">المدينة</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom03"
              v-model="city"
              @input="v$.city.$touch()"
            />
            <span class="error-feedback text-danger" v-if="v$.city.$error">{{
              cityErrorMessage(v$.city)
            }}</span>
          </div>
          <div class="col-md-4 mt-3">
            <label for="validationCustom03" class="form-label">المحافظة</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom03"
              v-model="governorate"
              @input="v$.governorate.$touch()"
            />
            <span
              class="error-feedback text-danger"
              v-if="v$.governorate.$error"
              >{{ govErrorMessage(v$.governorate) }}</span
            >
          </div>
          <div class="col-md-10 mt-3">
            <label for="validationCustom05" class="form-label"
              >الابلاغ عن مشكلة</label
            >
            <textarea
              name=""
              id="validationCustom03"
              cols="10"
              rows="5"
              type="text"
              class="form-control"
              v-model="desc"
              @input="v$.desc.$touch()"
            >
            </textarea>
            <span class="error-feedback text-danger" v-if="v$.desc.$error">{{
              descErrorMessage(v$.desc)
            }}</span>
          </div>
          <div class="col-4 text-right mt-3">
            <button class="btn btn-primary" type="submit" @click="contact()">
              تسجيل
            </button>
          </div>
        </form>
      </div>
      <div class="col-6">
        <img src="@/assets/1.jpg" width="500" height="500" alt="" />
      </div>
    </div>
  </div>
  <!-- </div>
  </div> -->
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "ContactUsPage",

  data() {
    return {
      v$: useValidate(),
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      governorate: "",
      desc: "",
      check: "",
    };
  },
  validations() {
    return {
      firstName: { required, minLength: minLength(5) },
      lastName: { required, minLength: minLength(5) },
      email: { email, required },
      city: { required, minLength: minLength(5) },
      governorate: { required, minLength: minLength(5) },
      desc: { required, minLength: minLength(5) },
      check: { required, minLength: minLength(5) },
    };
  },
  methods: {
    firstnameErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن يحتوي الاسم الاول على 3 أحرف على الأقل.";
      }
      return "";
    },
    lastnameErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن يحتوي الاسم الاخير على 3 أحرف على الأقل.";
      }
      return "";
    },
    emailErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.email.$invalid) {
        return "الرجاء إدخال عنوان بريد إلكتروني صحيح";
      }
      return "";
    },
    cityErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن تحتوي المدينة على 3 أحرف على الأقل.";
      }
      return "";
    },
    govErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن تحتوي المحافظة على 3 أحرف على الأقل.";
      }
      return "";
    },
    descErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن تحتوي المحافظة على 3 أحرف على الأقل.";
      }
      return "";
    },
    checkErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },

    contact() {
      this.v$.$validate();
    },
  },
};
</script>

<style>
textarea {
  background-color: #112031 !important;
}
</style>
