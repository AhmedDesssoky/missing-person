<template>
  <div class="" id="regForm">
    <div class="row">
      <div class="col-md-12 mx-auto mt-4">
        <form>
          <div class="row align-items-center">
            <div class="form-group mx-auto col-12 d-block">
              <h1>بيانات الطفل</h1>
              <input
                type="text"
                class="form-control rounded-pill"
                placeholder="الأسم الكامل"
                @input="v$.name.$touch()"
                v-model="name"
              />
              <span
                class="error-feedback text-danger float-lg-right"
                v-if="v$.name.$error"
                >{{ nameErrorMessage(v$.name) }}</span
              >
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group mx-auto col-12 d-block">
              <input
                type="text"
                placeholder="المحافظة"
                class="form-control rounded-pill"
                @input="v$.governorate.$touch()"
                v-model="governorate"
              />

              <span
                class="error-feedback text-danger float-lg-right"
                v-if="v$.governorate.$error"
                >{{ governorateErrorMessage(v$.governorate) }}</span
              >
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <input
                type="text"
                placeholder="المدينة"
                class="form-control rounded-pill"
                @input="v$.city.$touch()"
                v-model="city"
              />

              <span
                class="error-feedback text-danger float-lg-right"
                v-if="v$.city.$error"
                >{{ cityErrorMessage(v$.city) }}</span
              >
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <input
                type="number"
                placeholder="العمر"
                class="form-control rounded-pill"
                @input="v$.age.$touch()"
                v-model="age"
              />

              <span
                class="error-feedback text-danger float-lg-right"
                v-if="v$.age.$error"
                >{{ ageErrorMessage(v$.age) }}</span
              >
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <h3>صورة الطفل</h3>
              <input
                type="file"
                class="form-control py-1 rounded-pill"
                placeholder="اختر صوره"
                @change="onFileChange"
                @input="handleKeyUp"
              />
              <!-- <span
                class="error-feedback text-danger float-lg-right"
                v-if="v$.file.$error"
                >{{ fileErrorMessage(v$.file) }}</span
              > -->
              <span class="error-feedback text-danger" v-if="imagerequred">
                {{ imagerequred }}
              </span>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <h3>بيانات ولي الأمر</h3>
              <input
                type="text"
                placeholder="الأسم"
                class="form-control rounded-pill"
                @input="v$.fatherName.$touch()"
                v-model="fatherName"
              />

              <span
                class="error-feedback text-danger float-lg-right"
                v-if="v$.fatherName.$error"
                >{{ fatherNameErrorMessage(v$.fatherName) }}</span
              >
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <input
                type="number"
                placeholder="رقم الهاتف"
                class="form-control rounded-pill"
                @input="v$.phone.$touch()"
                v-model="phone"
              />

              <span
                class="error-feedback text-danger float-lg-right"
                v-if="v$.phone.$error"
                >{{ phoneErrorMessage(v$.phone) }}</span
              >
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <input
                type="number"
                placeholder="الرقم القومي"
                class="form-control rounded-pill"
                @input="v$.nationalNumber.$touch()"
                v-model="nationalNumber"
              />

              <span
                class="error-feedback text-danger float-lg-right"
                v-if="v$.nationalNumber.$error"
                >{{ nationalNumberErrorMessage(v$.nationalNumber) }}</span
              >
            </div>
          </div>

          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto">
              <button
                type="button"
                class="btn btn-info bg-info btn-block rounded-pill log w-25 text-white"
                @click="store()"
              >
                بلغ الأن
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
import { required, minLength, maxLength } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      name: "",
      governorate: "",
      age: "",
      city: "",
      file: null,
      fatherName: "",
      phone: "",
      nationalNumber: "",
      imagerequred: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
      governorate: { required, minLength: minLength(5) },
      age: { required, minLength: minLength(1), maxLength: maxLength(2) },
      city: { minLength: minLength(3), required },
      // file: { required },
      fatherName: { required, minLength: minLength(3) },
      phone: { required, minLength: minLength(11), maxLength: maxLength(11) },
      nationalNumber: {
        required,
        minLength: minLength(14),
        maxLength: maxLength(14),
      },
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    ...mapActions(["redirectTo"]),
    nameErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن يحتوي الاسم على 3 أحرف على الأقل.";
      }
      return "";
    },
    governorateErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن تحتوي المحافظه على 3 أحرف على الأقل.";
      }
      return "";
    },
    ageErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن يحتوي العمر على رقم على الأقل.";
      } else if (v.maxLength.$invalid) {
        return "يجب أن يحتوي العمر على رقمين على الاكثر.";
      }
      return "";
    },
    // fileErrorMessage(v) {
    //   if (v.required.$invalid) {
    //     return "هذا الحقل مطلوب";
    //   }
    //   return "";
    // },
    cityErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن تحتوي المدينة على 3 أحرف على الأقل.";
      }
      return "";
    },
    fatherNameErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن يحتوي اسم الاب على 3 أحرف على الأقل.";
      }
      return "";
    },
    phoneErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن يحتوي رقم الهاتف على 11 رقم على الأقل.";
      } else if (v.maxLength.$invalid) {
        return "يجب أن يحتوي رقم الهاتف على  11 رقم على الاكثر.";
      }
      return "";
    },
    nationalNumberErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      } else if (v.minLength.$invalid) {
        return "يجب أن يحتوي الرقم القومي على 14 رقم على الأقل.";
      } else if (v.maxLength.$invalid) {
        return "يجب أن يحتوي الرقم القومي على  14 رقم على الاكثر.";
      }
      return "";
    },
    store() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("governorate", this.governorate);
        formData.append("age", this.age);
        formData.append("city", this.city);
        formData.append("image", this.file);
        formData.append("fatherName", this.fatherName);
        formData.append("phone", this.phone);
        formData.append("nationalNumber", this.nationalNumber);
        const token = localStorage.getItem("token");
        axios
          .post("https://missing-person.online/public/api/store", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.redirectTo({ val: "ThePerson" });
          })
          .catch((error) => {
            console.log(error.response.data.message.image);

            this.imagerequred = error.response.data.message.image[0];
            // this.imagefail = error.response.data.message.image[1];
          });
      } else {
        console.log("error");
      }
    },
    handleKeyUp() {
      this.imagerequred = "";
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

#regForm {
  margin: 30px auto;
  padding: 40px;
  width: 70%;
  min-width: 300px;
}

/* Style the input fields */
input {
  padding: 10px;
  width: 100%;
  font-size: 17px;
  font-family: Raleway;
  border: 1px solid #aaaaaa;
  color: #fff;
}

h1 {
  text-align: center;
}

h3 {
  float: right;
  margin: 20px;
}
/* Mark input boxes that gets an error on validation: */
input.invalid {
  background-color: #ffdddd;
}

#nextBtn {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
  width: 250px;
  height: 40px;
  margin: 20px;
}

/* .imagePreviewWrapper {
  width: 400px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
} */
.form-group-c2,
.form-group-c1 {
  display: inline-block;
  width: 50%;
}
.btn {
  color: #fff !important;
}
</style>
