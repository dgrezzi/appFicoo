import firestore from '@react-native-firebase/firestore';

export const setCursos = async () => {
  const vaga = {};
  painel.map((v, i) => {
    vaga[v.id] = v.qtd;
  });
  oficinas.map((v, i) => {
    vaga[v.id + '-d' + 13] = v.qtd13;
    vaga[v.id + '-d' + 14] = v.qtd14;
  });
  // return;
  await firestore()
    .collection('configs')
    .doc('vagas')
    .set(vaga)
    .then(async () => {})
    .catch(err => {
      console.error('erro no banco:', err);
    });
};

export const paineis = [
  {
    time: '13/10 • 09h00 – 10h30',
    title: 'Cultura de Paz e Saúde Integral na Educação',
    owner: 'HELENA MARUJO, FÁBIO EON e MICHELLE CONFESSOR',
    id: 'painel1',
    qtd: 20,
    num: '1',
  },
  {
    time: '13/10 • 09h00 – 10h30',
    title: 'Boas Práticas de Inovação Social e Gestão Organizacional',
    owner: 'CAÇADORES DE BONS EXEMPLOS e WiLSON NOBRE',
    id: 'painel2',
    qtd: 20,
    num: '2',
  },
];

export const oficinasD13 = [
  {
    time: '14h30 – 18h30',
    title: 'SER-HUMANO, EIS A QUESTÃO: A EDUCAÇÃO E O DESAFIO DA REGENERAÇÃO',
    owner: 'Isabela Crema',
    id: 'oficina1-d13',
    num: '1',
  },

  {
    time: '14h30 – 18h30',
    title:
      'SEMENTES DA CONFIANÇA: COCRIANDO PONTES SOBRE OS ABISMOS QUE NOS SEPARAM',
    owner: 'Ita Gabert',
    id: 'oficina2-d13',
    num: '2',
  },
  {
    time: '14h30 – 18h30',
    title: 'PROCESSOS SOCIOCRÁTICOS E TOMADAS DE DECISÕES REGENERATIVAS',
    owner: 'André Korsakas',
    id: 'oficina3-d13',
    num: '3',
  },
  {
    time: '14h30 – 18h30',
    title: 'A ARTE DE RECICLAR PESSOAS',
    owner: 'Fred Magalhães',
    id: 'oficina4-d13',
    num: '4',
  },
  {
    time: '14h30 – 18h30',
    title:
      'IMERSÃO EM COLABORAÇÃO REGENERATIVA: UM CAMINHO PARA A TRANSFORMAÇÃO MULTINÍVEL',
    owner: 'Marcelo Ferreira de Castilho',
    id: 'oficina5-d13',
    num: '5',
  },
  {
    time: '14h30 – 18h30',
    title:
      'MOBILIZAÇÃO COMUNITÁRIA E O DESENVOLVIMENTO DE BRIGADAS ESCOLARES PARA ATUAÇÃO EM EMERGÊNCIAS HUMANITÁRIAS',
    owner: 'Rodrigo Xavier D’Almeida',
    id: 'oficina6-d13',
    num: '6',
  },
  {
    time: '14h30 – 18h30',
    title:
      'POR UMA SOCIEDADE ANTIRRACISTA, DIVERSA E POLIFÔNICA: O BEM VIVER E OS VALORES CIVILIZATÓRIOS AFRO-BRASILEIROS COMO POTÊNCIAS DE VIDA',
    owner: 'Renata Nogueira da Silva',
    id: 'oficina7-d13',
    num: '7',
  },
  {
    time: '14h30 – 18h30',
    title:
      'ESCUTANDO A VOZ DA TERRA: ECOPSICOLOGIA E A SINTONIA ENTRE A PESSOA E O PLANETA.',
    owner: 'Marco Aurélio Bilibio',
    id: 'oficina8-d13',
    num: '8',
  },
  {
    time: '14h30 – 18h30',
    title: 'GAME JAM EXPERIENCE: LIBERE SEU POTENCIAL COCRIATIVO',
    owner: 'Felipe Vila, Letícia Resck, Magda Vila',
    id: 'oficina9-d13',
    num: '9',
  },
  {
    time: '14h30 – 18h30',
    title:
      'FACILITADORES DE DIÁLOGO: TRANSFORMANDO CONFLITOS EM OPORTUNIDADES DE COEVOLUÇÃO',
    owner: 'Roberto Gonçalves Martini',
    id: 'oficina10-d13',
    num: '10',
  },
];

