'use client';

import { useAppSelector } from '@/store/hooks';
import { exportCSV } from '@/utils/csvExporter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { RuleSuggestion } from '@/types/global';

export const DataExporter: React.FC = () => {
  const { clients, workers, tasks } = useAppSelector((state) => state.data);

  const handleExport = (data: RuleSuggestion[], filename: string) => {
    if (data.length === 0) return;
    exportCSV(data, filename);
    toast.success(`✅ ${filename}.csv exported successfully!`);
  };

  return (
    <Card className="shadow">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">📤 Export Cleaned Data</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => handleExport(clients, 'cleaned_clients')}
            disabled={clients.length === 0}
            className="w-full"
          >
            Export Clients CSV
          </Button>

          <Button
            onClick={() => handleExport(workers, 'cleaned_workers')}
            disabled={workers.length === 0}
            className="w-full"
          >
            Export Workers CSV
          </Button>

          <Button
            onClick={() => handleExport(tasks, 'cleaned_tasks')}
            disabled={tasks.length === 0}
            className="w-full"
          >
            Export Tasks CSV
          </Button>
        </div>

        {(clients.length === 0 && workers.length === 0 && tasks.length === 0) && (
          <div className="text-center text-gray-500 mt-4">
            No data available to export.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
