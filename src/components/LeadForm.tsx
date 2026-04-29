import React, { useState } from 'react';
import { X, MessageCircle, FileText, Send } from 'lucide-react';
import { Calculation } from '../types/materials';
import { formatCurrency } from '../utils/calculations';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  calculations: Calculation[];
  onSuccess: (data: { projectName: string; clientName: string; clientPhone: string; clientEmail: string }) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose, calculations, onSuccess }) => {
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  if (!isOpen) return null;

  const totalCost = calculations.reduce((sum, calc) => sum + calc.totalCostWithExtra, 0);
  const isValid = projectName.trim() && clientName.trim() && clientPhone.trim() && clientEmail.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSuccess({ projectName, clientName, clientPhone, clientEmail });
  };

  return (
    <div className="fixed inset-0 bg-blue-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-blue-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-blue-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-yellow-500 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-blue-900" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">Tu Cotización Técnica</h3>
          </div>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Completa tus datos para enviarte el documento</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-blue-900 uppercase ml-1">Nombre del Proyecto</label>
              <input
                type="text" required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Ej: Radier Casa Ovejero"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-900 focus:bg-white outline-none font-bold text-gray-800 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-blue-900 uppercase ml-1">Tu Nombre / Empresa</label>
              <input
                type="text" required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-900 focus:bg-white outline-none font-bold text-gray-800 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-900 uppercase ml-1">WhatsApp</label>
                <input
                  type="tel" required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+569..."
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-900 focus:bg-white outline-none font-bold text-gray-800 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-900 uppercase ml-1">Email</label>
                <input
                  type="email" required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-900 focus:bg-white outline-none font-bold text-gray-800 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex justify-between items-center">
            <div>
              <p className="text-[8px] font-black text-blue-400 uppercase">Resumen del Pedido</p>
              <p className="text-xs font-black text-blue-900">{calculations.length} Material(es)</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black text-blue-400 uppercase">Total Estimado</p>
              <p className="text-lg font-black text-blue-600">{formatCurrency(totalCost)}</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-[#25D366] hover:bg-[#1eb956] disabled:bg-gray-200 text-white font-black py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center text-sm uppercase tracking-widest active:scale-95"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Recibir Cotización por WhatsApp
          </button>
          
          <p className="text-[9px] text-gray-400 font-bold text-center uppercase tracking-tighter">
            Al enviar, un asesor técnico confirmará stock y costos de envío.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