export const oficinasD14 = [
  {
    time: '14h30 – 18h30',
    title: 'SER-HUMANO, EIS A QUESTÃO: A EDUCAÇÃO E O DESAFIO DA REGENERAÇÃO',
    owner: 'Isabela Crema',
    id: 'oficina1-d14',
    num: '1',
  },

  {
    time: '14h30 – 18h30',
    title:
      'SEMENTES DA CONFIANÇA: COCRIANDO PONTES SOBRE OS ABISMOS QUE NOS SEPARAM',
    owner: 'Ita Gabert',
    id: 'oficina2-d14',
    num: '2',
  },
  {
    time: '14h30 – 18h30',
    title: 'PROCESSOS SOCIOCRÁTICOS E TOMADAS DE DECISÕES REGENERATIVAS',
    owner: 'André Korsakas',
    id: 'oficina3-d14',
    num: '3',
  },
  {
    time: '14h30 – 18h30',
    title: 'A ARTE DE RECICLAR PESSOAS',
    owner: 'Fred Magalhães',
    id: 'oficina4-d14',
    num: '4',
  },
  {
    time: '14h30 – 18h30',
    title:
      'IMERSÃO EM COLABORAÇÃO REGENERATIVA: UM CAMINHO PARA A TRANSFORMAÇÃO MULTINÍVEL',
    owner: 'Marcelo Ferreira de Castilho',
    id: 'oficina5-d14',
    num: '5',
  },
  {
    time: '14h30 – 18h30',
    title:
      'MOBILIZAÇÃO COMUNITÁRIA E O DESENVOLVIMENTO DE BRIGADAS ESCOLARES PARA ATUAÇÃO EM EMERGÊNCIAS HUMANITÁRIAS',
    owner: 'Rodrigo Xavier D’Almeida',
    id: 'oficina6-d14',
    num: '6',
  },
  {
    time: '14h30 – 18h30',
    title:
      'POR UMA SOCIEDADE ANTIRRACISTA, DIVERSA E POLIFÔNICA: O BEM VIVER E OS VALORES CIVILIZATÓRIOS AFRO-BRASILEIROS COMO POTÊNCIAS DE VIDA',
    owner: 'Renata Nogueira da Silva',
    id: 'oficina7-d14',
    num: '7',
  },
  {
    time: '14h30 – 18h30',
    title:
      'ESCUTANDO A VOZ DA TERRA: ECOPSICOLOGIA E A SINTONIA ENTRE A PESSOA E O PLANETA.',
    owner: 'Marco Aurélio Bilibio',
    id: 'oficina8-d14',
    num: '8',
  },
  {
    time: '14h30 – 18h30',
    title: 'GAME JAM EXPERIENCE: LIBERE SEU POTENCIAL COCRIATIVO',
    owner: 'Felipe Vila, Letícia Resck, Magda Vila',
    id: 'oficina9-d14',
    num: '9',
  },
  {
    time: '14h30 – 18h30',
    title:
      'FACILITADORES DE DIÁLOGO: TRANSFORMANDO CONFLITOS EM OPORTUNIDADES DE COEVOLUÇÃO',
    owner: 'Roberto Gonçalves Martini',
    id: 'oficina10-d14',
    num: '10',
  },
];

