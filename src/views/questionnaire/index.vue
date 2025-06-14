<template>
  <div class="survey-container">
    <h1>自我调节学习（SRL）调查问卷</h1>
    <el-form @submit.prevent="submitForm">
      <el-form-item
        v-for="(item, index) in questionnaire"
        :key="index"
        :label="item.label"
      >
        <el-rate
          v-model="item.score"
          :max="5"
          show-text
          :texts="[
            'Strongly Disagree',
            'Disagree',
            'Generally',
            'Agree',
            'Strongly Agree',
          ]"
        ></el-rate>
      </el-form-item>

      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'question_naire',
  };
</script>

<script setup lang="ts">
  import { reactive } from 'vue';
  import {
    ElForm,
    ElFormItem,
    ElRate,
    ElButton,
    ElMessage,
  } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { saveQuestionnaire } from '@/api/avaluation';
  import { useI18n } from 'vue-i18n';
  import { useAuthStore } from '@/stores/auth';
  const auth = useAuthStore();
  console.log(auth.userInfo, '@@@');
  const { t } = useI18n();
  const router = useRouter();

  // 定义表单数据
  const questionnaire = reactive([
    { label: t('questionnaire.srlSurvey.q1_score'), score: 0 },
    { label: t('questionnaire.srlSurvey.q2_score'), score: 0 },
    { label: t('questionnaire.srlSurvey.q3_score'), score: 0 },
    { label: t('questionnaire.srlSurvey.q4_score'), score: 0 },
    { label: t('questionnaire.srlSurvey.q5_score'), score: 0 },
    { label: t('questionnaire.srlSurvey.q6_score'), score: 0 },
    { label: t('questionnaire.srlSurvey.q7_score'), score: 0 },
  ]);

  // 提交表单的处理函数
  const submitForm = async () => {
    const unfilled = questionnaire.find(q => q.score === 0);
    if (unfilled) {
      ElMessage.warning('请为每一道题目进行评分后再提交～');
      return;
    }
    const payload = Object.fromEntries(
      questionnaire.map((q, i) => [`q${i + 1}_score`, q.score]),
    );
    try {
      const result = await saveQuestionnaire({
        'Pre-SRLSurvey': payload,
      });
      ElMessage.success(result.message);
      router.push('/layout/home');
    } catch (error: any) {
      ElMessage.error(error.message);
    }
  };
</script>

<style scoped lang="scss">
  .survey-container {
    width: 80%;
    max-width: 1100px;
    margin: 50px auto;
    padding: 30px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  button {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
