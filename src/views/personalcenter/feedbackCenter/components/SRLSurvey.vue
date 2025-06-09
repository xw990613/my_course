<template>
  <div class="srl-survey">
    <h2 class="survey-title">自我调节学习（SRL）能力评估问卷</h2>
    <el-form label-position="top" @submit.prevent="submitSurvey">
      <div v-for="(item, index) in questions" :key="index" class="card">
        <p class="question">{{ index + 1 }}. {{ item.label }}</p>
        <el-rate
          v-model="item.score"
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
  import { ref } from 'vue';
  const emit = defineEmits<{
    (e: 'submitSRLSurvey', payload: Record<string, number>): void;
  }>();
  const questions = ref([
    { label: '我会为自己的学习设定清晰具体的目标。', score: 0 },
    { label: '我知道如何根据任务调整我的学习计划。', score: 0 },
    { label: '我能主动监控自己的学习进度。', score: 0 },
    { label: '我会在学习过程中评估自己的表现并做出调整。', score: 0 },
    { label: '遇到困难时，我知道可以向谁寻求帮助。', score: 0 },
    { label: '我愿意向他人寻求学习建议或支持。', score: 0 },
    { label: '我了解哪些学习策略最适合我自己。', score: 0 },
    { label: '我能够根据不同任务选择有效的学习方法。', score: 0 },
  ]);

  const submitSurvey = async () => {
    const unfilled = questions.value.find(q => q.score === 0);
    if (unfilled) {
      ElMessage.warning('请为每一道题目进行评分后再提交～');
      return;
    }
    const payload = Object.fromEntries(
      questions.value.map((q, i) => [`q${i + 1}_score`, q.score]),
    );
    emit('submitSRLSurvey', payload);
  };
</script>

<style scoped>
  .srl-survey {
    max-width: 900px;
    margin: 60px auto;
    padding: 40px;
    background: linear-gradient(to bottom right, #f3f9ff, #ffffff);
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
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
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 12px;
  }

  .rate {
    margin-left: 8px;
  }

  .submit-area {
    text-align: center;
    margin-top: 40px;
  }
</style>
