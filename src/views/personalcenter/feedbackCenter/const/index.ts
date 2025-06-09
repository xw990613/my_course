export const PostUsabilitySurvey = {
  q1_score: '我会为自己的学习设定明确的目标。',
  q2_score: '我知道如何根据任务调整学习计划。',
  q3_score: '我能主动监控自己的学习进度。',
  q4_score: '我会在学习过程中评估自己并做出调整。',
  q5_score: '我经常反思我的学习策略。',
  q6_score: '我对学习结果有清晰的预期。',
  q7_score: '我能自觉管理学习时间和精力。',
  q8_score: '我会寻求反馈以提升学习效果。',
};

export const PostUsabilitySurveySRLdimension = {
  q1_score: 'Goal Setting', // 我会为自己的学习设定明确的目标。
  q2_score: 'Planning', // 我知道如何根据任务调整学习计划。
  q3_score: 'Monitoring', // 我能主动监控自己的学习进度。
  q4_score: 'Self-Evaluation', // 我会在学习过程中评估自己并做出调整。
  q5_score: 'Strategy Use', // 我经常反思我的学习策略。
  q6_score: 'Outcome Evaluation', // 我对学习结果有清晰的预期。
  q7_score: 'Time Management', // 我能自觉管理学习时间和精力。
  q8_score: 'Help Seeking', // 我会寻求反馈以提升学习效果。
};

export const srlSurvey = {
  q1_score: '系统界面易于理解。',
  q2_score: '我能顺利完成系统中的各项操作。',
  q3_score: '关键词和SRL标签解释清晰易懂。',
  q4_score: '推荐的课程内容与我的学习目标一致。',
  q5_score: '我能独立使用该系统，无需外部帮助。',
  q6_score: '系统加载和响应速度令人满意。',
  q7_score: '我愿意再次使用该推荐系统。',
  q8_score: '我会向他人推荐此系统。',
};

export function caculateExamination(score: number): string {
  switch (score) {
    case 5:
      return '非常同意';
    case 4:
      return '同意';
    case 3:
      return '一般';
    case 2:
      return '不同意';
    case 1:
      return '非常不同意';
    default:
      return '无效分数';
  }
}
