import { Material } from '../types/materials';

export const materials: Material[] = [
  // CEMENTOS
  {
    id: 'cemento_normal',
    name: 'Cemento Comodoro Normal',
    icon: 'Package',
    unit: 'saco',
    defaultRendimiento: 0.06, // m³ por saco de 25kg (Formato Chile)
    defaultPrice: 6190,
    unitType: 'volume',
    description: 'Cemento Comodoro Normal, saco de 25 kilos, rendimiento 0.06 m³',
    tips: [
      'Un saco de 25kg de Comodoro rinde aprox. 0.06 m³ de concreto',
      'Marca líder adaptada al formato legal chileno de 25kg',
      'Almacenar en lugar seco y elevado del suelo',
      'Para 1 m³ de concreto se requieren aprox. 16 a 17 sacos de 25kg',
      'Usar agua limpia para no alterar la resistencia del CPC 40'
    ]
  },
  {
    id: 'cemento_rapido',
    name: 'Cemento Comodoro Rápido',
    icon: 'Package',
    unit: 'saco',
    defaultRendimiento: 0.06, // m³ por saco de 25kg
    defaultPrice: 6590,
    unitType: 'volume',
    description: 'Cemento Comodoro Secado Rápido, saco de 25 kilos, rendimiento 0.06 m³',
    tips: [
      'Fraguado acelerado en formato legal de 25kg',
      'Ideal para reparaciones urgentes y climas bajo cero',
      'Rendimiento Comodoro: 0.06 m³ por saco de 25kg',
      'Perfecto para piezas que requieren desmolde rápido',
      'Mayor resistencia inicial en menos tiempo'
    ]
  },

  // CERÁMICAS DE PISO
  {
    id: 'ceramica_piso_31x53',
    name: 'Cerámica Piso 31x53cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 1.65, // m² por caja
    defaultPrice: 13900,
    unitType: 'area',
    description: 'Cerámica para piso formato 31x53cm, rendimiento 1.65 m² por caja',
    tips: [
      'Cada caja cubre 1.65 m² de superficie',
      'Formato rectangular ideal para espacios alargados',
      'Considerar 10% extra para cortes y ajustes',
      'Verificar que todas las cajas sean del mismo lote',
      'Fragüe: 1 bolsa de 5kg rinde aprox. 8-10 m²'
    ]
  },
  {
    id: 'ceramica_piso_45x45_premium',
    name: 'Cerámica Piso 45x45cm Premium',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 2.01, // m² por caja
    defaultPrice: 20800,
    unitType: 'area',
    description: 'Cerámica para piso formato 45x45cm, rendimiento 2.01 m² por caja',
    tips: [
      'Cada caja cubre 2.01 m² de superficie',
      'Formato cuadrado clásico, muy versátil',
      'Calidad premium con mayor resistencia',
      'Ideal para tráfico medio a alto',
      'Considerar 10% extra para cortes'
    ]
  },
  {
    id: 'ceramica_piso_45x45_standard',
    name: 'Cerámica Piso 45x45cm Standard',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 2.25, // m² por caja
    defaultPrice: 20700,
    unitType: 'area',
    description: 'Cerámica para piso formato 45x45cm, rendimiento 2.25 m² por caja',
    tips: [
      'Cada caja cubre 2.25 m² de superficie',
      'Excelente relación precio-calidad',
      'Formato estándar más común',
      'Fácil instalación y mantenimiento',
      'Disponible en varios colores y texturas'
    ]
  },
  {
    id: 'ceramica_piso_56x56',
    name: 'Cerámica Piso 56x56cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 2.17, // m² por caja
    defaultPrice: 18300,
    unitType: 'area',
    description: 'Cerámica para piso formato 56x56cm, rendimiento 2.17 m² por caja',
    tips: [
      'Cada caja cubre 2.17 m² de superficie',
      'Formato grande, menos juntas visibles',
      'Ideal para espacios amplios',
      'Efecto visual de mayor amplitud',
      'Requiere superficie muy nivelada'
    ]
  },
  {
    id: 'ceramica_piso_35x35',
    name: 'Cerámica Piso 35x35cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 2.20, // m² por caja
    defaultPrice: 16100,
    unitType: 'area',
    description: 'Cerámica para piso formato 35x35cm, rendimiento 2.20 m² por caja',
    tips: [
      'Cada caja cubre 2.20 m² de superficie',
      'Formato intermedio, muy práctico',
      'Buena opción para espacios medianos',
      'Fácil corte y manipulación',
      'Precio accesible con buen rendimiento'
    ]
  },
  {
    id: 'ceramica_piso_31_5x31_5',
    name: 'Cerámica Piso 31.5x31.5cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 2.08, // m² por caja
    defaultPrice: 21480,
    unitType: 'area',
    description: 'Cerámica para piso formato 31.5x31.5cm, rendimiento 2.08 m² por caja',
    tips: [
      'Cada caja cubre 2.08 m² de superficie',
      'Formato cuadrado compacto',
      'Ideal para baños y cocinas',
      'Fácil instalación en espacios pequeños',
      'Calidad superior con acabado refinado'
    ]
  },
  {
    id: 'ceramica_piso_18x56',
    name: 'Cerámica Piso 18x56cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 2.0, // m² por caja
    defaultPrice: 19400,
    unitType: 'area',
    description: 'Cerámica para piso formato 18x56cm, rendimiento 2.0 m² por caja',
    tips: [
      'Cada caja cubre 2.0 m² de superficie',
      'Formato tipo tablón, efecto madera',
      'Ideal para crear sensación de amplitud',
      'Perfecto para pasillos y dormitorios',
      'Instalación en sentido longitudinal recomendada'
    ]
  },

  // CERÁMICAS DE MURO
  {
    id: 'ceramica_muro_31x53',
    name: 'Cerámica Muro 31x53cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 1.65, // m² por caja
    defaultPrice: 18900,
    unitType: 'area',
    description: 'Cerámica para muro formato 31x53cm, rendimiento 1.65 m² por caja',
    tips: [
      'Cada caja cubre 1.65 m² de muro',
      'Ideal para baños y cocinas',
      'Resistente a la humedad',
      'Fácil limpieza y mantenimiento',
      'Adhesivo cerámico: 1 bolsa de 25kg rinde 4-5 m²'
    ]
  },
  {
    id: 'ceramica_muro_32x56',
    name: 'Cerámica Muro 32x56cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 2.0, // m² por caja
    defaultPrice: 18500,
    unitType: 'area',
    description: 'Cerámica para muro formato 32x56cm, rendimiento 2.0 m² por caja',
    tips: [
      'Cada caja cubre 2.0 m² de muro',
      'Formato rectangular moderno',
      'Excelente para revestimientos completos',
      'Reduce cantidad de juntas visibles',
      'Instalación vertical u horizontal'
    ]
  },
  {
    id: 'ceramica_muro_32x54',
    name: 'Cerámica Muro 32x54cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 1.38, // m² por caja
    defaultPrice: 15700,
    unitType: 'area',
    description: 'Cerámica para muro formato 32x54cm, rendimiento 1.38 m² por caja',
    tips: [
      'Cada caja cubre 1.38 m² de muro',
      'Opción económica para muros',
      'Buena calidad a precio accesible',
      'Ideal para proyectos con presupuesto ajustado',
      'Disponible en colores neutros'
    ]
  },
  {
    id: 'ceramica_muro_25x35',
    name: 'Cerámica Muro 25x35cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 2.22, // m² por caja
    defaultPrice: 17200,
    unitType: 'area',
    description: 'Cerámica para muro formato 25x35cm, rendimiento 2.22 m² por caja',
    tips: [
      'Cada caja cubre 2.22 m² de muro',
      'Formato clásico y versátil',
      'Excelente rendimiento por caja',
      'Fácil instalación y corte',
      'Ideal para revestimientos parciales'
    ]
  },

  // PORCELANATO
  {
    id: 'porcelanato_53x53',
    name: 'Porcelanato 53x53cm',
    icon: 'Square',
    unit: 'caja',
    defaultRendimiento: 2.0, // m² por caja
    defaultPrice: 28900,
    unitType: 'area',
    description: 'Porcelanato formato 53x53cm, rendimiento 2.0 m² por caja',
    tips: [
      'Cada caja cubre 2.0 m² de superficie',
      'Material de alta resistencia y durabilidad',
      'Absorción de agua prácticamente nula',
      'Ideal para tráfico intenso',
      'Resistente a manchas y rayones',
      'Perfecto para clima patagónico'
    ]
  },

  // PLANCHAS DE TECHO
  {
    id: 'plancha_techo_2_5m',
    name: 'Plancha Techo 1.09x2.5m',
    icon: 'Home',
    unit: 'plancha',
    defaultRendimiento: 2.725, // m² por plancha
    defaultPrice: 18600,
    unitType: 'area',
    description: 'Plancha de techo 1.09x2.5m, cobertura 2.725 m² por plancha',
    tips: [
      'Cada plancha cubre 2.725 m² de techo',
      'Largo de 2.5 metros, ideal para techos medianos',
      'Resistente a vientos patagónicos',
      'Incluir traslapes en el cálculo (ya considerado)',
      'Fijaciones: 12-15 tirafondos por plancha'
    ]
  },
  {
    id: 'plancha_techo_3m',
    name: 'Plancha Techo 1.09x3m',
    icon: 'Home',
    unit: 'plancha',
    defaultRendimiento: 3.27, // m² por plancha
    defaultPrice: 22300,
    unitType: 'area',
    description: 'Plancha de techo 1.09x3m, cobertura 3.27 m² por plancha',
    tips: [
      'Cada plancha cubre 3.27 m² de techo',
      'Largo de 3 metros, menos juntas longitudinales',
      'Mayor eficiencia en techos grandes',
      'Requiere estructura reforzada por el peso',
      'Ideal para construcciones industriales'
    ]
  },

  // PISO FLOTANTE
  {
    id: 'piso_flotante_brillante',
    name: 'Piso Flotante Brillante',
    icon: 'Grid3X3',
    unit: 'caja',
    defaultRendimiento: 3.11, // m² por caja
    defaultPrice: 45500,
    unitType: 'area',
    description: 'Piso flotante brillante 1.20x20cm, rendimiento 3.11 m² por caja',
    tips: [
      'Cada caja cubre 3.11 m² de superficie',
      'Acabado brillante, fácil limpieza',
      'Resistente a la humedad patagónica',
      'Incluir espuma niveladora: 1 rollo por cada 10 m²',
      'Dejar aclimatar 48hrs antes de instalar',
      'Zócalos: calcular perímetro de la habitación'
    ]
  },
  {
    id: 'piso_flotante_semibrillo',
    name: 'Piso Flotante Semibrillo',
    icon: 'Grid3X3',
    unit: 'caja',
    defaultRendimiento: 3.11, // m² por caja
    defaultPrice: 39900,
    unitType: 'area',
    description: 'Piso flotante semibrillo 1.20x20cm, rendimiento 3.11 m² por caja',
    tips: [
      'Cada caja cubre 3.11 m² de superficie',
      'Acabado semibrillo, menos reflejos',
      'Opción más económica que el brillante',
      'Ideal para dormitorios y living',
      'Mismo rendimiento que versión brillante',
      'Excelente relación precio-calidad'
    ]
  },

  // PLANCHAS DE YESO
  {
    id: 'yeso_10mm_std',
    name: 'Plancha Yeso 10mm Standard',
    icon: 'Square',
    unit: 'plancha',
    defaultRendimiento: 2.88, // m² por plancha
    defaultPrice: 9990,
    unitType: 'area',
    description: 'Plancha yeso cartón 10mm standard 1.20x2.40m, rendimiento 2.88 m²',
    tips: [
      'Cada plancha cubre 2.88 m² (1.20m x 2.40m)',
      'Espesor 10mm, ideal para tabiques livianos',
      'Opción más económica para interiores secos',
      'Para tabiques: calcular ambas caras',
      'Tornillos: 25 unidades por plancha',
      'Masilla: 1kg por cada 10 m² de superficie'
    ]
  },
  {
    id: 'yeso_12_5mm_std',
    name: 'Plancha Yeso 12.5mm Standard',
    icon: 'Square',
    unit: 'plancha',
    defaultRendimiento: 2.88, // m² por plancha
    defaultPrice: 14400,
    unitType: 'area',
    description: 'Plancha yeso cartón 12.5mm standard 1.20x2.40m, rendimiento 2.88 m²',
    tips: [
      'Cada plancha cubre 2.88 m² (1.20m x 2.40m)',
      'Espesor 12.5mm, mayor resistencia',
      'Standard para la mayoría de aplicaciones',
      'Mejor aislación acústica que 10mm',
      'Estructura metálica: 3 parantes por m² de tabique'
    ]
  },
  {
    id: 'yeso_12_5mm_rh',
    name: 'Plancha Yeso 12.5mm RH (Resistente Humedad)',
    icon: 'Square',
    unit: 'plancha',
    defaultRendimiento: 2.88, // m² por plancha
    defaultPrice: 18600,
    unitType: 'area',
    description: 'Plancha yeso cartón 12.5mm RH 1.20x2.40m, resistente a humedad, rendimiento 2.88 m²',
    tips: [
      'Cada plancha cubre 2.88 m² (1.20m x 2.40m)',
      'Resistente a humedad, ideal para baños',
      'Color verde característico',
      'Perfecto para clima patagónico húmedo',
      'Núcleo tratado contra hongos y bacterias',
      'Obligatorio en zonas húmedas por normativa'
    ]
  },
  {
    id: 'yeso_12_5mm_rf',
    name: 'Plancha Yeso 12.5mm RF (Resistente Fuego)',
    icon: 'Square',
    unit: 'plancha',
    defaultRendimiento: 2.88, // m² por plancha
    defaultPrice: 15400,
    unitType: 'area',
    description: 'Plancha yeso cartón 12.5mm RF 1.20x2.40m, resistente al fuego, rendimiento 2.88 m²',
    tips: [
      'Cada plancha cubre 2.88 m² (1.20m x 2.40m)',
      'Resistente al fuego, color rosado',
      'Obligatorio en vías de evacuación',
      'Núcleo con fibra de vidrio',
      'Cumple normativas de seguridad contra incendios',
      'Ideal para tabiques cortafuego'
    ]
  }
];