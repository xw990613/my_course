import request from '@/utils/request';
// 定义每个表的数据结构
export interface TableData {
  id: number;
  name_zh: string;
  name_en: string;
}
// 定义整个API的响应格式
export interface ProjectListResponse {
  status: number;
  message: string;
  data: {
    classify_list: TableData[];
    org: TableData[];
    status: TableData[];
    selling_type: TableData[];
  };
}
// 获取项目类别的接口
export function getProjectList(): Promise<ProjectListResponse> {
  return request({
    url: '/get_classify_list', // 确保此URL与后端路由匹配
    method: 'get',
  });
}

export interface CourseListData {
  id: number;
  course_name: string;
  cover: string;
  short_intro: string;
  teacher: string;
  school_name: string;
  selling_type: number;
  count: number;
  classify: number[];
  status: number;
  tag_titles: string[];
  src: string;
}
// 定义整个API的响应格式
export interface ProjectListItem {
  status: number;
  message: string;
  total: number;
  data: CourseListData[];
}

export interface getCourseListRequest {
  pageSize: number;
  currentPage: number;
  classify: number;
  org: number | string;
  selling_type: number;
  status: number;
}
export function getCourseList(
  data: getCourseListRequest,
): Promise<ProjectListItem> {
  return request({
    url: '/get_course_list', // 确保此URL与后端路由匹配
    method: 'post',
    data,
  });
}

// 定义问卷请求的数据结构
export interface questionnaireData {
  text: string;
  score: number;
}

export interface questionnaireListData {
  pageSize: number;
  currentPage: number;
  questionnaire: questionnaireData[];
}

// 定义问卷响应的数据结构
export interface questionnaireResponse {
  status: number;
  message: string;
  total: number;
  data: CourseListData[];
  phrases: string[];
  srlLabels: string[];
  keyWords: string[];
}

// 获取课程推荐列表的接口
export function getQuestionnaireList(
  data: questionnaireListData,
): Promise<questionnaireResponse> {
  return request({
    url: '/get_course_recommend_list',
    method: 'post',
    data,
  });
}

// 定义保存或者更新问卷的接口响应格式
export interface ProjectListResponse {
  status: number;
  message: string;
}
// 保存或者更新问卷的接口
export function saveQuestionnaire(
  data: questionnaireData[],
): Promise<ProjectListResponse> {
  return request({
    url: '/save_questionnaire',
    method: 'post',
    data,
  });
}

// 定义获取问卷的接口响应格式
export interface getQuestionnaireResponse {
  status: number;
  message: string;
  data: questionnaireData[];
}

// 获取问卷的接口
export function getQuestionnaire(): Promise<getQuestionnaireResponse> {
  return request({
    url: '/get_questionnaire_list',
    method: 'get',
  });
}
