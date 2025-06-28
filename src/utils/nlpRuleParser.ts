export const parseRuleFromText = (text: string) => {
  const lower = text.toLowerCase();

  // Co-run Rule: "Co-run Task T1 and Task T2"
  const coRunMatch = lower.match(/co-?run.*task (\w+).*and.*task (\w+)/);
  if (coRunMatch) {
    return {
      type: 'coRun',
      params: { tasks: [coRunMatch[1], coRunMatch[2]] },
    };
  }

  // Slot restriction Rule: "Limit workers in group Sales to 2 slots per phase"
  const slotRestrictMatch = lower.match(/limit workers in group (\w+) to (\d+) slots per phase/);
  if (slotRestrictMatch) {
    return {
      type: 'slotRestriction',
      params: { workerGroup: slotRestrictMatch[1], maxSlotsPerPhase: parseInt(slotRestrictMatch[2]) },
    };
  }

  // Load limit Rule: "Set max load 3 for group Marketing"
  const loadLimitMatch = lower.match(/set max load (\d+) for group (\w+)/);
  if (loadLimitMatch) {
    return {
      type: 'loadLimit',
      params: { workerGroup: loadLimitMatch[2], maxLoad: parseInt(loadLimitMatch[1]) },
    };
  }

  return null; 
};
