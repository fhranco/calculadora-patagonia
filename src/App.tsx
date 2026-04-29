import React, { useState, useEffect } from 'react';
import { FileText, MessageCircle, Instagram, Facebook, Phone, Download } from 'lucide-react';
import { Analytics, track } from '@vercel/analytics/react';
import Header from './components/Header';
import MaterialSelector from './components/MaterialSelector';
import CalculatorPopup from './components/CalculatorPopup';
import SavedCalculations from './components/SavedCalculations';
import QuotationManager from './components/QuotationManager';
import LeadForm from './components/LeadForm';
import TipsSection from './components/TipsSection';
import { materials } from './data/materials';
import { Calculation } from './types/materials';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false);
  const [leadMode, setLeadMode] = useState<'whatsapp' | 'pdf'>('whatsapp');
  const [savedCalculations, setSavedCalculations] = useState<Calculation[]>([]);
  const [selectedCalculation, setSelectedCalculation] = useState<Calculation | null>(null);

  // Material seleccionado
  const selectedMaterial = selectedMaterialId 
    ? materials.find(m => m.id === selectedMaterialId) 
    : null;

  // Cargar cálculos guardados al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('patagonia-calculations');
    if (saved) {
      setSavedCalculations(JSON.parse(saved));
    }
  }, []);

  // Funciones de manejo
  const handleMaterialSelect = (id: string) => {
    setSelectedMaterialId(id);
    setSelectedCalculation(null);
    setShowCalculator(true);
    track('material_viewed', { materialId: id });
  };

  const handleCloseCalculator = () => {
    setShowCalculator(false);
    setSelectedMaterialId(null);
    setSelectedCalculation(null);
    
    // Pequeño delay para que el estado de la UI se limpie antes del scroll
    setTimeout(() => {
      const element = document.getElementById('modulo-cotizacion');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleSaveCalculation = (calculation: Calculation) => {
    let updatedCalculations;
    
    if (selectedCalculation) {
      // Si estamos editando, reemplazamos el anterior
      updatedCalculations = savedCalculations.map(c => 
        c.id === selectedCalculation.id ? calculation : c
      );
    } else {
      // Si es nuevo, lo agregamos al inicio
      updatedCalculations = [calculation, ...savedCalculations];
    }
    
    setSavedCalculations(updatedCalculations);
    localStorage.setItem('patagonia-calculations', JSON.stringify(updatedCalculations));
  };

  const handleViewCalculation = (calculation: Calculation) => {
    setSelectedCalculation(calculation);
    setSelectedMaterialId(calculation.materialId);
    setShowCalculator(true);
  };

  const handleDeleteCalculation = (calculationId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este cálculo?')) {
      const updatedCalculations = savedCalculations.filter(c => c.id !== calculationId);
      setSavedCalculations(updatedCalculations);
      localStorage.setItem('patagonia-calculations', JSON.stringify(updatedCalculations));
    }
  };

  const handleClearCalculations = () => {
    if (confirm('¿Estás seguro de que quieres limpiar todos los cálculos actuales?')) {
      setSavedCalculations([]);
      localStorage.removeItem('patagonia-calculations');
    }
  };

  const handleLeadSuccess = (data: any) => {
    const totalCost = savedCalculations.reduce((sum, calc) => sum + calc.totalCostWithExtra, 0);
    
    const message = `
*🏔️ SOLICITUD DE COTIZACIÓN TÉCNICA*
*Comercial de la Patagonia*
------------------------------------------

*👤 DATOS DEL CLIENTE:*
• *Nombre:* ${data.clientName}
• *WhatsApp:* ${data.clientPhone}
• *Email:* ${data.clientEmail}
• *Proyecto:* ${data.projectName}

*🏗️ DESGLOSE DE MATERIALES:*
${savedCalculations.map((item, index) => `
*${index + 1}. ${item.materialName}*
   - Área/Vol: ${item.area.toFixed(2)} m² ${item.volume ? `/ ${item.volume.toFixed(2)} m³` : ''}
   - Cantidad: ${item.unitsWithExtra} unidades (+${item.extraPercentage}% extra)
   - Subtotal: ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(item.totalCostWithExtra)}`).join('\n')}

------------------------------------------
*💰 TOTAL ESTIMADO: ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(totalCost)}*
------------------------------------------

*📢 NOTA PARA EL ASISTENTE:*
El cliente está a la espera de confirmación de stock y costos de envío para la Región de Magallanes.

_Generado vía Calculadora Patagonia Coach_ 🏔️
    `.trim();

    if (leadMode === 'pdf') {
      track('lead_conversion_pdf', { client: data.clientName });
      generatePDF(savedCalculations, { name: data.clientName, phone: data.clientPhone });
    } else {
      track('lead_conversion_whatsapp', { client: data.clientName });
      const whatsappLink = `https://wa.me/56985806127?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
    }

    setShowLeadForm(false);
    alert('¡Excelente! Tu solicitud ha sido procesada.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <MaterialSelector
          selectedMaterialId={selectedMaterialId}
          onMaterialSelect={handleMaterialSelect}
        />

        <QuotationManager
          calculations={savedCalculations}
          onClearCalculations={handleClearCalculations}
          onViewCalculation={handleViewCalculation}
          onDeleteCalculation={handleDeleteCalculation}
          onRequestLead={() => {
            setLeadMode('whatsapp');
            setShowLeadForm(true);
          }}
          onRequestPDF={() => {
            setLeadMode('pdf');
            setShowLeadForm(true);
          }}
        />

        <TipsSection selectedMaterial={selectedMaterial} />
        <Analytics />
      </main>

      <CalculatorPopup
        material={selectedMaterial}
        isOpen={showCalculator}
        onClose={handleCloseCalculator}
        onSaveCalculation={handleSaveCalculation}
        onRequestLead={() => {
          setLeadMode('whatsapp');
          setShowLeadForm(true);
        }}
        initialCalculation={selectedCalculation}
      />

      {/* Footer Híbrido: Identidad + Información */}
      <footer className="mt-20">
        {/* Parte 1: Fila de Identidad (Pre-Footer Blanco) */}
        <div className="bg-white border-t-8 border-[#fec62b] py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Comercial de la Patagonia" 
                  className="h-20 md:h-28 object-contain"
                />
              </div>
              <div className="text-center md:text-left space-y-1">
                <h2 className="text-xl md:text-3xl font-corporate font-thin text-blue-900 leading-tight tracking-[0.2em]">
                  CALCULADORA DE <br className="hidden md:block" /> 
                  <span className="font-bold tracking-normal text-blue-800">MATERIALES</span>
                </h2>
                <p className="text-[10px] md:text-xs text-blue-500 font-light uppercase tracking-[0.4em] opacity-80">Región de Magallanes y Antártica Chilena</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parte 2: Información Técnica (Footer Oscuro) */}
        <div className="bg-[#0a162b] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">
              {/* Columna 1: Empresa */}
              <div className="space-y-6">
                <h4 className="text-[#fec62b] font-corporate font-bold uppercase tracking-widest text-sm border-b border-blue-900 pb-4">
                  Nuestra Empresa
                </h4>
                <p className="text-blue-200 text-xs leading-relaxed font-light max-w-xs mx-auto md:mx-0">
                  Líderes en soluciones para la construcción en la Región de Magallanes. 
                  Tecnología y servicio de excelencia desde el corazón de la Zona Franca.
                </p>
                <div className="pt-4">
                  <a 
                    href="https://comercialpatagonia.cl" 
                    target="_blank"
                    className="text-white font-black tracking-widest text-sm hover:text-[#fec62b] transition-all border-b border-[#fec62b]"
                  >
                    COMERCIALPATAGONIA.CL
                  </a>
                </div>
                <div className="pt-6 flex items-center justify-center md:justify-start space-x-4">
                  <a 
                    href="https://www.instagram.com/comercialdelapatagonia/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-900/50 rounded-full flex items-center justify-center hover:bg-[#fec62b] hover:text-blue-900 transition-all border border-blue-800"
                    title="Síguenos en Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.facebook.com/profile.php?id=100068054989987&locale=es_LA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-900/50 rounded-full flex items-center justify-center hover:bg-[#fec62b] hover:text-blue-900 transition-all border border-blue-800"
                    title="Síguenos en Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Columna 2: Ubicación */}
              <div className="space-y-6">
                <h4 className="text-[#fec62b] font-corporate font-bold uppercase tracking-widest text-sm border-b border-blue-900 pb-4">
                  Ubicación
                </h4>
                <div className="text-gray-300 text-sm space-y-3">
                  <p className="font-bold text-white uppercase tracking-tighter">Casa Matriz - Zona Franca</p>
                  <p>Manzana 12 Sitio 71 Zona Franca,<br />Punta Arenas, Chile</p>
                  <a 
                    href="https://maps.app.goo.gl/HyZbJYadVNmWLwGPA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-[#fec62b] hover:text-white transition-colors font-bold text-xs underline underline-offset-4"
                  >
                    VER MAPA DE ACCESO →
                  </a>
                </div>
              </div>

              {/* Columna 3: Contacto */}
              <div className="space-y-6">
                <h4 className="text-[#fec62b] font-corporate font-bold uppercase tracking-widest text-sm border-b border-blue-900 pb-4">
                  Atención Directa
                </h4>
                <div className="space-y-4 text-sm">
                  <a href="tel:+56612214111" className="flex items-center justify-center md:justify-start group">
                    <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center mr-4 border border-blue-800 group-hover:border-[#fec62b] transition-all">
                      <Phone className="w-4 h-4 text-[#fec62b]" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] uppercase font-black text-blue-400 tracking-widest">Teléfono Fijo</p>
                      <p className="text-white font-bold group-hover:text-[#fec62b] transition-colors tracking-tight">+ 56 61 2214111</p>
                    </div>
                  </a>
                  <a href="https://wa.me/56985806127" target="_blank" className="flex items-center justify-center md:justify-start group">
                    <div className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center mr-4 border border-blue-800 group-hover:border-[#fec62b] transition-all">
                      <MessageCircle className="w-4 h-4 text-[#fec62b]" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] uppercase font-black text-blue-400 tracking-widest">WhatsApp Oficial</p>
                      <p className="text-white font-bold group-hover:text-[#fec62b] transition-colors tracking-tight">+ 56 9 85806127</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em]">
              <p>© 2026 COMERCIAL DE LA PATAGONIA</p>
              <div className="flex items-center space-x-2">
                <span className="opacity-50">Desarrollado por</span>
                <a 
                  href="https://agenciapatagoniacoach.cl" 
                  target="_blank" 
                  className="text-red-600 hover:text-red-700 transition-colors font-black tracking-[0.4em] text-[11px]"
                >
                  AGENCIA PATAGONIACOACH
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón Flotante de WhatsApp Soporte (Derecha) */}
      <a
        href="https://wa.me/56985806127"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-[999] bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all active:scale-95 group"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        <span className="hidden md:block absolute right-16 bg-white text-gray-800 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest border border-gray-100">
          ¿Necesitas ayuda?
        </span>
      </a>

      {/* Formulario de Lead Global */}
      <LeadForm
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        calculations={savedCalculations}
        onSuccess={handleLeadSuccess}
      />

      {/* Botón Flotante de Revisión (Izquierda) */}
      {savedCalculations.length > 0 && !showLeadForm && !showCalculator && (
        <div className="fixed bottom-4 left-4 z-[999]">
          <button
            onClick={() => {
              const element = document.getElementById('modulo-cotizacion');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="bg-white text-[#1a2b4b] border border-gray-100 p-3 md:px-8 md:py-4 rounded-full md:rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all active:scale-95 flex items-center group"
          >
            <div className="bg-[#1a2b4b] p-1.5 md:p-2 rounded-full md:rounded-xl shadow-lg relative">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#fec62b]" />
              {/* Badge para mobile */}
              <span className="md:hidden absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedCalculations.length}
              </span>
            </div>
            <div className="hidden md:block text-left leading-none ml-4">
              <p className="text-[12px] font-corporate font-bold tracking-[0.2em] uppercase">Revisar Cotización</p>
              <p className="text-[9px] font-corporate font-light text-blue-400 mt-1 uppercase tracking-widest">{savedCalculations.length} items listos</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;