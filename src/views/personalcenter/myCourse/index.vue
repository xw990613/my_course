<template>
  <div v-if="tableData.length > 0">
    <div>
      <el-button
        type="primary"
        @click="handleOperate"
        style="margin-bottom: 10px"
        >{{ $t('button.BatchOperations') }}</el-button
      >
      <div v-if="isOperate">
        <el-button type="primary" @click="handleAll" v-if="!isAll">{{
          $t('button.SelectAll')
        }}</el-button>
        <el-button type="primary" @click="handleCancelAll" v-else>{{
          $t('button.Cancel')
        }}</el-button>
        <el-button type="primary" @click="cancelCollect">{{
          $t('button.Delete')
        }}</el-button>
      </div>
    </div>
    <div class="rightReault">
      <div
        class="resultListCon"
        v-for="item in tableData"
        :key="item.id"
        @click="handleClick(item)"
      >
        <el-checkbox
          v-model="item.selected"
          size="large"
          style="margin-right: 20px"
          @click.stop
          v-if="isOperate"
        />
        <div class="leftImg">
          <img :src="item.cover" />
        </div>
        <div class="rightcon">
          <div class="titletext">{{ item.course_name }}</div>
          <div class="teacher">
            <span class="teacher_con">{{ item.teacher }}</span>
            <span class="org_con">{{ item.school_name }}</span>
            <span>{{ item.count }}</span>
          </div>
          <div class="info">
            {{ item.short_intro }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-empty v-else :description="$t('common.NoData')" />
</template>

<script lang="ts">
  export default {
    name: 'myCourse',
  };
</script>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { getCollectCourse, cancelCollectCourse } from '@/api/user';
  import type { CourseListData } from '@/api/projectList';
  import { ElMessage } from 'element-plus';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const tableData = reactive<CourseListData[]>([]);
  const isAll = ref(false);
  const isOperate = ref(false);
  onMounted(async () => {
    try {
      const { data } = await getCollectCourse();
      tableData.length = 0; // 清空响应式数组
      tableData.push(...data.map(item => ({ ...item, selected: false })));
    } catch (error) {}
  });
  const handleClick = (item: CourseListData) => {
    // 跳转到问卷详情页
    window.location.href = item.src;
  };
  // 全选
  const handleAll = () => {
    tableData.forEach(item => {
      item.selected = true;
    });
    isAll.value = true;
  };
  // 取消全选
  const handleCancelAll = () => {
    tableData.forEach(item => {
      item.selected = false;
    });
    isAll.value = false;
  };

  // 取消收藏
  const cancelCollect = async () => {
    const selectedIds = tableData
      .filter(item => item.selected)
      .map(item => item.id);

    if (selectedIds.length === 0) {
      return ElMessage.warning(t('message.selectCourse'));
    }

    try {
      await cancelCollectCourse({ courseIds: selectedIds });
      selectedIds.forEach(id => {
        const index = tableData.findIndex(item => item.id === id);
        if (index !== -1) tableData.splice(index, 1);
      });
      ElMessage.success(t('message.cancelSuccess'));
      isOperate.value = false;
      isAll.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  // 批量操作
  const handleOperate = () => {
    isOperate.value = !isOperate.value;
    tableData.forEach(item => {
      item.selected = false;
    });
  };
</script>

<style scoped lang="scss">
  .rightReault {
    margin-bottom: 10px;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
</style>
