'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addRule } from '@/store/dataSlice';
import { Button } from '@/components/ui/button';
import { parseRuleFromText } from '@/utils/nlpRuleParser';
import { toast } from 'sonner';

export const NaturalLanguageRuleInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const [ruleText, setRuleText] = useState('');

  const handleAddRule = () => {
    const parsedRule = parseRuleFromText(ruleText);
    if (parsedRule) {
      dispatch(addRule(parsedRule));
      setRuleText('');
      toast.success('Rule added successfully!');
    } else {
      toast.error('Could not understand the rule. Please try again.');
    }
  };

  return (
    <div className="border p-4 my-6">
      <h2 className="text-xl font-bold mb-4">Natural Language Rule Input</h2>

      <textarea
        value={ruleText}
        onChange={(e) => setRuleText(e.target.value)}
        placeholder='e.g., Co-run Task T1 and Task T2'
        className="border p-2 w-full h-24 mb-4 rounded"
      />

      <Button onClick={handleAddRule} disabled={!ruleText.trim()}>
        Add Rule
      </Button>
    </div>
  );
};
