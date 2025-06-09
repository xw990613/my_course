<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="form-header">
        <h2>用户登录</h2>
        <p>欢迎回来，请登录您的账号</p>
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
        <el-form-item label="" prop="phone_number" class="form-item-fixed">
          <el-input
            v-model="ruleForm.phone_number"
            type="text"
            autocomplete="off"
            placeholder="请输入手机号"
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
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="form-footer">
        <span>还没有账号？</span>
        <span class="register" @click="handelRegister">立即注册</span>
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
  import { useRouter, useRoute } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  const ruleFormRef = ref<FormInstance>();
  const auth = useAuthStore();
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

  // 自定义校验器：密码
  const validatePassword = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error('密码不能为空'));
    } else if (value.length < 6) {
      callback(new Error('密码长度不能少于6位'));
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
      callback(new Error('密码必须包含字母和数字'));
    } else {
      callback();
    }
  };

  const ruleForm = reactive({
    phone_number: '',
    password: '',
  });

  const rules = reactive<FormRules<typeof ruleForm>>({
    phone_number: [{ validator: validatePhone, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
  });
  const route = useRoute();
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async valid => {
      if (valid) {
        const redirect = route.query.redirect as string;
        auth.login(ruleForm, redirect);
      } else {
        console.log('error submit!');
      }
    });
  };
  const router = useRouter();
  function handelRegister() {
    router.push('/register');
  }
</script>

<style scoped>
  .login-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    height: 100vh;
    background-image: url('../../assets/img/background.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .login-container {
    width: 100%;
    max-width: 480px;
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
  .form-item-fixed {
    width: 280px;
    margin-bottom: 16px;
    margin: 20px auto; /* 水平居中 */
  }
  .form-header {
    text-align: center;
    margin-bottom: 40px;
  }
  .login-btn {
    width: 100%;
    border-radius: 30px;
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

  .form-footer {
    text-align: center;
    margin-top: 20px;
    color: #95a5a6;
  }

  .form-footer .register {
    color: #3498db;
    text-decoration: none;
    margin-left: 5px;
    font-weight: 600;
    cursor: pointer;
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