export const legenda = {
  painel1: 'Cultura de Paz e Saúde Integral na Educação',
  painel2: 'Boas Práticas de Inovação Social e Gestão Organizacional',
  'oficina1-d13':
    'SER-HUMANO, EIS A QUESTÃO: A EDUCAÇÃO E O DESAFIO DA REGENERAÇÃO',
  'oficina2-d13':
    'SEMENTES DA CONFIANÇA: COCRIANDO PONTES SOBRE OS ABISMOS QUE NOS SEPARAM',
  'oficina3-d13': 'PROCESSOS SOCIOCRÁTICOS E TOMADAS DE DECISÕES REGENERATIVAS',
  'oficina4-d13': 'A ARTE DE RECICLAR PESSOAS',
  'oficina5-d13':
    'IMERSÃO EM COLABORAÇÃO REGENERATIVA: UM CAMINHO PARA A TRANSFORMAÇÃO MULTINÍVEL',
  'oficina6-d13':
    'MOBILIZAÇÃO COMUNITÁRIA E O DESENVOLVIMENTO DE BRIGADAS ESCOLARES PARA ATUAÇÃO EM EMERGÊNCIAS HUMANITÁRIAS',
  'oficina7-d13':
    'POR UMA SOCIEDADE ANTIRRACISTA, DIVERSA E POLIFÔNICA: O BEM VIVER E OS VALORES CIVILIZATÓRIOS AFRO-BRASILEIROS COMO POTÊNCIAS DE VIDA',
  'oficina8-d13':
    'ESCUTANDO A VOZ DA TERRA: ECOPSICOLOGIA E A SINTONIA ENTRE A PESSOA E O PLANETA.',
  'oficina9-d13': 'GAME JAM EXPERIENCE: LIBERE SEU POTENCIAL COCRIATIVO',
  'oficina10-d13':
    'FACILITADORES DE DIÁLOGO: TRANSFORMANDO CONFLITOS EM OPORTUNIDADES DE COEVOLUÇÃO',
  'oficina1-d14':
    'SER-HUMANO, EIS A QUESTÃO: A EDUCAÇÃO E O DESAFIO DA REGENERAÇÃO',
  'oficina2-d14':
    'SEMENTES DA CONFIANÇA: COCRIANDO PONTES SOBRE OS ABISMOS QUE NOS SEPARAM',
  'oficina3-d14': 'PROCESSOS SOCIOCRÁTICOS E TOMADAS DE DECISÕES REGENERATIVAS',
  'oficina4-d14': 'A ARTE DE RECICLAR PESSOAS',
  'oficina5-d14':
    'IMERSÃO EM COLABORAÇÃO REGENERATIVA: UM CAMINHO PARA A TRANSFORMAÇÃO MULTINÍVEL',
  'oficina6-d14':
    'MOBILIZAÇÃO COMUNITÁRIA E O DESENVOLVIMENTO DE BRIGADAS ESCOLARES PARA ATUAÇÃO EM EMERGÊNCIAS HUMANITÁRIAS',
  'oficina7-d14':
    'POR UMA SOCIEDADE ANTIRRACISTA, DIVERSA E POLIFÔNICA: O BEM VIVER E OS VALORES CIVILIZATÓRIOS AFRO-BRASILEIROS COMO POTÊNCIAS DE VIDA',
  'oficina8-d14':
    'ESCUTANDO A VOZ DA TERRA: ECOPSICOLOGIA E A SINTONIA ENTRE A PESSOA E O PLANETA.',
  'oficina9-d14': 'GAME JAM EXPERIENCE: LIBERE SEU POTENCIAL COCRIATIVO',
  'oficina10-d14':
    'FACILITADORES DE DIÁLOGO: TRANSFORMANDO CONFLITOS EM OPORTUNIDADES DE COEVOLUÇÃO',
};

