import React from 'react';
import { Package, Square, Home, Grid3X3, Waves } from 'lucide-react';
import { Material } from '../types/materials';
import { formatCurrency } from '../utils/calculations';

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  onSelect: (materialId: string) => void;
}

const iconMap = {
  Package,
  Square,
  Home,
  Grid3X3,
  Waves
};

const MaterialCard: React.FC<MaterialCardProps> = ({ material, isSelected, onSelect }) => {
  const IconComponent = iconMap[material.icon as keyof typeof iconMap];

  const getUnitDisplay = () => {
    switch (material.unitType) {
      case 'area':
        return `${material.defaultRendimiento} m² por ${material.unit}`;
      case 'volume':
        return `${material.defaultRendimiento} m³ por ${material.unit}`;
      default:
        return `${material.defaultRendimiento} por ${material.unit}`;
    }
  };

  return (
    <div
      className={`
        p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 
        hover:shadow-lg transform hover:-translate-y-1
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-blue-300'
        }
      `}
      onClick={() => onSelect(material.id)}
    >
      <div className="text-center">
        <div className={`
          inline-flex items-center justify-center w-16 h-16 rounded-full mb-3
          ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
        `}>
          <IconComponent size={32} />
        </div>
        <h3 className="font-semibold text-gray-800 mb-2 text-sm leading-tight">
          {material.name}
        </h3>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {material.description}
        </p>
        <div className="space-y-1">
          <p className="text-xs text-blue-600 font-medium">
            {getUnitDisplay()}
          </p>
          <p className="text-sm font-bold text-yellow-600">
            Desde {formatCurrency(material.defaultPrice)}
          </p>
          <p className="text-xs text-gray-500">
            por {material.unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;