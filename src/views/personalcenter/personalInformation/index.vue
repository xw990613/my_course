<template>
  <div class="personalInformation">
    <div class="personalTip">
      <span class="title"> {{ $t('personInfo.personInfo') }}</span>
      <el-button
        type="primary"
        :icon="Edit"
        v-if="!isEdit"
        @click="handleClick"
        >{{ $t('common.Edit') }}</el-button
      >
      <el-button type="primary" @click="handelSave" v-else>{{
        $t('common.Save')
      }}</el-button>
    </div>
    <div class="infoList" v-if="!isEdit">
      <ul class="ul1">
        <li>
          <span>{{ $t('personInfo.Name') }}</span>
          <span>{{ formInline.username }}</span>
        </li>
        <li>
          <span>{{ $t('personInfo.EducationalQualifications') }}</span>
          <span>{{ formInline.educational }}</span>
        </li>
        <li>
          <span>{{ $t('personInfo.Position') }}</span>
          <span>{{ formInline.position }}</span>
        </li>
        <li>
          <span>{{ $t('personInfo.Birthday') }}</span>
          <span>{{ formInline.birthday }}</span>
        </li>
        <li>
          <span>{{ $t('personInfo.PhoneNumber') }}</span>
          <span>{{ formInline.phone_number }}</span>
        </li>
      </ul>
      <ul class="ul2">
        <li>
          <span>{{ $t('personInfo.Gender') }}</span>
          <span>{{ formInline.gender }}</span>
        </li>
        <li>
          <span>{{ $t('personInfo.School/Company') }}</span>
          <span>{{ formInline.school_compnay }}</span>
        </li>
        <li>
          <span>{{ $t('personInfo.WorkingYears') }}</span>
          <span>{{ formInline.working_years }}</span>
        </li>
        <li>
          <span>{{ $t('personInfo.Area') }}</span>
          <span>{{ formInline.countries_regions_name }}</span>
        </li>
        <li>
          <span>{{ $t('personInfo.Email') }}</span>
          <span>{{ formInline.email }}</span>
        </li>
      </ul>
    </div>
    <div class="infoList" v-else>
      <el-form
        :inline="true"
        label-position="right"
        :label-width="labelWidth"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item :label="$t('personInfo.Name')">
          <el-input
            v-model="formInline.username"
            :placeholder="$t('common.PleaseEnterName')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('personInfo.Gender')">
          <el-select
            v-model="formInline.gender"
            :placeholder="$t('common.PleaseSelectGender')"
            clearable
          >
            <el-option :label="$t('option.Male')" value="Male" />
            <el-option :label="$t('option.Female')" value="Female" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('personInfo.EducationalQualifications')">
          <el-select
            v-model="formInline.educational"
            :placeholder="$t('common.PleaseSelectAcademicQualifications')"
            clearable
          >
            <el-option
              :label="$t('option.JuniorHighSchool')"
              value="Junior High School"
            />
            <el-option :label="$t('option.HighSchool')" value="High School" />
            <el-option :label="$t('option.College')" value="College" />
            <el-option :label="$t('option.Undergraduate')" value="Bachelor" />
            <el-option :label="$t('option.postgraduate')" value="Master" />
            <el-option :label="$t('option.PhD')" value="PhD" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('personInfo.School/Company')">
          <el-input
            v-model="formInline.school_compnay"
            :placeholder="$t('common.PleaseEnterSchoolCompany')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('personInfo.Position')">
          <el-input
            v-model="formInline.position"
            :placeholder="$t('common.PleaseEnterPosition')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('personInfo.WorkingYears')">
          <el-input
            v-model="formInline.working_years"
            :placeholder="$t('common.PleaseEnterWorkingYears')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('personInfo.PhoneNumber')">
          <el-input
            v-model="formInline.phone_number"
            :placeholder="$t('common.PleaseEnterPhoneNumber')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('personInfo.Email')">
          <el-input
            v-model="formInline.email"
            :placeholder="$t('common.PleaseEnterEmail')"
            clearable
          />
        </el-form-item>

        <el-form-item :label="$t('personInfo.Birthday')">
          <el-date-picker
            v-model="formInline.birthday"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            :placeholder="$t('common.PleaseSelectDate')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('personInfo.Area')">
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
  import { computed, onMounted, reactive, ref } from 'vue';
  import { user_getInfo, user_updateInfo } from '@/api/user';
  import { ElMessage } from 'element-plus';
  import { useAuthStore } from '@/stores/auth';
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
  const auth = useAuthStore();
  const labelWidth = computed(() => {
    return localStorage.getItem('lang') === 'zh' ? '100px' : '200px';
  });
  function handleClick() {
    isEdit.value = !isEdit.value;
  }
  async function handelSave() {
    isEdit.value = !isEdit.value;
    try {
      const res = await user_updateInfo(formInline);
      ElMessage.success(res.message);
      await auth.getUserInfo();
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
      margin-left: 200px;
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
