<template>
  <body>
    <section class="img">
      <div class="overlay">
        <p>انضم إلينا في جهودنا لإيجاد الأطفال المفقودين وتوفير بيئةآمنة لهم</p>
      </div>
    </section>
    <!-- <section class="text-center mt-5">
      <div class="awso">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-m-6 col-s-6">
              <font-awesome-icon icon="headset" />
              <p>123</p>
              <h5>شخص مفقود</h5>
            </div>
            <div class="col-xl-4 col-lg-4 col-m-6 col-s-6">
              <font-awesome-icon icon="check" />
              <p>15</p>
              <h5>دمعة تم مسحها</h5>
            </div>
            <div class="col-xl-4 col-lg-4 col-m-6 col-s-6">
              <font-awesome-icon icon="glasses" />
              <p>325,225</p>
              <h5>مشاهدة</h5>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </body>
</template>

<script>
export default {
  name: "MainHome",
};
</script>

<style>
.img {
  background: url("@/assets/6.jpg") center center / cover no-repeat;
  height: 100vh;
  transform: translateY(0px);
  background-attachment: fixed !important;
}
.overlay p {
  color: rgba(0, 0, 0, 0.7) !important;
  position: absolute !important;
  top: 40% !important;
  right: 55%;
  font-size: 50px;
  background-color: transparent !important;
  text-align: right;
}
.awso {
  font-size: 50px !important;
  margin-top: 10px !important;
}
@media (max-width: 576px) {
  body > section.img > div > p {
    top: 0 !important;
  }
}
</style>
