<template>
  <h2 class="page-title">Pre-SRLSurvey</h2>
  <div class="feedTablePre">
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
              Pre-SRLSurvey
            </h3>
            <el-table stripe :data="props?.row?.postSurveyData" :border="true">
              <el-table-column label="Question Number" prop="question_number" />
              <el-table-column label="Question" prop="content" />
              <el-table-column label="Score" prop="score" />
              <el-table-column label="SRL Dimension" prop="srlDimension" />
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
    <div class="demo-pagination-block pagination" style="margin-top: 30px">
      <el-pagination
        v-model:current-page="pageTable2.pageNum"
        v-model:page-size="pageTable2.pageSize"
        :page-sizes="[100, 200, 300, 400]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.table2.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'feedTablePre',
  };
</script>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { ComponentSize } from 'element-plus';
  import type {} from '@/api/avaluation';
  import dayjs from 'dayjs';
  import {
    PostSRLSurvey,
    caculateExamination,
    PostSRLSurveySRLdimension,
  } from '../const/index.ts';

  const pageTable2 = ref({ pageNum: 1, pageSize: 10 });
  const props = defineProps<{
    table2: {
      total: number;
      list: Array<{
        id: number;
        user_id: number;
        'Post-SRLSurvey': object | null;
        'Pre-SRLSurvey': object | null;
        UsabilitySurvey: object | null;
        submit_time: string;
      }>;
    };
  }>();
  const tableData = computed(() =>
    props.table2.list.map(item => {
      const survey = item['Pre-SRLSurvey'];
      const array = survey
        ? Object.entries(survey).map(([key, value], index) => {
            const postKey = `q${index + 1}_score` as keyof typeof PostSRLSurvey;
            const content = PostSRLSurvey[postKey];
            const postKeySRL =
              `q${index + 1}_score` as keyof typeof PostSRLSurveySRLdimension;
            const srlDimension = PostSRLSurveySRLdimension[postKeySRL];
            return {
              question_number: key,
              score: value,
              content,
              srlDimension,
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
  const size = ref<ComponentSize>('default');
  const background = ref(false);
  const disabled = ref(false);
  const emit = defineEmits<{
    (
      e: 'pageChange',
      params: { pageNum: number; pageSize: number; name: 'table2' },
    ): void;
    (
      e: 'pageSizeChange',
      params: { pageNum: number; pageSize: number; name: 'table2' },
    ): void;
  }>();
  const handleSizeChange = (val: number) => {
    emit('pageSizeChange', {
      pageNum: pageTable2.value.pageNum,
      pageSize: val,
      name: 'table2',
    });
  };
  const handleCurrentChange = (val: number) => {
    emit('pageChange', {
      pageNum: val,
      pageSize: pageTable2.value.pageSize,
      name: 'table2',
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
