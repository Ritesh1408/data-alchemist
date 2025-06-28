import { Client, Worker, Task, ValidationError } from '@/types/global';

export const validateData = (
  entityType: 'clients' | 'workers' | 'tasks',
  data: Client[] | Worker[] | Task[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (data.length === 0) return errors;

  const requiredColumns: Record<'clients' | 'workers' | 'tasks', string[]> = {
    clients: ['ClientID', 'ClientName', 'PriorityLevel', 'RequestedTaskIDs', 'GroupTag', 'AttributesJSON'],
    workers: ['WorkerID', 'WorkerName', 'Skills', 'AvailableSlots', 'MaxLoadPerPhase', 'WorkerGroup', 'QualificationLevel'],
    tasks: ['TaskID', 'TaskName', 'Category', 'Duration', 'RequiredSkills', 'PreferredPhases', 'MaxConcurrent'],
  };

  const ids = new Set<string>();

  data.forEach((row, rowIndex) => {
    requiredColumns[entityType].forEach((column) => {
      if (row[column as keyof typeof row] === undefined || row[column as keyof typeof row] === '') {
        errors.push({
          entityType,
          rowIndex,
          column,
          message: `${column} is missing.`,
        });
      }
    });

    const idKey = entityType === 'clients' ? 'ClientID' : entityType === 'workers' ? 'WorkerID' : 'TaskID';

    if (ids.has(row[idKey as keyof typeof row] as string)) {
      errors.push({
        entityType,
        rowIndex,
        column: idKey,
        message: `Duplicate ID: ${row[idKey as keyof typeof row]}`,
      });
    } else {
      ids.add(row[idKey as keyof typeof row] as string);
    }

    if (entityType === 'clients' && (Number(row['PriorityLevel']) < 1 || Number(row['PriorityLevel']) > 5)) {
      errors.push({
        entityType,
        rowIndex,
        column: 'PriorityLevel',
        message: 'PriorityLevel must be between 1 and 5.',
      });
    }

    if (entityType === 'workers' && isNaN(Number(row['MaxLoadPerPhase']))) {
      errors.push({
        entityType,
        rowIndex,
        column: 'MaxLoadPerPhase',
        message: 'MaxLoadPerPhase must be a number.',
      });
    }

    if (entityType === 'tasks' && (isNaN(Number(row['Duration'])) || Number(row['Duration']) < 1)) {
      errors.push({
        entityType,
        rowIndex,
        column: 'Duration',
        message: 'Duration must be a number ≥ 1.',
      });
    }

    if (entityType === 'clients' && row['AttributesJSON']) {
      try {
        JSON.parse(row['AttributesJSON'] as string);
      } catch {
        errors.push({
          entityType,
          rowIndex,
          column: 'AttributesJSON',
          message: 'AttributesJSON is not valid JSON.',
        });
      }
    }
  });

  return errors;
};
