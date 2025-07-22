<template>
  <div class="feedback-header">
    <h2 class="page-title">{{ $t('common.FeedbackCenter') }}</h2>
    <p class="page-description">
      {{ $t('common.description') }}
    </p>
    <p class="page-description">
      {{ $t('common.fillIn') }}
    </p>
    <el-button
      type="primary"
      style="margin-left: 16px"
      class="open-button"
      @click="drawer2 = true"
    >
      {{ $t('common.fillQuestionnaire') }}
    </el-button>
    <el-drawer
      v-model="drawer2"
      :direction="direction"
      size="50%"
      :before-close="handleClose"
      append-to-body
    >
      <template #header>
        <h4>Questionnaire</h4>
      </template>
      <template #default>
        <div class="drawer-content">
          <el-collapse accordion v-model="activeNames">
            <el-collapse-item title="Likert-scale usability survey" name="1">
              <UsabilitySurvey @submitUsabilitySurvey="handleUsabilitySubmit" />
            </el-collapse-item>
            <el-collapse-item
              title="SRL-awareness and self-efficacy questionnaire"
              name="2"
            >
              <SRLSurvey @submitSRLSurvey="handleSRLSubmit" />
            </el-collapse-item>
          </el-collapse>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">
            {{ $t('button.submit') }}</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
  <div class="table">
    <FeedTablePost
      :table1="table1"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
    />
    <FeedTablePre
      :table2="table2"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
    />
    <SrlSurveyTable
      :table3="table3"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
    />
  </div>
  <div class="ecahrts">
    <SrlSurveyComparisonChart
      :preScores="preScores"
      :postScores="postScores"
    ></SrlSurveyComparisonChart>
    <UsabilityBarChart :scores="scores"></UsabilityBarChart>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'feedbackCenter',
  };
</script>

