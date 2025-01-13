import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ChartTypeSelectorProps {
  currentType: string;
  onTypeChange: (type: string) => void;
}

export function ChartTypeSelector({ currentType, onTypeChange }: ChartTypeSelectorProps) {
  return (
    <Select value={currentType} onValueChange={onTypeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select chart type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="line">Line Chart</SelectItem>
        <SelectItem value="bar">Bar Chart</SelectItem>
        <SelectItem value="pie">Pie Chart</SelectItem>
      </SelectContent>
    </Select>
  );
}

