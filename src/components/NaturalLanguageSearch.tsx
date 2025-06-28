'use client';

import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { parseSearchQuery } from '@/utils/nlpSearchParser';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Client, Worker, Task } from '@/types/global';

type EntityType = 'clients' | 'workers' | 'tasks' | '';
type EntityData = Client | Worker | Task;

export const NaturalLanguageSearch: React.FC = () => {
  const { clients, workers, tasks } = useAppSelector((state) => state.data);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState<EntityData[]>([]);
  const [entityType, setEntityType] = useState<EntityType>('');

  const handleSearch = () => {
    const result = parseSearchQuery(query, { clients, workers, tasks });
    if (result) {
      setEntityType(result.entityType as EntityType);
      setFilteredData(result.data as EntityData[]);
    } else {
      toast.error('Could not understand the search query.');
      setEntityType('');
      setFilteredData([]);
    }
  };

  return (
    <div className="border p-4 my-6 rounded-lg bg-white shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Natural Language Data Search</h2>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='e.g., Show tasks longer than 2 phases in phase 3'
        className="border p-2 w-full h-24 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Button onClick={handleSearch} disabled={!query.trim()}>
        Search
      </Button>

      {filteredData.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h3 className="font-semibold mb-2 text-gray-700">Search Results ({entityType}):</h3>
          <table className="table-auto w-full border rounded">
            <thead className="bg-gray-200">
              <tr>
                {Object.keys(filteredData[0]).map((key) => (
                  <th key={key} className="border px-4 py-2 text-left">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {Object.entries(row).map((val, i) => (
                    <td key={i} className="border px-4 py-2">
                      {Array.isArray(val)
                        ? val.join(', ')
                        : typeof val === 'object' && val !== null
                        ? JSON.stringify(val)
                        : String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
