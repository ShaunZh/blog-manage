<template>
  <div class="page-login">
    <div class="wrap">
      <div class="h3 mb-5">皮皮球后台管理系统</div>
      <div class="card">
        <div class="card-header text-center">
          <div class="row">
            <a href="#" class="col-6 text-center bg-info" @click.stop="tabType='login'">登录</a>
            <a href="#" class="col-6 text-center bg-success" @click.stop="tabType='register'">注册</a>
          </div>
        </div>
        <form class="card-body">
          <div v-if="tabType==='login'">
            <div class="form-group row mx-0 mb-3">
              <label for="login-username" class="col-4 text-right">用户名: </label>
              <input type="text" id="login-username" class="col-8" min="6" max="24"
                     placeholder="请输入用户名"
                     required
                     v-model="loginUsername">
            </div>
            <div class="form-group row mx-0 mb-3">
              <label for="login-password" class="col-4 text-right">密码:</label>
              <input type="password" id="login-password" class="col-8" min="6" max="24"
                     placeholder="请输入密码"
                     required
                     v-model="loginPassword">
            </div>
            <div class="form-group ">
              <input type="checkbox" class="form-check-input" id="rememberPassword" v-model="isRememberPassword">
              <label class="form-check-label" style="font-size: 80%" for="rememberPassword">记住密码</label>
              <a href="" style="font-size: 80%" class="text-info">忘记密码</a>
            </div>
            <div class="form-group row">
              <button type="submit" class="btn btn-block btn-primary text-center col-6 offset-4"
                      @click.stop="submitLogin">登录</button>
            </div>
            <div class="ml-5 pl-5 text-info" style="font-size: 80%; " v-show="dispActiveInfo">账号尚未激活，重新发送激活链接，请点击<a href="#" @click.prevent.stop="getActiveLink">此处</a> </div>
          </div>
          <div v-else>
            <div class="form-group row mx-0 mb-3">
              <label for="register-username" class="col-3 text-right">用户名: </label>
              <input type="text" id="register-username" required class="col-6" min="6" max="24"
                     placeholder="请输入用户名"
                     v-model="registerUsername"
                     @blur="checkUsername"
              >
              <div v-show="tips.registerUsername" class="col-3 text-danger" style="font-size: 80%" v-text="tips.registerUsername"></div>
            </div>
            <div class="form-group row mx-0 mb-3">
              <label for="register-password" class="col-3 text-right">密码:</label>
              <input type="password" id="register-password" required class="col-6" min="6" max="24"
                     placeholder="请输入密码"
                     v-model="registerPassword"
                     @blur="checkPassword"
                     :class="{'is-valid': tips.registerPassword !== ''}"
              >
              <div v-show="tips.registerPassword" class="col-3 text-danger" style="font-size: 80%" v-text="tips.registerPassword"></div>
            </div>
            <div class="form-group row mx-0 mb-3">
              <label for="register-confirm-password" class="col-3 text-right">确认密码: </label>
              <input type="password" id="register-confirm-password"  required class="col-6" min="6" max="24"
                     placeholder="请再次输入密码"
                     v-model="registerConfirmPassword"
                     @blur="checkConfirmPassword"
                     :class="{'is-valid': tips.registerConfirmPassword !== ''}"
              >
              <div v-show="tips.registerConfirmPassword" class="col-3 text-danger" style="font-size: 80%" v-text="tips.registerConfirmPassword"></div>
            </div>
            <div class="form-group row mx-0 mb-3">
              <label for="register-mobile" class="col-3 text-right">邮箱地址:</label>
              <input type="email" id="register-mobile" required class="col-6" min="6" max="24"
                     placeholder="请输入邮箱"
                     v-model="registerEmail"
                     @blur="checkEmail"
                     :class="{'is-valid': tips.registerEmail !== ''}"
              >
              <div v-show="tips.registerEmail" class="col-3 text-danger" style="font-size: 80%" v-text="tips.registerEmail"></div>
            </div>
            <div class="form-group row mx-0 mb-3">
              <button type="submit" class="btn btn-block btn-primary col-6 offset-4"
                      @click.stop="submitRegister" >注册</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script type="es6">
import axios from 'axios';
import utils from '@/utils/functions';

