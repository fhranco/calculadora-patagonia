import React from 'react';
import { Calculator, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white text-blue-900 shadow-sm border-b-4 border-[#fec62b] relative z-10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          <div className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Comercial de la Patagonia" 
              className="h-28 md:h-40 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl md:text-5xl font-corporate font-thin text-blue-900 leading-tight tracking-[0.2em]">
              CALCULADORA DE <br className="hidden md:block" /> 
              <span className="font-bold tracking-normal text-blue-800">MATERIALES</span>
            </h1>
            <p className="text-sm text-blue-400 font-light uppercase tracking-[0.5em] opacity-80">Región de Magallanes</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;