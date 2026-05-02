import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// OS 12 ARQUÉTIPOS (sistema Carol S. Pearson / Jung)
// ─────────────────────────────────────────────────────────────
const AQ = {
  INOCENTE:   { nome: "Inocente",        emoji: "☀️",  cor: "#F5C842" },
  EXPLORADOR: { nome: "Explorador",      emoji: "🧭",  cor: "#42B5F5" },
  SABIO:      { nome: "Sábio",           emoji: "🦉",  cor: "#A78BFA" },
  HEROI:      { nome: "Herói",           emoji: "⚔️",  cor: "#F56042" },
  FORA_LEI:   { nome: "Fora-da-Lei",     emoji: "🔥",  cor: "#F59642" },
  MAGO:       { nome: "Mago",            emoji: "✨",  cor: "#42F5C8" },
  CARA_COMUM: { nome: "Cara Comum",      emoji: "🤝",  cor: "#78C842" },
  AMANTE:     { nome: "Amante",          emoji: "❤️",  cor: "#F542A7" },
  BOBO:       { nome: "Bobo da Corte",   emoji: "🎭",  cor: "#F5E642" },
  PRESTATIVO: { nome: "Prestativo",      emoji: "🤲",  cor: "#42F578" },
  CRIADOR:    { nome: "Criador",         emoji: "🎨",  cor: "#C842F5" },
  GOVERNANTE: { nome: "Governante",      emoji: "👑",  cor: "#F5A842" },
};

