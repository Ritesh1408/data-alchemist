export const parseSearchQuery = (query: string, data: any) => {
  const lower = query.toLowerCase();

  // 1. Show tasks longer than X phases in phase Y
  const taskMatch = lower.match(/tasks longer than (\d+) phases? in phase (\d+)/);
  if (taskMatch) {
    const minDuration = parseInt(taskMatch[1]);
    const phase = parseInt(taskMatch[2]);

    const filtered = data.tasks.filter((task: any) => {
      const preferredPhases = Array.isArray(task.PreferredPhases) ? task.PreferredPhases : parsePreferredPhases(task.PreferredPhases);
      return task.Duration > minDuration && preferredPhases.includes(phase);
    });

    return { entityType: 'tasks', data: filtered };
  }

  // 2. Clients with priority X
  const clientMatch = lower.match(/clients? with priority (\d+)/);
  if (clientMatch) {
    const priority = parseInt(clientMatch[1]);
    const filtered = data.clients.filter((client: any) => client.PriorityLevel == priority);
    return { entityType: 'clients', data: filtered };
  }

  // 3. Workers in location X
  const workerMatch = lower.match(/workers? in ([a-zA-Z\s]+)/);
  if (workerMatch) {
    const location = workerMatch[1].trim();
    const filtered = data.workers.filter((worker: any) => worker.Location?.toLowerCase() === location.toLowerCase());
    return { entityType: 'workers', data: filtered };
  }

  // 4. Tasks assigned to worker X
  const taskWorkerMatch = lower.match(/tasks assigned to ([a-zA-Z\s]+)/);
  if (taskWorkerMatch) {
    const workerName = taskWorkerMatch[1].trim();
    const filtered = data.tasks.filter((task: any) => task.AssignedWorker?.toLowerCase() === workerName.toLowerCase());
    return { entityType: 'tasks', data: filtered };
  }

  // 5. Clients with more than X tasks
  const clientTaskMatch = lower.match(/clients? with more than (\d+) tasks?/);
  if (clientTaskMatch) {
    const minTasks = parseInt(clientTaskMatch[1]);
    const filtered = data.clients.filter((client: any) => client.TaskCount > minTasks);
    return { entityType: 'clients', data: filtered };
  }

  // 6. Tasks starting after date (if you have date field like StartDate)
  const dateMatch = lower.match(/tasks starting after (\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    const targetDate = new Date(dateMatch[1]);
    const filtered = data.tasks.filter((task: any) => new Date(task.StartDate) > targetDate);
    return { entityType: 'tasks', data: filtered };
  }

  return null;
};

const parsePreferredPhases = (phases: string | number[]) => {
  if (Array.isArray(phases)) return phases;
  if (typeof phases === 'string') {
    if (phases.includes('-')) {
      const [start, end] = phases.split('-').map(Number);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return phases.split(',').map(Number);
  }
  return [];
};
