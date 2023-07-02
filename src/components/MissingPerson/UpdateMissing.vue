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
                v-model="items.name"
                @input="handleKeyUp"
              />
              <span class="error-feedback text-danger" v-if="errors.name">{{
                errors.name[0]
              }}</span>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group mx-auto col-12 d-block">
              <input
                type="text"
                placeholder="المحافظة"
                class="form-control rounded-pill"
                v-model="items.governorate"
                @input="handleKeyUp"
              />
              <span
                class="error-feedback text-danger"
                v-if="errors.governorate"
                >{{ errors.governorate[0] }}</span
              >
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <input
                type="text"
                placeholder="المدينة"
                class="form-control rounded-pill"
                v-model="items.city"
                @input="handleKeyUp"
              />
              <span class="error-feedback text-danger" v-if="errors.city">{{
                errors.city[0]
              }}</span>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <input
                type="number"
                placeholder="العمر"
                class="form-control rounded-pill"
                v-model="items.age"
                @input="handleKeyUp"
              />
              <span class="error-feedback text-danger" v-if="errors.age">{{
                errors.age[0]
              }}</span>
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
              <span class="error-feedback text-danger" v-if="errors.image">{{
                errors.image[0]
              }}</span>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <h3>بيانات ولي الأمر</h3>
              <input
                type="text"
                placeholder="الأسم"
                class="form-control rounded-pill"
                v-model="items.fatherName"
                @input="handleKeyUp"
              />
              <span
                class="error-feedback text-danger"
                v-if="errors.fatherName"
                >{{ errors.fatherName[0] }}</span
              >
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <input
                type="tel"
                placeholder="رقم الهاتف"
                class="form-control rounded-pill"
                v-model="items.phone"
                @input="handleKeyUp"
              />
              <span class="error-feedback text-danger" v-if="errors.phone">{{
                errors.phone[0]
              }}</span>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto d-block">
              <input
                type="tel"
                placeholder="الرقم القومي"
                class="form-control rounded-pill"
                v-model="items.nationalNumber"
                @input="handleKeyUp"
              />
              <span
                class="error-feedback text-danger"
                v-if="errors.nationalNumber"
                >{{ errors.nationalNumber[0] }}</span
              >
            </div>
          </div>

          <div class="row align-items-center">
            <div class="form-group col-12 mx-auto">
              <button
                type="button"
                class="btn btn-info bg-info btn-block rounded-pill log w-25 text-white"
                @click="update()"
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
export default {
  name: "updateMissing",
  data() {
    return {
      errors: {},
      file: null,
      items: {
        id: null,
        name: "",
        governorate: "",
        age: "",
        city: "",
        fatherName: "",
        phone: "",
        nationalNumber: "",
      },
      imagerequred: "",
    };
  },
  mounted() {
    const itemId = this.$route.query.id;
    this.fetchMissing(itemId);
  },

  methods: {
    fetchMissing(id) {
      const token = localStorage.getItem("token");
      axios
        .get(`https://missing-person.online/public/api/missing/+${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.items = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    ...mapActions(["redirectTo"]),

    update() {
      const formData = new FormData();
      formData.append("id", this.items.id);
      formData.append("name", this.items.name);
      formData.append("governorate", this.items.governorate);
      formData.append("age", this.items.age);
      formData.append("city", this.items.city);
      formData.append("image", this.file);
      formData.append("fatherName", this.items.fatherName);
      formData.append("phone", this.items.phone);
      formData.append("nationalNumber", this.items.nationalNumber);
      const token = localStorage.getItem("token");
      axios
        .post("https://missing-person.online/public/api/update", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.redirectTo({ val: "ThePerson" });
        })
        .catch((error) => {
          // this.imagerequred = error.response.data.message.image[0];
          if (error.response && error.response.data.message) {
            this.errors = error.response.data.message;
          } else {
            // Handle general error
          }
          console.log(error.response.data.message);
        });
    },
    handleKeyUp() {
      this.errors = {};
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
