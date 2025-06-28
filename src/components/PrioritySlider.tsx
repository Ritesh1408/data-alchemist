'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPriorityWeight } from '@/store/dataSlice';
import { Slider } from '@/components/ui/slider';

export const PrioritySlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const { priorityWeights } = useAppSelector((state) => state.data);

  const handleChange = (key: keyof typeof priorityWeights, value: number[]) => {
    dispatch(setPriorityWeight({ key, value: value[0] }));
  };

  return (
    <div className="border p-6 my-6 rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Set Priorities</h2>

      {Object.keys(priorityWeights).map((key) => (
        <div key={key} className="mb-6">
          <label className="block mb-2 text-lg font-medium capitalize text-gray-700 dark:text-gray-300">
            {key.replace(/([A-Z])/g, ' $1')}
          </label>

          <Slider
            defaultValue={[priorityWeights[key as keyof typeof priorityWeights]]}
            max={5}
            step={1}
            onValueChange={(value) => handleChange(key as keyof typeof priorityWeights, value)}
            className="mb-2"
          />

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>Low</span>
            <span>High</span>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300">
            Current Priority: <span className="font-semibold">{priorityWeights[key as keyof typeof priorityWeights]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
