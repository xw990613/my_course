<template>
  <h2 class="page-title">System Usability Questionnaire</h2>
  <div class="feedTablePost">
    <el-table
      :data="tableData"
      stripe
      :border="true"
      :preserve-expanded-content="true"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div v-if="props.row?.postSurveyData">
            <h3
              style="text-align: center; margin-top: 16px; margin-bottom: 16px"
            >
              Various scoring indicators
            </h3>
            <el-table stripe :data="props?.row?.postSurveyData" :border="true">
              <el-table-column label="Question Number" prop="question_number" />
              <el-table-column label="Question" prop="content" />
              <el-table-column label="Score" prop="score" />
              <el-table-column
                label="Rating Explanation"
                prop="RatingExplanation"
              />
            </el-table>
          </div>
          <div v-else>暂无数据</div>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" />
      <el-table-column label="Submission Time" prop="submit_time" />
    </el-table>
    <div
      class="demo-pagination-block pagination"
      style="margin-top: 30px; margin-bottom: 30px"
    >
      <el-pagination
        v-model:current-page="pageTable3.pageNum"
        v-model:page-size="pageTable3.pageSize"
        :page-sizes="[100, 200, 300, 400]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.table3.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'feedTablePost',
  };
</script>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { ComponentSize } from 'element-plus';
  import dayjs from 'dayjs';
  import { caculateExamination, srlSurvey } from '../const/index.ts';

  const pageTable3 = ref({ pageNum: 1, pageSize: 10 });
  const props = defineProps<{
    table3: {
      total: number;
      list: Array<{
        id: number;
        user_id: number;
        'Post-UsabilitySurvey': object | null;
        'Pre-UsabilitySurvey': object | null;
        SRLSurvey: object | null;
        submit_time: string;
      }>;
    };
  }>();
  const tableData = computed(() =>
    props.table3.list.map(item => {
      const survey = item['SRLSurvey'];
      const array = survey
        ? Object.entries(survey).map(([key, value], index) => {
            const postKey = `q${index + 1}_score` as keyof typeof srlSurvey;
            const content = srlSurvey[postKey];
            return {
              question_number: key,
              score: value,
              content,
              RatingExplanation: caculateExamination(value),
            };
          })
        : [];
      return {
        id: item.id,
        submit_time: dayjs(item.submit_time).format('YYYY-MM-DD HH:mm:ss'),
        postSurveyData: array,
      };
    }),
  );
  console.log(tableData, '@@@');
  const size = ref<ComponentSize>('default');
  const background = ref(false);
  const disabled = ref(false);
  const emit = defineEmits<{
    (
      e: 'pageChange',
      params: { pageNum: number; pageSize: number; name: 'table3' },
    ): void;
    (
      e: 'pageSizeChange',
      params: { pageNum: number; pageSize: number; name: 'table3' },
    ): void;
  }>();
  const handleSizeChange = (val: number) => {
    emit('pageSizeChange', {
      pageNum: pageTable3.value.pageNum,
      pageSize: val,
      name: 'table3',
    });
  };
  const handleCurrentChange = (val: number) => {
    emit('pageChange', {
      pageNum: val,
      pageSize: pageTable3.value.pageSize,
      name: 'table3',
    });
  };
</script>

<style scoped lang="scss">
  .page-title {
    font-size: 20px;
    font-weight: 700;
    color: #2c3e50;
    text-align: center;
    margin: 30px 0 20px;
    letter-spacing: 0.5px;
    background: linear-gradient(to right, #2c3e50, #4ca1af);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeIn 0.6s ease-in-out both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
