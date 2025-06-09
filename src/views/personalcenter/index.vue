<template>
  <div class="personalCenter">
    <el-col :span="3" class="sidebar">
      <!-- 一、头像区域 -->
      <div class="profile-area">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          action="http://127.0.0.1:3007/avatar"
          :headers="uploadHeaders"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="onAvatarUpload"
          :on-error="onAvatarUploadError"
          :limit="1"
          accept="image/*"
        >
          <!-- 头像 -->
          <el-avatar :size="80" :src="avatarUrl" />
          <!-- 编辑图标 -->
          <div class="avatar-edit">
            <el-icon><Edit /></el-icon>
          </div>
        </el-upload>

        <!-- 用户名（可选） -->
        <div class="username">{{ username }}</div>
      </div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        router
        :ellipsis="false"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/layout/personalCenter/personalInformation">
          <el-icon><icon-menu /></el-icon>
          <span>{{ $t('common.PersonalData') }}</span>
        </el-menu-item>
        <el-menu-item index="/layout/personalCenter/metricAnalysis">
          <el-icon><document /></el-icon>
          <span>{{ $t('homePage.MetricAnalysis') }}</span>
        </el-menu-item>
        <el-menu-item index="/layout/personalCenter/myCourse">
          <el-icon><setting /></el-icon>
          <span>{{ $t('homePage.MyCourse') }}</span>
        </el-menu-item>
        <el-menu-item index="/layout/personalCenter/feedbackCenter">
          <el-icon><setting /></el-icon>
          <span>{{ $t('homePage.FeedbackCenter') }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'personalCenter',
  };
</script>

<script setup lang="ts">
  import {
    Document,
    Menu as IconMenu,
    Setting,
    Edit,
  } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { useAuthStore } from '@/stores/auth';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const activeIndex = ref(route.path);
  // 监听路由变化，更新activeIndex
  watch(
    () => route.path,
    newPath => {
      activeIndex.value = newPath;
      console.log('路由变化更新activeIndex:', newPath);
    },
  );
  const uploadRef = ref();
  // 👇 默认头像地址
  const DEFAULT_AVATAR =
    'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
  const username = ref('');
  const auth = useAuthStore();

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  const uploadHeaders = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Accept-Language': localStorage.getItem('lang'),
  };
  const avatarUrl = ref(DEFAULT_AVATAR);
  // 页面加载后侦听 userInfo 自动赋值
  watch(
    () => auth.userInfo,
    val => {
      if (val) {
        avatarUrl.value =
          import.meta.env.VITE_API_BASE_URL + val.user_pic || DEFAULT_AVATAR;
        username.value = val.username || '未命名用户';
      }
    },
    { immediate: true },
  );

  // 上传成功回调
  async function onAvatarUpload(res: any) {
    console.log(res, '@@@');
    if (res.code === 0) {
      // 重要：清除上传列表，防止限制限制再次触发
      uploadRef.value?.clearFiles();
      await auth.getUserInfo();
      ElMessage.success('头像更新成功');
    } else {
      ElMessage.error('上传失败，请重试');
    }
  }
  function onAvatarUploadError(err: any) {
    ElMessage.error('上传失败，请检查网络或文件格式');
  }

  // 限制图片格式和大小
  function beforeAvatarUpload(file: File) {
    console.log(file, '@@@');
    const isImage = /^image\/(jpeg|png|gif|webp)$/.test(file.type);
    const isLt2M = file.size / 1024 / 1024 < 10; // 小于 4MB

    if (!isImage) {
      ElMessage.error('只能上传 JPG/PNG/GIF/WEBP 格式的图片');
    }
    if (!isLt2M) {
      ElMessage.error('头像图片大小不能超过 10MB');
    }
    return isImage && isLt2M;
  }
</script>

<style scoped lang="scss">
  .personalCenter {
    max-width: 1200px;
    width: auto;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    .sidebar {
      background: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 24px 0;
    }
    .page {
      flex: 1;
      margin-left: 50px;
    }
  }
  ::v-deep(.el-col-3) {
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  /* 头像区域 */
  .profile-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }

  /* 上传器容器 */
  .avatar-uploader {
    position: relative;
    cursor: pointer;
    width: 80px;
    height: 80px;
  }

  /* 编辑图标，右下角小铅笔 */
  .avatar-edit {
    position: absolute;
    right: -4px;
    bottom: -4px;
    background: white;
    border-radius: 50%;
    padding: 2px;
    font-size: 16px;
    color: #409eff;
  }

  /* 下面可显示用户名 */
  .username {
    margin-top: 8px;
    font-weight: 500;
    color: #2c3e50;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
