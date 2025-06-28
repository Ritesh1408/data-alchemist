import { useAppSelector } from '@/store/hooks';
import { AlertCircle } from 'lucide-react';

export const ValidationSummary: React.FC = () => {
  const { errors } = useAppSelector((state) => state.data);

  if (errors.length === 0) return null;

  return (
    <div className="border-l-4 border-red-500 bg-red-50 p-4 my-6 rounded-md shadow-sm">
      <div className="flex items-center mb-3">
        <AlertCircle className="text-red-500 mr-2" />
        <h2 className="text-lg font-semibold text-red-700">Validation Errors</h2>
      </div>

      <ul className="list-disc pl-6 space-y-2 text-red-800">
        {errors.map((error, idx) => (
          <li key={idx}>
            <span className="font-medium">{error.entityType}</span> - Row <span className="font-medium">{error.rowIndex + 1}</span>, Column: <span className="font-medium">{error.column}</span> - {error.message}
          </li>
        ))}
      </ul>
    </div>
  );
};