export const legenda2 = {
  painel1: 'Painel - Cultura de Paz e Saúde Integral na Educação',
  painel2: 'Painel - Boas Práticas de Inovação Social e Gestão Organizacional',
  'oficina1-d13':
    'Dia 13 - SER-HUMANO, EIS A QUESTÃO: A EDUCAÇÃO E O DESAFIO DA REGENERAÇÃO',
  'oficina2-d13':
    'Dia 13 - SEMENTES DA CONFIANÇA: COCRIANDO PONTES SOBRE OS ABISMOS QUE NOS SEPARAM',
  'oficina3-d13':
    'Dia 13 - PROCESSOS SOCIOCRÁTICOS E TOMADAS DE DECISÕES REGENERATIVAS',
  'oficina4-d13': 'Dia 13 - A ARTE DE RECICLAR PESSOAS',
  'oficina5-d13':
    'Dia 13 - IMERSÃO EM COLABORAÇÃO REGENERATIVA: UM CAMINHO PARA A TRANSFORMAÇÃO MULTINÍVEL',
  'oficina6-d13':
    'Dia 13 - MOBILIZAÇÃO COMUNITÁRIA E O DESENVOLVIMENTO DE BRIGADAS ESCOLARES PARA ATUAÇÃO EM EMERGÊNCIAS HUMANITÁRIAS',
  'oficina7-d13':
    'Dia 13 - POR UMA SOCIEDADE ANTIRRACISTA, DIVERSA E POLIFÔNICA: O BEM VIVER E OS VALORES CIVILIZATÓRIOS AFRO-BRASILEIROS COMO POTÊNCIAS DE VIDA',
  'oficina8-d13':
    'Dia 13 - ESCUTANDO A VOZ DA TERRA: ECOPSICOLOGIA E A SINTONIA ENTRE A PESSOA E O PLANETA.',
  'oficina9-d13':
    'Dia 13 - GAME JAM EXPERIENCE: LIBERE SEU POTENCIAL COCRIATIVO',
  'oficina10-d13':
    'Dia 13 - FACILITADORES DE DIÁLOGO: TRANSFORMANDO CONFLITOS EM OPORTUNIDADES DE COEVOLUÇÃO',
  'oficina1-d14':
    'Dia 14 - SER-HUMANO, EIS A QUESTÃO: A EDUCAÇÃO E O DESAFIO DA REGENERAÇÃO',
  'oficina2-d14':
    'Dia 14 - SEMENTES DA CONFIANÇA: COCRIANDO PONTES SOBRE OS ABISMOS QUE NOS SEPARAM',
  'oficina3-d14':
    'Dia 14 - PROCESSOS SOCIOCRÁTICOS E TOMADAS DE DECISÕES REGENERATIVAS',
  'oficina4-d14': 'Dia 14 - A ARTE DE RECICLAR PESSOAS',
  'oficina5-d14':
    'Dia 14 - IMERSÃO EM COLABORAÇÃO REGENERATIVA: UM CAMINHO PARA A TRANSFORMAÇÃO MULTINÍVEL',
  'oficina6-d14':
    'Dia 14 - MOBILIZAÇÃO COMUNITÁRIA E O DESENVOLVIMENTO DE BRIGADAS ESCOLARES PARA ATUAÇÃO EM EMERGÊNCIAS HUMANITÁRIAS',
  'oficina7-d14':
    'Dia 14 - POR UMA SOCIEDADE ANTIRRACISTA, DIVERSA E POLIFÔNICA: O BEM VIVER E OS VALORES CIVILIZATÓRIOS AFRO-BRASILEIROS COMO POTÊNCIAS DE VIDA',
  'oficina8-d14':
    'Dia 14 - ESCUTANDO A VOZ DA TERRA: ECOPSICOLOGIA E A SINTONIA ENTRE A PESSOA E O PLANETA.',
  'oficina9-d14':
    'Dia 14 - GAME JAM EXPERIENCE: LIBERE SEU POTENCIAL COCRIATIVO',
  'oficina10-d14':
    'Dia 14 - FACILITADORES DE DIÁLOGO: TRANSFORMANDO CONFLITOS EM OPORTUNIDADES DE COEVOLUÇÃO',
};

export const dia12pt = [
  {
    id: 1,
    start: '14h00',
    finish: '18h00',
    title: 'Recepção, credenciamento e atividades de conexão',
    group: 1,
    local: 'Sala 2',
  },
  {
    id: 2,
    start: '18h00',
    finish: '19h00',
    title: 'Abertura do FICOO 2023',
    group: 1,
  },
  {
    id: 3,
    start: '19h00',
    finish: '20h30',
    title: 'Conferência 1',
    group: 1,
  },
  {
    id: 4,
    start: '20h30',
    finish: '21h00',
    title: 'Tempo Livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 5,
    start: '21h00',
    finish: '21h30',
    title: 'O Encontro das Tribos',
    group: 1,
  },
  {
    id: 6,
    start: '21h30',
    finish: '22h00',
    title: 'Atividade de Celebração',
    group: 1,
  },
];

export const dia13pt = [
  {
    id: 1,
    start: '08h30',
    finish: '09h00',
    title: 'Atividades de conexão',
    group: 1,
  },
  {
    id: 2,
    start: '09h00',
    finish: '10h30',
    title: 'Painel Colaborativo',
    group: 1,
  },

  {
    id: 3,
    start: '10h30',
    finish: '11h00',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 4,
    start: '11h00',
    finish: '13h00',
    title: 'Rodas de ConversAção',
    group: 1,
  },
  {
    id: 5,
    start: '11h00',
    finish: '13h00',
    title: 'Laboratório de Com-Vivências',
    group: 1,
  },
  {
    id: 6,
    start: '14h30',
    finish: '18h30',
    title: 'Oficinas de Cooperação',
    group: 1,
  },
  {
    id: 7,
    start: '18h30',
    finish: '19h00',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 8,
    start: '13h00',
    finish: '14h30',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 9,
    start: '19h00',
    finish: '20h30',
    title: 'O Desafio da Regeneração',
    group: 1,
  },
  {
    id: 10,
    start: '20h30',
    finish: '21h00',
    title: 'Atividade de Celebração',
    group: 1,
  },
];

