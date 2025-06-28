'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addRule, removeRule } from '@/store/dataSlice';
import { Button } from '@/components/ui/button';
import { exportRules } from '@/utils/ruleGenerator';

export const RuleBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, rules, priorityWeights } = useAppSelector((state) => state.data);

  const [selectedTaskIDs, setSelectedTaskIDs] = useState<string[]>([]);

  const handleAddRule = () => {
    if (selectedTaskIDs.length < 2) return;

    dispatch(addRule({
      type: 'coRun',
      params: { tasks: selectedTaskIDs },
    }));

    setSelectedTaskIDs([]);
  };

  const handleRemoveRule = (index: number) => {
    dispatch(removeRule(index));
  };

  return (
    <div className="border p-6 my-6 rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Rule Builder: Co-Run Example</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 mb-4">No tasks available. Please upload tasks to build rules.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {tasks.map((task, idx) => (
              <Button
                key={idx}
                variant={selectedTaskIDs.includes(task.TaskID) ? 'default' : 'outline'}
                onClick={() => {
                  if (selectedTaskIDs.includes(task.TaskID)) {
                    setSelectedTaskIDs(selectedTaskIDs.filter((id) => id !== task.TaskID));
                  } else {
                    setSelectedTaskIDs([...selectedTaskIDs, task.TaskID]);
                  }
                }}
                className={`transition-transform duration-200 ${selectedTaskIDs.includes(task.TaskID) ? 'scale-105' : ''}`}
              >
                {task.TaskName}
              </Button>
            ))}
          </div>

          <Button onClick={handleAddRule} disabled={selectedTaskIDs.length < 2} className="mr-4">
            Add Co-Run Rule
          </Button>

          <Button onClick={() => exportRules(rules, priorityWeights)} disabled={rules.length === 0}>
            Export Rules JSON
          </Button>
        </>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Added Rules:</h3>
        {rules.length === 0 ? (
          <p className="text-gray-500">No rules added yet.</p>
        ) : (
          rules.map((rule, idx) => (
            <div key={idx} className="flex justify-between items-center border p-3 rounded mb-3 bg-gray-50 dark:bg-gray-800">
              <span className="text-gray-700 dark:text-gray-200">
                {rule.type}:{' '}
                {rule.type === 'coRun' && Array.isArray(rule.params.tasks)
                  ? rule.params.tasks.join(', ')
                  : rule.type === 'loadLimit'
                  ? `Max Load: ${rule.params.maxLoad} for ${rule.params.workerGroup}`
                  : rule.type === 'splitTask'
                  ? `Split Task: ${rule.params.taskID} (Max Duration: ${rule.params.maxDuration})`
                  : JSON.stringify(rule.params)}
              </span>
              <Button variant="destructive" onClick={() => handleRemoveRule(idx)}>
                Remove
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
