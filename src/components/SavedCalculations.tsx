import React from 'react';
import { History, Trash2, Eye } from 'lucide-react';
import { Calculation } from '../types/materials';
import { formatCurrency } from '../utils/calculations';

interface SavedCalculationsProps {
  calculations: Calculation[];
  onViewCalculation: (calculation: Calculation) => void;
  onDeleteCalculation: (calculationId: string) => void;
}

const SavedCalculations: React.FC<SavedCalculationsProps> = ({
  calculations,
  onViewCalculation,
  onDeleteCalculation
}) => {
  if (calculations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <History className="w-5 h-5 mr-2" />
        Cálculos Guardados ({calculations.length})
      </h2>

      <div className="space-y-3">
        {calculations.slice(0, 5).map((calculation) => (
          <div
            key={calculation.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{calculation.materialName}</h3>
              <p className="text-sm text-gray-600">
                {calculation.area.toFixed(1)} m² • {calculation.unitsWithExtra} unidades • {' '}
                {formatCurrency(calculation.totalCostWithExtra)}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(calculation.date).toLocaleDateString('es-CL')}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onViewCalculation(calculation)}
                className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                title="Ver cálculo"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteCalculation(calculation.id)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {calculations.length > 5 && (
          <p className="text-sm text-gray-500 text-center">
            Y {calculations.length - 5} cálculos más...
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedCalculations;