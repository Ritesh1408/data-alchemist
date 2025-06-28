import { saveAs } from 'file-saver';

export const exportRules = (rules: any[], priorityWeights: any) => {
  const json = JSON.stringify({ rules, priorityWeights }, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, 'rules.json');
};

