<template>
  <div class="active-account">
    <div class="text-info">注册成功</div>
    <div>
      跳转到
      <a :href="emailHome">{{emailHome}}激活账号</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emailHome: '',
    };
  },
  created() {
    const net = this.$route.params.emailAddr.slice(this.$route.params.emailAddr.indexOf('@') + 1);
    this.emailHome = `http://mail.${net}`;
  },
};
</script>
