import { saveAs } from 'file-saver';
import { Rule, PriorityWeights } from '@/types/global';

export const exportRules = (rules: Rule[], priorityWeights: PriorityWeights) => {
  const json = JSON.stringify({ rules, priorityWeights }, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, 'rules.json');
};
