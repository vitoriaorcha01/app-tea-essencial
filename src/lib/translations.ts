export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    // Navegação
    home: 'Início',
    routines: 'Rotinas',
    behaviors: 'Comportamentos',
    diary: 'Diário',
    assistant: 'Assistente IA',
    
    // Página Inicial
    welcome: 'Bem-vindo ao TEO',
    welcomeSubtitle: 'Suporte inteligente para pais de crianças autistas',
    selectLanguage: 'Selecione o idioma',
    
    // Rotinas
    routinesTitle: 'Rotina Visual Inteligente',
    createRoutine: 'Criar Nova Rotina',
    routineName: 'Nome da Rotina',
    routineTime: 'Horário',
    routineDescription: 'Descrição',
    addActivity: 'Adicionar Atividade',
    suggestedRoutines: 'Rotinas Sugeridas',
    myRoutines: 'Minhas Rotinas',
    
    // Comportamentos
    behaviorsTitle: 'Biblioteca de Comportamentos',
    searchBehavior: 'Buscar comportamento...',
    causes: 'Causas Possíveis',
    prevention: 'Como Prevenir',
    strategies: 'Estratégias',
    
    // Diário
    diaryTitle: 'Diário de Evolução',
    addEntry: 'Adicionar Registro',
    mood: 'Humor',
    food: 'Alimentação',
    crisis: 'Crises',
    notes: 'Observações',
    generateReport: 'Gerar Relatório',
    evolutionPanel: 'Painel de Evolução',
    
    // Assistente IA
    assistantTitle: 'Assistente TEO',
    askQuestion: 'Faça uma pergunta...',
    emotionalSupport: 'Suporte Emocional',
    practicalSolutions: 'Soluções Práticas',
    send: 'Enviar',
    
    // Comum
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    loading: 'Carregando...',
    noData: 'Nenhum dado disponível',
  },
  en: {
    // Navigation
    home: 'Home',
    routines: 'Routines',
    behaviors: 'Behaviors',
    diary: 'Diary',
    assistant: 'AI Assistant',
    
    // Home Page
    welcome: 'Welcome to TEO',
    welcomeSubtitle: 'Intelligent support for parents of autistic children',
    selectLanguage: 'Select language',
    
    // Routines
    routinesTitle: 'Smart Visual Routine',
    createRoutine: 'Create New Routine',
    routineName: 'Routine Name',
    routineTime: 'Time',
    routineDescription: 'Description',
    addActivity: 'Add Activity',
    suggestedRoutines: 'Suggested Routines',
    myRoutines: 'My Routines',
    
    // Behaviors
    behaviorsTitle: 'Behavior Library',
    searchBehavior: 'Search behavior...',
    causes: 'Possible Causes',
    prevention: 'How to Prevent',
    strategies: 'Strategies',
    
    // Diary
    diaryTitle: 'Evolution Diary',
    addEntry: 'Add Entry',
    mood: 'Mood',
    food: 'Food',
    crisis: 'Crisis',
    notes: 'Notes',
    generateReport: 'Generate Report',
    evolutionPanel: 'Evolution Panel',
    
    // AI Assistant
    assistantTitle: 'TEO Assistant',
    askQuestion: 'Ask a question...',
    emotionalSupport: 'Emotional Support',
    practicalSolutions: 'Practical Solutions',
    send: 'Send',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    noData: 'No data available',
  },
  es: {
    // Navegación
    home: 'Inicio',
    routines: 'Rutinas',
    behaviors: 'Comportamientos',
    diary: 'Diario',
    assistant: 'Asistente IA',
    
    // Página de Inicio
    welcome: 'Bienvenido a TEO',
    welcomeSubtitle: 'Apoyo inteligente para padres de niños autistas',
    selectLanguage: 'Seleccionar idioma',
    
    // Rutinas
    routinesTitle: 'Rutina Visual Inteligente',
    createRoutine: 'Crear Nueva Rutina',
    routineName: 'Nombre de la Rutina',
    routineTime: 'Hora',
    routineDescription: 'Descripción',
    addActivity: 'Agregar Actividad',
    suggestedRoutines: 'Rutinas Sugeridas',
    myRoutines: 'Mis Rutinas',
    
    // Comportamientos
    behaviorsTitle: 'Biblioteca de Comportamientos',
    searchBehavior: 'Buscar comportamiento...',
    causes: 'Causas Posibles',
    prevention: 'Cómo Prevenir',
    strategies: 'Estrategias',
    
    // Diario
    diaryTitle: 'Diario de Evolución',
    addEntry: 'Agregar Registro',
    mood: 'Estado de Ánimo',
    food: 'Alimentación',
    crisis: 'Crisis',
    notes: 'Observaciones',
    generateReport: 'Generar Informe',
    evolutionPanel: 'Panel de Evolución',
    
    // Asistente IA
    assistantTitle: 'Asistente TEO',
    askQuestion: 'Haz una pregunta...',
    emotionalSupport: 'Apoyo Emocional',
    practicalSolutions: 'Soluciones Prácticas',
    send: 'Enviar',
    
    // Común
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    loading: 'Cargando...',
    noData: 'No hay datos disponibles',
  },
};

export const getTranslation = (lang: Language, key: keyof typeof translations.pt): string => {
  return translations[lang][key] || translations.pt[key];
};