export const dia14pt = [
  {
    id: 1,
    start: '08h30',
    finish: '09h00',
    title: 'Atividades de conexão',
    group: 1,
  },
  {
    id: 2,
    start: '09h00',
    finish: '10h30',
    title: 'Conferência 2',
    group: 1,
  },
  {
    id: 3,
    start: '10h30',
    finish: '11h00',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 4,
    start: '11h00',
    finish: '13h00',
    title: 'Rodas de ConversAção',
    group: 1,
  },
  {
    id: 5,
    start: '11h00',
    finish: '13h00',
    title: 'Laboratório de Com-Vivências',
    group: 1,
  },
  {
    id: 6,
    start: '13h00',
    finish: '14h30',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 7,
    start: '14h30',
    finish: '18h30',
    title: 'Oficinas de Cooperação',
    group: 1,
  },
  {
    id: 8,
    start: '18h30',
    finish: '19h00',
    title: 'Tempo livre e Mercado Colaborativo',
    group: 1,
  },
  {
    id: 9,
    start: '19h00',
    finish: '20h30',
    title: 'A Grande Síntese',
    group: 1,
  },
  {
    id: 10,
    start: '20h30',
    finish: '22h00',
    title: 'Festa DIVER e Encerramento do Festival',
    group: 1,
  },
];

export const dia12es = [
  {
    id: 1,
    start: '14h00',
    finish: '18h00',
    title: 'Recepción, acreditación y actividades de conexión',
    group: 1,
    local: 'Sala 2',
  },
  {
    id: 2,
    start: '18h00',
    finish: '19h00',
    title: 'Apertura de FICOO 2023',
    group: 1,
  },
  {
    id: 3,
    start: '19h00',
    finish: '20h30',
    title: 'Conferencia 1',
    group: 1,
  },
  {
    id: 4,
    start: '20h30',
    finish: '21h00',
    title: 'Tiempo libre y Mercado Colaborativo',
    group: 1,
  },
  {
    id: 5,
    start: '21h00',
    finish: '21h30',
    title: 'El Encuentro de las Tribus',
    group: 1,
  },
  {
    id: 6,
    start: '21h30',
    finish: '22h00',
    title: 'Actividad de Celebración',
    group: 1,
  },
];

export const dia13es = [
  {
    id: 1,
    start: '08h30',
    finish: '09h00',
    title: 'Actividades de conexión',
    group: 1,
  },
  {
    id: 2,
    start: '09h00',
    finish: '10h30',
    title: 'Panel Colaborativo',
    group: 1,
  },

  {
    id: 3,
    start: '10h30',
    finish: '11h00',
    title: 'Tiempo libre y Mercado Colaborativo',
    group: 1,
  },
  {
    id: 4,
    start: '11h00',
    finish: '13h00',
    title: 'Rondas de Conversación',
    group: 1,
  },
  {
    id: 5,
    start: '11h00',
    finish: '13h00',
    title: 'Laboratorio de Com-Vivencias',
    group: 1,
  },
  {
    id: 6,
    start: '14h30',
    finish: '18h30',
    title: 'Talleres de Cooperación',
    group: 1,
  },
  {
    id: 7,
    start: '18h30',
    finish: '19h00',
    title: 'Tiempo libre y Mercado Colaborativo',
    group: 1,
  },
  {
    id: 8,
    start: '13h00',
    finish: '14h30',
    title: 'Tiempo libre y Mercado Colaborativo',
    group: 1,
  },
  {
    id: 9,
    start: '19h00',
    finish: '20h30',
    title: 'El Desafío de la Regeneración',
    group: 1,
  },
  {
    id: 10,
    start: '20h30',
    finish: '21h00',
    title: 'Actividad de Celebración',
    group: 1,
  },
];

export const dia14es = [
  {
    id: 1,
    start: '08h30',
    finish: '09h00',
    title: 'Actividades de conexión',
    group: 1,
  },
  {
    id: 2,
    start: '09h00',
    finish: '10h30',
    title: 'Conferencia 2',
    group: 1,
  },
  {
    id: 3,
    start: '10h30',
    finish: '11h00',
    title: 'Tiempo libre y Mercado Colaborativo',
    group: 1,
  },
  {
    id: 4,
    start: '11h00',
    finish: '13h00',
    title: 'Rondas de Conversación',
    group: 1,
  },
  {
    id: 5,
    start: '11h00',
    finish: '13h00',
    title: 'Laboratorio de Com-Vivencias',
    group: 1,
  },
  {
    id: 6,
    start: '13h00',
    finish: '14h30',
    title: 'Tiempo libre y Mercado Colaborativo',
    group: 1,
  },
  {
    id: 7,
    start: '14h30',
    finish: '18h30',
    title: 'Talleres de Cooperación',
    group: 1,
  },
  {
    id: 8,
    start: '18h30',
    finish: '19h00',
    title: 'Tiempo libre y Mercado Colaborativo',
    group: 1,
  },
  {
    id: 9,
    start: '19h00',
    finish: '20h30',
    title: 'La Gran Síntesis',
    group: 1,
  },
  {
    id: 10,
    start: '20h30',
    finish: '22h00',
    title: 'Fiesta DIVER y Cierre del Festival',
    group: 1,
  },
];

