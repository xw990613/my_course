import request from '@/utils/request';

export interface EvaluationResult {
  precision: number[];
  recall: number[];
  f1_score: number[];
  precision_at_3: (number | null)[];
  precision_at_5: (number | null)[];
  srl_dimensions: string[][];
}

export interface EvaluationResponse {
  status: number;
  message: string;
  data: {
    indicators: EvaluationResult;
    averageValue: {
      precision: number;
      recall: number;
      f1_score: number;
      precision_at_3: number;
      precision_at_5: number;
    };
  };
}
export interface saveResponse {
  status: number;
  message: string;
}
// 存储评估指标
export function save_evaluation(data: any): Promise<saveResponse> {
  return request({
    url: '/evaluation/submit',
    method: 'post',
    data,
  });
}

// 1.获取评估指标接口
export function get_evaluation(): Promise<EvaluationResponse> {
  return request({
    url: '/evaluation/get',
    method: 'get',
  });
}

//定义题目结构
export type QuestionnaireParams = Record<string, number>;
// 定义请求体结构（参数）
export type QuestionnairePayload = {
  UsabilitySurvey?: QuestionnaireParams;
  'Pre-SRLSurvey'?: QuestionnaireParams;
  'Post-SRLSurvey'?: QuestionnaireParams;
};
// 定义响应结构
export interface QuestionnaireResponse {
  status: number;
  message: string;
  data: QuestionnairePayload;
}
// 2.保存问卷数据
export function saveQuestionnaire(
  data: QuestionnairePayload,
): Promise<QuestionnaireResponse> {
  return request({
    url: '/saveQuestionnaire',
    method: 'post',
    data,
  });
}

export type params = {
  pageNum: number;
  pageSize: number;
};
export interface QuestionnaireItem {
  id: number;
  user_id: number;
  submit_time: string;
  'Post-SRLSurvey': Record<string, number> | null;
  'Pre-SRLSurvey': Record<string, number> | null;
  UsabilitySurvey: Record<string, number> | null;
}
export interface QuestionnaireResult {
  status: number;
  message: string;
  data: {
    total: number;
    list: QuestionnaireItem[];
  } & QuestionnaireParams;
}
// 3 获取问卷分页数据
export function getQuestionnaire(params: params): Promise<QuestionnaireResult> {
  return request({
    url: '/getQuestionnaire',
    method: 'get',
    params,
  });
}

// 4 获取问卷数据-首页
// 定义获取问卷的接口响应格式
export interface getQuestionnaireResponse {
  status: number;
  message: string;
  data: Record<string, number>;
}

// 获取问卷的接口
export function getHomeQuestionnaire(): Promise<getQuestionnaireResponse> {
  return request({
    url: '/get_questionnaire_list',
    method: 'get',
  });
}

// 5 系统可用性 前后srl维度的echarts图表数据
export interface scroreItem {
  preScores: number[];
  postScores: number[];
  usabilityScores: number[];
}
export interface getScoreAvarage {
  status: number;
  message: string;
  data: scroreItem;
}
export function getAverage(): Promise<getScoreAvarage> {
  return request({
    url: '/survey/average',
    method: 'get',
  });
}
