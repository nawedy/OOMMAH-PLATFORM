import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ExportButton } from '../ExportButton';
import ExcelJS from 'exceljs';

jest.mock('exceljs', () => ({
  Workbook: jest.fn().mockImplementation(() => ({
    addWorksheet: jest.fn().mockReturnThis(),
    xlsx: {
      writeBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
    },
  })),
}));

describe('ExportButton', () => {
  const mockData = {
    userGrowth: {
      labels: ['2023-05-01', '2023-05-02'],
      datasets: [{ data: [10, 20] }],
    },
  };

  it('renders correctly', () => {
    const { getByText } = render(<ExportButton data={mockData} />);
    expect(getByText('Export Data')).toBeInTheDocument();
  });

  it('exports data when clicked', () => {
    const { getByText } = render(<ExportButton data={mockData} />);
    const workbook = new ExcelJS.Workbook();
    fireEvent.click(getByText('Export Data'));

    expect(ExcelJS.Workbook).toHaveBeenCalled();
    expect(workbook.addWorksheet).toHaveBeenCalled();
    expect(workbook.xlsx.writeBuffer).toHaveBeenCalled();
  });
});

