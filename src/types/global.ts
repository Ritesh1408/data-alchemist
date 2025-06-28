export interface Client {
  ClientID: string;
  ClientName: string;
  PriorityLevel: number;
}

export interface Worker {
  WorkerID: string;
  WorkerName: string;
  Location: string;
}

export interface Task {
  TaskID: string;
  TaskName: string;
  Duration: number;
  PreferredPhases: number[] | string;
}

export interface RuleSuggestion {
  description: string;
  type: string;
  params: Record<string, unknown>;
}

export interface ValidationError {
  entityType: 'clients' | 'workers' | 'tasks';
  rowIndex: number;
  column: string;
  message: string;
}

export interface Rule {
  type: string;
  params: Record<string, unknown>;
}

export interface PriorityWeights {
  priorityLevel: number;
  taskFulfillment: number;
  fairness: number;
}

export interface RuleSuggestion {
  type: string;
  params: Record<string, unknown>;
  description: string;
}

export interface Client {
  ClientID: string;
  RequestedTaskIDs: string; 
  [key: string]: unknown;
}

export interface Worker {
  WorkerID: string;
  WorkerGroup: string;
  MaxLoadPerPhase: number;
  [key: string]: unknown;
}

export interface Task {
  TaskID: string;
  TaskName: string;
  Duration: number;
  PreferredPhases: number[] | string;
  [key: string]: unknown;
}
