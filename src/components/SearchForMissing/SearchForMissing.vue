<template>
  <div class="container">
    <h1 style="text-align: center">ابحث عن شخص مفقود</h1>
  </div>
  <div class="container border w-75">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <form>
          <div class="form-group mt-3 text-right col-12 mx-auto d-block">
            <h3 for="">التحقق اذا كان الشخص مفقود ام لا</h3>
            <input
              type="file"
              class="form-control py-1 rounded-pill"
              @change="onFileChange"
            />
            <span
              class="error-feedback text-danger float-lg-right"
              v-if="v$.file.$error"
              >{{ fileErrorMessage(v$.file) }}</span
            >
          </div>
          <div class="mt-3 form-group mt-3 text-right col-12 mx-auto d-block">
            <h2 class="text-right">-التعليمات للحصول علي جودة عالية</h2>
            <ul>
              <li>
                <P>
                  <font-awesome-icon icon="lightbulb" />
                  اضائة جيدة للصوره
                </P>
              </li>
              <br />
              <li>
                <P>
                  <font-awesome-icon icon="user" />
                  شخص واحد فقط في الصورة
                </P>
              </li>
              <br />
              <li>
                <P>
                  <font-awesome-icon icon="eye" />
                  النظر مباشره للكاميرا
                </P>
              </li>
            </ul>
          </div>
          <div>
            <div style="overflow: auto">
              <div style="text-align: right">
                <button
                  type="button"
                  class="btn btn-info bg-info btn-block rounded-pill log w-25 text-white my-3"
                  @click="search()"
                >
                  ابحث الأن
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      file: null,
      id: null,
    };
  },
  validations() {
    return {
      file: { required },
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    fileErrorMessage(v) {
      if (v.required.$invalid) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    search() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        const image = this.file;
        axios
          .post(
            "https://54f0-156-214-155-213.eu.ngrok.io/recognize_faces",
            image
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
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
input {
  color: #fff !important  ;
  border-color: #ccc !important;
}
#nextBtn {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
  width: 200px;
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
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: right;
}

li {
  padding-left: 16px;
}

p {
  font-size: 20px;
}
.icon {
  font-size: 25px;
}
</style>
