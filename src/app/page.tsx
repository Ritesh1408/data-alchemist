'use client';

import { FileUpload } from '@/components/FileUpload';
import { parseFile } from '@/utils/fileParser';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setData, setErrors } from '@/store/dataSlice';
import { DataGrid } from '@/components/DataGrid';
import { validateData } from '@/utils/validator';
import { ValidationSummary } from '@/components/ValidationSummary';
import { RuleBuilder } from '@/components/RuleBuilder';
import { PrioritySlider } from '@/components/PrioritySlider';
import { NaturalLanguageRuleInput } from '@/components/NaturalLanguageRuleInput';
import { NaturalLanguageSearch } from '@/components/NaturalLanguageSearch';
import { AIRuleSuggestions } from '@/components/AIRuleSuggestions';
import { DataExporter } from '@/components/DataExporter';
import { Card, CardContent } from '@/components/ui/card';

import type { Client, Worker, Task } from '@/types/global'; 

export default function Home() {
  const dispatch = useAppDispatch();
  const { clients, workers, tasks } = useAppSelector((state) => state.data);

  const handleFileUpload = async (file: File, type: 'clients' | 'workers' | 'tasks') => {
    const rawData = await parseFile(file);

    let data: Client[] | Worker[] | Task[];
    if (type === 'clients') {
      data = rawData as Client[];
    } else if (type === 'workers') {
      data = rawData as Worker[];
    } else {
      data = rawData as Task[];
    }

    dispatch(setData({ key: type, data }));

    const validationErrors = validateData(type, data);
    dispatch(setErrors(validationErrors));
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          🚀 Data Alchemist
        </h1>

        {/* File Upload */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <FileUpload onFileUpload={handleFileUpload} />
          </CardContent>
        </Card>

        {/* Validation Summary */}
        {useAppSelector((state) => state.data.errors.length > 0) && (
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <ValidationSummary />
            </CardContent>
          </Card>
        )}

        {/* Rule Builder and Priority */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <RuleBuilder />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <PrioritySlider />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <NaturalLanguageRuleInput />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <NaturalLanguageSearch />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <AIRuleSuggestions />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <DataExporter />
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        {clients.length > 0 && (
          <Card className="shadow-lg mt-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">📁 Clients</h2>
              <DataGrid data={clients} entityType="clients" />
            </CardContent>
          </Card>
        )}

        {/* Workers Table */}
        {workers.length > 0 && (
          <Card className="shadow-lg mt-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">🛠️ Workers</h2>
              <DataGrid data={workers} entityType="workers" />
            </CardContent>
          </Card>
        )}

        {/* Tasks Table */}
        {tasks.length > 0 && (
          <Card className="shadow-lg mt-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">✅ Tasks</h2>
              <DataGrid data={tasks} entityType="tasks" />
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
