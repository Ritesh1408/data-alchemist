interface ValidationError {
  entityType: 'clients' | 'workers' | 'tasks';
  rowIndex: number;
  column: string;
  message: string;
}

export const validateData = (
  entityType: 'clients' | 'workers' | 'tasks',
  data: any[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (data.length === 0) return errors;

  // Required columns
  const requiredColumns: Record<string, string[]> = {
    clients: ['ClientID', 'ClientName', 'PriorityLevel', 'RequestedTaskIDs', 'GroupTag', 'AttributesJSON'],
    workers: ['WorkerID', 'WorkerName', 'Skills', 'AvailableSlots', 'MaxLoadPerPhase', 'WorkerGroup', 'QualificationLevel'],
    tasks: ['TaskID', 'TaskName', 'Category', 'Duration', 'RequiredSkills', 'PreferredPhases', 'MaxConcurrent'],
  };

  const ids = new Set();

  data.forEach((row, rowIndex) => {
    // Check for missing required columns
    requiredColumns[entityType].forEach((column) => {
      if (row[column] === undefined || row[column] === '') {
        errors.push({
          entityType,
          rowIndex,
          column,
          message: `${column} is missing.`,
        });
      }
    });

    // Check for duplicate IDs
    const idKey = entityType === 'clients' ? 'ClientID' : entityType === 'workers' ? 'WorkerID' : 'TaskID';
    if (ids.has(row[idKey])) {
      errors.push({
        entityType,
        rowIndex,
        column: idKey,
        message: `Duplicate ID: ${row[idKey]}`,
      });
    } else {
      ids.add(row[idKey]);
    }

    // Check number fields
    if (entityType === 'clients' && (row['PriorityLevel'] < 1 || row['PriorityLevel'] > 5)) {
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
        JSON.parse(row['AttributesJSON']);
      } catch (err) {
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
