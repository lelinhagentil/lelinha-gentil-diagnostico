import { useState } from "react";

const AQ = {
  INOCENTE:   { nome: "Inocente",      emoji: "☀️", cor: "#F5C842", desc: "Você acredita no bem, na pureza e na possibilidade de um mundo melhor. Sua força está na fé, no otimismo e na capacidade de inspirar esperança." },
  EXPLORADOR: { nome: "Explorador",    emoji: "🧭", cor: "#42B5F5", desc: "Você busca autenticidade e liberdade. Sua força está em abrir caminhos novos, questionar o convencional e mostrar que há outras formas de viver." },
  SABIO:      { nome: "Sábio",         emoji: "🦉", cor: "#A78BFA", desc: "Você busca a verdade e o conhecimento profundo. Sua força está em enxergar além do óbvio, fazer as perguntas certas e iluminar o que está escondido." },
  HEROI:      { nome: "Herói",         emoji: "⚔️", cor: "#F56042", desc: "Você age com coragem diante dos desafios. Sua força está na determinação, na superação e na capacidade de inspirar outros pelo exemplo." },
  FORA_LEI:   { nome: "Fora-da-Lei",   emoji: "🔥", cor: "#F59642", desc: "Você questiona o que está estabelecido e não aceita o status quo. Sua força está em provocar mudanças radicais e dar voz ao que precisa ser dito." },
  MAGO:       { nome: "Mago",          emoji: "✨", cor: "#42F5C8", desc: "Você transforma realidades de dentro para fora. Sua força está em conectar o visível ao invisível e conduzir pessoas a uma mudança profunda." },
  CARA_COMUM: { nome: "Cara Comum",    emoji: "🤝", cor: "#78C842", desc: "Você valoriza o pertencimento e a igualdade. Sua força está em criar conexão genuína, fazer as pessoas se sentirem vistas e parte de algo maior." },
  AMANTE:     { nome: "Amante",        emoji: "❤️", cor: "#F542A7", desc: "Você vive com paixão e intensidade. Sua força está na profundidade das conexões, na beleza que cria e na capacidade de tocar o coração das pessoas." },
  BOBO:       { nome: "Bobo da Corte", emoji: "🎭", cor: "#F5E642", desc: "Você traz leveza e alegria onde vai. Sua força está em desdramatizar, criar conexão pelo humor e lembrar as pessoas que a vida pode ser leve." },
  PRESTATIVO: { nome: "Prestativo",    emoji: "🤲", cor: "#42F578", desc: "Você existe para o outro. Sua força está no cuidado genuíno, na generosidade sem interesse e na capacidade de fazer as pessoas se sentirem amparadas." },
  CRIADOR:    { nome: "Criador",       emoji: "🎨", cor: "#C842F5", desc: "Você precisa criar. Sua força está na originalidade, na capacidade de dar forma ao que ainda não existe e de expressar o mundo de um jeito único." },
  GOVERNANTE: { nome: "Governante",    emoji: "👑", cor: "#F5A842", desc: "Você constrói estruturas que duram. Sua força está na visão estratégica, na liderança com responsabilidade e na capacidade de criar ordem e excelência." },
};

