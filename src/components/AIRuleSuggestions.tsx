'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addRule } from '@/store/dataSlice';
import { recommendRules } from '@/utils/ruleRecommender';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { RuleSuggestion } from '@/types/global';

const SUGGESTIONS_BATCH_SIZE = 5;

export const AIRuleSuggestions: React.FC = () => {
  const { clients, workers, tasks } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();
  const [suggestions, setSuggestions] = useState<RuleSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(SUGGESTIONS_BATCH_SIZE);

  const handleGenerateSuggestions = () => {
    setIsLoading(true);
    setTimeout(() => {
      // ✅ Now passing tasks as well
      const recommended = recommendRules(clients, workers, tasks);
      setSuggestions(recommended);
      setIsLoading(false);
      setVisibleCount(SUGGESTIONS_BATCH_SIZE);

      toast.success(`✅ ${recommended.length} suggestion(s) generated!`);
    }, 500);
  };

  const handleAddRule = (rule: RuleSuggestion) => {
    dispatch(addRule(rule));
    toast.success('🎉 Rule added successfully!');
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + SUGGESTIONS_BATCH_SIZE);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">🤖 AI Rule Suggestions</h2>

      <Button onClick={handleGenerateSuggestions} className="w-full">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            Generating...
          </span>
        ) : (
          'Generate Suggestions'
        )}
      </Button>

      {suggestions.length === 0 && !isLoading && (
        <div className="text-gray-500 text-center mt-4">
          No suggestions generated yet.
        </div>
      )}

      {suggestions.slice(0, visibleCount).map((suggestion, idx) => (
        <Card key={idx} className="shadow">
          <CardContent className="p-4 space-y-2">
            <p className="text-gray-700">{suggestion.description}</p>
            <Button
              variant="outline"
              onClick={() => handleAddRule({
                type: suggestion.type,
                params: suggestion.params,
                description: suggestion.description
              })}
              className="mt-2"
            >
              Accept Rule
            </Button>
          </CardContent>
        </Card>
      ))}

      {visibleCount < suggestions.length && (
        <Button onClick={handleLoadMore} variant="secondary" className="w-full">
          Load More
        </Button>
      )}
    </div>
  );
};
