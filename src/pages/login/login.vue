<template>
  <div class="page-login">
    <div class="wrap">
      <div class="h3">皮皮球后台管理系统</div>
      <div class="form">
        <div class="tab">
          <a href="#" @click.stop="tabType='login'">登录</a>
          <a href="#" @click.stop="tabType='register'">注册</a>
        </div>
        <form>
          <div v-if="tabType==='login'">
            <div class="form-group row mx-0">
              <label for="login-username" class="col-4 text-right">用户名: </label>
              <input type="text" id="login-username" class="col-8" min="6" max="24"
                     placeholder="请输入用户名"
                     v-model="loginUsername">
            </div>
            <div class="form-group row mx-0">
              <label for="login-password" class="col-4 text-right">密码:</label>
              <input type="password" id="login-password" class="col-8" min="6" max="24"
                     placeholder="请输入密码"
                     v-model="loginPassword">
            </div>
            <div class="form-group row">
              <button type="submit" class="btn btn-block btn-primary text-center col-6 offset-4"
                      @click.stop="submitLogin">登录</button>
            </div>
          </div>
          <div v-else>
            <div class="form-group row mx-0">
              <label for="register-username" class="col-4 text-right">用户名: </label>
              <input type="text" id="register-username" class="col-8" min="6" max="24"
                     placeholder="请输入用户名"
                     v-model="registerUsername">
            </div>
            <div class="form-group row mx-0">
              <label for="register-password" class="col-4 text-right">密码:</label>
              <input type="password" id="register-password" class="col-8" min="6" max="24"
                     placeholder="请输入密码"
                     v-model="registerPassword">
            </div>
            <div class="form-group row mx-0">
              <label for="register-password-re" class="col-4 text-right">确认密码: </label>
              <input type="text" id="register-password-re" class="col-8" min="6" max="24"
                     placeholder="请再次输入密码"
                     v-model="registerPasswordRe">
            </div>
            <div class="form-group row mx-0">
              <label for="register-mobile" class="col-4 text-right">手机号码:</label>
              <input type="text" id="register-mobile" class="col-8" min="6" max="24"
                     placeholder="请你输入手机号码"
                     v-model="registerMobile">
            </div>
            <div class="form-group row mx-0">
              <button type="submit" class="btn btn-block btn-primary col-6 offset-4"
                      @click.stop="submitLogin">注册</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      tabType: 'login', // 登录/注册
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      registerPasswordRe: '', // 确认密码
      registerMobile: '', // 手机号码
    };
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
  .page-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .wrap {
      margin-top: 20vh;
      min-width: 300px;
      max-width: 400px;
    }
  }
</style>
