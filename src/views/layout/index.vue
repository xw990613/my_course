<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <HomeLeft />
      </div>
      <div class="right">
        <homeRight />
      </div>
    </div>
    <router-view></router-view>
  </div>
  <div class="footer">
    <div class="footer_left">
      <div class="footer_links">
        <span>{{ $t('footer.CourseEntry') }}</span>
        <span>{{ $t('footer.AboutUs') }}</span>
        <span>{{ $t('footer.ContactUs') }}</span>
        <span>{{ $t('footer.PrivacyPolicy') }}</span>
        <span>{{ $t('footer.termsOfUse') }}</span>
        <span>{{ $t('footer.HelpCenter') }}</span>
        <span>{{ $t('footer.Feedback') }}</span>
        <span>{{ $t('footer.InfringementComplaint') }}</span>
      </div>
      <div class="footer_info">
        <div>创新教育 改变世界</div>
        <div>New Education, New World</div>
      </div>
      <div class="footer_copyright">
        <div>© 2025 SmartClassMatch, Inc.</div>
        <div>
          | Faculty of Computer and Mathematical Sciences, Universiti Putra
          Malaysia, 43400 Serdang, Selangor, Malaysia.
        </div>
      </div>
    </div>
    <div class="footer_right">
      <img src="../../assets/img/contact.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'my-home',
  };
</script>

<script setup lang="ts">
  import HomeLeft from './header/homeLeft.vue';
  import homeRight from './header/homeRight.vue';
</script>

<style scoped lang="scss">
  .home {
    /* 给 header 留出空间，避免遮挡内容 */
    padding-top: 80px; /* 这里的 80px 要和 header 的高度一致 */
    min-height: calc(100vh - 280px); /* 减去 footer 的高度 */
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px; /* 你自己的 header 高度 */
    background: white; /* 或者你原来的背景色 */
    z-index: 1000; /* 确保它在最上层 */

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 64px;

    .left {
      flex: 1;
      min-width: 0; // 防止超出
    }

    .right {
      flex-shrink: 0;
    }
    ::v-deep(.el-menu--horizontal.el-menu) {
      border-bottom: none !important;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    height: 200px;
    background: #282c2f;
    color: #a8a8a8;
    font-size: 14px;
    // text-align: center;
    color: #999;
    padding-left: 64px;
    padding-right: 64px;
    &_left {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 70%;
      .footer_links {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .footer_info {
        margin-bottom: 10px;
        font-size: 24px;
      }
    }
    &_right {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 120px;
        height: 120px;
      }
    }
  }
</style>
