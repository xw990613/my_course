<template>
  <div
    class="infinite-list"
    v-infinite-scroll="load"
    :infinite-scroll-immediate="false"
  >
    <Carousel></Carousel>
    <Partnter></Partnter>
    <div class="rightReault">
      <div
        class="resultListCon"
        v-for="item in tableData"
        :key="item.id"
        @click="handleClick(item)"
      >
        <div class="leftImg">
          <img :src="item.cover" />
        </div>
        <div class="rightcon">
          <div class="titletext">{{ item.course_name }}</div>
          <div class="teacher">
            <span class="teacher_con">{{ item.teacher }}</span>
            <span class="org_con">{{ item.school_name }}</span>
            <span>{{ item.count }}人</span>
          </div>
          <div class="info">
            {{ item.short_intro }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="bottom-loading"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-teleported="false"
    ></div>
    <p v-if="!hasMore" style="text-align: center">No more</p>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'my-home',
  };
</script>

<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import Carousel from './Carousel.vue';
  import Partnter from './Partnter.vue';
  import { getQuestionnaireList } from '@/api/projectList';
  import type { questionnaireData, CourseListData } from '@/api/projectList';
  import { getHomeQuestionnaire } from '@/api/avaluation';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  let questionnaire: questionnaireData[] = [];
  const page = reactive({
    pageSize: 10,
    currentPage: 1,
  });
  const tableData = reactive<CourseListData[]>([]);
  // 3. 是否还有更多数据
  const hasMore = ref(true);
  // 4. 加载状态，防止重复加载
  const loading = ref(false);

  const PostSRLSurveySRLdimension = {
    q1_score: t('questionnaire.srlSurvey.q1_score'),
    q2_score: t('questionnaire.srlSurvey.q2_score'),
    q3_score: t('questionnaire.srlSurvey.q3_score'),
    q4_score: t('questionnaire.srlSurvey.q4_score'),
    q5_score: t('questionnaire.srlSurvey.q5_score'),
    q6_score: t('questionnaire.srlSurvey.q6_score'),
    q7_score: t('questionnaire.srlSurvey.q7_score'),
  };

  const load = async () => {
    if (loading.value || !hasMore.value) return; // 防止重复或无更多数据
    loading.value = true;
    try {
      const res = await getQuestionnaireList({ ...page, questionnaire });
      const list = res?.data || [];
      if (list.length === 0) {
        hasMore.value = false; // 没有更多数据
      } else {
        tableData.push(...list); // 追加数据
        page.currentPage++; // 下一页
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };
  const handleClick = (item: CourseListData) => {
    // 跳转到问卷详情页
    window.location.href = item.src;
  };
  onMounted(async () => {
    try {
      const res = await getHomeQuestionnaire();
      questionnaire = transformToTextScoreArray(
        res?.data,
        PostSRLSurveySRLdimension,
      );

      load(); // 初始加载
    } catch (error) {
      console.error('获取问卷数据失败', error);
    }
  });
  function transformToTextScoreArray(
    data: Record<string, number>,
    textMap: Record<string, string>,
  ): { text: string; score: number }[] {
    return Object.entries(data).map(([key, score]) => ({
      text: textMap[key] || key,
      score,
    }));
  }
</script>

<style scoped lang="scss">
  .infinite-list {
    padding: 0;
    margin: 0;
    list-style: none;
    position: relative;
    min-height: 180px;
  }
  .infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
  }
  .infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
  }
  .rightReault {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 50px;
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
          .org_con {
            margin-right: 32px;
          }
        }
        .info {
          color: #999;
          font-size: 14px;
          height: 66px;
          line-height: 22px;
          overflow: hidden; /* 隐藏超出部分 */
          display: -webkit-box; /* 使元素成为伸缩盒子 */
          -webkit-line-clamp: 3; /* 限制最多显示三行 */
          line-clamp: 3; /* 标准属性 */
          -webkit-box-orient: vertical; /* 设置多行文本的排列方式为纵向 */
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
  .bottom-loading {
    height: 180px;
    position: relative; // 必须要有
    text-align: center;
  }
</style>
