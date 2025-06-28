import { validateData } from '@/utils/validator';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidationError } from 'next/dist/compiled/amphtml-validator';

interface PriorityWeights {
  priorityLevel: number;
  taskFulfillment: number;
  fairness: number;
}

interface Rule {
  type: string;
  params: any;
}


interface DataState {
  clients: any[];
  workers: any[];
  tasks: any[];
  errors: ValidationError[];
  rules: Rule[];
  priorityWeights: PriorityWeights;
}

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
    setData: (state, action: PayloadAction<{ key: 'clients' | 'workers' | 'tasks'; data: any[] }>) => {
      state[action.payload.key] = action.payload.data;
    },
    updateCell: (state, action) => {
      const { key, rowIndex, column, value } = action.payload;
      const entityData = state[key];

      const updatedEntityData = [...entityData];
      updatedEntityData[rowIndex] = { ...updatedEntityData[rowIndex], [column]: value };

      state[key] = updatedEntityData;

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

export const { setData, updateCell, setErrors, addRule, removeRule, clearRules, setPriorityWeight } = dataSlice.actions;
export default dataSlice.reducer;