// ─────────────────────────────────────────────────────────────
// 30 PERGUNTAS FECHADAS — gabarito interno ponderado
// Cada alternativa: { texto, arq: { ARQUÉTIPO: peso } }
// Peso 3 = forte / 2 = moderado / 1 = leve
// Dimensões cobertas: motivação, medo, poder, relação com outro,
// comportamento sob pressão, crença, expressão, sucesso, sombra
// ─────────────────────────────────────────────────────────────
const FECHADAS = [
  // ── BLOCO 1: MOTIVAÇÃO PROFUNDA ──
  {
    id: 1,
    bloco: "Sobre você",
    pergunta: "Quando você pensa no motivo mais verdadeiro pelo qual faz o que faz, qual dessas frases chega mais perto?",
    opcoes: [
      { l:"A", t:"Quero cuidar das pessoas e fazer com que se sintam melhor por terem me encontrado.", arq:{ PRESTATIVO:3, AMANTE:1 } },
      { l:"B", t:"Quero construir algo sólido, duradouro, que gere resultado e ordem.", arq:{ GOVERNANTE:3, CRIADOR:1 } },
      { l:"C", t:"Quero transformar vidas de um jeito profundo, quase inexplicável.", arq:{ MAGO:3, HEROI:1 } },
      { l:"D", t:"Quero mostrar um caminho diferente do convencional.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
    ],
  },
  {
    id: 2,
    bloco: "Sobre você",
    pergunta: "No fundo, o que mais te move a continuar quando tudo fica difícil?",
    opcoes: [
      { l:"A", t:"A certeza de que há pessoas que precisam do que eu tenho a oferecer.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
      { l:"B", t:"A vontade de provar para mim mesmo que sou capaz.", arq:{ HEROI:3, GOVERNANTE:1 } },
      { l:"C", t:"A paixão pelo que faço — o processo em si me alimenta.", arq:{ CRIADOR:2, AMANTE:2 } },
      { l:"D", t:"A visão de um futuro que eu acredito ser possível.", arq:{ MAGO:2, INOCENTE:2 } },
    ],
  },
  {
    id: 3,
    bloco: "Sobre você",
    pergunta: "Se você pudesse escolher apenas uma herança que quer deixar no mundo, qual seria?",
    opcoes: [
      { l:"A", t:"Ter ajudado pessoas a se sentirem amadas, vistas e cuidadas.", arq:{ PRESTATIVO:2, AMANTE:2 } },
      { l:"B", t:"Ter construído algo que continua funcionando e impactando depois que eu partir.", arq:{ GOVERNANTE:3, CRIADOR:1 } },
      { l:"C", t:"Ter inspirado pessoas a acreditar que uma vida diferente é possível.", arq:{ MAGO:2, EXPLORADOR:2 } },
      { l:"D", t:"Ter descoberto e compartilhado verdades que mudam a forma de pensar.", arq:{ SABIO:3, INOCENTE:1 } },
    ],
  },

  // ── BLOCO 2: MEDO CENTRAL ──
  {
    id: 4,
    bloco: "Seus medos",
    pergunta: "Se você for completamente honesto, qual é o medo que mais aparece no fundo da sua cabeça?",
    opcoes: [
      { l:"A", t:"O medo de perder o controle sobre o que construí.", arq:{ GOVERNANTE:3, CRIADOR:1 } },
      { l:"B", t:"O medo de não ser suficiente para as pessoas que dependem de mim.", arq:{ PRESTATIVO:3, HEROI:1 } },
      { l:"C", t:"O medo de me tornar comum, igual a todos os outros.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
      { l:"D", t:"O medo de que o que faço não tenha impacto real.", arq:{ MAGO:2, HEROI:2 } },
    ],
  },
  {
    id: 5,
    bloco: "Seus medos",
    pergunta: "O que mais te tira o sono quando um projeto não está indo bem?",
    opcoes: [
      { l:"A", t:"Sentir que decepcionei quem confiou em mim.", arq:{ PRESTATIVO:2, CARA_COMUM:2 } },
      { l:"B", t:"A sensação de que perdi o fio condutor, a clareza do propósito.", arq:{ SABIO:2, MAGO:2 } },
      { l:"C", t:"Ver que o resultado não chegou ao padrão que eu exijo de mim mesmo.", arq:{ HEROI:2, GOVERNANTE:2 } },
      { l:"D", t:"A ideia de ter me traído, de não ter sido autêntico nas escolhas.", arq:{ EXPLORADOR:3, FORA_LEI:1 } },
    ],
  },
  {
    id: 6,
    bloco: "Seus medos",
    pergunta: "Qual dessas situações você evita ao máximo na vida profissional?",
    opcoes: [
      { l:"A", t:"Ser visto como incompetente ou sem preparo.", arq:{ SABIO:2, HEROI:2 } },
      { l:"B", t:"Depender de outras pessoas para conseguir o que preciso.", arq:{ GOVERNANTE:2, EXPLORADOR:2 } },
      { l:"C", t:"Parecer frio, distante ou insensível para quem está ao meu redor.", arq:{ AMANTE:2, PRESTATIVO:2 } },
      { l:"D", t:"Ser previsível, entrar na mesmice, perder a originalidade.", arq:{ CRIADOR:2, FORA_LEI:2 } },
    ],
  },

  // ── BLOCO 3: RELAÇÃO COM PODER E CONTROLE ──
  {
    id: 7,
    bloco: "Como você lidera",
    pergunta: "Como você prefere que as coisas funcionem dentro do que você lidera?",
    opcoes: [
      { l:"A", t:"Com estrutura, papéis claros e processos definidos.", arq:{ GOVERNANTE:3, SABIO:1 } },
      { l:"B", t:"Com autonomia para cada um — confio que as pessoas sabem o que fazem.", arq:{ EXPLORADOR:2, CARA_COMUM:2 } },
      { l:"C", t:"Com propósito compartilhado — o time precisa acreditar no mesmo sonho.", arq:{ MAGO:3, HEROI:1 } },
      { l:"D", t:"Com espaço para criação — prefiro ambientes onde ideias novas surgem.", arq:{ CRIADOR:3, BOBO:1 } },
    ],
  },
  {
    id: 8,
    bloco: "Como você lidera",
    pergunta: "Quando você tem poder de decisão sobre algo importante, como costuma agir?",
    opcoes: [
      { l:"A", t:"Analiso todos os dados antes de decidir, preciso ter certeza.", arq:{ SABIO:3, GOVERNANTE:1 } },
      { l:"B", t:"Decido rápido, confio no meu instinto e assumo as consequências.", arq:{ HEROI:3, FORA_LEI:1 } },
      { l:"C", t:"Ouço as pessoas envolvidas antes — a decisão precisa fazer sentido para o grupo.", arq:{ CARA_COMUM:3, PRESTATIVO:1 } },
      { l:"D", t:"Sigo o que sinto ser verdadeiro, mesmo que pareça irracional para outros.", arq:{ MAGO:2, AMANTE:2 } },
    ],
  },
  {
    id: 9,
    bloco: "Como você lidera",
    pergunta: "O que você mais valoriza em alguém que trabalha ou convive com você?",
    opcoes: [
      { l:"A", t:"Lealdade e comprometimento com o que foi acordado.", arq:{ GOVERNANTE:2, CARA_COMUM:2 } },
      { l:"B", t:"Inteligência e capacidade de questionar o que está posto.", arq:{ SABIO:3, FORA_LEI:1 } },
      { l:"C", t:"Presença, calor humano e genuinidade.", arq:{ AMANTE:2, PRESTATIVO:2 } },
      { l:"D", t:"Energia, iniciativa e vontade de fazer acontecer.", arq:{ HEROI:2, CRIADOR:2 } },
    ],
  },

  // ── BLOCO 4: RELAÇÃO COM O OUTRO ──
  {
    id: 10,
    bloco: "Você e as pessoas",
    pergunta: "Como as pessoas costumam descrever o que sentem ao interagir com você?",
    opcoes: [
      { l:"A", t:"Dizem que se sentem acolhidas, ouvidas, cuidadas.", arq:{ PRESTATIVO:3, AMANTE:1 } },
      { l:"B", t:"Dizem que saem com a cabeça diferente, enxergando coisas que não viam antes.", arq:{ SABIO:2, MAGO:2 } },
      { l:"C", t:"Dizem que me sentir é contagiante — minha energia move as pessoas.", arq:{ HEROI:2, BOBO:2 } },
      { l:"D", t:"Dizem que eu os provoco a sair da zona de conforto.", arq:{ FORA_LEI:2, EXPLORADOR:2 } },
    ],
  },
  {
    id: 11,
    bloco: "Você e as pessoas",
    pergunta: "Quando alguém próximo está passando por dificuldade, qual é sua reação mais natural?",
    opcoes: [
      { l:"A", t:"Ofereço ajuda prática imediatamente — o que precisa, estou aqui.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
      { l:"B", t:"Escuto com profundidade, sem julgamento, e faço perguntas que ajudam a pensar.", arq:{ SABIO:2, AMANTE:2 } },
      { l:"C", t:"Trago perspectiva — mostro o que a pessoa não está conseguindo ver.", arq:{ MAGO:3, HEROI:1 } },
      { l:"D", t:"Uso leveza ou humor para tirar o peso da situação.", arq:{ BOBO:3, INOCENTE:1 } },
    ],
  },
  {
    id: 12,
    bloco: "Você e as pessoas",
    pergunta: "Como você se sente em relação ao pertencimento a grupos?",
    opcoes: [
      { l:"A", t:"Preciso de comunidade — me realizo quando faço parte de algo maior.", arq:{ CARA_COMUM:3, PRESTATIVO:1 } },
      { l:"B", t:"Gosto de pessoas, mas preciso do meu espaço individual para funcionar bem.", arq:{ EXPLORADOR:2, CRIADOR:2 } },
      { l:"C", t:"Prefiro liderar do que pertencer — grupos precisam de direção.", arq:{ GOVERNANTE:3, HEROI:1 } },
      { l:"D", t:"Me conecto profundamente com poucos do que superficialmente com muitos.", arq:{ AMANTE:3, SABIO:1 } },
    ],
  },

  // ── BLOCO 5: COMPORTAMENTO SOB PRESSÃO ──
  {
    id: 13,
    bloco: "Sob pressão",
    pergunta: "Quando tudo está desmoronando ao mesmo tempo, qual é seu movimento instintivo?",
    opcoes: [
      { l:"A", t:"Assumo o controle, organizo as prioridades e coloco ordem no caos.", arq:{ GOVERNANTE:3, HEROI:1 } },
      { l:"B", t:"Busco entender a raiz do problema antes de agir — não quero resolver o sintoma.", arq:{ SABIO:3, MAGO:1 } },
      { l:"C", t:"Foco nas pessoas — quem está mais afetado? Como posso ajudar?", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
      { l:"D", t:"Confio que vai se resolver e mantenho a leveza para não contaminar o ambiente.", arq:{ INOCENTE:2, BOBO:2 } },
    ],
  },
  {
    id: 14,
    bloco: "Sob pressão",
    pergunta: "Quando alguém tenta te impor algo com o qual você não concorda, como reage?",
    opcoes: [
      { l:"A", t:"Argumento com fatos e lógica até mudar a percepção.", arq:{ SABIO:3, GOVERNANTE:1 } },
      { l:"B", t:"Confronto diretamente — não aceito imposição sem questionamento.", arq:{ FORA_LEI:3, HEROI:1 } },
      { l:"C", t:"Busco um consenso — prefiro construir junto do que entrar em conflito.", arq:{ CARA_COMUM:3, PRESTATIVO:1 } },
      { l:"D", t:"Simplesmente ignoro e faço do meu jeito.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
    ],
  },
  {
    id: 15,
    bloco: "Sob pressão",
    pergunta: "Quando você erra em algo importante, como costuma processar isso?",
    opcoes: [
      { l:"A", t:"Me cobro muito — o erro me incomoda por tempo e eu preciso entender o que falhou.", arq:{ HEROI:2, SABIO:2 } },
      { l:"B", t:"Analiso, extraio o aprendizado e sigo — não carrego culpa.", arq:{ SABIO:2, EXPLORADOR:2 } },
      { l:"C", t:"Me preocupo mais com o impacto que o erro causou nos outros do que em mim.", arq:{ PRESTATIVO:3, AMANTE:1 } },
      { l:"D", t:"Uso o erro como combustível para tentar de novo de forma diferente.", arq:{ HEROI:2, CRIADOR:2 } },
    ],
  },

  // ── BLOCO 6: CRENÇA CENTRAL / VISÃO DE MUNDO ──
  {
    id: 16,
    bloco: "Como você vê o mundo",
    pergunta: "Qual dessas frases mais representa como você enxerga a vida?",
    opcoes: [
      { l:"A", t:"O mundo pode ser um lugar bom — as pessoas são essencialmente bem-intencionadas.", arq:{ INOCENTE:3, CARA_COMUM:1 } },
      { l:"B", t:"O mundo é complexo e precisa de pessoas que entendam essa complexidade.", arq:{ SABIO:3, GOVERNANTE:1 } },
      { l:"C", t:"O mundo precisa de transformação — as estruturas atuais não servem a todos.", arq:{ FORA_LEI:3, MAGO:1 } },
      { l:"D", t:"O mundo é um lugar de possibilidades — depende de como você escolhe olhar.", arq:{ MAGO:2, EXPLORADOR:2 } },
    ],
  },
  {
    id: 17,
    bloco: "Como você vê o mundo",
    pergunta: "Como você se relaciona com as regras e convenções estabelecidas?",
    opcoes: [
      { l:"A", t:"Respeito as regras quando fazem sentido — e questiono quando não fazem.", arq:{ SABIO:2, FORA_LEI:2 } },
      { l:"B", t:"Regras são ferramentas, não princípios. Uso quando servem.", arq:{ FORA_LEI:3, EXPLORADOR:1 } },
      { l:"C", t:"Prefiro criar as minhas próprias regras e viver de acordo com elas.", arq:{ CRIADOR:2, GOVERNANTE:2 } },
      { l:"D", t:"Regras criam a estabilidade que permite às pessoas funcionarem bem.", arq:{ GOVERNANTE:3, INOCENTE:1 } },
    ],
  },
  {
    id: 18,
    bloco: "Como você vê o mundo",
    pergunta: "O que você acredita que as pessoas mais precisam, mas raramente encontram?",
    opcoes: [
      { l:"A", t:"Alguém que realmente as ouça sem querer consertar ou aconselhar.", arq:{ AMANTE:2, PRESTATIVO:2 } },
      { l:"B", t:"Clareza — a maioria das pessoas está perdida porque não pensa com profundidade.", arq:{ SABIO:3, MAGO:1 } },
      { l:"C", t:"Permissão para ser quem realmente são, sem máscaras.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
      { l:"D", t:"Um ambiente seguro onde possam crescer sem julgamento.", arq:{ PRESTATIVO:2, CARA_COMUM:2 } },
    ],
  },

  // ── BLOCO 7: EXPRESSÃO NATURAL ──
  {
    id: 19,
    bloco: "Como você se expressa",
    pergunta: "Quando você tem algo importante para comunicar, qual é o seu estilo natural?",
    opcoes: [
      { l:"A", t:"Sou direto e objetivo — vou ao ponto sem rodeios.", arq:{ HEROI:2, GOVERNANTE:2 } },
      { l:"B", t:"Uso histórias, metáforas e imagens para fazer as pessoas sentirem o que quero transmitir.", arq:{ MAGO:2, AMANTE:2 } },
      { l:"C", t:"Apresento dados, argumentos e estrutura lógica.", arq:{ SABIO:3, GOVERNANTE:1 } },
      { l:"D", t:"Crio uma conexão emocional primeiro — a mensagem entra pelo coração.", arq:{ AMANTE:2, PRESTATIVO:2 } },
    ],
  },
  {
    id: 20,
    bloco: "Como você se expressa",
    pergunta: "Qual das formas abaixo mais representa como você prefere ensinar ou transmitir algo?",
    opcoes: [
      { l:"A", t:"Explicando a teoria e o raciocínio por trás — quero que a pessoa entenda, não só replique.", arq:{ SABIO:3, MAGO:1 } },
      { l:"B", t:"Mostrando pelo exemplo — faço junto, na prática.", arq:{ HEROI:2, CARA_COMUM:2 } },
      { l:"C", t:"Criando experiências — aprende-se vivendo, não ouvindo.", arq:{ CRIADOR:2, EXPLORADOR:2 } },
      { l:"D", t:"Contando histórias reais que a pessoa pode se ver dentro.", arq:{ AMANTE:2, INOCENTE:2 } },
    ],
  },
  {
    id: 21,
    bloco: "Como você se expressa",
    pergunta: "Se você fosse descrever sua presença em uma sala, qual seria mais honesto?",
    opcoes: [
      { l:"A", t:"As pessoas percebem que há alguém com autoridade e preparo.", arq:{ GOVERNANTE:2, SABIO:2 } },
      { l:"B", t:"As pessoas ficam à vontade, relaxam — crio um ambiente seguro.", arq:{ CARA_COMUM:2, PRESTATIVO:2 } },
      { l:"C", t:"As pessoas ficam curiosas — tem algo magnético ou intrigante em mim.", arq:{ MAGO:2, AMANTE:2 } },
      { l:"D", t:"As pessoas se energizam — saem da conversa com mais vontade de agir.", arq:{ HEROI:2, BOBO:2 } },
    ],
  },

  // ── BLOCO 8: DEFINIÇÃO DE SUCESSO ──
  {
    id: 22,
    bloco: "O que é sucesso pra você",
    pergunta: "Quando você imagina que teve um dia perfeito no trabalho, o que aconteceu?",
    opcoes: [
      { l:"A", t:"Resolvi um problema difícil que ninguém conseguia resolver.", arq:{ HEROI:3, SABIO:1 } },
      { l:"B", t:"Criei algo novo que não existia antes.", arq:{ CRIADOR:3, MAGO:1 } },
      { l:"C", t:"Alguém me disse que mudei a vida dela de alguma forma.", arq:{ PRESTATIVO:3, AMANTE:1 } },
      { l:"D", t:"Tudo funcionou exatamente como eu planejei — eficiência e resultado.", arq:{ GOVERNANTE:3, SABIO:1 } },
    ],
  },
  {
    id: 23,
    bloco: "O que é sucesso pra você",
    pergunta: "Como você sabe que está no caminho certo?",
    opcoes: [
      { l:"A", t:"Quando sinto que estou crescendo, evoluindo, me tornando melhor.", arq:{ HEROI:2, EXPLORADOR:2 } },
      { l:"B", t:"Quando as pessoas ao meu redor estão bem por causa de algo que fiz.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
      { l:"C", t:"Quando os resultados aparecem e eu tenho controle sobre eles.", arq:{ GOVERNANTE:3, HEROI:1 } },
      { l:"D", t:"Quando sinto que estou sendo completamente autêntico no que faço.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
    ],
  },
  {
    id: 24,
    bloco: "O que é sucesso pra você",
    pergunta: "O que você raramente abre mão, mesmo sob pressão?",
    opcoes: [
      { l:"A", t:"Da minha liberdade de escolher como e com quem trabalho.", arq:{ EXPLORADOR:3, FORA_LEI:1 } },
      { l:"B", t:"Da qualidade — prefiro entregar menos, mas excelente.", arq:{ HEROI:2, GOVERNANTE:2 } },
      { l:"C", t:"Da minha integridade e dos meus valores.", arq:{ SABIO:2, INOCENTE:2 } },
      { l:"D", t:"Do cuidado com as pessoas — não sacrifico relações por resultados.", arq:{ PRESTATIVO:2, AMANTE:2 } },
    ],
  },

  // ── BLOCO 9: SOMBRA DO ARQUÉTIPO (verificação cruzada) ──
  {
    id: 25,
    bloco: "Seu lado sombra",
    pergunta: "Qual crítica você já recebeu — ou tem medo de receber — que mais te incomoda?",
    opcoes: [
      { l:"A", t:"Que sou controlador demais ou que centralizo tudo.", arq:{ GOVERNANTE:3, HEROI:1 } },
      { l:"B", t:"Que sou ingênuo, que confio demais nas pessoas.", arq:{ INOCENTE:3, PRESTATIVO:1 } },
      { l:"C", t:"Que sou frio, distante ou difícil de acessar.", arq:{ SABIO:2, GOVERNANTE:2 } },
      { l:"D", t:"Que sou inconstante, que começo e não termino.", arq:{ EXPLORADOR:2, CRIADOR:2 } },
    ],
  },
  {
    id: 26,
    bloco: "Seu lado sombra",
    pergunta: "Em qual dessas armadilhas você já se viu cair?",
    opcoes: [
      { l:"A", t:"Ajudar tanto os outros que me esqueci de mim mesmo.", arq:{ PRESTATIVO:3, AMANTE:1 } },
      { l:"B", t:"Querer quebrar as regras mesmo quando isso prejudicou a mim ou a outros.", arq:{ FORA_LEI:3, EXPLORADOR:1 } },
      { l:"C", t:"Usar o conhecimento como forma de me sentir superior.", arq:{ SABIO:3, GOVERNANTE:1 } },
      { l:"D", t:"Criar tanto que me perdi na execução e nada ficou pronto.", arq:{ CRIADOR:3, BOBO:1 } },
    ],
  },
  {
    id: 27,
    bloco: "Seu lado sombra",
    pergunta: "O que as pessoas próximas diriam que você precisa aprender a largar?",
    opcoes: [
      { l:"A", t:"A necessidade de estar sempre certo.", arq:{ SABIO:2, GOVERNANTE:2 } },
      { l:"B", t:"O excesso de seriedade — se eu me permitisse leveza, seria mais feliz.", arq:{ HEROI:2, GOVERNANTE:2 } },
      { l:"C", t:"A dificuldade de pedir ajuda — quero resolver tudo sozinho.", arq:{ HEROI:3, FORA_LEI:1 } },
      { l:"D", t:"O medo de decepcionar — às vezes digo sim quando devia dizer não.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
    ],
  },

  // ── BLOCO 10: VERIFICAÇÃO CRUZADA FINAL ──
  {
    id: 28,
    bloco: "Visão final",
    pergunta: "Se um desconhecido te pedisse para se apresentar em 30 segundos, o que você diria naturalmente?",
    opcoes: [
      { l:"A", t:"Diria o que faço e os resultados que entrego — objetivo e direto.", arq:{ GOVERNANTE:2, HEROI:2 } },
      { l:"B", t:"Contaria um pouco da minha história — de onde vim e por que faço o que faço.", arq:{ EXPLORADOR:2, CARA_COMUM:2 } },
      { l:"C", t:"Falaria sobre o impacto que gero na vida das pessoas.", arq:{ MAGO:2, PRESTATIVO:2 } },
      { l:"D", t:"Faria uma pergunta a ele primeiro — prefiro ouvir antes de falar.", arq:{ SABIO:2, AMANTE:2 } },
    ],
  },
  {
    id: 29,
    bloco: "Visão final",
    pergunta: "Qual das frases abaixo você poderia ter escrito?",
    opcoes: [
      { l:"A", t:"'Não vim até aqui para ser qualquer um.'", arq:{ HEROI:3, FORA_LEI:1 } },
      { l:"B", t:"'Quando você cuida das pessoas certas, tudo o mais se resolve.'", arq:{ PRESTATIVO:2, AMANTE:2 } },
      { l:"C", t:"'Quem controla sua narrativa, controla seu destino.'", arq:{ GOVERNANTE:2, MAGO:2 } },
      { l:"D", t:"'A resposta está sempre dentro — eu só ajudo a encontrar.'", arq:{ SABIO:2, MAGO:2 } },
    ],
  },
  {
    id: 30,
    bloco: "Visão final",
    pergunta: "Se você pudesse ser lembrado por uma única coisa, qual seria?",
    opcoes: [
      { l:"A", t:"Por ter sido corajoso e ter enfrentado o que precisava ser enfrentado.", arq:{ HEROI:3, FORA_LEI:1 } },
      { l:"B", t:"Por ter criado algo belo e único que não existia antes.", arq:{ CRIADOR:3, AMANTE:1 } },
      { l:"C", t:"Por ter cuidado das pessoas com genuinidade e sem interesse.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
      { l:"D", t:"Por ter mostrado que é possível viver de uma forma mais verdadeira.", arq:{ EXPLORADOR:2, MAGO:2 } },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 6 PERGUNTAS ABERTAS
// ─────────────────────────────────────────────────────────────
const ABERTAS = [
  {
    id:"AB1",
    instrucao:"Escreva livremente, sem se preocupar com o formato. Não há resposta certa ou errada.",
    pergunta:"Descreva um momento da sua vida — profissional ou pessoal — em que você se sentiu completamente no seu elemento. O que estava acontecendo? O que você estava fazendo? Por que aquele momento foi tão significativo?",
    guia:"MAPEIE: Sozinho em desafio físico/superação = Herói. Ensinando, explicando, revelando = Sábio. Criando, produzindo algo original = Criador. Transformando alguém = Mago. Cuidando, servindo = Prestativo. Conectando pessoas = Cara Comum. Quebrando padrão/regra = Fora-da-Lei. Explorando lugar/ideia nova = Explorador. Encantando, seduzindo = Amante. Fazendo todos rirem = Bobo. Organizando, comandando = Governante. Vivendo algo puro e simples = Inocente.",
  },
  {
    id:"AB2",
    instrucao:"Escreva com a maior honestidade possível. Essa resposta ficará apenas entre você e o diagnóstico.",
    pergunta:"Existe algo que você faz — ou que você é — que as pessoas frequentemente reconhecem e valorizam em você, mas que você mesmo tende a minimizar ou não dar tanto crédito? Descreva o que é e por que acha que não valoriza tanto.",
    guia:"MAPEIE pela natureza do dom não reconhecido: cuidar/acolher = Prestativo/Amante. Criar/inventar = Criador. Enxergar além = Mago/Sábio. Animar/energizar = Bobo/Herói. Conectar pessoas = Cara Comum. Questionar/provocar = Fora-da-Lei. A sombra aqui revela o arquétipo autêntico que o mentorado subestima.",
  },
  {
    id:"AB3",
    instrucao:"Não filtre sua resposta. Escreva o que vier primeiro.",
    pergunta:"Se o seu trabalho fosse uma personagem em uma história — filme, livro, série — quem seria essa personagem e qual seria a missão dela no enredo? Pode ser uma personagem real ou que você inventou agora.",
    guia:"MAPEIE diretamente pelo tipo de personagem: guerreiro/campeão = Herói. Mentor/ancião = Sábio. Curandeiro/protetor = Prestativo. Arquiteto/rei = Governante. Artista/inventor = Criador. Viajante/aventureiro = Explorador. Feiticeiro/visionário = Mago. Amante/poeta = Amante. Palhaço/trickster = Bobo. Rebelde/anti-herói = Fora-da-Lei. Guardião da comunidade = Cara Comum. O puro/criança = Inocente. A missão descrita reforça ou contradiz o arquétipo da personagem — ambos importam.",
  },
  {
    id:"AB4",
    instrucao:"Reflita com cuidado antes de responder.",
    pergunta:"Pense em alguém — vivo ou não, famoso ou não — que você admira profundamente. O que exatamente nessa pessoa te toca? O que ela representa que você gostaria de ter ou de ser mais?",
    guia:"MAPEIE pelo que o mentorado admira, não pela pessoa em si. Admira coragem/superação = Herói. Sabedoria/clareza = Sábio. Capacidade de transformar = Mago. Criatividade/originalidade = Criador. Cuidado/dedicação = Prestativo. Paixão/intensidade = Amante. Liberdade/autenticidade = Explorador. Impacto/legado = Governante. Irreverência/autenticidade radical = Fora-da-Lei. Leveza/alegria = Bobo. Pertencimento/simplicidade = Cara Comum.",
  },
  {
    id:"AB5",
    instrucao:"Seja específico — evite respostas genéricas como 'quero ajudar pessoas'.",
    pergunta:"O que te revolta genuinamente no mundo, na sua área ou no mercado onde você atua? O que você acha que está errado, que não deveria ser assim, e que você gostaria de mudar?",
    guia:"MAPEIE pela natureza da revolta: injustiça/opressão = Fora-da-Lei/Herói. Ignorância/desinformação = Sábio. Falta de cuidado com pessoas = Prestativo/Amante. Falta de beleza/criatividade = Criador/Amante. Conformismo/mesmice = Explorador/Fora-da-Lei. Caos/falta de estrutura = Governante. Superficialidade/falta de propósito = Mago. Exclusão/divisão = Cara Comum. Seriedade excessiva = Bobo. Pessimismo/negatividade = Inocente.",
  },
  {
    id:"AB6",
    instrucao:"Escreva como se estivesse numa conversa com alguém de total confiança.",
    pergunta:"Qual é a coisa que você mais gostaria que seus clientes, pacientes ou mentorados pensassem, sentissem ou dissessem sobre você — não sobre o seu serviço, mas sobre quem você é como pessoa?",
    guia:"MAPEIE pelo tipo de reconhecimento desejado: 'me fez mais forte/capaz' = Herói. 'me fez entender o que eu não entendia' = Sábio. 'me fez sentir amado/cuidado' = Prestativo/Amante. 'me fez acreditar no impossível' = Mago/Inocente. 'me fez querer mudar' = Fora-da-Lei/Mago. 'me fez criar algo novo' = Criador. 'me fez me sentir parte de algo' = Cara Comum. 'me fez rir e leveza' = Bobo. 'me fez explorar quem sou' = Explorador.",
  },
];

// ─────────────────────────────────────────────────────────────
// FUNÇÃO DE PONTUAÇÃO
// ─────────────────────────────────────────────────────────────
function calcular(respostas) {
  const scores = {};
  Object.keys(AQ).forEach(k => scores[k] = 0);
  Object.values(respostas).forEach(op => {
    if (!op?.arq) return;
    Object.entries(op.arq).forEach(([k, v]) => { scores[k] = (scores[k]||0) + v; });
  });
  return Object.entries(scores).sort((a,b) => b[1]-a[1]).filter(([,v]) => v > 0);
}

// ─────────────────────────────────────────────────────────────
// SENHA DO FACILITADOR — altere aqui para personalizar
// ─────────────────────────────────────────────────────────────
const SENHA_FACILITADOR = "enfase2024";

// ─────────────────────────────────────────────────────────────
// TELA DE ENCERRAMENTO — completamente limpa para o mentorado
// Acesso do facilitador: clicar 5x no símbolo ✦ abre campo de senha
// Nada indica ao mentorado que há algo além desta tela
// ─────────────────────────────────────────────────────────────
function EncerramentoComSenha({ onSenhaCorreta }) {
  const [cliques, setCliques] = useState(0);
  const [mostrarCampo, setMostrarCampo] = useState(false);
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  function handleClique() {
    const novoTotal = cliques + 1;
    setCliques(novoTotal);
    if (novoTotal >= 5) {
      setMostrarCampo(true);
      setCliques(0);
    }
  }

  function tentarSenha() {
    if (senha === SENHA_FACILITADOR) {
      onSenhaCorreta();
    } else {
      setErro(true);
      setSenha("");
      setTimeout(() => setErro(false), 2000);
    }
  }

  return (
    <div style={{ textAlign:"center" }}>
      {/* Símbolo clicável — não parece um botão, não tem cursor pointer */}
      <div
        onClick={handleClique}
        style={{ fontSize:48, marginBottom:32, userSelect:"none", display:"inline-block" }}
      >
        ✦
      </div>

      <h2 style={{ fontSize:30, fontWeight:"400", lineHeight:1.5, marginBottom:24, color:"#f0ede8" }}>
        Obrigado pelas suas respostas.
      </h2>

      <p style={{
        color:"#666", fontSize:16, lineHeight:2,
        maxWidth:420, margin:"0 auto 40px",
      }}>
        A partir daqui, vou analisar com cuidado tudo o que você compartilhou.<br/>
        Em breve nos encontramos para conversar sobre o que foi revelado.
      </p>

      <div style={{
        fontSize:13, color:"#444", fontStyle:"italic",
        maxWidth:360, margin:"0 auto 48px", lineHeight:1.9,
      }}>
        "Conhecer a si mesmo é o começo de toda sabedoria."
      </div>

      <div style={{
        fontSize:10, color:"#2a2a2a", letterSpacing:3, textTransform:"uppercase",
      }}>
        ÊNFASE — Programa de Posicionamento e Autoridade
      </div>

      {/* Campo de senha — só aparece após 5 cliques no símbolo, sem nenhum label ou indicação */}
      {mostrarCampo && (
        <div style={{
          marginTop:48, display:"flex", flexDirection:"column",
          alignItems:"center", gap:12,
        }}>
          <input
            type="password"
            value={senha}
            onChange={e => { setSenha(e.target.value); setErro(false); }}
            onKeyDown={e => e.key === "Enter" && tentarSenha()}
            autoFocus
            placeholder="••••••••"
            style={{
              background:"#111",
              border: erro ? "1px solid #8b0000" : "1px solid #1e1e1e",
              borderRadius:4, padding:"10px 20px",
              color:"#f0ede8", fontSize:16, textAlign:"center",
              outline:"none", width:180, letterSpacing:4,
              transition:"border 0.2s",
            }}
          />
          <button onClick={tentarSenha} style={{
            background:"transparent", border:"none",
            color: erro ? "#8b0000" : "#2a2a2a",
            fontSize:12, cursor:"pointer", letterSpacing:1,
          }}>
            {erro ? "incorreto" : "→"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────
export default function Enfase() {
  const [tela, setTela] = useState("intro");
  const [qIdx, setQIdx] = useState(0);
  const [aIdx, setAIdx] = useState(0);
  const [rf, setRf] = useState({});
  const [ra, setRa] = useState({});
  const [resultado, setResultado] = useState(null);
  const [gabarito, setGabarito] = useState(false);
  const [animando, setAnimando] = useState(false);

  const totalBlocos = [...new Set(FECHADAS.map(p => p.bloco))];
  const blocoAtual = FECHADAS[qIdx]?.bloco;
  const progresso = tela === "fechadas" ? ((qIdx+1)/FECHADAS.length)*100
    : tela === "abertas" ? ((aIdx+1)/ABERTAS.length)*100 : 100;

  function avancar() {
    setAnimando(true);
    setTimeout(() => {
      if (qIdx < FECHADAS.length - 1) { setQIdx(q => q+1); }
      else { setTela("abertas"); }
      setAnimando(false);
    }, 200);
  }

  function avancarAberta() {
    setAnimando(true);
    setTimeout(() => {
      if (aIdx < ABERTAS.length - 1) { setAIdx(a => a+1); }
      else {
        const r = calcular(rf);
        setResultado(r);
        setTela("resultado");
      }
      setAnimando(false);
    }, 200);
  }

  function reiniciar() {
    setTela("intro"); setQIdx(0); setAIdx(0);
    setRf({}); setRa({}); setResultado(null); setGabarito(false);
  }

  const sel = rf[FECHADAS[qIdx]?.id];

  return (
    <div style={{
      minHeight:"100vh",
      background:"#0d0d0d",
      color:"#f0ede8",
      fontFamily:"'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    }}>
      {/* TOPO */}
      <div style={{
        padding:"20px 32px",
        borderBottom:"1px solid #1e1e1e",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, background:"#0d0d0d", zIndex:10,
      }}>
        <div>
          <div style={{ fontSize:10, letterSpacing:5, color:"#666", textTransform:"uppercase", marginBottom:3 }}>
            Programa de Posicionamento e Autoridade
          </div>
          <div style={{ fontSize:18, fontWeight:"700", letterSpacing:1, color:"#f0ede8" }}>
            ÊNFASE
          </div>
        </div>
        {tela !== "intro" && tela !== "resultado" && (
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:11, color:"#555", marginBottom:6 }}>
              {tela === "fechadas"
                ? `${qIdx+1} / ${FECHADAS.length} — ${blocoAtual}`
                : `Reflexão ${aIdx+1} / ${ABERTAS.length}`}
            </div>
            <div style={{ width:140, height:3, background:"#1e1e1e", borderRadius:2 }}>
              <div style={{ width:`${progresso}%`, height:"100%", background:"#c9a96e", borderRadius:2, transition:"width 0.5s ease" }}/>
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"48px 24px" }}>

        {/* INTRO */}
        {tela === "intro" && (
          <div style={{ textAlign:"center" }}>
            <div style={{
              display:"inline-block",
              border:"1px solid #2a2a2a",
              borderRadius:2,
              padding:"4px 16px",
              fontSize:10, letterSpacing:4, color:"#666", textTransform:"uppercase",
              marginBottom:32,
            }}>Diagnóstico de Identidade e Essência</div>
            <h1 style={{ fontSize:40, fontWeight:"400", lineHeight:1.2, marginBottom:16, letterSpacing:-1 }}>
              Quem você é,<br/>
              <em style={{ fontStyle:"italic", color:"#c9a96e" }}>de verdade.</em>
            </h1>
            <p style={{ color:"#666", fontSize:16, lineHeight:1.8, maxWidth:480, margin:"0 auto 40px" }}>
              Este diagnóstico foi criado para revelar a essência por trás do seu posicionamento.
              Não há resposta certa. Responda pelo que é verdadeiro, não pelo que você gostaria de ser.
            </p>
            <div style={{
              background:"#111", border:"1px solid #1e1e1e", borderRadius:4,
              padding:"24px 28px", marginBottom:40, textAlign:"left", display:"inline-block",
            }}>
              <div style={{ fontSize:12, color:"#555", marginBottom:14, letterSpacing:2, textTransform:"uppercase" }}>
                Estrutura
              </div>
              {[
                ["30", "perguntas fechadas de múltipla escolha"],
                ["6", "perguntas abertas de aprofundamento"],
                ["~", "25 a 35 minutos no total"],
                ["1", "resultado: arquétipo dominante + secundário"],
              ].map(([n, t]) => (
                <div key={n+t} style={{ display:"flex", gap:16, marginBottom:10, fontSize:14, color:"#888" }}>
                  <span style={{ color:"#c9a96e", fontWeight:"700", width:20, flexShrink:0 }}>{n}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <br/>
            <button onClick={() => setTela("fechadas")} style={{
              background:"#c9a96e", color:"#0d0d0d", border:"none",
              padding:"14px 48px", fontSize:15, fontWeight:"700",
              letterSpacing:2, textTransform:"uppercase", cursor:"pointer",
              borderRadius:2,
            }}>
              Começar
            </button>
          </div>
        )}

        {/* FECHADAS */}
        {tela === "fechadas" && (
          <div style={{ opacity: animando ? 0 : 1, transition:"opacity 0.2s" }}>
            <div style={{
              fontSize:10, letterSpacing:4, color:"#555", textTransform:"uppercase", marginBottom:24,
            }}>
              {blocoAtual}
            </div>
            <h2 style={{ fontSize:22, fontWeight:"400", lineHeight:1.6, marginBottom:36, color:"#f0ede8" }}>
              {FECHADAS[qIdx].pergunta}
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {FECHADAS[qIdx].opcoes.map(op => {
                const ativo = sel?.l === op.l;
                return (
                  <button key={op.l} onClick={() => setRf(p => ({...p, [FECHADAS[qIdx].id]: op}))}
                    style={{
                      background: ativo ? "#111" : "transparent",
                      border: ativo ? "1px solid #c9a96e" : "1px solid #1e1e1e",
                      borderRadius:4, padding:"18px 22px",
                      color: ativo ? "#f0ede8" : "#888",
                      fontSize:15, textAlign:"left",
                      cursor:"pointer", display:"flex", alignItems:"flex-start", gap:16,
                      transition:"all 0.15s",
                    }}>
                    <span style={{
                      width:26, height:26, borderRadius:"50%", flexShrink:0,
                      background: ativo ? "#c9a96e" : "#1a1a1a",
                      color: ativo ? "#0d0d0d" : "#555",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:11, fontWeight:"700", letterSpacing:0.5,
                    }}>{op.l}</span>
                    <span style={{ lineHeight:1.6, paddingTop:2 }}>{op.t}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:32 }}>
              {qIdx > 0 ? (
                <button onClick={() => setQIdx(q => q-1)} style={{
                  background:"transparent", border:"1px solid #1e1e1e", color:"#555",
                  padding:"10px 24px", fontSize:13, cursor:"pointer", borderRadius:2,
                }}>← Voltar</button>
              ) : <div/>}
              <button onClick={avancar} disabled={!sel} style={{
                background: sel ? "#c9a96e" : "#1a1a1a",
                color: sel ? "#0d0d0d" : "#333",
                border:"none", padding:"12px 36px",
                fontSize:14, fontWeight:"700", letterSpacing:1,
                textTransform:"uppercase", cursor: sel ? "pointer" : "not-allowed",
                borderRadius:2,
              }}>
                {qIdx < FECHADAS.length - 1 ? "Próxima" : "Perguntas abertas"} →
              </button>
            </div>
          </div>
        )}

        {/* ABERTAS */}
        {tela === "abertas" && (
          <div style={{ opacity: animando ? 0 : 1, transition:"opacity 0.2s" }}>
            <div style={{
              fontSize:10, letterSpacing:4, color:"#c9a96e", textTransform:"uppercase", marginBottom:8,
            }}>
              Reflexão aprofundada {aIdx+1} de {ABERTAS.length}
            </div>
            <div style={{
              fontSize:12, color:"#444", fontStyle:"italic", marginBottom:28,
            }}>
              {ABERTAS[aIdx].instrucao}
            </div>
            <h2 style={{ fontSize:20, fontWeight:"400", lineHeight:1.7, marginBottom:28, color:"#f0ede8" }}>
              {ABERTAS[aIdx].pergunta}
            </h2>
            <textarea
              value={ra[ABERTAS[aIdx].id] || ""}
              onChange={e => setRa(p => ({...p, [ABERTAS[aIdx].id]: e.target.value}))}
              rows={7}
              placeholder="Escreva aqui..."
              style={{
                width:"100%", background:"#111", border:"1px solid #1e1e1e",
                borderRadius:4, padding:20, color:"#f0ede8", fontSize:15,
                lineHeight:1.7, fontFamily:"inherit", resize:"vertical",
                outline:"none", boxSizing:"border-box",
              }}
            />
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              {aIdx > 0 ? (
                <button onClick={() => setAIdx(a => a-1)} style={{
                  background:"transparent", border:"1px solid #1e1e1e", color:"#555",
                  padding:"10px 24px", fontSize:13, cursor:"pointer", borderRadius:2,
                }}>← Voltar</button>
              ) : <div/>}
              <button onClick={avancarAberta} style={{
                background:"#c9a96e", color:"#0d0d0d", border:"none",
                padding:"12px 36px", fontSize:14, fontWeight:"700",
                letterSpacing:1, textTransform:"uppercase", cursor:"pointer", borderRadius:2,
              }}>
                {aIdx < ABERTAS.length - 1 ? "Próxima →" : "Concluir →"}
              </button>
            </div>
          </div>
        )}

        {/* ENCERRAMENTO — tela do mentorado, completamente limpa */}
        {tela === "resultado" && resultado && !gabarito && (
          <EncerramentoComSenha onSenhaCorreta={() => setGabarito(true)} />
        )}

        {/* PAINEL DO FACILITADOR — acessado apenas com senha correta */}
        {tela === "resultado" && resultado && gabarito && (
          <div>
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32,
            }}>
              <div>
                <div style={{ fontSize:10, letterSpacing:4, color:"#c9a96e", textTransform:"uppercase", marginBottom:4 }}>
                  Painel do Facilitador
                </div>
                <div style={{ fontSize:20, fontWeight:"700" }}>Análise completa</div>
              </div>
              <button onClick={() => setGabarito(false)} style={{
                background:"transparent", border:"1px solid #1e1e1e",
                color:"#555", padding:"8px 16px", fontSize:12,
                cursor:"pointer", borderRadius:2,
              }}>← Voltar</button>
            </div>

            {/* TOP 2 */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:32 }}>
              {resultado.slice(0,2).map(([k, score], idx) => {
                const a = AQ[k];
                return (
                  <div key={k} style={{
                    border:`1px solid ${a.cor}44`, background:`${a.cor}08`,
                    borderRadius:4, padding:"28px 20px", textAlign:"center", position:"relative",
                  }}>
                    <div style={{
                      position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)",
                      background: idx===0 ? a.cor : "#1a1a1a",
                      color: idx===0 ? "#0d0d0d" : "#666",
                      border: idx===1 ? "1px solid #2a2a2a" : "none",
                      fontSize:9, fontWeight:"800", padding:"4px 14px",
                      borderRadius:20, letterSpacing:3, textTransform:"uppercase", whiteSpace:"nowrap",
                    }}>
                      {idx===0 ? "Dominante" : "Secundário"}
                    </div>
                    <div style={{ fontSize:40, marginBottom:10 }}>{a.emoji}</div>
                    <div style={{ fontSize:20, fontWeight:"700", color:a.cor, marginBottom:4 }}>{a.nome}</div>
                    <div style={{ fontSize:28, fontWeight:"800", color:"#f0ede8", marginTop:10 }}>{score}</div>
                    <div style={{ fontSize:11, color:"#444", marginTop:2 }}>pontos</div>
                  </div>
                );
              })}
            </div>

            {/* RANKING COMPLETO */}
            <div style={{
              background:"#0f0f0f", border:"1px solid #1a1a1a",
              borderRadius:4, padding:"24px 28px", marginBottom:24,
            }}>
              <div style={{ fontSize:10, letterSpacing:4, color:"#555", textTransform:"uppercase", marginBottom:20 }}>
                Ranking completo — 12 arquétipos
              </div>
              {resultado.map(([k, score], idx) => {
                const a = AQ[k];
                const max = resultado[0][1];
                const pct = Math.round((score/max)*100);
                return (
                  <div key={k} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                    <div style={{ width:18, fontSize:11, color:"#333", textAlign:"right" }}>{idx+1}</div>
                    <div style={{ width:22, textAlign:"center", fontSize:16 }}>{a.emoji}</div>
                    <div style={{ width:120, fontSize:13, color:"#888" }}>{a.nome}</div>
                    <div style={{ flex:1, height:4, background:"#1a1a1a", borderRadius:2 }}>
                      <div style={{ width:`${pct}%`, height:"100%", background:a.cor, borderRadius:2, transition:"width 1s ease" }}/>
                    </div>
                    <div style={{ width:36, textAlign:"right", fontSize:13, color:a.cor, fontWeight:"700" }}>{score}</div>
                  </div>
                );
              })}
            </div>

            {/* RESPOSTAS ABERTAS */}
            <div style={{
              background:"#0f0f0f", border:"1px solid #1a1a1a",
              borderRadius:4, padding:"24px 28px", marginBottom:24,
            }}>
              <div style={{ fontSize:10, letterSpacing:4, color:"#555", textTransform:"uppercase", marginBottom:20 }}>
                Respostas dissertativas do mentorado
              </div>
              {ABERTAS.map((ab) => (
                <div key={ab.id} style={{ marginBottom:24, paddingBottom:24, borderBottom:"1px solid #1a1a1a" }}>
                  <div style={{ fontSize:13, color:"#666", fontStyle:"italic", marginBottom:8, lineHeight:1.6 }}>{ab.pergunta}</div>
                  <div style={{ fontSize:14, color:"#f0ede8", lineHeight:1.8, whiteSpace:"pre-wrap" }}>
                    {ra[ab.id] || <span style={{ color:"#333" }}>Não respondida</span>}
                  </div>
                  <div style={{ fontSize:11, color:"#554400", marginTop:10, paddingTop:10, borderTop:"1px solid #1a1200", lineHeight:1.7 }}>
                    🔍 {ab.guia}
                  </div>
                </div>
              ))}
            </div>

            {/* GABARITO INTERNO */}
            <div style={{
              background:"#0a0800", border:"1px solid #2a2200",
              borderRadius:4, padding:"24px 28px", marginBottom:24,
            }}>
              <div style={{ fontSize:10, letterSpacing:4, color:"#c9a96e", textTransform:"uppercase", marginBottom:20 }}>
                Gabarito interno — mapeamento de alternativas
              </div>
              <div style={{ fontSize:11, color:"#554400", marginBottom:20, fontStyle:"italic" }}>
                Cada alternativa e os pesos distribuídos por arquétipo.
              </div>
              {FECHADAS.map(p => (
                <div key={p.id} style={{ marginBottom:20, paddingBottom:20, borderBottom:"1px solid #1a1200" }}>
                  <div style={{ fontSize:13, color:"#c9a96e", fontWeight:"700", marginBottom:8 }}>
                    Q{p.id} [{p.bloco}] — {p.pergunta}
                  </div>
                  {p.opcoes.map(op => (
                    <div key={op.l} style={{ fontSize:12, color:"#666", marginBottom:6, paddingLeft:16 }}>
                      <span style={{ color:"#c9a96e", fontWeight:"700" }}>[{op.l}]</span> {op.t}
                      <br/>
                      <span style={{ color:"#554400" }}>
                        → {Object.entries(op.arq).map(([k,v]) => `${AQ[k]?.nome} +${v}`).join(" | ")}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button onClick={reiniciar} style={{
              background:"transparent", border:"1px solid #1e1e1e",
              color:"#555", padding:"12px 28px", fontSize:13,
              cursor:"pointer", borderRadius:2, width:"100%",
            }}>
              ↺ Novo diagnóstico
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
