import { Client, Worker, Task, RuleSuggestion } from '@/types/global';

export const recommendRules = (clients: Client[], workers: Worker[], tasks: Task[]): RuleSuggestion[] => {
  const recommendations: RuleSuggestion[] = [];

  // Find tasks that are commonly requested together
  const taskPairs = new Map<string, number>();

  clients.forEach((client) => {
    const requestedTasks = String(client.RequestedTaskIDs).split(',').map((id: string) => id.trim());
    for (let i = 0; i < requestedTasks.length; i++) {
      for (let j = i + 1; j < requestedTasks.length; j++) {
        const pairKey = [requestedTasks[i], requestedTasks[j]].sort().join(',');
        taskPairs.set(pairKey, (taskPairs.get(pairKey) || 0) + 1);
      }
    }
  });

  taskPairs.forEach((count, pair) => {
    if (count >= 2) {
      const [task1, task2] = pair.split(',');
      recommendations.push({
        type: 'coRun',
        params: { tasks: [task1, task2] },
        description: `Tasks ${task1} and ${task2} are often requested together. Suggest co-run.`,
      });
    }
  });

  // Find overloaded workers
  workers.forEach((worker) => {
    if (worker.MaxLoadPerPhase > 5) {
      recommendations.push({
        type: 'loadLimit',
        params: { workerGroup: worker.WorkerGroup, maxLoad: 5 },
        description: `Worker group ${worker.WorkerGroup} might be overloaded. Suggest max load limit of 5.`,
      });
    }
  });

  // ✅ NEW: Find long duration tasks
  tasks.forEach((task) => {
    if (Number(task.Duration) > 5) {
      recommendations.push({
        type: 'splitTask',
        params: { taskID: task.TaskID, maxDuration: 5 },
        description: `Task ${task.TaskID} has a long duration. Consider splitting it into smaller tasks.`,
      });
    }
  });

  return recommendations;
};
