<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="form-header">
        <h2>创建账号</h2>
        <p>开启你的美好旅程</p>
      </div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="phone" class="form-item-fixed">
          <el-input
            v-model="ruleForm.phone"
            type="text"
            autocomplete="off"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="" prop="email" class="form-item-fixed">
          <el-input
            v-model="ruleForm.email"
            type="text"
            autocomplete="off"
            placeholder="请输入邮箱号"
          />
        </el-form-item>
        <el-form-item label="" prop="password" class="form-item-fixed">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item class="form-item-fixed">
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="login-btn"
          >
            立即注册
          </el-button>
        </el-form-item>
      </el-form>
      <div class="form-footer">
        <span>已有账号？</span>
        <span class="login" @click="handelLogin">立即登录</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'my-login',
  };
</script>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { useRouter } from 'vue-router';

  const ruleFormRef = ref<FormInstance>();

  // 自定义校验器：手机号
  const validatePhone = (rule: any, value: string, callback: any) => {
    const phoneReg = /^1[3-9]\d{9}$/;
    if (!value) {
      callback(new Error('请输入手机号'));
    } else if (!phoneReg.test(value)) {
      callback(new Error('请输入正确的手机号'));
    } else {
      callback();
    }
  };
  // 自定义校验器：邮箱
  const validateEmail = (rule: any, value: string, callback: any) => {
    const emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!value) {
      callback(new Error('请输入邮箱'));
    } else if (!emailReg.test(value)) {
      callback(new Error('邮箱格式不正确'));
    } else {
      callback();
    }
  };

  // 自定义校验器：密码
  const validatePassword = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error('请输入密码'));
    } else if (value.length < 6) {
      callback(new Error('密码不能少于6位'));
    } else {
      callback();
    }
  };

  const ruleForm = reactive({
    phone: '',
    email: '',
    password: '',
  });

  const rules = reactive<FormRules<typeof ruleForm>>({
    phone: [{ validator: validatePhone, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
    email: [{ validator: validateEmail, trigger: 'blur' }],
  });

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(valid => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!');
      }
    });
  };
  const router = useRouter();
  function handelLogin() {
    router.push('/login');
  }
</script>

<style scoped>
  .login-wrapper {
    min-height: 93.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .login-container {
    width: 100%;
    max-width: 480px;
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }

  .form-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .form-header h2 {
    color: #2c3e50;
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .form-header p {
    color: #95a5a6;
    font-size: 16px;
  }
  .form-item-fixed {
    width: 280px;
    margin-bottom: 16px;
    margin: 20px auto; /* 水平居中 */
  }
  .login-btn {
    width: 100%;
    border-radius: 30px;
  }
  .arrow-icon {
    border: solid white;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
  }

  .form-footer {
    text-align: center;
    margin-top: 20px;
    color: #95a5a6;
  }

  .form-footer .login {
    color: #3498db;
    text-decoration: none;
    margin-left: 5px;
    font-weight: 600;
    cursor: pointer;
  }

  .error-message {
    color: #f56c6c;
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    .login-container {
      padding: 20px;
    }

    .form-header h2 {
      font-size: 24px;
    }
  }

  @media (max-width: 768px) {
    .login-container {
      max-width: 400px;
      padding: 30px;
    }

    .form-header h2 {
      font-size: 28px;
    }

    .form-header p {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .login-container {
      padding: 20px;
      margin: 10px;
      max-width: 100%;
    }

    .form-header h2 {
      font-size: 24px;
    }

    .form-header p {
      font-size: 14px;
    }
  }

  @media (max-width: 320px) {
    .login-container {
      padding: 15px;
    }

    .form-header h2 {
      font-size: 20px;
    }
  }
</style>
