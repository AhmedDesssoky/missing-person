<template>
  <div class="container">
    <h1 style="text-align: center">ابحث عن شخص مفقود</h1>
  </div>
  <div class="container border w-75">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <form action="">
          <div class="form-group mt-3 text-right">
            <h3 for="">التحقق اذا كان الشخص مفقود ام لا</h3>
            <input type="file" class="form-control w-50" />
          </div>
          <div>
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
                <button type="submit" id="nextBtn" onclick="nextPrev(1)">
                  ابحث
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
export default {
  data() {
    return {
      previewImage: null,
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
  },
};
</script>

<style scoped>
* {
  direction: rtl;
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