export const dia12en = [
  {
    id: 1,
    start: '14h00',
    finish: '18h00',
    title: 'Reception, accreditation, and connection activities.',
    group: 1,
    local: 'Sala 2',
  },
  {
    id: 2,
    start: '18h00',
    finish: '19h00',
    title: 'Opening of FICOO 2023.',
    group: 1,
  },
  {
    id: 3,
    start: '19h00',
    finish: '20h30',
    title: 'Conference 1.',
    group: 1,
  },
  {
    id: 4,
    start: '20h30',
    finish: '21h00',
    title: 'Free Time and Collaborative Market.',
    group: 1,
  },
  {
    id: 5,
    start: '21h00',
    finish: '21h30',
    title: 'The Meeting of Tribes.',
    group: 1,
  },
  {
    id: 6,
    start: '21h30',
    finish: '22h00',
    title: 'Celebration Activity.',
    group: 1,
  },
];

export const dia13en = [
  {
    id: 1,
    start: '08h30',
    finish: '09h00',
    title: 'Connection Activities',
    group: 1,
  },
  {
    id: 2,
    start: '09h00',
    finish: '10h30',
    title: 'Collaborative Panel',
    group: 1,
  },

  {
    id: 3,
    start: '10h30',
    finish: '11h00',
    title: 'Free Time and Collaborative Market',
    group: 1,
  },
  {
    id: 4,
    start: '11h00',
    finish: '13h00',
    title: 'Conversation Circles',
    group: 1,
  },
  {
    id: 5,
    start: '11h00',
    finish: '13h00',
    title: 'Co-Living Lab',
    group: 1,
  },
  {
    id: 6,
    start: '14h30',
    finish: '18h30',
    title: 'Cooperation Workshops',
    group: 1,
  },
  {
    id: 7,
    start: '18h30',
    finish: '19h00',
    title: 'Free Time and Collaborative Market',
    group: 1,
  },
  {
    id: 8,
    start: '13h00',
    finish: '14h30',
    title: 'Free Time and Collaborative Market',
    group: 1,
  },
  {
    id: 9,
    start: '19h00',
    finish: '20h30',
    title: 'The Challenge of Regeneration',
    group: 1,
  },
  {
    id: 10,
    start: '20h30',
    finish: '21h00',
    title: 'Celebration Activity',
    group: 1,
  },
];

export const dia14en = [
  {
    id: 1,
    start: '08h30',
    finish: '09h00',
    title: 'Connection Activities',
    group: 1,
  },
  {
    id: 2,
    start: '09h00',
    finish: '10h30',
    title: 'Conference 2',
    group: 1,
  },
  {
    id: 3,
    start: '10h30',
    finish: '11h00',
    title: 'Free Time and Collaborative Market',
    group: 1,
  },
  {
    id: 4,
    start: '11h00',
    finish: '13h00',
    title: 'Conversation Circles',
    group: 1,
  },
  {
    id: 5,
    start: '11h00',
    finish: '13h00',
    title: 'Co-Living Lab',
    group: 1,
  },
  {
    id: 6,
    start: '13h00',
    finish: '14h30',
    title: 'Free Time and Collaborative Market',
    group: 1,
  },
  {
    id: 7,
    start: '14h30',
    finish: '18h30',
    title: 'Cooperation Workshops',
    group: 1,
  },
  {
    id: 8,
    start: '18h30',
    finish: '19h00',
    title: 'Free Time and Collaborative Market',
    group: 1,
  },
  {
    id: 9,
    start: '19h00',
    finish: '20h30',
    title: 'The Grand Synthesis',
    group: 1,
  },
  {
    id: 10,
    start: '20h30',
    finish: '22h00',
    title: 'DIVER Party and Festival Closing',
    group: 1,
  },
];