const FECHADAS = [
  { id:1, bloco:"Sobre você", pergunta:"Quando você pensa no motivo mais verdadeiro pelo qual faz o que faz, qual dessas frases chega mais perto?", opcoes:[
    { l:"A", t:"Quero cuidar das pessoas e fazer com que se sintam melhor por terem me encontrado.", arq:{ PRESTATIVO:3, AMANTE:1 } },
    { l:"B", t:"Quero construir algo sólido, duradouro, que gere resultado e ordem.", arq:{ GOVERNANTE:3, CRIADOR:1 } },
    { l:"C", t:"Quero transformar vidas de um jeito profundo, quase inexplicável.", arq:{ MAGO:3, HEROI:1 } },
    { l:"D", t:"Quero mostrar um caminho diferente do convencional.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
  ]},
  { id:2, bloco:"Sobre você", pergunta:"No fundo, o que mais te move a continuar quando tudo fica difícil?", opcoes:[
    { l:"A", t:"A certeza de que há pessoas que precisam do que eu tenho a oferecer.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
    { l:"B", t:"A vontade de provar para mim mesmo que sou capaz.", arq:{ HEROI:3, GOVERNANTE:1 } },
    { l:"C", t:"A paixão pelo que faço — o processo em si me alimenta.", arq:{ CRIADOR:2, AMANTE:2 } },
    { l:"D", t:"A visão de um futuro que eu acredito ser possível.", arq:{ MAGO:2, INOCENTE:2 } },
  ]},
  { id:3, bloco:"Sobre você", pergunta:"Se você pudesse escolher apenas uma herança que quer deixar no mundo, qual seria?", opcoes:[
    { l:"A", t:"Ter ajudado pessoas a se sentirem amadas, vistas e cuidadas.", arq:{ PRESTATIVO:2, AMANTE:2 } },
    { l:"B", t:"Ter construído algo que continua funcionando e impactando depois que eu partir.", arq:{ GOVERNANTE:3, CRIADOR:1 } },
    { l:"C", t:"Ter inspirado pessoas a acreditar que uma vida diferente é possível.", arq:{ MAGO:2, EXPLORADOR:2 } },
    { l:"D", t:"Ter descoberto e compartilhado verdades que mudam a forma de pensar.", arq:{ SABIO:3, INOCENTE:1 } },
  ]},
  { id:4, bloco:"Seus medos", pergunta:"Se você for completamente honesto, qual é o medo que mais aparece no fundo da sua cabeça?", opcoes:[
    { l:"A", t:"O medo de perder o controle sobre o que construí.", arq:{ GOVERNANTE:3, CRIADOR:1 } },
    { l:"B", t:"O medo de não ser suficiente para as pessoas que dependem de mim.", arq:{ PRESTATIVO:3, HEROI:1 } },
    { l:"C", t:"O medo de me tornar comum, igual a todos os outros.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
    { l:"D", t:"O medo de que o que faço não tenha impacto real.", arq:{ MAGO:2, HEROI:2 } },
  ]},
  { id:5, bloco:"Seus medos", pergunta:"O que mais te tira o sono quando um projeto não está indo bem?", opcoes:[
    { l:"A", t:"Sentir que decepcionei quem confiou em mim.", arq:{ PRESTATIVO:2, CARA_COMUM:2 } },
    { l:"B", t:"A sensação de que perdi o fio condutor, a clareza do propósito.", arq:{ SABIO:2, MAGO:2 } },
    { l:"C", t:"Ver que o resultado não chegou ao padrão que eu exijo de mim mesmo.", arq:{ HEROI:2, GOVERNANTE:2 } },
    { l:"D", t:"A ideia de ter me traído, de não ter sido autêntico nas escolhas.", arq:{ EXPLORADOR:3, FORA_LEI:1 } },
  ]},
  { id:6, bloco:"Seus medos", pergunta:"Qual dessas situações você evita ao máximo na vida profissional?", opcoes:[
    { l:"A", t:"Ser visto como incompetente ou sem preparo.", arq:{ SABIO:2, HEROI:2 } },
    { l:"B", t:"Depender de outras pessoas para conseguir o que preciso.", arq:{ GOVERNANTE:2, EXPLORADOR:2 } },
    { l:"C", t:"Parecer frio, distante ou insensível para quem está ao meu redor.", arq:{ AMANTE:2, PRESTATIVO:2 } },
    { l:"D", t:"Ser previsível, entrar na mesmice, perder a originalidade.", arq:{ CRIADOR:2, FORA_LEI:2 } },
  ]},
  { id:7, bloco:"Como você lidera", pergunta:"Como você prefere que as coisas funcionem dentro do que você lidera?", opcoes:[
    { l:"A", t:"Com estrutura, papéis claros e processos definidos.", arq:{ GOVERNANTE:3, SABIO:1 } },
    { l:"B", t:"Com autonomia para cada um — confio que as pessoas sabem o que fazem.", arq:{ EXPLORADOR:2, CARA_COMUM:2 } },
    { l:"C", t:"Com propósito compartilhado — o time precisa acreditar no mesmo sonho.", arq:{ MAGO:3, HEROI:1 } },
    { l:"D", t:"Com espaço para criação — prefiro ambientes onde ideias novas surgem.", arq:{ CRIADOR:3, BOBO:1 } },
  ]},
  { id:8, bloco:"Como você lidera", pergunta:"Quando você tem poder de decisão sobre algo importante, como costuma agir?", opcoes:[
    { l:"A", t:"Analiso todos os dados antes de decidir, preciso ter certeza.", arq:{ SABIO:3, GOVERNANTE:1 } },
    { l:"B", t:"Decido rápido, confio no meu instinto e assumo as consequências.", arq:{ HEROI:3, FORA_LEI:1 } },
    { l:"C", t:"Ouço as pessoas envolvidas antes — a decisão precisa fazer sentido para o grupo.", arq:{ CARA_COMUM:3, PRESTATIVO:1 } },
    { l:"D", t:"Sigo o que sinto ser verdadeiro, mesmo que pareça irracional para outros.", arq:{ MAGO:2, AMANTE:2 } },
  ]},
  { id:9, bloco:"Como você lidera", pergunta:"O que você mais valoriza em alguém que trabalha ou convive com você?", opcoes:[
    { l:"A", t:"Lealdade e comprometimento com o que foi acordado.", arq:{ GOVERNANTE:2, CARA_COMUM:2 } },
    { l:"B", t:"Inteligência e capacidade de questionar o que está posto.", arq:{ SABIO:3, FORA_LEI:1 } },
    { l:"C", t:"Presença, calor humano e genuinidade.", arq:{ AMANTE:2, PRESTATIVO:2 } },
    { l:"D", t:"Energia, iniciativa e vontade de fazer acontecer.", arq:{ HEROI:2, CRIADOR:2 } },
  ]},
  { id:10, bloco:"Você e as pessoas", pergunta:"Como as pessoas costumam descrever o que sentem ao interagir com você?", opcoes:[
    { l:"A", t:"Dizem que se sentem acolhidas, ouvidas, cuidadas.", arq:{ PRESTATIVO:3, AMANTE:1 } },
    { l:"B", t:"Dizem que saem com a cabeça diferente, enxergando coisas que não viam antes.", arq:{ SABIO:2, MAGO:2 } },
    { l:"C", t:"Dizem que minha energia é contagiante — minha presença move as pessoas.", arq:{ HEROI:2, BOBO:2 } },
    { l:"D", t:"Dizem que eu os provoco a sair da zona de conforto.", arq:{ FORA_LEI:2, EXPLORADOR:2 } },
  ]},
  { id:11, bloco:"Você e as pessoas", pergunta:"Quando alguém próximo está passando por dificuldade, qual é sua reação mais natural?", opcoes:[
    { l:"A", t:"Ofereço ajuda prática imediatamente — o que precisa, estou aqui.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
    { l:"B", t:"Escuto com profundidade, sem julgamento, e faço perguntas que ajudam a pensar.", arq:{ SABIO:2, AMANTE:2 } },
    { l:"C", t:"Trago perspectiva — mostro o que a pessoa não está conseguindo ver.", arq:{ MAGO:3, HEROI:1 } },
    { l:"D", t:"Uso leveza ou humor para tirar o peso da situação.", arq:{ BOBO:3, INOCENTE:1 } },
  ]},
  { id:12, bloco:"Você e as pessoas", pergunta:"Como você se sente em relação ao pertencimento a grupos?", opcoes:[
    { l:"A", t:"Preciso de comunidade — me realizo quando faço parte de algo maior.", arq:{ CARA_COMUM:3, PRESTATIVO:1 } },
    { l:"B", t:"Gosto de pessoas, mas preciso do meu espaço individual para funcionar bem.", arq:{ EXPLORADOR:2, CRIADOR:2 } },
    { l:"C", t:"Prefiro liderar do que pertencer — grupos precisam de direção.", arq:{ GOVERNANTE:3, HEROI:1 } },
    { l:"D", t:"Me conecto profundamente com poucos do que superficialmente com muitos.", arq:{ AMANTE:3, SABIO:1 } },
  ]},
  { id:13, bloco:"Sob pressão", pergunta:"Quando tudo está desmoronando ao mesmo tempo, qual é seu movimento instintivo?", opcoes:[
    { l:"A", t:"Assumo o controle, organizo as prioridades e coloco ordem no caos.", arq:{ GOVERNANTE:3, HEROI:1 } },
    { l:"B", t:"Busco entender a raiz do problema antes de agir — não quero resolver o sintoma.", arq:{ SABIO:3, MAGO:1 } },
    { l:"C", t:"Foco nas pessoas — quem está mais afetado? Como posso ajudar?", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
    { l:"D", t:"Confio que vai se resolver e mantenho a leveza para não contaminar o ambiente.", arq:{ INOCENTE:2, BOBO:2 } },
  ]},
  { id:14, bloco:"Sob pressão", pergunta:"Quando alguém tenta te impor algo com o qual você não concorda, como reage?", opcoes:[
    { l:"A", t:"Argumento com fatos e lógica até mudar a percepção.", arq:{ SABIO:3, GOVERNANTE:1 } },
    { l:"B", t:"Confronto diretamente — não aceito imposição sem questionamento.", arq:{ FORA_LEI:3, HEROI:1 } },
    { l:"C", t:"Busco um consenso — prefiro construir junto do que entrar em conflito.", arq:{ CARA_COMUM:3, PRESTATIVO:1 } },
    { l:"D", t:"Simplesmente ignoro e faço do meu jeito.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
  ]},
  { id:15, bloco:"Sob pressão", pergunta:"Quando você erra em algo importante, como costuma processar isso?", opcoes:[
    { l:"A", t:"Me cobro muito — o erro me incomoda por tempo e eu preciso entender o que falhou.", arq:{ HEROI:2, SABIO:2 } },
    { l:"B", t:"Analiso, extraio o aprendizado e sigo — não carrego culpa.", arq:{ SABIO:2, EXPLORADOR:2 } },
    { l:"C", t:"Me preocupo mais com o impacto que o erro causou nos outros do que em mim.", arq:{ PRESTATIVO:3, AMANTE:1 } },
    { l:"D", t:"Uso o erro como combustível para tentar de novo de forma diferente.", arq:{ HEROI:2, CRIADOR:2 } },
  ]},
  { id:16, bloco:"Como você vê o mundo", pergunta:"Qual dessas frases mais representa como você enxerga a vida?", opcoes:[
    { l:"A", t:"O mundo pode ser um lugar bom — as pessoas são essencialmente bem-intencionadas.", arq:{ INOCENTE:3, CARA_COMUM:1 } },
    { l:"B", t:"O mundo é complexo e precisa de pessoas que entendam essa complexidade.", arq:{ SABIO:3, GOVERNANTE:1 } },
    { l:"C", t:"O mundo precisa de transformação — as estruturas atuais não servem a todos.", arq:{ FORA_LEI:3, MAGO:1 } },
    { l:"D", t:"O mundo é um lugar de possibilidades — depende de como você escolhe olhar.", arq:{ MAGO:2, EXPLORADOR:2 } },
  ]},
  { id:17, bloco:"Como você vê o mundo", pergunta:"Como você se relaciona com as regras e convenções estabelecidas?", opcoes:[
    { l:"A", t:"Respeito as regras quando fazem sentido — e questiono quando não fazem.", arq:{ SABIO:2, FORA_LEI:2 } },
    { l:"B", t:"Regras são ferramentas, não princípios. Uso quando servem.", arq:{ FORA_LEI:3, EXPLORADOR:1 } },
    { l:"C", t:"Prefiro criar as minhas próprias regras e viver de acordo com elas.", arq:{ CRIADOR:2, GOVERNANTE:2 } },
    { l:"D", t:"Regras criam a estabilidade que permite às pessoas funcionarem bem.", arq:{ GOVERNANTE:3, INOCENTE:1 } },
  ]},
  { id:18, bloco:"Como você vê o mundo", pergunta:"O que você acredita que as pessoas mais precisam, mas raramente encontram?", opcoes:[
    { l:"A", t:"Alguém que realmente as ouça sem querer consertar ou aconselhar.", arq:{ AMANTE:2, PRESTATIVO:2 } },
    { l:"B", t:"Clareza — a maioria das pessoas está perdida porque não pensa com profundidade.", arq:{ SABIO:3, MAGO:1 } },
    { l:"C", t:"Permissão para ser quem realmente são, sem máscaras.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
    { l:"D", t:"Um ambiente seguro onde possam crescer sem julgamento.", arq:{ PRESTATIVO:2, CARA_COMUM:2 } },
  ]},
  { id:19, bloco:"Como você se expressa", pergunta:"Quando você tem algo importante para comunicar, qual é o seu estilo natural?", opcoes:[
    { l:"A", t:"Sou direto e objetivo — vou ao ponto sem rodeios.", arq:{ HEROI:2, GOVERNANTE:2 } },
    { l:"B", t:"Uso histórias, metáforas e imagens para fazer as pessoas sentirem o que quero transmitir.", arq:{ MAGO:2, AMANTE:2 } },
    { l:"C", t:"Apresento dados, argumentos e estrutura lógica.", arq:{ SABIO:3, GOVERNANTE:1 } },
    { l:"D", t:"Crio uma conexão emocional primeiro — a mensagem entra pelo coração.", arq:{ AMANTE:2, PRESTATIVO:2 } },
  ]},
  { id:20, bloco:"Como você se expressa", pergunta:"Qual das formas abaixo mais representa como você prefere ensinar ou transmitir algo?", opcoes:[
    { l:"A", t:"Explicando a teoria e o raciocínio por trás — quero que a pessoa entenda, não só replique.", arq:{ SABIO:3, MAGO:1 } },
    { l:"B", t:"Mostrando pelo exemplo — faço junto, na prática.", arq:{ HEROI:2, CARA_COMUM:2 } },
    { l:"C", t:"Criando experiências — aprende-se vivendo, não ouvindo.", arq:{ CRIADOR:2, EXPLORADOR:2 } },
    { l:"D", t:"Contando histórias reais que a pessoa pode se ver dentro.", arq:{ AMANTE:2, INOCENTE:2 } },
  ]},
  { id:21, bloco:"Como você se expressa", pergunta:"Se você fosse descrever sua presença em uma sala, qual seria mais honesto?", opcoes:[
    { l:"A", t:"As pessoas percebem que há alguém com autoridade e preparo.", arq:{ GOVERNANTE:2, SABIO:2 } },
    { l:"B", t:"As pessoas ficam à vontade, relaxam — crio um ambiente seguro.", arq:{ CARA_COMUM:2, PRESTATIVO:2 } },
    { l:"C", t:"As pessoas ficam curiosas — tem algo magnético ou intrigante em mim.", arq:{ MAGO:2, AMANTE:2 } },
    { l:"D", t:"As pessoas se energizam — saem da conversa com mais vontade de agir.", arq:{ HEROI:2, BOBO:2 } },
  ]},
  { id:22, bloco:"O que é sucesso pra você", pergunta:"Quando você imagina que teve um dia perfeito no trabalho, o que aconteceu?", opcoes:[
    { l:"A", t:"Resolvi um problema difícil que ninguém conseguia resolver.", arq:{ HEROI:3, SABIO:1 } },
    { l:"B", t:"Criei algo novo que não existia antes.", arq:{ CRIADOR:3, MAGO:1 } },
    { l:"C", t:"Alguém me disse que mudei a vida dela de alguma forma.", arq:{ PRESTATIVO:3, AMANTE:1 } },
    { l:"D", t:"Tudo funcionou exatamente como eu planejei — eficiência e resultado.", arq:{ GOVERNANTE:3, SABIO:1 } },
  ]},
  { id:23, bloco:"O que é sucesso pra você", pergunta:"Como você sabe que está no caminho certo?", opcoes:[
    { l:"A", t:"Quando sinto que estou crescendo, evoluindo, me tornando melhor.", arq:{ HEROI:2, EXPLORADOR:2 } },
    { l:"B", t:"Quando as pessoas ao meu redor estão bem por causa de algo que fiz.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
    { l:"C", t:"Quando os resultados aparecem e eu tenho controle sobre eles.", arq:{ GOVERNANTE:3, HEROI:1 } },
    { l:"D", t:"Quando sinto que estou sendo completamente autêntico no que faço.", arq:{ EXPLORADOR:2, FORA_LEI:2 } },
  ]},
  { id:24, bloco:"O que é sucesso pra você", pergunta:"O que você raramente abre mão, mesmo sob pressão?", opcoes:[
    { l:"A", t:"Da minha liberdade de escolher como e com quem trabalho.", arq:{ EXPLORADOR:3, FORA_LEI:1 } },
    { l:"B", t:"Da qualidade — prefiro entregar menos, mas excelente.", arq:{ HEROI:2, GOVERNANTE:2 } },
    { l:"C", t:"Da minha integridade e dos meus valores.", arq:{ SABIO:2, INOCENTE:2 } },
    { l:"D", t:"Do cuidado com as pessoas — não sacrifico relações por resultados.", arq:{ PRESTATIVO:2, AMANTE:2 } },
  ]},
  { id:25, bloco:"Seu lado sombra", pergunta:"Qual crítica você já recebeu — ou tem medo de receber — que mais te incomoda?", opcoes:[
    { l:"A", t:"Que sou controlador demais ou que centralizo tudo.", arq:{ GOVERNANTE:3, HEROI:1 } },
    { l:"B", t:"Que sou ingênuo, que confio demais nas pessoas.", arq:{ INOCENTE:3, PRESTATIVO:1 } },
    { l:"C", t:"Que sou frio, distante ou difícil de acessar.", arq:{ SABIO:2, GOVERNANTE:2 } },
    { l:"D", t:"Que sou inconstante, que começo e não termino.", arq:{ EXPLORADOR:2, CRIADOR:2 } },
  ]},
  { id:26, bloco:"Seu lado sombra", pergunta:"Em qual dessas armadilhas você já se viu cair?", opcoes:[
    { l:"A", t:"Ajudar tanto os outros que me esqueci de mim mesmo.", arq:{ PRESTATIVO:3, AMANTE:1 } },
    { l:"B", t:"Querer quebrar as regras mesmo quando isso prejudicou a mim ou a outros.", arq:{ FORA_LEI:3, EXPLORADOR:1 } },
    { l:"C", t:"Usar o conhecimento como forma de me sentir superior.", arq:{ SABIO:3, GOVERNANTE:1 } },
    { l:"D", t:"Criar tanto que me perdi na execução e nada ficou pronto.", arq:{ CRIADOR:3, BOBO:1 } },
  ]},
  { id:27, bloco:"Seu lado sombra", pergunta:"O que as pessoas próximas diriam que você precisa aprender a largar?", opcoes:[
    { l:"A", t:"A necessidade de estar sempre certo.", arq:{ SABIO:2, GOVERNANTE:2 } },
    { l:"B", t:"O excesso de seriedade — se eu me permitisse leveza, seria mais feliz.", arq:{ HEROI:2, GOVERNANTE:2 } },
    { l:"C", t:"A dificuldade de pedir ajuda — quero resolver tudo sozinho.", arq:{ HEROI:3, FORA_LEI:1 } },
    { l:"D", t:"O medo de decepcionar — às vezes digo sim quando devia dizer não.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
  ]},
  { id:28, bloco:"Visão final", pergunta:"Se um desconhecido te pedisse para se apresentar em 30 segundos, o que você diria naturalmente?", opcoes:[
    { l:"A", t:"Diria o que faço e os resultados que entrego — objetivo e direto.", arq:{ GOVERNANTE:2, HEROI:2 } },
    { l:"B", t:"Contaria um pouco da minha história — de onde vim e por que faço o que faço.", arq:{ EXPLORADOR:2, CARA_COMUM:2 } },
    { l:"C", t:"Falaria sobre o impacto que gero na vida das pessoas.", arq:{ MAGO:2, PRESTATIVO:2 } },
    { l:"D", t:"Faria uma pergunta a ele primeiro — prefiro ouvir antes de falar.", arq:{ SABIO:2, AMANTE:2 } },
  ]},
  { id:29, bloco:"Visão final", pergunta:"Qual das frases abaixo você poderia ter escrito?", opcoes:[
    { l:"A", t:"'Não vim até aqui para ser qualquer um.'", arq:{ HEROI:3, FORA_LEI:1 } },
    { l:"B", t:"'Quando você cuida das pessoas certas, tudo o mais se resolve.'", arq:{ PRESTATIVO:2, AMANTE:2 } },
    { l:"C", t:"'Quem controla sua narrativa, controla seu destino.'", arq:{ GOVERNANTE:2, MAGO:2 } },
    { l:"D", t:"'A resposta está sempre dentro — eu só ajudo a encontrar.'", arq:{ SABIO:2, MAGO:2 } },
  ]},
  { id:30, bloco:"Visão final", pergunta:"Se você pudesse ser lembrado por uma única coisa, qual seria?", opcoes:[
    { l:"A", t:"Por ter sido corajoso e ter enfrentado o que precisava ser enfrentado.", arq:{ HEROI:3, FORA_LEI:1 } },
    { l:"B", t:"Por ter criado algo belo e único que não existia antes.", arq:{ CRIADOR:3, AMANTE:1 } },
    { l:"C", t:"Por ter cuidado das pessoas com genuinidade e sem interesse.", arq:{ PRESTATIVO:3, CARA_COMUM:1 } },
    { l:"D", t:"Por ter mostrado que é possível viver de uma forma mais verdadeira.", arq:{ EXPLORADOR:2, MAGO:2 } },
  ]},
];

function calcular(rf) {
  const scores = {};
  Object.keys(AQ).forEach(k => scores[k] = 0);
  Object.values(rf).forEach(op => {
    if (!op?.arq) return;
    Object.entries(op.arq).forEach(([k,v]) => { scores[k] = (scores[k]||0)+v; });
  });
  return Object.entries(scores).sort((a,b)=>b[1]-a[1]).filter(([,v])=>v>0);
}

export default function Imersao() {
  const [tela, setTela] = useState("intro");
  const [qIdx, setQIdx] = useState(0);
  const [rf, setRf] = useState({});
  const [resultado, setResultado] = useState(null);
  const [animando, setAnimando] = useState(false);

  const sel = rf[FECHADAS[qIdx]?.id];
  const progresso = tela === "fechadas" ? ((qIdx+1)/FECHADAS.length)*100 : 100;

  function avancar() {
    setAnimando(true);
    setTimeout(() => {
      if (qIdx < FECHADAS.length-1) {
        setQIdx(q=>q+1);
      } else {
        const r = calcular(rf);
        setResultado(r);
        setTela("resultado");
      }
      setAnimando(false);
    }, 200);
  }

  function reiniciar() {
    setTela("intro"); setQIdx(0); setRf({}); setResultado(null);
  }

  return (
    <div style={{
      minHeight:"100vh", background:"#0d0d0d", color:"#f0ede8",
      fontFamily:"'Palatino Linotype', Palatino, serif", padding:0,
    }}>
      {/* HEADER */}
      <div style={{
        padding:"20px 28px 16px", borderBottom:"1px solid #1a1a1a",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, background:"#0d0d0d", zIndex:10,
      }}>
        <div>
          <div style={{ fontSize:9, letterSpacing:4, color:"#555", textTransform:"uppercase", marginBottom:3 }}>
            Programa de Posicionamento e Autoridade
          </div>
          <div style={{ fontSize:17, fontWeight:"700", letterSpacing:1 }}>ÊNFASE</div>
        </div>
        {tela === "fechadas" && (
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:11, color:"#555", marginBottom:5 }}>{qIdx+1} / {FECHADAS.length}</div>
            <div style={{ width:100, height:3, background:"#1a1a1a", borderRadius:2 }}>
              <div style={{ width:`${progresso}%`, height:"100%", background:"#c9a96e", borderRadius:2, transition:"width 0.4s" }}/>
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth:660, margin:"0 auto", padding:"40px 20px" }}>

        {/* INTRO */}
        {tela === "intro" && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:52, marginBottom:24 }}>✦</div>
            <h1 style={{ fontSize:34, fontWeight:"400", lineHeight:1.3, marginBottom:16 }}>
              Quem você é,<br/><em style={{ color:"#c9a96e" }}>de verdade.</em>
            </h1>
            <p style={{ color:"#666", fontSize:16, lineHeight:1.9, maxWidth:460, margin:"0 auto 36px" }}>
              Este diagnóstico foi criado para revelar a essência por trás do seu posicionamento.
              Não há resposta certa. Responda pelo que é verdadeiro — não pelo que você gostaria de ser.
            </p>
            <div style={{
              background:"#111", border:"1px solid #1a1a1a", borderRadius:4,
              padding:"20px 28px", marginBottom:36, display:"inline-block",
            }}>
              <div style={{ fontSize:13, color:"#555", marginBottom:12 }}>30 perguntas · ~15 minutos · resultado imediato</div>
            </div>
            <br/>
            <button onClick={()=>setTela("fechadas")} style={{
              background:"#c9a96e", color:"#0d0d0d", border:"none",
              padding:"14px 48px", fontSize:15, fontWeight:"700",
              letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:2,
            }}>Começar →</button>
          </div>
        )}

        {/* PERGUNTAS */}
        {tela === "fechadas" && (
          <div style={{ opacity:animando?0:1, transition:"opacity 0.2s" }}>
            <div style={{ fontSize:9, letterSpacing:4, color:"#555", textTransform:"uppercase", marginBottom:20 }}>
              {FECHADAS[qIdx].bloco}
            </div>
            <h2 style={{ fontSize:21, fontWeight:"400", lineHeight:1.6, marginBottom:32, color:"#f0ede8" }}>
              {FECHADAS[qIdx].pergunta}
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {FECHADAS[qIdx].opcoes.map(op => {
                const ativo = sel?.l === op.l;
                return (
                  <button key={op.l} onClick={()=>setRf(p=>({...p,[FECHADAS[qIdx].id]:op}))}
                    style={{
                      background:ativo?"#111":"transparent",
                      border:ativo?"1px solid #c9a96e":"1px solid #1e1e1e",
                      borderRadius:4, padding:"16px 20px", color:ativo?"#f0ede8":"#888",
                      fontSize:15, textAlign:"left", cursor:"pointer",
                      display:"flex", alignItems:"flex-start", gap:14, transition:"all 0.15s",
                    }}>
                    <span style={{
                      width:26, height:26, borderRadius:"50%", flexShrink:0,
                      background:ativo?"#c9a96e":"#1a1a1a", color:ativo?"#0d0d0d":"#555",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:11, fontWeight:"700",
                    }}>{op.l}</span>
                    <span style={{ lineHeight:1.6, paddingTop:2 }}>{op.t}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:28 }}>
              {qIdx > 0 ? (
                <button onClick={()=>setQIdx(q=>q-1)} style={{
                  background:"transparent", border:"1px solid #1e1e1e", color:"#555",
                  padding:"10px 20px", fontSize:13, cursor:"pointer", borderRadius:2,
                }}>← Voltar</button>
              ) : <div/>}
              <button onClick={avancar} disabled={!sel} style={{
                background:sel?"#c9a96e":"#1a1a1a", color:sel?"#0d0d0d":"#333",
                border:"none", padding:"12px 32px", fontSize:14, fontWeight:"700",
                letterSpacing:1, textTransform:"uppercase",
                cursor:sel?"pointer":"not-allowed", borderRadius:2,
              }}>
                {qIdx < FECHADAS.length-1 ? "Próxima →" : "Ver meu arquétipo →"}
              </button>
            </div>
          </div>
        )}

        {/* RESULTADO */}
        {tela === "resultado" && resultado && (() => {
          const [k1, s1] = resultado[0];
          const [k2, s2] = resultado[1];
          const a1 = AQ[k1];
          const a2 = AQ[k2];
          return (
            <div>
              <div style={{ textAlign:"center", marginBottom:40 }}>
                <div style={{ fontSize:9, letterSpacing:5, color:"#555", textTransform:"uppercase", marginBottom:12 }}>
                  Seu resultado
                </div>
                <h2 style={{ fontSize:28, fontWeight:"400", marginBottom:6 }}>
                  Seu <em style={{ color:"#c9a96e" }}>arquétipo</em> identificado
                </h2>
              </div>

              {/* DOMINANTE */}
              <div style={{
                border:`1px solid ${a1.cor}55`, background:`${a1.cor}0d`,
                borderRadius:6, padding:"32px 24px", textAlign:"center", marginBottom:16,
                position:"relative",
              }}>
                <div style={{
                  position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)",
                  background:a1.cor, color:"#0d0d0d", fontSize:9, fontWeight:"800",
                  padding:"4px 16px", borderRadius:20, letterSpacing:3, textTransform:"uppercase",
                }}>Arquétipo Dominante</div>
                <div style={{ fontSize:56, marginBottom:12 }}>{a1.emoji}</div>
                <div style={{ fontSize:30, fontWeight:"700", color:a1.cor, marginBottom:16 }}>{a1.nome}</div>
                <p style={{ color:"#aaa", fontSize:16, lineHeight:1.8, maxWidth:460, margin:"0 auto" }}>
                  {a1.desc}
                </p>
              </div>

              {/* SECUNDÁRIO */}
              <div style={{
                border:"1px solid #2a2a2a", background:"#0f0f0f",
                borderRadius:6, padding:"24px", textAlign:"center", marginBottom:32,
                position:"relative",
              }}>
                <div style={{
                  position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)",
                  background:"#1a1a1a", border:"1px solid #2a2a2a",
                  color:"#666", fontSize:9, fontWeight:"800",
                  padding:"4px 14px", borderRadius:20, letterSpacing:3, textTransform:"uppercase",
                }}>Arquétipo Secundário</div>
                <div style={{ fontSize:36, marginBottom:8 }}>{a2.emoji}</div>
                <div style={{ fontSize:20, fontWeight:"700", color:a2.cor, marginBottom:10 }}>{a2.nome}</div>
                <p style={{ color:"#666", fontSize:14, lineHeight:1.7, maxWidth:400, margin:"0 auto" }}>
                  {a2.desc}
                </p>
              </div>

              {/* RANKING */}
              <div style={{
                background:"#0f0f0f", border:"1px solid #1a1a1a",
                borderRadius:4, padding:"20px 24px", marginBottom:28,
              }}>
                <div style={{ fontSize:9, letterSpacing:3, color:"#444", textTransform:"uppercase", marginBottom:16 }}>
                  Ranking completo
                </div>
                {resultado.map(([k,score],idx) => {
                  const a = AQ[k];
                  const pct = Math.round((score/resultado[0][1])*100);
                  return (
                    <div key={k} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:16, fontSize:10, color:"#333" }}>{idx+1}</div>
                      <div style={{ width:20, textAlign:"center" }}>{a.emoji}</div>
                      <div style={{ width:110, fontSize:12, color:"#777" }}>{a.nome}</div>
                      <div style={{ flex:1, height:4, background:"#1a1a1a", borderRadius:2 }}>
                        <div style={{ width:`${pct}%`, height:"100%", background:a.cor, borderRadius:2 }}/>
                      </div>
                      <div style={{ width:30, textAlign:"right", fontSize:12, color:a.cor, fontWeight:"700" }}>{score}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ textAlign:"center", color:"#333", fontSize:12, letterSpacing:2, textTransform:"uppercase", marginBottom:24 }}>
                ÊNFASE — Programa de Posicionamento e Autoridade
              </div>

              <button onClick={reiniciar} style={{
                background:"transparent", border:"1px solid #1e1e1e", color:"#444",
                padding:"10px 24px", fontSize:12, cursor:"pointer", borderRadius:2, width:"100%",
              }}>↺ Responder novamente</button>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
