<template>
  <div class="leftSearch" style="max-width: 230px">
    <el-card v-for="item in allData" :key="item.id">
      <template #header>
        <div class="card-header">
          <p class="t1">{{ item.label }}</p>
        </div>
      </template>
      <div class="item t3">
        <span
          v-for="i in item.list"
          :class="{ active: i.selected }"
          :key="i.id"
          @click="selectItem(i, item)"
          >{{ i.name_zh }}</span
        >
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'leftSearch',
  };
</script>

<script setup lang="ts">
  import { getProjectList } from '@/api/projectList';
  import { reactive, onMounted, ref } from 'vue';
  import emitter from '@/utils/emitter';
  // eslint-disable-next-line prefer-const
  let classify_id = ref(0);
  // eslint-disable-next-line prefer-const
  let status_id = ref(0);
  // eslint-disable-next-line prefer-const
  let org_id = ref(0);
  // eslint-disable-next-line prefer-const
  let selling_type_id = ref(0);

  // 定义项的类型
  interface Item {
    id: number;
    name_zh: string;
    name_en: string;
    selected?: boolean; // 添加选中属性
  }

  // 定义每个分类的类型
  interface Category {
    id: number;
    label: string;
    list: Item[]; // 确保 list 是 Item 数组
  }
  const classify_list: Category = {
    id: 1,
    label: '学科分类',
    list: [{ id: 0, name_zh: '全部', name_en: 'all', selected: true }],
  };
  const status: Category = {
    id: 2,
    label: '上课状态',
    list: [{ id: 0, name_zh: '全部', name_en: 'all', selected: true }],
  };
  const org: Category = {
    id: 3,
    label: '学校',
    list: [{ id: 0, name_zh: '全部', name_en: 'all', selected: true }],
  };
  const selling_type: Category = {
    id: 4,
    label: '课程类型',
    list: [{ id: 0, name_zh: '全部', name_en: 'all', selected: true }],
  };
  // 使用 reactive 使 allData 成为响应式数据
  const allData = reactive([classify_list, status, org, selling_type]);
  const getProject = async () => {
    const { data } = await getProjectList();

    // 处理数据
    // 使用响应式方式更新每个分类
    allData[0].list = classify_list.list.concat(data.classify_list);
    allData[1].list = status.list.concat(data.status);
    allData[2].list = org.list.concat(data.org);
    allData[3].list = selling_type.list.concat(data.selling_type);
  };
  const selectItem = (i: any, item: any) => {
    // 取消选中其他项
    item.list.forEach((i: any) => {
      i.selected = false;
    });
    // 选中当前项
    i.selected = true;
    // 处理选中项的逻辑
    // 例如，发送请求或更新状态等

    if (item.id === 1) {
      // 处理学科分类的选中项
      classify_id.value = i.id;
    } else if (item.id === 2) {
      // 处理上课状态的选中项
      status_id.value = i.id;
    } else if (item.id === 3) {
      // 处理学校的选中项
      org_id.value = i.id;
    } else if (item.id === 4) {
      // 处理课程类型的选中项
      selling_type_id.value = i.id;
    }
    emitter.emit('sendClassifyData', {
      classify: classify_id.value,
      status: status_id.value,
      org: org_id.value,
      selling_type: selling_type_id.value,
      query: '',
    });
  };

  onMounted(() => {
    getProject();
  });
</script>

<style scoped lang="scss">
  .leftSearch {
    box-shadow: var(--el-box-shadow-light);
    border: 1px solid var(--el-card-border-color);
    .item {
      display: flex;
      gap: 10px; /* 为标签项之间增加间距 */
      flex-wrap: wrap; /* 允许标签项换行 */
    }
    .t1 {
      background: #f6f6f6;
      color: #666;
      font-size: 14px;
      line-height: 30px;
      margin-bottom: 5px;
      padding-left: 10px;
    }
    .t3 {
      color: #999;
      cursor: pointer;
      font-size: 14px;
    }
    .active {
      color: #1769fe;
    }
  }
  ::v-deep(.el-card__header) {
    border-bottom: none;
    padding: 10px;
  }
  ::v-deep(.el-card__body) {
    padding: 20px;
    padding-top: 0;
  }
  ::v-deep(.el-card) {
    border: none;
    box-shadow: none;
  }
</style>
