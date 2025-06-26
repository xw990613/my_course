<template>
  <div class="leftSearch" style="max-width: 230px">
    <!-- 加载中骨架屏 -->
    <template v-if="loading">
      <el-skeleton
        v-for="n in 4"
        :key="'skeleton-filter-' + n"
        :throttle="{ initVal: true, leading: 1000 }"
        animated
      >
        <template #template>
          <el-card>
            <template #header>
              <el-skeleton-item variant="text" style="width: 60%" />
            </template>
            <div class="item t3">
              <el-skeleton-item
                v-for="i in 5"
                :key="i"
                variant="text"
                style="width: 50px; margin-right: 10px"
              />
            </div>
          </el-card>
        </template>
      </el-skeleton>
    </template>

    <!-- 加载完成后的真实内容 -->
    <template v-else>
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
            >{{ language === 'zh' ? i.name_zh : i.name_en }}</span
          >
        </div>
      </el-card>
    </template>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'leftSearch',
  };
</script>

<script setup lang="ts">
  import { getProjectList } from '@/api/projectList';
  import { reactive, onMounted, ref, computed } from 'vue';
  import emitter from '@/utils/emitter';

  const classify_id = ref(0);
  const status_id = ref(0);
  const org_id = ref(0);
  const selling_type_id = ref(0);
  const loading = ref(true); // 控制骨架屏展示

  interface Item {
    id: number;
    name_zh: string;
    name_en: string;
    selected?: boolean;
  }

  interface Category {
    id: number;
    label: string;
    list: Item[];
  }

  const language = computed(() => {
    return localStorage.getItem('lang');
  });

  const classify_list: Category = {
    id: 1,
    label: language.value === 'zh' ? '学科分类' : 'Subjects',
    list: [{ id: 0, name_zh: '全部', name_en: 'all', selected: true }],
  };
  const status: Category = {
    id: 2,
    label: language.value === 'zh' ? '上课状态' : 'Availability',
    list: [{ id: 0, name_zh: '全部', name_en: 'all', selected: true }],
  };
  const org: Category = {
    id: 3,
    label: language.value === 'zh' ? '学校' : 'Schools & Partners',
    list: [{ id: 0, name_zh: '全部', name_en: 'all', selected: true }],
  };
  const selling_type: Category = {
    id: 4,
    label: language.value === 'zh' ? '课程类型' : 'Products',
    list: [{ id: 0, name_zh: '全部', name_en: 'all', selected: true }],
  };

  const allData = reactive([classify_list, status, org, selling_type]);

  const getProject = async () => {
    loading.value = true;
    const { data } = await getProjectList();
    await new Promise(resolve => setTimeout(resolve, 300)); // 模拟加载延迟，展示骨架屏
    allData[0].list = classify_list.list.concat(data.classify_list);
    allData[1].list = status.list.concat(data.status);
    allData[2].list = org.list.concat(data.org);
    allData[3].list = selling_type.list.concat(data.selling_type);
    loading.value = false;
  };

  const selectItem = (i: any, item: any) => {
    item.list.forEach((i: any) => {
      i.selected = false;
    });
    i.selected = true;

    if (item.id === 1) {
      classify_id.value = i.id;
    } else if (item.id === 2) {
      status_id.value = i.id;
    } else if (item.id === 3) {
      org_id.value = i.id;
    } else if (item.id === 4) {
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
      gap: 10px;
      flex-wrap: wrap;
      cursor: pointer;
    }
    .item span:hover {
      color: #1769fe;
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
