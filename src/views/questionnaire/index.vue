<template>
  <div class="survey-container">
    <h1>自我调节学习（SRL）调查问卷</h1>
    <el-form @submit.prevent="submitForm">
      <el-form-item
        v-for="(item, index) in questionnaire"
        :key="index"
        :label="item.text"
      >
        <el-rate v-model="item.score" :max="5" show-text></el-rate>
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
  import { ElForm, ElFormItem, ElRate, ElButton } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { saveQuestionnaire } from '@/api/projectList';
  const router = useRouter();
  // 定义表单数据
  const questionnaire = reactive([
    {
      text: '在学习过程中，我是否经常因为缺乏动力、兴趣或目标而难以主动投入？',
      score: 0,
    },
    {
      text: '我是否会为自己的学习设定阶段目标，并制定清晰的计划以实现长短期目标？',
      score: 0,
    },
    {
      text: '我是否能合理安排每天的时间，避免拖延，提高任务完成的效率与节奏？',
      score: 0,
    },
    {
      text: '在学习中，我是否会关注自己的注意力状态，并定期自我评估学习效果？',
      score: 0,
    },
    {
      text: '当我遇到困难时，我是否愿意主动提问或寻求他人的帮助与反馈？',
      score: 0,
    },
    {
      text: '我是否擅长使用合适的学习策略或方法来完成任务，提升解决问题的能力？',
      score: 0,
    },
    {
      text: '我是否会在学习后反思经验，总结不足，并尝试改进学习方法？',
      score: 0,
    },
  ]);

  // 提交表单的处理函数
  const submitForm = async () => {
    try {
      await saveQuestionnaire(questionnaire);
      router.push('/layout/home');
    } catch (error) {
      console.error('问卷提交失败', error);
    }
  };
</script>

<style scoped lang="scss">
  .survey-container {
    width: 80%;
    max-width: 800px;
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
