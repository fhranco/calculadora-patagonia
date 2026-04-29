import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Calculation } from '../types/materials';

interface ClientData {
  name: string;
  email?: string;
  phone?: string;
}

export const generatePDF = (calculations: Calculation[], clientData?: ClientData) => {
  console.log('Iniciando generación de PDF profesional...', { calculations, clientData });

  if (!calculations || calculations.length === 0) {
    alert('No hay cálculos guardados para exportar.');
    return;
  }

  try {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('es-CL');
    
    // Configuración de Colores Corporativos
    const blueCorporate = [10, 22, 43]; // #0a162b
    const goldCorporate = [254, 198, 43]; // #fec62b

    // Cabecera Institucional
    doc.setFillColor(blueCorporate[0], blueCorporate[1], blueCorporate[2]);
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('COMERCIAL DE LA PATAGONIA', 15, 20);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('CALCULADORA TÉCNICA DE MATERIALES - MAGALLANES', 15, 28);
    doc.text(`FOLIO: ${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`, 170, 20);
    doc.text(`FECHA: ${date}`, 170, 26);

    // Información del Cliente (Si existe)
    if (clientData) {
      doc.setFillColor(255, 255, 255, 0.1);
      doc.rect(15, 32, 180, 8, 'F');
      doc.setFontSize(8);
      doc.text(`CLIENTE: ${clientData.name.toUpperCase()} ${clientData.phone ? `| TEL: ${clientData.phone}` : ''}`, 20, 37);
    }

    // Cuerpo del Documento
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN ESTRUCTURAL DE MATERIALES', 15, 60);

    const tableRows = calculations.map((calc, index) => [
      index + 1,
      calc.materialName,
      `${calc.result} ${calc.unit}`,
      calc.dimensions ? `${calc.dimensions.width}x${calc.dimensions.height}m` : 'N/A',
      calc.category
    ]);

    // Configuración de autoTable con soporte Multilínea y Estética Premium
    autoTable(doc, {
      startY: 70,
      head: [['ID', 'DESCRIPCIÓN DEL MATERIAL', 'CANTIDAD', 'DIMENSIONES', 'ZONA']],
      body: tableRows,
      headStyles: { 
        fillColor: blueCorporate as [number, number, number],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
        fontSize: 9
      },
      styles: { 
        font: 'helvetica',
        fontSize: 9,
        cellPadding: 4,
        overflow: 'linebreak', // Soporte para multilínea
        valign: 'middle'
      },
      columnStyles: {
        1: { cellWidth: 70 }, // Espacio extra para el nombre del material
        2: { halign: 'center', fontStyle: 'bold' },
        3: { halign: 'center' }
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      margin: { left: 15, right: 15 }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;

    // Resumen de Totales
    const totalCost = calculations.reduce((sum, calc) => sum + calc.totalCostWithExtra, 0);
    doc.setFillColor(245, 247, 250);
    doc.rect(140, finalY, 55, 10, 'F');
    doc.setTextColor(blueCorporate[0], blueCorporate[1], blueCorporate[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(`TOTAL ESTIMADO:`, 142, finalY + 6.5);
    doc.text(`${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(totalCost)}`, 172, finalY + 6.5, { align: 'right' });

    // Pie de Página Técnico y de Contacto
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'italic');
    doc.text('Este documento es una guía técnica referencial. Los valores finales pueden variar según condiciones logísticas en Magallanes.', 15, finalY + 25);
    
    doc.setDrawColor(goldCorporate[0], goldCorporate[1], goldCorporate[2]);
    doc.setLineWidth(0.5);
    doc.line(15, finalY + 30, 195, finalY + 30);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(blueCorporate[0], blueCorporate[1], blueCorporate[2]);
    doc.text('CASA MATRIZ: ZONA FRANCA, PUNTA ARENAS', 15, finalY + 38);
    doc.text('CONTACTO OFICIAL: +56 9 85806127', 15, finalY + 44);

    // Marca de Agua / Firma
    doc.setFontSize(7);
    doc.setTextColor(180, 180, 180);
    doc.text('CALCULADORA PATAGONIA v1.0 - AGENCIA PATAGONIACOACH.CL', 130, 285);

    doc.save(`Cotizacion_Patagonia_${date.replace(/\//g, '-')}.pdf`);
    console.log('PDF Premium generado con éxito.');
  } catch (error) {
    console.error('Error en generación de PDF:', error);
    alert('Error al generar el documento. Intenta nuevamente.');
  }
};



