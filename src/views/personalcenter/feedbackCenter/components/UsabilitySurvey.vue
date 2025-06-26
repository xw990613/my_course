<template>
  <div class="usability-survey">
    <h2 class="survey-title">Likert-scale usability survey</h2>
    <el-form label-position="top" @submit.prevent="submitSurvey">
      <div v-for="(q, index) in questions" :key="index" class="card">
        <p class="question">{{ index + 1 }}. {{ q.label }}</p>
        <el-rate
          v-model="q.score"
          :max="5"
          show-text
          :texts="['非常不同意', '不同意', '中立', '同意', '非常同意']"
          class="rate"
        />
      </div>
      <div class="submit-area">
        <el-button type="primary" size="large" @click="submitSurvey">
          保存
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { ref, defineEmits } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const emit = defineEmits<{
    (e: 'submitUsabilitySurvey', payload: Record<string, number>): void;
  }>();

  const questions = ref([
    { label: t('questionnaire.UsabilitySurvey.q1_score'), score: 0 },
    { label: t('questionnaire.UsabilitySurvey.q2_score'), score: 0 },
    { label: t('questionnaire.UsabilitySurvey.q3_score'), score: 0 },
    { label: t('questionnaire.UsabilitySurvey.q4_score'), score: 0 },
    { label: t('questionnaire.UsabilitySurvey.q5_score'), score: 0 },
    { label: t('questionnaire.UsabilitySurvey.q6_score'), score: 0 },
    { label: t('questionnaire.UsabilitySurvey.q7_score'), score: 0 },
    { label: t('questionnaire.UsabilitySurvey.q8_score'), score: 0 },
  ]);

  const submitSurvey = () => {
    const unfilled = questions.value.find(q => q.score === 0);
    if (unfilled) {
      ElMessage.warning('请为每一道题目进行评分后再提交～');
      return;
    }
    const payload = Object.fromEntries(
      questions.value.map((q, i) => [`q${i + 1}_score`, q.score]),
    );
    console.log('提交数据:', payload);
    emit('submitUsabilitySurvey', payload);
  };
</script>

<style scoped>
  .usability-survey {
    max-width: 900px;
    margin: 60px auto;
    padding: 40px;
    background: linear-gradient(to bottom right, #f3f9ff, #ffffff);
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  .survey-title {
    text-align: center;
    font-size: 26px;
    margin-bottom: 40px;
    color: #2c3e50;
    font-weight: 600;
  }

  .card {
    background-color: #ffffff;
    padding: 24px;
    margin-bottom: 24px;
    border-radius: 14px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
    transition:
      transform 0.2s ease-in-out,
      box-shadow 0.2s;
  }

  .card:hover {
    transform: scale(1.01);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  .question {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 12px;
    color: #333333;
  }

  .rate {
    margin-left: 8px;
  }

  .submit-area {
    text-align: center;
    margin-top: 40px;
  }
</style>
