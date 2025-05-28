<template>
  <div class="logo-row">
    <img
      v-for="(item, index) in partnerList"
      :key="index"
      :src="item.big_logo_name"
    />
  </div>
  <el-divider
    class="newCourse-footer"
    content-position="right"
    border-style="solid"
    >Our Partner Institutions</el-divider
  >
</template>

<script lang="ts">
  export default {
    name: 'my-partnter',
  };
</script>

<script setup lang="ts">
  import upmlogo from '@/assets/img/20170406143426UPM-New_FINAL.jpg';
  import XIANlogo from '@/assets/img/6152680753c26f851eeb9b0ef9ca56f1.xajtdx.png';
  import Pekinglogo from '@/assets/img/15735507062765.png';
  import Beijinglogo from '@/assets/img/15740725373067.png';
  const partnerList = [
    {
      name: 'Tsinghua University',
      big_logo_name:
        'https://proxt-cdn.xuetangx.com/fe-proxtassets/xuetangX/0420/tshinghua.png',
    },
    {
      name: 'St Petersburg University',
      big_logo_name:
        'https://proxt-cdn.xuetangx.com/fe-proxtassets/xuetangX/0420/petersburg.png',
    },
    {
      name: 'The Open University',
      big_logo_name:
        'https://proxt-cdn.xuetangx.com/fe-proxtassets/xuetangX/0420/openuniversity.png',
    },
    {
      name: 'UPM',
      big_logo_name: upmlogo,
    },
    {
      name: 'Peking University',
      big_logo_name: Beijinglogo,
    },
    {
      name: '北京师范大学',
      big_logo_name: Pekinglogo,
    },
    {
      name: '西安交通大学',
      big_logo_name: XIANlogo,
    },
  ];
</script>

<style scoped lang="scss">
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .logo-row {
    display: flex;
    justify-content: space-between; // 或者 space-around、space-evenly
    align-items: center;
    flex-wrap: nowrap; // 可选：wrap / nowrap 看你是否想自动换行
    gap: 40px 20px; // 控制横向与纵向间距
    padding: 15px 20px;
  }

  .logo-row img {
    height: 110px;
    object-fit: contain;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    cursor: pointer;
  }

  .logo-row img:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  .newCourse-footer {
    background: #fff;
    color: #666;
    font-size: 12px;
    letter-spacing: 4px;
    padding-left: 30px;
  }

  .el-divider.el-divider--horizontal {
    width: auto !important;
  }
</style>
