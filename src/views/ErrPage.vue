<template>
  <div class="container text-center mt-4">
    <div class="row">
      <div class="col-md-6">
        <h2>404</h2>
        <p>عذراً, الصفحة التي تحاول طلبها غير موجودة في نظامنا</p>
        <span
          >يرجى التحقق من العنوان الذي تم إدخاله والمحاولة مرة أخرى أو انتقل إلى
          <router-link to="/ThePerson" class="text-primary"
            >الصفحة الرئيسية</router-link
          >
        </span>
      </div>
      <div class="col-md-6">
        <img src="../assets/notfound.jpg" alt="" class="img-thumbnail" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrPage",
};
</script>

<style></style>
