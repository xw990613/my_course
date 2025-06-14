<template>
  <div class="rightReault">
    <!-- 骨架屏展示 -->
    <template v-if="loading">
      <div
        class="resultListCon"
        v-for="n in page.pageSize"
        :key="'skeleton-' + n"
      >
        <el-skeleton animated :throttle="{ initVal: true, leading: 1000 }">
          <template #template>
            <div class="resultListCon">
              <div class="leftImg">
                <el-skeleton-item
                  variant="image"
                  style="width: 266px; height: 150px"
                />
              </div>
              <div class="rightcon">
                <el-skeleton-item
                  variant="text"
                  style="width: 60%; margin-bottom: 10px"
                />
                <el-skeleton-item variant="text" style="width: 90%" />
                <el-skeleton-item variant="text" style="width: 80%" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>
    </template>

    <!-- 正常数据展示 -->
    <template v-else>
      <div
        class="resultListCon"
        v-for="(item, index) in courseListDataItem"
        :key="item.id"
      >
        <div class="leftImg" @click="handleClick(item)">
          <img :src="item.cover" />
        </div>
        <div class="rightcon">
          <div class="titletext">{{ item.course_name }}</div>
          <div class="teacher">
            <span class="teacher_con">{{ item.teacher }}</span>
            <span class="org_con">{{ item.school_name }}</span>
            <span class="person">{{ item.count }}人</span>
            <span @click="hendleCollect(item)">收藏</span>
          </div>
          <div class="info">{{ item.short_intro }}</div>
          <div class="evaluation" v-if="index < 10 && page.currentPage === 1">
            <span class="recommend" @click="handleEvaluation(item, true)">
              👍 有用
            </span>
            <span
              class="Not-recommended"
              @click="handleEvaluation(item, false)"
            >
              👎 无用
            </span>
          </div>
        </div>
      </div>
    </template>

    <el-button class="submit" @click="submitEvaluation">提交评估结果</el-button>

    <div
      class="demo-pagination-block"
      v-if="!loading && courseListDataItem.length > 0"
    >
      <el-pagination
        v-model:current-page="page.currentPage"
        v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'rightReault',
  };
</script>

<script setup lang="ts">
  import emitter from '@/utils/emitter';
  import { getCourseList } from '@/api/projectList';
  import type { getCourseListRequest } from '@/api/projectList';
  import { collectCourse } from '@/api/user';
  import { onMounted, reactive, ref } from 'vue';
  import { ElMessage, type ComponentSize } from 'element-plus';

  interface CourseList {
    status: number;
    org: number | string;
    selling_type: number;
    classify: number;
    currentPage: number;
    pageSize: number;
    query: string;
  }

  const courseList = reactive<CourseList>({
    status: 0,
    org: 0,
    selling_type: 0,
    classify: 0,
    currentPage: 1,
    pageSize: 10,
    query: '',
  });

  interface CourseListData {
    id: number;
    course_name: string;
    cover: string;
    school_name: string;
    selling_type: number;
    short_intro: string;
    src: string;
    status: number;
    tag_titles: string[];
    teacher: string;
    classify: number[];
    count: number;
  }

  const courseListDataItem = reactive<CourseListData[]>([]);
  const page = reactive({
    currentPage: 1,
    pageSize: 10,
  });
  const size = ref<ComponentSize>('default');
  const background = ref(false);
  const disabled = ref(false);
  const total = ref(0);
  const loading = ref(true); // 控制骨架屏加载状态

  const evaluationSelections = ref<(boolean | null)[]>([]);
  const courseIdIndexMap = ref<Record<number, number>>({});
  const srlDimensionList = ref<string[]>([]);

  const handleSizeChange = (val: number) => {
    page.pageSize = val;
    page.currentPage = 1;
    getCourseListItem(courseList);
  };

  const handleCurrentChange = (val: number) => {
    page.currentPage = val;
    getCourseListItem(courseList);
  };

  emitter.on('sendClassifyData', value => {
    Object.assign(courseList, value);
    Object.assign(page, {
      currentPage: 1,
      pageSize: 10,
    });
    getCourseListItem(courseList);
  });

  emitter.on('sendInput', value => {
    Object.assign(courseList, value);
    Object.assign(page, {
      currentPage: 1,
      pageSize: 10,
    });
    getCourseListItem(courseList);
  });

  const emit = defineEmits<{
    (e: 'send-value', payload: number): void;
  }>();

  const getCourseListItem = async (data: getCourseListRequest) => {
    loading.value = true;
    Object.assign(courseList, page);
    const result = await getCourseList(data);
    // 模拟延迟，方便看到骨架动画
    await new Promise(resolve => setTimeout(resolve, 600));
    courseListDataItem.length = 0;
    courseListDataItem.push(...result.data);
    total.value = result.total;
    emit('send-value', result.total);
    loading.value = false;

    evaluationSelections.value =
      total.value > 10 ? Array(10).fill(null) : Array(total.value).fill(null);

    result.data.forEach((item, index) => {
      courseIdIndexMap.value[item.id] = index;
    });
    srlDimensionList.value = [...result?.srlLabels];
  };

  const handleClick = (item: CourseListData) => {
    window.location.href = item.src;
  };

  onMounted(() => {
    getCourseListItem(courseList);
  });

  const submitEvaluation = async () => {
    const selections = evaluationSelections.value;
    if (selections.length === 0 || selections.some(s => s === null)) {
      ElMessage.warning('请对前10条课程进行评价');
      return;
    }
    const payload = {
      srl_dimensions: srlDimensionList.value,
      topk_selections: selections,
      total_recommendations: selections.length,
      total: total.value,
    };
    try {
      // await postEvaluationResult(payload);
      ElMessage.success('评估结果提交成功');
    } catch (error) {
      ElMessage.error('提交失败，请稍后再试');
    }
  };

  const handleEvaluation = (item: CourseListData, useful: boolean) => {
    const index = courseIdIndexMap.value[item.id];
    if (index !== undefined) {
      evaluationSelections.value[index] = useful;
    }
  };

  const hendleCollect = async (item: CourseListData) => {
    try {
      await collectCourse({ courseId: item.id });
    } catch (error) {
      console.log(error);
    }
  };
</script>

<style scoped lang="scss">
  .rightReault {
    margin-bottom: 10px;
    .resultListCon {
      display: flex;
      margin-bottom: 20px;
      cursor: pointer;
      .rightcon {
        width: 524px;
        .titletext {
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
          text-overflow: ellipsis;
          vertical-align: middle;
          white-space: nowrap;
          color: #333;
        }
        .teacher {
          color: #999;
          line-height: 17px;
          font-size: 12px;
          padding: 20px 0;
          .teacher_con {
            border-right: 1px solid #999;
            margin-right: 32px;
            padding-right: 32px;
          }
          .org_con,
          .person {
            margin-right: 32px;
          }
        }
        .info {
          color: #999;
          font-size: 14px;
          height: 66px;
          line-height: 22px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .evaluation {
          color: #999;
          font-size: 14px;
          display: flex;
          align-items: center;
          .recommend {
            color: #67c23a;
            margin-right: 30px;
          }
          .Not-recommended {
            color: #f56c6c;
          }
        }
      }
      .leftImg {
        border-radius: 6px;
        height: 150px;
        width: 266px;
        margin-right: 20px;
        img {
          border-radius: 6px;
          display: block;
          height: 100%;
          opacity: 1;
          position: relative;
          transition: opacity 0.3s ease 0s;
          width: 100%;
          z-index: 1;
        }
      }
    }
  }
  .demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
  }
  .submit {
    height: 40px;
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: #409eff;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
  }
</style>