export default {
  data() {
    return {
      tabType: 'login', // 登录/注册
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      registerConfirmPassword: '', // 确认密码
      registerEmail: '', // 手机号码
      tips: {
        registerUsername: '', // 注册用户名提示
        registerPassword: '', // 注册用户密码提示
        registerConfirmPassword: '', // 注册用户密码确认提示
        registerEmail: '', // 注册用户邮箱

        loginUsername: '', // 登录用户名
        loginPassword: '', // 登录密码
      },
      disabledRegister: true,
      dispActiveInfo: false, // 显示激活信息
      activeLink: '', // 账号激活链接
      userInfo: {},
      isRememberPassword: false, // 是否记住密码
    };
  },
  watch: {
  },
  created() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (!(username == undefined && password == undefined)) {
      this.loginUsername = username == undefined ? '' : username;
      this.loginPassword = password == undefined ? '' : password;
      this.isRememberPassword = true;
    }
  },
  methods: {
    /**
     * @description 检查用户名
     * @param
     * @return
     */
    checkUsername() {
      if (this.registerUsername === '') {
        this.tips.registerUsername = '请输入用户名';
        return;
      }
      axios.get(this.$appConfig.api.users.get + this.registerUsername)
        .then((response) => {
          if (response.data.status === 200) {
            if (response.data.data.items.length > 0) {
              // 用户名已被注册
              this.tips.registerUsername = '用户名已被注册';
            } else {
              // 用户名未被注册
              this.tips.registerUsername = '';
            }
          } else {
            throw new Error(response.data.msg);
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    /**
     * @description 检查密码
     * @param
     * @return
     */
    checkPassword() {
      if (this.registerPassword.length < 6 || this.registerPassword.length > 24) {
        this.tips.registerPassword = '密码长度范围为: 6 ~ 24';
      } else {
        this.tips.registerPassword = '';
      }
    },
    /**
     * @description 检查确认密码
     * @param
     * @return
     */
    checkConfirmPassword() {
      if (this.registerPassword !== this.registerConfirmPassword) {
        this.tips.registerConfirmPassword = '两次输入的密码不同';
      } else {
        this.tips.registerConfirmPassword = '';
      }
    },
    /**
     * @description 检查邮箱
     * @param
     * @return
     */
    checkEmail() {
      if (!utils.verifyEmail(this.registerEmail)) {
        this.tips.registerEmail = '请输入有效的邮箱地址';
      } else {
        axios.get(this.$appConfig.api.users.verifyEmail + this.registerEmail)
          .then((response) => {
            if (response.data.status === 200) {
              if (response.data.data.items.length > 0) {
                // 用户名已被注册
                this.tips.registerEmail = '邮箱已被注册';
              } else {
                // 用户名未被注册
                this.tips.registerEmail = '';
              }
            } else {
              throw new Error(response.data.msg);
            }
          })
          .catch((e) => {
            console.log(e.message);
          });
        this.tips.registerEmail = '';
      }
    },
    /**
     * @description 保存accessToken到localStorage中
     * @param
     * @return
     */
    saveAccessToken(accessToken) {
      localStorage.setItem('accessToken', accessToken);
    },
    /**
     * @description 获取激活链接
     * @param
     * @return
     */
    getActiveLink() {
      axios({
        method: 'POST',
        url: this.$appConfig.api.login.sendActiveEmail,
        data: JSON.stringify({
          username: this.loginUsername,
        }),
        headers: { 'Content-Type': 'application/json'},
      })
        .then((response) => {
          if (response.data.status === 200) {
            this.$message({
              type: 'success',
              message: '发送激活链接成功',
            });
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg,
            });
          }
        });
    },
    /**
     * @description 登录
     * @param
     * @return
     */
    submitLogin() {
      // 1. 登录
      axios({
        method: 'POST',
        url: this.$appConfig.api.login.into,
        data: JSON.stringify({
          username: this.loginUsername,
          password: this.loginPassword,
        }),
      })
        .then((response) => {
          if (response.data.status === 400) {
            throw new Error(response.data.msg);
          } else if (response.data.status === 202) {
            // 账号未激活
            this.dispActiveInfo = true;
          } else {
            // 账号已激活, 保存用户信息
            Object.assign(this.userInfo, response.data.data);
            // 登录成功, 则获取token信息
            axios({
              method: 'POST',
              url: this.$appConfig.api.login.getAccessToken,
              data: JSON.stringify({
                username: this.loginUsername,
                password: this.loginPassword,
              }),
            })
              .then((response2) => {
                if (response2.data.status === 200) {
                  // 账号已激活
                  if (response2.data.data.accessToken !== '') {
                    // 保存token到localstorage中
                    this.saveAccessToken(response2.data.data.accessToken);
                    // 记住密码
                    if (this.isRememberPassword) {
                      localStorage.setItem('username', this.loginUsername);
                      localStorage.setItem('password', this.loginPassword);
                    } else {
                      // 没有记住密码
                      localStorage.removeItem('username');
                      localStorage.removeItem('password');
                    }
                    this.$message({
                      type: 'success',
                      message: '登录成功',
                    });
                    this.$router.replace({ name: 'Index' });
                  } else {
                    // 账号未激活
                    this.dispActiveInfo = true;
                  }
                }
              })
              .catch((error2) => {
                this.$message({
                  type: 'error',
                  message: error2.message,
                });
              });
          }
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error.message,
          });
        });
    },
    /**
     * @description 注册
     * @param
     * @return
     */
    submitRegister() {
      if (this.tips.registerUsername.length || this.tips.registerPassword.length ||
        this.tips.registerConfirmPassword.length || this.tips.registerEmail.length) {
        this.$message({
          type: 'error',
          message: '请填写完整信息',
        });
      } else {
        axios({
          url: this.$appConfig.api.users.register,
          method: 'POST',
          data: JSON.stringify({
            username: this.registerUsername,
            password: this.registerPassword,
            confirmPassword: this.registerConfirmPassword,
            email: this.registerEmail,
            createTime: utils.getDate(),
            mobile: '',
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => {
            if (response.data.status === 200) {
              this.$router.replace({
                name: 'ActiveAccount',
                params: {
                  emailAddr: this.registerEmail,
                },
              });
            }
          })
          .catch((e) => {
            this.$message({
              type: 'error',
              message: `注册失败: ${e.message}`,
            });
          });
      }
    },

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
      min-width: 600px;
      max-width: 700px;
    }
  }
</style>
