import { validateData } from '@/utils/validator';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client, Worker, Task, ValidationError } from '@/types/global';

interface PriorityWeights {
  priorityLevel: number;
  taskFulfillment: number;
  fairness: number;
}

interface Rule {
  type: string;
  params: Record<string, unknown>;
}

interface DataState {
  clients: Client[];
  workers: Worker[];
  tasks: Task[];
  errors: ValidationError[];
  rules: Rule[];
  priorityWeights: PriorityWeights;
}

type EntityKey = 'clients' | 'workers' | 'tasks';

const initialState: DataState = {
  clients: [],
  workers: [],
  tasks: [],
  errors: [],
  rules: [],
  priorityWeights: {
    priorityLevel: 1,
    taskFulfillment: 1,
    fairness: 1,
  },
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ key: EntityKey; data: Client[] | Worker[] | Task[] }>) => {
      if (action.payload.key === 'clients') {
        state.clients = action.payload.data as Client[];
      } else if (action.payload.key === 'workers') {
        state.workers = action.payload.data as Worker[];
      } else if (action.payload.key === 'tasks') {
        state.tasks = action.payload.data as Task[];
      }
    },
    updateCell: (
      state,
      action: PayloadAction<{ key: EntityKey; rowIndex: number; column: string; value: string }>
    ) => {
      const { key, rowIndex, column, value } = action.payload;

      const entityData = state[key] as (Client | Worker | Task)[];

      const updatedEntityData = [...entityData];
      updatedEntityData[rowIndex] = { ...updatedEntityData[rowIndex], [column]: value };

      if (key === 'clients') {
        state.clients = updatedEntityData as Client[];
      } else if (key === 'workers') {
        state.workers = updatedEntityData as Worker[];
      } else if (key === 'tasks') {
        state.tasks = updatedEntityData as Task[];
      }

      const updatedErrors = validateData(key, updatedEntityData);
      state.errors = updatedErrors;
    },

    setErrors: (state, action: PayloadAction<ValidationError[]>) => {
      state.errors = action.payload;
    },
    addRule: (state, action: PayloadAction<Rule>) => {
      state.rules.push(action.payload);
    },
    removeRule: (state, action: PayloadAction<number>) => {
      state.rules.splice(action.payload, 1);
    },
    clearRules: (state) => {
      state.rules = [];
    },
    setPriorityWeight: (state, action: PayloadAction<{ key: keyof PriorityWeights; value: number }>) => {
      state.priorityWeights[action.payload.key] = action.payload.value;
    },
  },
});

export const {
  setData,
  updateCell,
  setErrors,
  addRule,
  removeRule,
  clearRules,
  setPriorityWeight,
} = dataSlice.actions;

export default dataSlice.reducer;
