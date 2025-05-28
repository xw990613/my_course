<template>
  <div class="personalInformation">
    <div class="personalTip">
      <span class="title">个人信息</span>
      <el-button type="primary" :icon="Edit" v-if="!isEdit" @click="handleClick"
        >编辑</el-button
      >
      <el-button type="primary" @click="handelSave" v-else>保存</el-button>
    </div>
    <div class="infoList" v-if="!isEdit">
      <ul class="ul1">
        <li>
          <span>姓名</span>
          <span>{{ formInline.username }}</span>
        </li>
        <li>
          <span>学历</span>
          <span>{{ formInline.educational }}</span>
        </li>
        <li>
          <span>职位</span>
          <span>{{ formInline.position }}</span>
        </li>
        <li>
          <span>生日</span>
          <span>{{ formInline.birthday }}</span>
        </li>
        <li>
          <span>手机号</span>
          <span>{{ formInline.phone_number }}</span>
        </li>
      </ul>
      <ul class="ul2">
        <li>
          <span>性别</span>
          <span>{{ formInline.gender }}</span>
        </li>
        <li>
          <span>学校/公司</span>
          <span>{{ formInline.school_compnay }}</span>
        </li>
        <li>
          <span>工作年限</span>
          <span>{{ formInline.working_years }}</span>
        </li>
        <li>
          <span>地区</span>
          <span>{{ formInline.countries_regions_name }}</span>
        </li>
        <li>
          <span>邮箱</span>
          <span>{{ formInline.email }}</span>
        </li>
      </ul>
    </div>
    <div class="infoList" v-else>
      <el-form
        :inline="true"
        label-position="right"
        label-width="100px"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="姓名">
          <el-input
            v-model="formInline.username"
            placeholder="请输入姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="formInline.gender"
            placeholder="请选择性别"
            clearable
          >
            <el-option label="男" value="male" />
            <el-option label="女" value="female" />
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-select
            v-model="formInline.educational"
            placeholder="请选择学历"
            clearable
          >
            <el-option label="初中" value="junior" />
            <el-option label="高中" value="high" />
            <el-option label="大专" value="college" />
            <el-option label="本科" value="bachelor" />
            <el-option label="研究生" value="master" />
            <el-option label="博士" value="doctor" />
          </el-select>
        </el-form-item>
        <el-form-item label="学校/公司">
          <el-input
            v-model="formInline.school_compnay"
            placeholder="请输入学校/公司"
            clearable
          />
        </el-form-item>
        <el-form-item label="职位">
          <el-input
            v-model="formInline.position"
            placeholder="请输入职位"
            clearable
          />
        </el-form-item>
        <el-form-item label="工作年限">
          <el-input
            v-model="formInline.working_years"
            placeholder="请输入工作年限"
            clearable
          />
        </el-form-item>
        <el-form-item label="手机">
          <el-input
            v-model="formInline.phone_number"
            placeholder="请输入手机号"
            clearable
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="formInline.email"
            placeholder="请输入邮箱"
            clearable
          />
        </el-form-item>

        <el-form-item label="生日">
          <el-date-picker
            v-model="formInline.birthday"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请选择日期"
            clearable
          />
        </el-form-item>
        <el-form-item label="地区">
          <vue3-country-intl
            v-model="formInline.countries_regions"
            @onChange="handleGetCountry"
          ></vue3-country-intl>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'personalInformation',
  };
</script>

<script setup lang="ts">
  import { Edit } from '@element-plus/icons-vue';
  import { onMounted, reactive, ref } from 'vue';
  import { user_getInfo, user_updateInfo } from '@/api/user';
  import { ElMessage } from 'element-plus';
  const isEdit = ref(false);
  const formInline = reactive({
    username: '',
    gender: '',
    educational: '',
    school_compnay: '',
    position: '',
    working_years: '',
    birthday: '',
    countries_regions: '',
    countries_regions_name: '',
    phone_number: '',
    email: '',
  });

  function handleClick() {
    isEdit.value = !isEdit.value;
  }
  async function handelSave() {
    isEdit.value = !isEdit.value;
    try {
      const res = await user_updateInfo(formInline);
      ElMessage.success(res.message || '保存成功');
    } catch (error) {
      console.error('保存失败', error);
    }
  }
  function handleGetCountry(value: any) {
    Object.assign(formInline, {
      countries_regions_name: value.name,
    });
  }
  onMounted(async () => {
    try {
      const res = await user_getInfo();
      console.log('获取信息', res);
      const {
        username,
        gender,
        educational,
        school_compnay,
        position,
        working_years,
        birthday,
        countries_regions,
        countries_regions_name,
        phone_number,
        email,
      } = res.data;
      Object.assign(formInline, {
        username,
        gender,
        educational,
        school_compnay,
        position,
        working_years,
        birthday,
        countries_regions,
        countries_regions_name,
        phone_number,
        email,
      });
    } catch (error) {
      console.error('获取信息失败', error);
    }
  });
</script>

<style scoped lang="scss">
  .personalTip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: #333;
      font-size: 20px;
    }
  }
  .infoList {
    display: flex;
    padding: 20px;
    background-color: #fcfcfc;
    margin-top: 30px;
    ul {
      list-style: none;
    }
    .ul1 {
      margin-left: 100px;
    }
    .ul2 {
      margin-left: 300px;
    }
    li:not(:first-child) {
      margin-top: 20px;
    }
    li span:nth-child(1) {
      color: #999999;
      margin-right: 20px;
    }
    li span:nth-child(2) {
      color: #333333;
    }
  }
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }

  .demo-form-inline .el-select {
    --el-select-width: 220px;
  }
  ::v-deep(.vue-country-intl-inputer .country-intl-label) {
    padding: 0 5px;
  }
</style>
