import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Material } from '../types/materials';

interface TipsSectionProps {
  selectedMaterial: Material | null;
}

const TipsSection: React.FC<TipsSectionProps> = ({ selectedMaterial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const generalTips = [
    'Mide siempre dos veces, compra una vez',
    'En Magallanes, considera la humedad al almacenar materiales',
    'Los vientos patagónicos requieren fijaciones extra resistentes',
    'Compra en proveedores locales para reducir costos de transporte',
    'Siempre verifica la disponibilidad antes de iniciar la obra'
  ];

  const tips = selectedMaterial ? selectedMaterial.tips : generalTips;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
      >
        <div className="flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          {selectedMaterial ? `Tips para ${selectedMaterial.name}` : 'Tips Generales'}
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center text-xs font-medium text-yellow-800">
                {index + 1}
              </span>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
          {selectedMaterial && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Descripción:</strong> {selectedMaterial.description}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TipsSection;