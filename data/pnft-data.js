// ==============================================
// PNFT_DATA - Base de datos completa de indicadores
// Desde Materno hasta 9° grado
// ==============================================

const PNFT_DATA = {
    // ========== MATERNO INFANTIL / TRANSICIÓN ==========
    "Materno": {
        areas: {
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "MAT_APRO_1",
                        nombre: "Computadora",
                        descripcion: "Identificar qué es una computadora y algunas de sus características",
                        criterios: {
                            "3": "Identifica correctamente todos los componentes y sus funciones",
                            "2": "Identifica algunos componentes con ayuda",
                            "1": "No identifica componentes o requiere mucha ayuda"
                        }
                    },
                    {
                        id: "MAT_APRO_2",
                        nombre: "Software",
                        descripcion: "Reconocer elementos visuales básicos de la interfaz de software",
                        criterios: {
                            "3": "Reconoce y usa iconos y botones de forma autónoma",
                            "2": "Reconoce algunos elementos con guía",
                            "1": "No reconoce los elementos básicos"
                        }
                    }
                ]
            },
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "MAT_PROG_1",
                        nombre: "Entorno de programación iconográfico",
                        descripcion: "Reconocer el entorno de programación iconográfico",
                        criterios: {
                            "3": "Navega autónomamente en el entorno",
                            "2": "Navega con ayuda constante",
                            "1": "No interactúa con el entorno"
                        }
                    }
                ]
            }
        }
    },

    // ========== PRIMER GRADO ==========
    "1°": {
        areas: {
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "1_APRO_1",
                        nombre: "Computadora",
                        descripcion: "Reconocer la computadora como herramienta tecnológica",
                        criterios: {
                            "3": "Explica funciones y cuida el equipo responsablemente",
                            "2": "Reconoce funciones básicas con supervisión",
                            "1": "No reconoce el equipo como herramienta tecnológica"
                        }
                    },
                    {
                        id: "1_APRO_2",
                        nombre: "Hardware",
                        descripcion: "Identificar hardware básico y acciones de encendido/apagado",
                        criterios: {
                            "3": "Identifica y maneja correctamente todos los componentes",
                            "2": "Identifica algunos componentes con ayuda",
                            "1": "No identifica componentes básicos"
                        }
                    }
                ]
            },
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "1_PROG_1",
                        nombre: "Entorno de programación iconográfico",
                        descripcion: "Reconocer elementos básicos de programación iconográfica",
                        criterios: {
                            "3": "Usa todos los bloques básicos correctamente",
                            "2": "Usa algunos bloques con ayuda",
                            "1": "No interactúa con los bloques"
                        }
                    }
                ]
            }
        }
    },

    // ========== SEGUNDO GRADO ==========
    "2°": {
        areas: {
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "2_APRO_1",
                        nombre: "Hardware",
                        descripcion: "Identificar funcionamiento y cuidado de componentes",
                        criterios: {
                            "3": "Explica funcionamiento y aplica cuidados preventivos",
                            "2": "Identifica funciones básicas con guía",
                            "1": "No reconoce funcionamiento ni cuidados"
                        }
                    },
                    {
                        id: "2_APRO_2",
                        nombre: "Software (programas)",
                        descripcion: "Explorar funcionamiento de diferentes programas",
                        criterios: {
                            "3": "Usa múltiples programas adecuadamente según tarea",
                            "2": "Usa un programa con supervisión",
                            "1": "No usa programas apropiadamente"
                        }
                    }
                ]
            },
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "2_PROG_1",
                        nombre: "Entorno de programación por bloques",
                        descripcion: "Aplicar entorno de programación por bloques",
                        criterios: {
                            "3": "Crea secuencias complejas de forma autónoma",
                            "2": "Crea secuencias simples con ayuda",
                            "1": "No crea secuencias significativas"
                        }
                    }
                ]
            }
        }
    },

    // ========== TERCER GRADO ==========
    "3°": {
        areas: {
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "3_APRO_1",
                        nombre: "Hardware",
                        descripcion: "Explicar funciones básicas del hardware",
                        criterios: {
                            "3": "Explica claramente todas las funciones con ejemplos",
                            "2": "Explica algunas funciones con ayuda",
                            "1": "No explica funciones básicas"
                        }
                    },
                    {
                        id: "3_APRO_2",
                        nombre: "Redes de comunicación",
                        descripcion: "Describir qué son las redes de comunicación",
                        criterios: {
                            "3": "Describe redes locales y su funcionamiento con ejemplos",
                            "2": "Describe conceptos básicos con guía",
                            "1": "No describe conceptos de redes"
                        }
                    }
                ]
            },
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "3_PROG_1",
                        nombre: "Algoritmo",
                        descripcion: "Reconocer estructura y características de algoritmos",
                        criterios: {
                            "3": "Crea algoritmos complejos con lógica clara",
                            "2": "Crea algoritmos simples con ayuda",
                            "1": "No crea algoritmos estructurados"
                        }
                    }
                ]
            }
        }
    },

    // ========== CUARTO GRADO ==========
    "4°": {
        areas: {
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "4_APRO_1",
                        nombre: "Hardware",
                        descripcion: "Clasificar componentes según su función",
                        criterios: {
                            "3": "Clasifica correctamente todos los tipos de hardware",
                            "2": "Clasifica algunos componentes con ayuda",
                            "1": "No clasifica componentes adecuadamente"
                        }
                    },
                    {
                        id: "4_APRO_2",
                        nombre: "Software",
                        descripcion: "Reconocer tipos de software y sus funciones",
                        criterios: {
                            "3": "Distingue todos los tipos y sus usos específicos",
                            "2": "Distingue algunos tipos con guía",
                            "1": "No distingue tipos de software"
                        }
                    }
                ]
            },
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "4_PROG_1",
                        nombre: "Entorno de programación por bloques",
                        descripcion: "Utilizar entorno de programación para resolver retos",
                        criterios: {
                            "3": "Resuelve retos complejos de forma autónoma",
                            "2": "Resuelve retos simples con ayuda",
                            "1": "No resuelve retos programados"
                        }
                    }
                ]
            }
        }
    },

    // ========== QUINTO GRADO ==========
    "5°": {
        areas: {
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "5_APRO_1",
                        nombre: "Hardware",
                        descripcion: "Identificar dispositivos de entrada y salida mixtos",
                        criterios: {
                            "3": "Identifica y explica uso de dispositivos mixtos complejos",
                            "2": "Identifica dispositivos básicos con ayuda",
                            "1": "No identifica dispositivos mixtos"
                        }
                    },
                    {
                        id: "5_APRO_2",
                        nombre: "Software",
                        descripcion: "Identificar funcionalidad de software de ofimática",
                        criterios: {
                            "3": "Usa múltiples programas de ofimática correctamente",
                            "2": "Usa un programa con supervisión",
                            "1": "No usa programas de ofimática"
                        }
                    }
                ]
            },
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "5_PROG_1",
                        nombre: "Entorno para computación física",
                        descripcion: "Utilizar entorno de programación para computación física",
                        criterios: {
                            "3": "Programa sistemas físicos complejos autónomamente",
                            "2": "Programa sistemas simples con ayuda",
                            "1": "No programa sistemas físicos"
                        }
                    }
                ]
            }
        }
    },

    // ========== SEXTO GRADO ==========
    "6°": {
        areas: {
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "6_APRO_1",
                        nombre: "Hardware",
                        descripcion: "Analizar funciones de componentes internos",
                        criterios: {
                            "3": "Analiza impacto de componentes en rendimiento del equipo",
                            "2": "Describe funciones básicas de componentes",
                            "1": "No analiza componentes internos"
                        }
                    },
                    {
                        id: "6_APRO_2",
                        nombre: "Conexión entre dispositivos",
                        descripcion: "Explicar cómo direcciones IP permiten conexión",
                        criterios: {
                            "3": "Explica funcionamiento de IP en redes complejas",
                            "2": "Explica conceptos básicos de IP",
                            "1": "No explica funcionamiento de direcciones IP"
                        }
                    }
                ]
            },
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "6_PROG_1",
                        nombre: "Lógica de programación",
                        descripcion: "Aplicar lógica con tablas de verdad",
                        criterios: {
                            "3": "Crea y evalúa tablas de verdad complejas",
                            "2": "Comprende tablas de verdad simples",
                            "1": "No comprende tablas de verdad"
                        }
                    }
                ]
            }
        }
    },

    // ========== SÉPTIMO GRADO ==========
    "7°": {
        areas: {
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "7_APRO_1",
                        nombre: "Computadora",
                        descripcion: "Aplicar reglas básicas y responsabilidades de uso",
                        criterios: {
                            "3": "Aplica todas las normas de uso responsable autónomamente",
                            "2": "Aplica algunas normas con supervisión",
                            "1": "No aplica normas de uso responsable"
                        }
                    },
                    {
                        id: "7_APRO_2",
                        nombre: "Hardware",
                        descripcion: "Clasificar tipos de computadoras y componentes",
                        criterios: {
                            "3": "Clasifica y explica todos los tipos y componentes",
                            "2": "Clasifica algunos tipos con ayuda",
                            "1": "No clasifica tipos de hardware"
                        }
                    }
                ]
            },
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "7_PROG_1",
                        nombre: "Entorno de programación textual",
                        descripcion: "Reconocer entorno de programación textual",
                        criterios: {
                            "3": "Programa soluciones complejas en entorno textual",
                            "2": "Escribe código simple con ayuda",
                            "1": "No escribe código en entorno textual"
                        }
                    }
                ]
            }
        }
    },

    // ========== OCTAVO GRADO ==========
    "8°": {
        areas: {
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "8_APRO_1",
                        nombre: "Hardware",
                        descripcion: "Analizar funcionamiento de componentes internos",
                        criterios: {
                            "3": "Analiza impacto en rendimiento con ejemplos técnicos",
                            "2": "Describe funciones básicas de componentes",
                            "1": "No analiza componentes internos"
                        }
                    },
                    {
                        id: "8_APRO_2",
                        nombre: "Software",
                        descripcion: "Analizar tipos de software según función",
                        criterios: {
                            "3": "Compara y contrasta diferentes tipos de software",
                            "2": "Identifica tipos básicos con ayuda",
                            "1": "No analiza tipos de software"
                        }
                    }
                ]
            },
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "8_PROG_1",
                        nombre: "Programación para robótica",
                        descripcion: "Aplicar programación para mecanismos robóticos",
                        criterios: {
                            "3": "Programa sistemas robóticos complejos autónomamente",
                            "2": "Programa mecanismos simples con ayuda",
                            "1": "No programa mecanismos robóticos"
                        }
                    }
                ]
            }
        }
    },

    // ========== NOVENO GRADO ==========
    "9°": {
        areas: {
            "Programación y Algoritmos": {
                indicadores: [
                    {
                        id: "9_PROG_1",
                        nombre: "Programación para robótica avanzada",
                        descripcion: "Diseñar soluciones automatizadas en programación",
                        criterios: {
                            "3": "Diseña y programa soluciones complejas autónomamente",
                            "2": "Diseña soluciones simples con supervisión",
                            "1": "No diseña soluciones programadas"
                        }
                    },
                    {
                        id: "9_PROG_2",
                        nombre: "Algoritmo",
                        descripcion: "Diseñar algoritmos para resolver problemas",
                        criterios: {
                            "3": "Diseña algoritmos óptimos y eficientes",
                            "2": "Diseña algoritmos funcionales con ayuda",
                            "1": "No diseña algoritmos estructurados"
                        }
                    }
                ]
            },
            "Computación física y Robótica": {
                indicadores: [
                    {
                        id: "9_ROBO_1",
                        nombre: "Movimiento en mecanismos",
                        descripcion: "Identificar movimiento en mecanismos robóticos",
                        criterios: {
                            "3": "Analiza y optimiza movimientos complejos",
                            "2": "Identifica movimientos básicos con ayuda",
                            "1": "No identifica tipos de movimiento"
                        }
                    },
                    {
                        id: "9_ROBO_2",
                        nombre: "Microcontrolador",
                        descripcion: "Aplicar funciones de microcontrolador",
                        criterios: {
                            "3": "Programa microcontroladores para sistemas complejos",
                            "2": "Usa funciones básicas con supervisión",
                            "1": "No usa microcontroladores"
                        }
                    }
                ]
            },
            "Apropiación tecnológica y Digital": {
                indicadores: [
                    {
                        id: "9_APRO_1",
                        nombre: "Redes de comunicación",
                        descripcion: "Reconocer redes con sus protocolos e interfaces",
                        criterios: {
                            "3": "Explica protocolos complejos y su implementación",
                            "2": "Describe protocolos básicos con ayuda",
                            "1": "No reconoce protocolos de red"
                        }
                    },
                    {
                        id: "9_APRO_2",
                        nombre: "Sistema Operativo",
                        descripcion: "Aplicar técnicas de optimización",
                        criterios: {
                            "3": "Optimiza sistemas complejos autónomamente",
                            "2": "Aplica técnicas básicas con guía",
                            "1": "No aplica técnicas de optimización"
                        }
                    }
                ]
            }
        }
    }
};

// ===== RESULTADOS DE APRENDIZAJE POR CICLO =====
const RDA_POR_CICLO = {
    "I Ciclo": {
        "Apropiación tecnológica y Digital": 65,
        "Tareas": 10,
        "Prueba de ejecución": 15,
        "Asistencia": 10
    },
    "II Ciclo": {
        "Apropiación tecnológica y Digital": 60,
        "Tareas": 10,
        "Prueba de ejecución": 20,
        "Asistencia": 10
    },
    "III Ciclo": {
        "Apropiación tecnológica y Digital": 50,
        "Tareas": 10,
        "Proyecto": 30,
        "Asistencia": 10
    }
};

// Hacer disponibles globalmente
window.PNFT_DATA = PNFT_DATA;
window.RDA_POR_CICLO = RDA_POR_CICLO;
