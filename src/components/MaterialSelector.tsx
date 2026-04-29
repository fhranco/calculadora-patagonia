import React, { useState } from 'react';
import { materials } from '../data/materials';
import MaterialCard from './MaterialCard';
import { Search, Filter } from 'lucide-react';

interface MaterialSelectorProps {
  selectedMaterialId: string | null;
  onMaterialSelect: (materialId: string) => void;
}

type FilterCategory = 'all' | 'cemento' | 'ceramica' | 'porcelanato' | 'techo' | 'piso_flotante' | 'yeso';

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  selectedMaterialId,
  onMaterialSelect
}) => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Función para categorizar materiales
  const getMaterialCategory = (materialId: string): FilterCategory => {
    if (materialId.includes('cemento')) return 'cemento';
    if (materialId.includes('ceramica')) return 'ceramica';
    if (materialId.includes('porcelanato')) return 'porcelanato';
    if (materialId.includes('plancha_techo')) return 'techo';
    if (materialId.includes('piso_flotante')) return 'piso_flotante';
    if (materialId.includes('yeso')) return 'yeso';
    return 'all';
  };

  // Filtrar materiales
  const filteredMaterials = materials.filter(material => {
    const matchesCategory = filter === 'all' || getMaterialCategory(material.id) === filter;
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Definir categorías
  const categories = [
    { id: 'all' as FilterCategory, name: 'Todos' },
    { id: 'cemento' as FilterCategory, name: 'Cementos' },
    { id: 'ceramica' as FilterCategory, name: 'Cerámicas' },
    { id: 'porcelanato' as FilterCategory, name: 'Porcelanato' },
    { id: 'techo' as FilterCategory, name: 'Techos' },
    { id: 'piso_flotante' as FilterCategory, name: 'Piso Flotante' },
    { id: 'yeso' as FilterCategory, name: 'Yeso' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Selecciona tu Material de Construcción
        </h2>
        <p className="text-gray-600">
          Haz clic en cualquier material para abrir la calculadora
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Filtros por categoría */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Filter className="w-4 h-4 mr-2 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filtrar por categoría:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de materiales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMaterials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            isSelected={selectedMaterialId === material.id}
            onSelect={onMaterialSelect}
          />
        ))}
      </div>

      {/* Estado vacío */}
      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No se encontraron materiales
          </h3>
          <p className="text-gray-500 mb-4">
            Intenta ajustar los filtros o términos de búsqueda
          </p>
          <button
            onClick={() => {
              setFilter('all');
              setSearchTerm('');
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Ver todos los materiales
          </button>
        </div>
      )}
    </div>
  );
};

export default MaterialSelector;