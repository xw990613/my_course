import request from '@/utils/request';

// 1.定义返回类型结构
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
// 获取评估指标
export function get_evaluation(): Promise<EvaluationResponse> {
  return request({
    url: '/evaluation/get',
    method: 'get',
  });
}

//2.定义题目结构
export type QuestionnaireParams = Record<string, number>;
// 定义请求体结构（参数）
export type QuestionnairePayload = {
  SRLSurvey?: QuestionnaireParams;
  'Pre-UsabilitySurvey'?: QuestionnaireParams;
  'Post-UsabilitySurvey'?: QuestionnaireParams;
};
// 定义响应结构
export interface QuestionnaireResponse {
  status: number;
  message: string;
  data: QuestionnairePayload;
}
// 获取相应数据
export function saveQuestionnaire(
  data: QuestionnairePayload,
): Promise<QuestionnaireResponse> {
  return request({
    url: '/saveQuestionnaire',
    method: 'post',
    data,
  });
}

// 3 获取问卷分页数据
export type params = {
  pageNum: number;
  pageSize: number;
};
export interface QuestionnaireItem {
  id: number;
  user_id: number;
  submit_time: string;
  'Post-UsabilitySurvey': Record<string, number> | null;
  'Pre-UsabilitySurvey': Record<string, number> | null;
  SRLSurvey: Record<string, number> | null;
}
export interface QuestionnaireResult {
  status: number;
  message: string;
  data: {
    total: number;
    list: QuestionnaireItem[];
  } & QuestionnaireParams;
}
export function getQuestionnaire(params: params): Promise<QuestionnaireResult> {
  return request({
    url: '/getQuestionnaire',
    method: 'get',
    params,
  });
}
