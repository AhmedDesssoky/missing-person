<template>
  <!-- <div class="container">
    <h4 class="text-right">الإبلاغ عن شخص مفقود</h4>
  </div> -->
  <div id="regForm" action="">
    <h1 style="text-align: center">بلغ عن شخص مفقود</h1>
    <div class="tab">
      <h1>بيانات الطفل</h1>
      <p>
        <input
          type="text"
          class="form-control"
          value=""
          placeholder="الأسم·الكامل"
          required
        />
      </p>
      <p><input placeholder="المحافظة" oninput="" /></p>
      <p><input placeholder="المدينة" oninput="" /></p>
      <p><input placeholder="العمر" oninput="" required /></p>
      <div class="form-group-c1">
        <h3>صورة الطفل</h3>
        <br />
        <br />
        <div
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${previewImage})` }"
          @click="selectImage"
        ></div>

        <input ref="fileInput" type="file" @input="pickFile" />
      </div>
      <div class="form-group-c2">
        <h3>صورة شهادة الميلاد</h3>
        <br />
        <br />
        <div
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${previewImage})` }"
          @click="selectImage"
        ></div>

        <input ref="fileInput" type="file" @input="pickFile" />
      </div>
    </div>
    <div class="tab">
      <h1>بيانات ولي الأمر</h1>
      <p><input placeholder="الأسم" oninput="this.className = ''" /></p>
      <p><input placeholder="رقم الهاتف" oninput="this.className = ''" /></p>
      <p><input placeholder="الرقم القومي" oninput="this.className = ''" /></p>
      <p><input placeholder="العنوان " oninput="this.className = ''" /></p>
    </div>

    <div class="form-group-c3">
      <h3>صورة بطاقة ولي الأمر</h3>
      <br />
      <br />
      <div
        class="imagePreviewWrapper"
        :style="{ 'background-image': `url(${previewImage})` }"
        @click="selectImage"
      ></div>

      <input ref="fileInput" type="file" @input="pickFile" />
    </div>
    <div style="overflow: auto">
      <div style="float: right">
        <button type="button" id="nextBtn" onclick="nextPrev(1)">
          بلغ الأن
        </button>
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
  background-color: #112031 !important;
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
</style>
