import { Client, Worker, Task } from '@/types/global';

interface SearchData {
  clients: Client[];
  workers: Worker[];
  tasks: Task[];
}

export const parseSearchQuery = (query: string, data: SearchData) => {
  const lower = query.toLowerCase();

  // 1. Show tasks longer than X phases in phase Y
  const taskMatch = lower.match(/tasks longer than (\d+) phases? in phase (\d+)/);
  if (taskMatch) {
    const minDuration = parseInt(taskMatch[1]);
    const phase = parseInt(taskMatch[2]);

    const filtered = data.tasks.filter((task) => {
      const preferredPhases = Array.isArray(task.PreferredPhases)
        ? task.PreferredPhases
        : parsePreferredPhases(task.PreferredPhases);
      return task.Duration > minDuration && preferredPhases.includes(phase);
    });

    return { entityType: 'tasks' as const, data: filtered };
  }

  // 2. Clients with priority X
  const clientMatch = lower.match(/clients? with priority (\d+)/);
  if (clientMatch) {
    const priority = parseInt(clientMatch[1]);
    const filtered = data.clients.filter((client) => client.PriorityLevel === priority);
    return { entityType: 'clients' as const, data: filtered };
  }

  // 3. Workers in location X
  const workerMatch = lower.match(/workers? in ([a-zA-Z\s]+)/);
  if (workerMatch) {
    const location = workerMatch[1].trim().toLowerCase();
    const filtered = data.workers.filter((worker) => worker.Location?.toLowerCase() === location);
    return { entityType: 'workers' as const, data: filtered };
  }

  return null;
};

const parsePreferredPhases = (phases: string | number[]): number[] => {
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
