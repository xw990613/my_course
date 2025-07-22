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
            <span class="person">{{ item.count }}</span>
            <span @click="hendleCollect(item)">
              <i
                class="iconfont icon-shoucang"
                :class="{ active: collectedCourseMap[item.id] }"
              ></i>
            </span>
          </div>
          <div class="info">{{ item.short_intro }}</div>
          <div class="evaluation" v-if="index < 10 && page.currentPage === 1">
            <span class="recommend" @click="handleEvaluation(item, true)">
              <i
                class="iconfont icon-dianzan"
                :class="{
                  active:
                    evaluationSelections[courseIdIndexMap[item.id]] === true,
                }"
              ></i>
            </span>
            <span
              class="Not-recommended"
              @click="handleEvaluation(item, false)"
            >
              <i
                class="iconfont icon-cai"
                :class="{
                  active:
                    evaluationSelections[courseIdIndexMap[item.id]] === false,
                }"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </template>

    <el-button class="submit" @click="submitEvaluation">{{
      $t('button.submit')
    }}</el-button>

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

<script lang="ts" setup>
  import emitter from '@/utils/emitter';
  import { getCourseList } from '@/api/projectList';
  import type { getCourseListRequest } from '@/api/projectList';
  import { collectCourse } from '@/api/user';
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { save_evaluation } from '@/api/avaluation';
  import { ElMessage, type ComponentSize } from 'element-plus';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
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
  const page = reactive({ currentPage: 1, pageSize: 10 });
  const size = ref<ComponentSize>('default');
  const background = ref(false);
  const disabled = ref(false);
  const total = ref(0);
  const loading = ref(true);

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
    Object.assign(page, { currentPage: 1, pageSize: 10 });
    getCourseListItem(courseList);
  });

  emitter.on('sendInput', value => {
    Object.assign(courseList, value);
    Object.assign(page, { currentPage: 1, pageSize: 10 });
    getCourseListItem(courseList);
  });

  onUnmounted(() => {
    emitter.off('sendInput');
  });

  const emit = defineEmits<{ (e: 'send-value', payload: number): void }>();

  const getCourseListItem = async (data: getCourseListRequest) => {
    loading.value = true;
    Object.assign(courseList, page);
    const result = await getCourseList(data);
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
      ElMessage.warning(t('message.evaluate'));
      return;
    }
    const payload = {
      srl_dimensions: srlDimensionList.value,
      topk_selections: selections,
      total_recommendations: selections.length,
      total: total.value,
    };
    try {
      await save_evaluation(payload);
      ElMessage.success(t('message.submitSuccess'));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEvaluation = (item: CourseListData, useful: boolean) => {
    const index = courseIdIndexMap.value[item.id];
    if (index !== undefined) {
      const current = evaluationSelections.value[index];
      if (current === useful) {
        evaluationSelections.value[index] = null;
      } else {
        evaluationSelections.value[index] = useful;
      }
    }
  };

  // 用于记录收藏状态
  const collectedCourseMap = ref<Record<number, boolean>>({});

  // 收藏功能：切换状态
  const hendleCollect = async (item: CourseListData) => {
    try {
      const res = await collectCourse({ courseId: item.id });
      if (res.status === 1) {
        collectedCourseMap.value[item.id] = !collectedCourseMap.value[item.id];
      }
      ElMessage.success(res.message);
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
        width: 560px;
        .titletext {
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
          text-overflow: ellipsis;
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
            margin-right: 30px;
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
          width: 100%;
        }
      }
    }
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
  .iconfont {
    font-size: 24px;
    color: #ccc;
    transition: color 0.3s;
    cursor: pointer;
  }
  .icon-shoucang {
    font-size: 16px;
  }
  .iconfont:hover {
    color: #f6c144;
  }

  .iconfont.active {
    color: #f6c144;
  }
</style>
