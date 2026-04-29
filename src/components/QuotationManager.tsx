import React from 'react';
import { FileText, Trash2 } from 'lucide-react';
import { Calculation } from '../types/materials';
import { formatCurrency } from '../utils/calculations';

interface QuotationManagerProps {
  calculations: Calculation[];
  onClearCalculations: () => void;
  onViewCalculation: (calculation: Calculation) => void;
  onDeleteCalculation: (calculationId: string) => void;
  showShareDialog: boolean;
  setShowShareDialog: (show: boolean) => void;
}

const QuotationManager: React.FC<QuotationManagerProps> = ({
  calculations,
  onClearCalculations,
  onViewCalculation,
  onDeleteCalculation,
  showShareDialog,
  setShowShareDialog
}) => {
  const totalCost = calculations.reduce((sum, calc) => sum + calc.totalCostWithExtra, 0);

  return (
    <div id="modulo-cotizacion" className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
        <h2 className="text-2xl font-corporate font-light text-blue-900 flex items-center tracking-widest">
          <span className="bg-blue-50 p-2 rounded-lg mr-4 border border-blue-100">
            <FileText className="w-5 h-5 text-blue-900" />
          </span>
          MÓDULO DE <span className="font-bold ml-2">COTIZACIÓN</span>
        </h2>
      </div>

      {/* Cálculos actuales */}
      {calculations.length > 0 ? (
        <div className="mb-6 p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-corporate font-bold text-[10px] text-blue-400 tracking-widest uppercase">
              Cálculos Actuales ({calculations.length})
            </h3>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Estimado</p>
              <p className="text-3xl font-corporate font-light text-blue-900">
                {formatCurrency(totalCost)}
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-10">
            {calculations.map((calc) => (
              <div key={calc.id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-50 group">
                <div className="flex-1">
                  <p className="font-corporate font-bold text-xs text-blue-900 tracking-tight">{calc.materialName}</p>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                    {calc.area.toFixed(1)} m² • {calc.unitsWithExtra} {calc.id.includes('cemento') ? 'sacos' : 'unid.'}
                  </p>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <span className="font-corporate font-light text-blue-600 text-sm">
                    {formatCurrency(calc.totalCostWithExtra)}
                  </span>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onViewCalculation(calc)}
                      className="p-1.5 text-blue-400 hover:bg-blue-50 rounded-lg"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteCalculation(calc.id)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowShareDialog(true)}
              className="w-full bg-[#1a2b4b] hover:bg-blue-900 text-white py-6 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all flex flex-col items-center justify-center group"
            >
              <div className="flex items-center text-lg font-corporate font-light tracking-[0.2em]">
                <FileText className="w-5 h-5 mr-4 text-[#fec62b]" />
                SOLICITAR <span className="font-bold ml-2">ASESORÍA</span>
              </div>
              <span className="text-[8px] mt-2 opacity-50 uppercase tracking-[0.4em] font-light group-hover:opacity-100 transition-opacity">Región de Magallanes y Antártica Chilena</span>
            </button>
            <button
              onClick={onClearCalculations}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center h-[72px]"
              title="Limpiar cálculos"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Aún no hay cálculos guardados</p>
          <p className="text-gray-400 text-[10px] mt-1">Selecciona un material arriba para comenzar</p>
        </div>
      )}
    </div>
  );
};

export default QuotationManager;