import { i18nInstance } from '@/locals/index.ts';

const t = i18nInstance.global.t;
export const PostSRLSurvey = {
  q1_score: t('questionnaire.srlSurvey.q1_score'),
  q2_score: t('questionnaire.srlSurvey.q2_score'),
  q3_score: t('questionnaire.srlSurvey.q3_score'),
  q4_score: t('questionnaire.srlSurvey.q4_score'),
  q5_score: t('questionnaire.srlSurvey.q5_score'),
  q6_score: t('questionnaire.srlSurvey.q6_score'),
  q7_score: t('questionnaire.srlSurvey.q7_score'),
};

export const PostSRLSurveySRLdimension = {
  q1_score: t('questionnaire.dimension.q1_score'),
  q2_score: t('questionnaire.dimension.q2_score'),
  q3_score: t('questionnaire.dimension.q3_score'),
  q4_score: t('questionnaire.dimension.q4_score'),
  q5_score: t('questionnaire.dimension.q5_score'),
  q6_score: t('questionnaire.dimension.q6_score'),
  q7_score: t('questionnaire.dimension.q7_score'),
};

export const srlSurvey = {
  q1_score: t('questionnaire.UsabilitySurvey.q1_score'),
  q2_score: t('questionnaire.UsabilitySurvey.q2_score'),
  q3_score: t('questionnaire.UsabilitySurvey.q3_score'),
  q4_score: t('questionnaire.UsabilitySurvey.q4_score'),
  q5_score: t('questionnaire.UsabilitySurvey.q5_score'),
  q6_score: t('questionnaire.UsabilitySurvey.q6_score'),
  q7_score: t('questionnaire.UsabilitySurvey.q7_score'),
  q8_score: t('questionnaire.UsabilitySurvey.q8_score'),
};

export function caculateExamination(score: number): string {
  switch (score) {
    case 5:
      return t('questionnaire.Satisfaction.StronglyAgree');
    case 4:
      return t('questionnaire.Satisfaction.Agree');
    case 3:
      return t('questionnaire.Satisfaction.generally');
    case 2:
      return t('questionnaire.Satisfaction.disagree');
    case 1:
      return t('questionnaire.Satisfaction.StronglyDisagree');
    default:
      return t('questionnaire.Satisfaction.InvalidScore');
  }
}
