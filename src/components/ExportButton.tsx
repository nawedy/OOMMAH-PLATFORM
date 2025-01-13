import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ExcelJS from 'exceljs';

interface ExportButtonProps {
  data: any;
}

export function ExportButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();

    Object.entries(data).forEach(([sheetName, sheetData]: [string, any]) => {
      const worksheet = workbook.addWorksheet(sheetName);
      worksheet.addRow(['Label', 'Value']);
      sheetData.datasets[0].data.forEach((value: number, index: number) => {
        worksheet.addRow([sheetData.labels[index], value]);
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analytics_data.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Button onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Export Data
    </Button>
  );
}