<script setup lang="ts">
  import UsabilitySurvey from '@/views/personalcenter/feedbackCenter/components/UsabilitySurvey.vue';
  import SRLSurvey from '@/views/personalcenter/feedbackCenter/components/SRLSurvey.vue';
  import { ref } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import type { DrawerProps } from 'element-plus';
  import {
    saveQuestionnaire,
    getQuestionnaire,
    getAverage,
  } from '@/api/avaluation';
  import FeedTablePost from './components/feedTablePost.vue';
  import FeedTablePre from './components/feedTablePre.vue';
  import SrlSurveyTable from './components/srlSurveyTable.vue';
  import type { QuestionnaireItem, params } from '@/api/avaluation';
  import SrlSurveyComparisonChart from './echarts/SrlSurveyComparisonChart.vue';
  import UsabilityBarChart from './echarts/UsabilityBarChart.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const pageTable1 = ref({ pageNum: 1, pageSize: 10 });
  const pageTable2 = ref({ pageNum: 1, pageSize: 10 });
  const pageTable3 = ref({ pageNum: 1, pageSize: 10 });
  const preScores = ref<number[]>([]);
  const postScores = ref<number[]>([]);
  const scores = ref<number[]>([]);
  const table1 = ref<{
    total: number;
    list: QuestionnaireItem[];
  }>({
    total: 0,
    list: [],
  });

  const table2 = ref<{
    total: number;
    list: QuestionnaireItem[];
  }>({
    total: 0,
    list: [],
  });

  const table3 = ref<{
    total: number;
    list: QuestionnaireItem[];
  }>({
    total: 0,
    list: [],
  });

  const drawer2 = ref(false);
  const direction = ref<DrawerProps['direction']>('rtl');
  const UsabilitySurveyData = ref({});
  const SRLSurveyData = ref({});
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure you want to close this?')
      .then(() => {
        done();
      })
      .catch(() => {
        // catch error
      });
  };
  function cancelClick() {
    drawer2.value = false;
  }
  function confirmClick() {
    if (
      Object.keys(UsabilitySurveyData.value).length === 0 ||
      Object.keys(SRLSurveyData.value).length === 0
    ) {
      ElMessageBox.alert(t('message.hint'), t('common.hint'), {
        confirmButtonText: 'OK',
        type: 'warning',
      });
      return;
    }

    ElMessageBox.confirm(`Are you sure you want to submit the questionnaire?`)
      .then(async () => {
        await saveQuestionnaireData();
        drawer2.value = false;
      })
      .catch(() => {
        // catch error
      });
  }
  const handleUsabilitySubmit = (data: Record<string, number>) => {
    UsabilitySurveyData.value = data;
    if (Object.keys(SRLSurveyData.value).length === 0) {
      activeNames.value = '2'; // 自动切换到SRL问卷
    } else {
      activeNames.value = '';
    }
  };
  const handleSRLSubmit = (data: Record<string, number>) => {
    SRLSurveyData.value = data;
    if (Object.keys(UsabilitySurveyData.value).length === 0) {
      activeNames.value = '1'; // 自动切换到Usability问卷
    } else {
      activeNames.value = '';
    }
  };
  const activeNames = ref('1');
  const saveQuestionnaireData = async () => {
    try {
      const result = await saveQuestionnaire({
        UsabilitySurvey: UsabilitySurveyData.value,
        'Post-SRLSurvey': SRLSurveyData.value,
      });
      ElMessage.success(result.message);
    } catch (error: any) {
      console.log(error);
    }
  };
  const getTableData = async (params: params, name: string) => {
    try {
      const result = await getQuestionnaire(params);
      const {
        data: { list, total },
        message,
      } = result;

      if (name === 'table1') {
        table1.value = { total, list };
      } else if (name === 'table2') {
        table2.value = { total, list };
      } else if (name === 'table3') {
        table3.value = { total, list };
      } else {
        table1.value = { total, list };
        table2.value = { total, list };
        table3.value = { total, list };
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  getTableData(pageTable1.value, '');
  const handlePageChange = (params: {
    pageNum: number;
    pageSize: number;
    name: string;
  }) => {
    if (params.name === 'table2') {
      pageTable2.value.pageNum = params.pageNum;
      pageTable2.value.pageSize = params.pageSize;
      getTableData(pageTable2.value, params.name);
      return;
    }
    if (params.name === 'table3') {
      pageTable3.value.pageNum = params.pageNum;
      pageTable3.value.pageSize = params.pageSize;
      getTableData(pageTable3.value, params.name);
      return;
    } else {
      pageTable1.value.pageNum = params.pageNum;
      pageTable1.value.pageSize = params.pageSize;
      getTableData(pageTable1.value, params.name);
    }
  };
  const handlePageSizeChange = (params: {
    pageNum: number;
    pageSize: number;
    name: string;
  }) => {
    if (params.name === 'table2') {
      pageTable2.value.pageNum = params.pageNum;
      pageTable2.value.pageSize = params.pageSize;
      getTableData(pageTable2.value, params.name);
      return;
    } else if (params.name === 'table3') {
      pageTable3.value.pageNum = params.pageNum;
      pageTable3.value.pageSize = params.pageSize;
      getTableData(pageTable3.value, params.name);
      return;
    } else {
      pageTable1.value.pageNum = params.pageNum;
      pageTable1.value.pageSize = params.pageSize;
      getTableData(pageTable1.value, params.name);
    }
  };
  const getAverageScore = async () => {
    try {
      const { data } = await getAverage();
      preScores.value = data.preScores;
      postScores.value = data.postScores;
      scores.value = data.usabilityScores;
    } catch (error) {
      console.log(error);
    }
  };
  getAverageScore();
</script>

<style scoped lang="scss">
  .feedback-header {
    max-width: 900px;
    margin: 0px auto 40px;
    padding: 30px 40px;
    background: linear-gradient(to right, #f4f9ff, #ffffff);
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
    text-align: center;
    animation: fadeIn 0.5s ease-out both;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 16px;
  }

  .page-description {
    font-size: 15px;
    color: #555;
    margin-bottom: 8px;
    line-height: 1.6;
  }

  .open-button {
    margin-top: 20px;
    padding: 10px 32px;
    font-size: 16px;
    border-radius: 8px;
  }
  .drawer-content {
    animation: slideFadeInFromRight 0.5s ease-out both;
    padding: 20px;
    width: 100%;
  }
  /* Optional: 淡入动效 */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideFadeInFromRight {
    from {
      opacity: 0;
      transform: translateX(50px); // 从右向左
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .ecahrts {
    margin-bottom: 30px;
  }
</style>
