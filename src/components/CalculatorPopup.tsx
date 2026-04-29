import React, { useState, useEffect } from 'react';
import { X, Calculator, Ruler, Settings, DollarSign, Save, Share2, AlertTriangle, FileText } from 'lucide-react';
import { Material, Calculation } from '../types/materials';
import { calculateArea, calculateVolume, calculateMaterialNeeds, formatCurrency } from '../utils/calculations';

interface CalculatorPopupProps {
  material: Material | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveCalculation: (calculation: Calculation) => void;
  onRequestLead: () => void;
  initialCalculation?: Calculation | null;
}

const CalculatorPopup: React.FC<CalculatorPopupProps> = ({
  material,
  isOpen,
  onClose,
  onSaveCalculation,
  onRequestLead,
  initialCalculation
}) => {
  const [largo, setLargo] = useState<number>(0);
  const [ancho, setAncho] = useState<number>(0);
  const [alto, setAlto] = useState<number>(0);
  const [rendimiento, setRendimiento] = useState<number>(0);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [extraPercentage, setExtraPercentage] = useState<number>(10);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Actualizar valores cuando cambia el material
  useEffect(() => {
    if (material) {
      setRendimiento(material.defaultRendimiento);
      setPricePerUnit(material.defaultPrice);
    }
  }, [material]);

  // Cargar datos iniciales si estamos editando
  useEffect(() => {
    if (isOpen && initialCalculation) {
      setLargo(initialCalculation.largo);
      setAncho(initialCalculation.ancho);
      setAlto(initialCalculation.alto || 0);
      setExtraPercentage(initialCalculation.extraPercentage);
      setStep(2); // Ir directo al paso 2 si estamos editando
    } else if (isOpen && !initialCalculation) {
      // Resetear si es nuevo
      setLargo(0);
      setAncho(0);
      setAlto(0);
      setExtraPercentage(10);
      setStep(1);
    }
  }, [isOpen, initialCalculation]);

  if (!isOpen || !material) return null;

  const area = calculateArea(largo, ancho);
  const volume = material.unitType === 'volume' ? calculateVolume(largo, ancho, alto) : undefined;

  const materialNeeds = calculateMaterialNeeds(
    material,
    area,
    volume,
    rendimiento,
    pricePerUnit,
    extraPercentage
  );

  const handleSave = () => {
    if (area === 0) return;

    const calculation: Calculation = {
      id: initialCalculation?.id || Date.now().toString(36) + Math.random().toString(36).substr(2),
      materialId: material.id,
      materialName: material.name,
      area,
      volume,
      largo,
      ancho,
      alto,
      rendimiento,
      pricePerUnit,
      unitsNeeded: materialNeeds.unitsNeeded,
      unitsWithExtra: materialNeeds.unitsWithExtra,
      totalCost: materialNeeds.totalCost,
      totalCostWithExtra: materialNeeds.totalCostWithExtra,
      extraPercentage,
      date: new Date().toISOString()
    };

    onSaveCalculation(calculation);
    onClose();
  };

  const handleShare = async () => {
    if (area === 0) return;

    const shareText = `
Calculadora de Materiales Patagónicos

Material: ${material.name}
Área: ${area.toFixed(2)} m²
${volume ? `Volumen: ${volume.toFixed(2)} m³` : ''}

Unidades necesarias: ${materialNeeds.unitsNeeded} ${material.unit}s
Unidades recomendadas (+${extraPercentage}%): ${materialNeeds.unitsWithExtra} ${material.unit}s

Costo estimado: ${formatCurrency(materialNeeds.totalCostWithExtra)}

Cálculo para la Región de Magallanes
    `.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cálculo de Materiales Patagónicos',
          text: shareText
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Cálculo copiado al portapapeles!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header Compacto */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-yellow-50">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 text-blue-900 p-2 rounded-lg shadow-inner">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-blue-900 leading-none">
                {material.name}
              </h2>
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mt-1">
                Ficha Técnica de Cubicación
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-50 rounded-full transition-colors group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
          </button>
        </div>

        <div className="p-4">
          {/* Indicador de Pasos */}
          <div className="flex items-center justify-between mb-6 px-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                  step === s ? 'bg-blue-900 text-yellow-500 scale-110 shadow-lg' : 
                  step > s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > s ? '✓' : s}
                </div>
                {s < 3 && (
                  <div className={`h-1 flex-1 mx-2 rounded-full ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="min-h-[300px] flex flex-col justify-between">
            
            {/* PASO 1: DIMENSIONES */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">Medidas del Proyecto</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Ingresa las dimensiones de la superficie</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow-inner">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-700 uppercase ml-1">Largo Total (metros)</label>
                      <input
                        type="number" step="any" autoFocus
                        defaultValue={largo > 0 ? largo : ''}
                        onChange={(e) => setLargo(parseFloat(e.target.value) || 0)}
                        placeholder="Ej: 5.50"
                        className="w-full px-4 py-4 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-900 focus:ring-0 text-xl font-black text-blue-900 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-700 uppercase ml-1">Ancho Total (metros)</label>
                      <input
                        type="number" step="any"
                        defaultValue={ancho > 0 ? ancho : ''}
                        onChange={(e) => setAncho(parseFloat(e.target.value) || 0)}
                        placeholder="Ej: 3.20"
                        className="w-full px-4 py-4 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-900 focus:ring-0 text-xl font-black text-blue-900 transition-all"
                      />
                    </div>
                    {material.unitType === 'volume' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-blue-700 uppercase ml-1">Alto / Espesor ({material.id.includes('cemento') ? 'cm' : 'metros'})</label>
                        <input
                          type="number" step="any"
                          defaultValue={material.id.includes('cemento') ? (alto * 100) : alto}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setAlto(material.id.includes('cemento') ? val / 100 : val);
                          }}
                          placeholder="Ej: 10"
                          className="w-full px-4 py-4 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-900 focus:ring-0 text-xl font-black text-blue-900 transition-all"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <button
                  disabled={largo <= 0 || ancho <= 0}
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-200 text-white font-black py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center text-sm uppercase tracking-widest"
                >
                  Continuar a Configuración
                </button>
              </div>
            )}

            {/* PASO 2: CONFIGURACIÓN */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">Detalles del Material</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Ajusta los parámetros técnicos</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="space-y-5">
                    <div className="bg-blue-900 text-white p-3 rounded-xl flex items-center space-x-3 mb-4 shadow-lg">
                      <FileText className="w-5 h-5 text-yellow-500 animate-pulse" />
                      <p className="text-[9px] font-black uppercase tracking-widest leading-tight">
                        Este cálculo generará una <span className="text-yellow-500">Ficha Técnica Oficial</span> al finalizar.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-wider">% Extra (Cortes/Desperdicio)</label>
                        <span className="text-xs font-black text-blue-900">{extraPercentage}%</span>
                      </div>
                      <input
                        type="range" min="0" max="30" step="5"
                        value={extraPercentage}
                        onChange={(e) => setExtraPercentage(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                      />
                      <div className="flex justify-between mt-1 px-1">
                        <span className="text-[8px] font-bold text-gray-400">0%</span>
                        <span className="text-[8px] font-bold text-gray-400">15%</span>
                        <span className="text-[8px] font-bold text-gray-400">30%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-600 uppercase ml-1">Precio Unitario</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                          <input
                            type="number"
                            value={pricePerUnit}
                            onChange={(e) => setPricePerUnit(parseFloat(e.target.value) || 0)}
                            className="w-full pl-7 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-blue-900 focus:ring-0 font-bold text-gray-800"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-600 uppercase ml-1">Rendimiento</label>
                        <input
                          type="number"
                          value={rendimiento}
                          onChange={(e) => setRendimiento(parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-blue-900 focus:ring-0 font-bold text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white border-2 border-gray-200 text-gray-500 font-black py-4 rounded-xl text-xs uppercase tracking-widest"
                  >Atrás</button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-[2] bg-blue-900 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-lg"
                  >Ver Resultados</button>
                </div>
              </div>
            )}

            {/* PASO 3: RESULTADOS */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">Cálculo Finalizado</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Resumen de materiales necesarios</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-blue-900 shadow-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Superficie Total:</span>
                    <span className="text-sm font-black text-blue-600">{area.toFixed(2)} m²</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-900 p-6 rounded-2xl border-b-8 border-yellow-500 shadow-xl text-center">
                      <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] mb-2">Compra Sugerida (+{extraPercentage}%)</p>
                      <p className="text-5xl font-black text-white mb-2">{materialNeeds.unitsWithExtra} <span className="text-xs font-normal uppercase text-blue-300">{material.unit}s</span></p>
                      <div className="h-px bg-blue-800 w-full mb-3" />
                      <p className="text-[10px] font-black text-blue-300 uppercase mb-1">Presupuesto Estimado</p>
                      <p className="text-3xl font-black text-yellow-500">{formatCurrency(materialNeeds.totalCostWithExtra)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-white border-2 border-blue-900 text-blue-900 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest shadow-md hover:bg-gray-50 transition-all"
                  >Atras / Ajustar</button>
                </div>
                
                <div className="text-center py-2">
                  <p className="text-[10px] font-bold text-blue-900 uppercase tracking-tight mb-3 leading-relaxed px-4">
                    ¿Te gustaría descargar tu cotización oficial o necesitas <span className="text-blue-600 underline">ayuda experta</span> con la elección de tus materiales?
                  </p>
                  <button
                    onClick={() => {
                      handleSave();
                      onClose();
                      // Pequeño delay para asegurar que el popup se cerró antes de abrir el lead
                      setTimeout(() => {
                        onRequestLead();
                      }, 100);
                    }}
                    className="w-full bg-yellow-500 text-blue-900 font-black py-6 rounded-2xl text-[12px] uppercase tracking-[0.15em] shadow-2xl border-b-8 border-yellow-700 flex flex-col items-center justify-center transform hover:-translate-y-1 transition-all active:scale-95 active:border-b-0"
                  >
                    <div className="flex items-center mb-1">
                      <FileText className="w-6 h-6 mr-2" />
                      <span>SÍ, QUIERO MI COTIZACIÓN Y ASESORÍA</span>
                    </div>
                    <span className="text-[9px] opacity-70 italic font-bold">Documento técnico gratuito · Sujeto a stock</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPopup;