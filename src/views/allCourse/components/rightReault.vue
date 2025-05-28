<template>
  <div class="rightReault">
    <div
      class="resultListCon"
      v-for="item in courseListDataItem"
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
    <div class="demo-pagination-block" v-if="courseListDataItem.length > 0">
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
  import { onMounted, reactive, ref } from 'vue';
  import type { ComponentSize } from 'element-plus';
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
  const handleSizeChange = (val: number) => {
    page.pageSize = val;
    page.currentPage = 1;
    getCourseListItem(courseList);
  };
  const handleCurrentChange = (val: number) => {
    page.currentPage = val;
    getCourseListItem(courseList);
  };

  // 绑定事件
  emitter.on('sendClassifyData', value => {
    Object.assign(courseList, value);
    Object.assign(page, {
      currentPage: 1,
      pageSize: 10,
    });
    getCourseListItem(courseList);
  });
  // 绑定事件
  emitter.on('sendInput', value => {
    Object.assign(courseList, value);
    Object.assign(page, {
      currentPage: 1,
      pageSize: 10,
    });
    getCourseListItem(courseList);
  });
  // 声明 emit 的事件和类型
  const emit = defineEmits<{
    (e: 'send-value', payload: number): void;
  }>();
  // 获取项目列表
  const getCourseListItem = async (data: getCourseListRequest) => {
    Object.assign(courseList, page);
    const result = await getCourseList(data);
    console.log('课程列表数据', result.data);
    // 清空数组并将获取到的数据添加进去
    courseListDataItem.length = 0; // 清空数组
    courseListDataItem.push(...result.data); // 展开获取的结果并加入数组
    total.value = result.total; // 更新总数
    emit('send-value', result.total);
  };
  const handleClick = (item: CourseListData) => {
    // 跳转到问卷详情页
    window.location.href = item.src;
  };
  onMounted(() => {
    getCourseListItem(courseList);
  });
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
  .demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
  }
</style>
