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
    local: 'Sala X',
  },
  {
    time: '13/10 • 09h00 – 10h30',
    title: 'Boas Práticas de Inovação Social e Gestão Organizacional',
    owner: 'CAÇADORES DE BONS EXEMPLOS e WiLSON NOBRE',
    id: 'painel2',
    qtd: 20,
    local: 'Sala X',
  },
];

export const oficinasD13 = [
  {
    time: '14h30 – 18h30',
    title: 'SER-HUMANO, EIS A QUESTÃO: A EDUCAÇÃO E O DESAFIO DA REGENERAÇÃO',
    owner: 'Isabela Crema',
    id: 'oficina1-d13',
    local: 'Sala X',
  },

  {
    time: '14h30 – 18h30',
    title:
      'SEMENTES DA CONFIANÇA: COCRIANDO PONTES SOBRE OS ABISMOS QUE NOS SEPARAM',
    owner: 'Ita Gabert',
    id: 'oficina2-d13',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title: 'PROCESSOS SOCIOCRÁTICOS E TOMADAS DE DECISÕES REGENERATIVAS',
    owner: 'André Korsakas',
    id: 'oficina3-d13',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title: 'A ARTE DE RECICLAR PESSOAS',
    owner: 'Fred Magalhães',
    id: 'oficina4-d13',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'IMERSÃO EM COLABORAÇÃO REGENERATIVA: UM CAMINHO PARA A TRANSFORMAÇÃO MULTINÍVEL',
    owner: 'Marcelo Ferreira de Castilho',
    id: 'oficina5-d13',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'MOBILIZAÇÃO COMUNITÁRIA E O DESENVOLVIMENTO DE BRIGADAS ESCOLARES PARA ATUAÇÃO EM EMERGÊNCIAS HUMANITÁRIAS',
    owner: 'Rodrigo Xavier D’Almeida',
    id: 'oficina6-d13',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'POR UMA SOCIEDADE ANTIRRACISTA, DIVERSA E POLIFÔNICA: O BEM VIVER E OS VALORES CIVILIZATÓRIOS AFRO-BRASILEIROS COMO POTÊNCIAS DE VIDA',
    owner: 'Renata Nogueira da Silva',
    id: 'oficina7-d13',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'ESCUTANDO A VOZ DA TERRA: ECOPSICOLOGIA E A SINTONIA ENTRE A PESSOA E O PLANETA.',
    owner: 'Marco Aurélio Bilibio',
    id: 'oficina8-d13',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title: 'GAME JAM EXPERIENCE: LIBERE SEU POTENCIAL COCRIATIVO',
    owner: 'Magda Vila, Felipe Vila, Letícia Resck',
    id: 'oficina9-d13',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'FACILITADORES DE DIÁLOGO: TRANSFORMANDO CONFLITOS EM OPORTUNIDADES DE COEVOLUÇÃO',
    owner: 'Roberto Gonçalves Martini',
    id: 'oficina10-d13',
    local: 'Sala X',
  },
];

export const oficinasD14 = [
  {
    time: '14h30 – 18h30',
    title: 'SER-HUMANO, EIS A QUESTÃO: A EDUCAÇÃO E O DESAFIO DA REGENERAÇÃO',
    owner: 'Isabela Crema',
    id: 'oficina1-d14',
    local: 'Sala X',
  },

  {
    time: '14h30 – 18h30',
    title:
      'SEMENTES DA CONFIANÇA: COCRIANDO PONTES SOBRE OS ABISMOS QUE NOS SEPARAM',
    owner: 'Ita Gabert',
    id: 'oficina2-d14',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title: 'PROCESSOS SOCIOCRÁTICOS E TOMADAS DE DECISÕES REGENERATIVAS',
    owner: 'André Korsakas',
    id: 'oficina3-d14',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title: 'A ARTE DE RECICLAR PESSOAS',
    owner: 'Fred Magalhães',
    id: 'oficina4-d14',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'IMERSÃO EM COLABORAÇÃO REGENERATIVA: UM CAMINHO PARA A TRANSFORMAÇÃO MULTINÍVEL',
    owner: 'Marcelo Ferreira de Castilho',
    id: 'oficina5-d14',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'MOBILIZAÇÃO COMUNITÁRIA E O DESENVOLVIMENTO DE BRIGADAS ESCOLARES PARA ATUAÇÃO EM EMERGÊNCIAS HUMANITÁRIAS',
    owner: 'Rodrigo Xavier D’Almeida',
    id: 'oficina6-d14',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'POR UMA SOCIEDADE ANTIRRACISTA, DIVERSA E POLIFÔNICA: O BEM VIVER E OS VALORES CIVILIZATÓRIOS AFRO-BRASILEIROS COMO POTÊNCIAS DE VIDA',
    owner: 'Renata Nogueira da Silva',
    id: 'oficina7-d14',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'ESCUTANDO A VOZ DA TERRA: ECOPSICOLOGIA E A SINTONIA ENTRE A PESSOA E O PLANETA.',
    owner: 'Marco Aurélio Bilibio',
    id: 'oficina8-d14',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title: 'GAME JAM EXPERIENCE: LIBERE SEU POTENCIAL COCRIATIVO',
    owner: 'Magda Vila, Felipe Vila, Letícia Resck',
    id: 'oficina9-d14',
    local: 'Sala X',
  },
  {
    time: '14h30 – 18h30',
    title:
      'FACILITADORES DE DIÁLOGO: TRANSFORMANDO CONFLITOS EM OPORTUNIDADES DE COEVOLUÇÃO',
    owner: 'Roberto Gonçalves Martini',
    id: 'oficina10-d14',
    local: 'Sala X',
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
  painel1: 'Painel - FAlta de Cultura de Paz e Saúde Integral na Educação',
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
