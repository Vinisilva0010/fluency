// --- INICIALIZAÇÃO DO FIREBASE ---
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let currentUser = null; // Variável para guardar o usuário logado

// --- BANCO DE DADOS ---
const phrases = {
    basic: [ 
        { en: "Hello, how are you?", pt: "Olá, como você está?" }, 
        { en: "My name is John.", pt: "Meu nome é John." }, 
        { en: "What is your name?", pt: "Qual é o seu nome?" }, 
        { en: "I am from Brazil.", pt: "Eu sou do Brasil." }, 
        { en: "Good morning.", pt: "Bom dia." }, 
        { en: "Pleased to meet you.", pt: "Prazer em conhecê-lo." }, 
        { en: "Thank you very much.", pt: "Muito obrigado." }, 
        { en: "Excuse me, where is the bathroom?", pt: "Com licença, onde fica o banheiro?" }, 
        { en: "I don't understand.", pt: "Eu não entendo." }, 
        { en: "Can you help me?", pt: "Você pode me ajudar?" },
        { en: "How much does this cost?", pt: "Quanto custa isso?" },
        { en: "I would like a coffee, please.", pt: "Eu gostaria de um café, por favor." }
    ],
    intermediate: [ 
        { en: "I have been studying English for two years.", pt: "Eu estudo inglês há dois anos." }, 
        { en: "Could you please speak more slowly?", pt: "Você poderia falar mais devagar, por favor?" }, 
        { en: "I'm looking forward to visiting New York.", pt: "Estou ansioso para visitar Nova York." }, 
        { en: "What do you do for a living?", pt: "O que você faz da vida?" }, 
        { en: "This is more difficult than I thought.", pt: "Isso é mais difícil do que eu pensava." }, 
        { en: "If I were you, I would take that job offer.", pt: "Se eu fosse você, aceitaria essa oferta de emprego." }, 
        { en: "She is interested in learning about other cultures.", pt: "Ela está interessada em aprender sobre outras culturas." }, 
        { en: "How long does it take to get to the airport?", pt: "Quanto tempo leva para chegar ao aeroporto?" },
        { en: "I'm supposed to meet him at the coffee shop.", pt: "Devo encontrá-lo na cafeteria." },
        { en: "We should have left earlier to avoid traffic.", pt: "Deveríamos ter saído mais cedo para evitar o trânsito." }
    ],
    advanced: [ 
        { en: "The nuances of the language are quite fascinating.", pt: "As nuances da língua são bastante fascinantes." }, 
        { en: "Despite the inclement weather, we decided to proceed.", pt: "Apesar do tempo inclemente, decidimos prosseguir." }, 
        { en: "He has a plethora of knowledge on the subject.", pt: "Ele tem uma infinidade de conhecimento sobre o assunto." }, 
        { en: "It's a quintessential example of modern architecture.", pt: "É um exemplo quintessencial da arquitetura moderna." }, 
        { en: "The politician's speech was rather disingenuous.", pt: "O discurso do político foi bastante dissimulado." }, 
        { en: "Comprehending the intricacies of quantum physics is a formidable task.", pt: "Compreender as complexidades da física quântica é uma tarefa formidável." }, 
        { en: "The ubiquitous nature of social media has changed society.", pt: "A natureza onipresente das mídias sociais mudou a sociedade." },
        { en: "The dichotomy between theory and practice is evident.", pt: "A dicotomia entre teoria e prática é evidente." }
    ]
};

const vocabulary = {
    travel: [
        { word: "Airport", translation: "Aeroporto", example: "The airport is very busy today.", phonetic: "/ˈeə.pɔːt/" },
        { word: "Passport", translation: "Passaporte", example: "Don't forget your passport!", phonetic: "/ˈpæs.pɔːt/" },
        { word: "Luggage", translation: "Bagagem", example: "Where is my luggage?", phonetic: "/ˈlʌɡ.ɪdʒ/" },
        { word: "Hotel", translation: "Hotel", example: "I booked a hotel near the beach.", phonetic: "/hoʊˈtel/" },
        { word: "Tourist", translation: "Turista", example: "The city is full of tourists.", phonetic: "/ˈtʊr.ɪst/" },
        { word: "Flight", translation: "Voo", example: "My flight was delayed.", phonetic: "/flaɪt/" }
    ],
    food: [
        { word: "Breakfast", translation: "Café da manhã", example: "I have cereal for breakfast.", phonetic: "/ˈbrek.fəst/" },
        { word: "Delicious", translation: "Delicioso", example: "This cake is delicious!", phonetic: "/dɪˈlɪʃ.əs/" },
        { word: "Restaurant", translation: "Restaurante", example: "Let's go to a restaurant.", phonetic: "/ˈres.tə.rɑːnt/" },
        { word: "Menu", translation: "Cardápio", example: "Can I see the menu, please?", phonetic: "/ˈmen.juː/" },
        { word: "Vegetarian", translation: "Vegetariano", example: "Do you have vegetarian options?", phonetic: "/ˌvedʒ.əˈter.i.ən/" },
        { word: "Recipe", translation: "Receita", example: "I love this recipe!", phonetic: "/ˈres.ə.pi/" }
    ],
    business: [
        { word: "Meeting", translation: "Reunião", example: "We have a meeting at 3 PM.", phonetic: "/ˈmiː.tɪŋ/" },
        { word: "Deadline", translation: "Prazo final", example: "The deadline is tomorrow.", phonetic: "/ˈded.laɪn/" },
        { word: "Contract", translation: "Contrato", example: "Please sign the contract.", phonetic: "/ˈkɑːn.trækt/" },
        { word: "Salary", translation: "Salário", example: "What's your expected salary?", phonetic: "/ˈsæl.ə.ri/" },
        { word: "Manager", translation: "Gerente", example: "I need to speak with my manager.", phonetic: "/ˈmæn.ɪ.dʒər/" },
        { word: "Presentation", translation: "Apresentação", example: "The presentation was excellent.", phonetic: "/ˌprez.ənˈteɪ.ʃən/" }
    ],
    emotions: [
        { word: "Happy", translation: "Feliz", example: "I'm very happy today!", phonetic: "/ˈhæp.i/" },
        { word: "Excited", translation: "Animado", example: "I'm excited about the trip!", phonetic: "/ɪkˈsaɪ.tɪd/" },
        { word: "Nervous", translation: "Nervoso", example: "I feel nervous before exams.", phonetic: "/ˈnɜː.vəs/" },
        { word: "Confident", translation: "Confiante", example: "She looks very confident.", phonetic: "/ˈkɑːn.fɪ.dənt/" },
        { word: "Disappointed", translation: "Decepcionado", example: "I was disappointed with the result.", phonetic: "/ˌdɪs.əˈpɔɪn.tɪd/" },
        { word: "Grateful", translation: "Grato", example: "I'm grateful for your help.", phonetic: "/ˈɡreɪt.fəl/" }
    ]
};

const achievements = [
    { id: 'first_word', icon: '📝', name: 'Primeiras Palavras', description: 'Complete sua primeira frase', requirement: 1 },
    { id: 'speaker', icon: '🎤', name: 'Orador', description: 'Complete 10 exercícios de fala', requirement: 10 },
    { id: 'listener', icon: '👂', name: 'Ouvinte Atento', description: 'Complete 10 exercícios de audição', requirement: 10 },
    { id: 'writer', icon: '✍️', name: 'Escritor', description: 'Complete 10 exercícios de escrita', requirement: 10 },
    { id: 'polyglot', icon: '🌍', name: 'Poliglota', description: 'Aprenda 25 palavras de vocabulário', requirement: 25 },
    { id: 'streak_3', icon: '🔥', name: 'Dedicação', description: 'Mantenha 3 dias consecutivos', requirement: 3 },
    { id: 'streak_7', icon: '⚡', name: 'Persistência', description: 'Mantenha 7 dias consecutivos', requirement: 7 },
    { id: 'streak_30', icon: '💎', name: 'Mestre da Disciplina', description: 'Mantenha 30 dias consecutivos', requirement: 30 },
    { id: 'points_100', icon: '⭐', name: 'Colecionador', description: 'Alcance 100 pontos', requirement: 100 },
    { id: 'points_500', icon: '🌟', name: 'Estrela Cadente', description: 'Alcance 500 pontos', requirement: 500 },
    { id: 'points_1000', icon: '👑', name: 'Rei do Conhecimento', description: 'Alcance 1000 pontos', requirement: 1000 },
    { id: 'challenge_master', icon: '🏆', name: 'Mestre dos Desafios', description: 'Complete 10 desafios diários', requirement: 10 }
];

const writingExercises = [ 
    { type: 'fill-in-blank', topic: "Simple Present (I, You, We, They)", explanation: "Usamos o 'Simple Present' para falar de hábitos. Para 'I, you, we, they', usamos o verbo na forma base.", sentence: "They ___ English every day.", answer: "study", options: ["studies", "study", "studying"] },
    { type: 'fill-in-blank', topic: "Simple Present (He, She, It)", explanation: "Para 'he, she, it', geralmente adicionamos 's' ao final do verbo.", sentence: "He ___ to music in the morning.", answer: "listens", options: ["listen", "listening", "listens"] },
    { type: 'translate', topic: "Translation", explanation: "Traduza a frase do português para o inglês.", sentence: "Eu preciso de ajuda, por favor.", answer: "I need help, please.", options: ["I need helping, please.", "I need help, please.", "I helps, please."] },
    { type: 'order-words', topic: "Sentence Structure", explanation: "Coloque as palavras na ordem correta para formar uma frase.", sentence: ["is", "reading", "She", "a", "book"], answer: "She is reading a book." },
    { type: 'fill-in-blank', topic: "Present Continuous", explanation: "Usado para ações acontecendo agora. Formado por 'am/is/are' + verbo com '-ing'.", sentence: "She ___ a book at the moment.", answer: "is reading", options: ["reads", "is reading", "read"] },
    { type: 'translate', topic: "Translation", explanation: "Traduza a frase do português para o inglês.", sentence: "Onde você mora?", answer: "Where do you live?", options: ["Where you live?", "Where do you lives?", "Where do you live?"] } 
];

const idioms = [ 
    { idiom: "Break a leg", meaning: "Boa sorte (usado principalmente para desejar sorte a artistas antes de uma apresentação).", example_en: "You have a big exam tomorrow? Break a leg!", example_pt: "Você tem uma prova importante amanhã? Boa sorte!" }, 
    { idiom: "Bite the bullet", meaning: "Enfrentar uma situação difícil com coragem.", example_en: "I have to work all weekend, but I'll just have to bite the bullet.", example_pt: "Tenho que trabalhar todo o fim de semana, mas terei que aguentar firme." }, 
    { idiom: "Piece of cake", meaning: "Algo muito fácil de fazer.", example_en: "The test was a piece of cake.", example_pt: "A prova foi muito fácil." }, 
    { idiom: "Hit the books", meaning: "Estudar com afinco.", example_en: "I have a final exam next week, so I need to hit the books.", example_pt: "Tenho uma prova final na próxima semana, então preciso mergulhar nos estudos." }, 
    { idiom: "Once in a blue moon", meaning: "Algo que acontece muito raramente.", example_en: "I only go to the cinema once in a blue moon.", example_pt: "Eu só vou ao cinema muito raramente." }, 
    { idiom: "The ball is in your court", meaning: "A decisão ou o próximo passo é responsabilidade de outra pessoa.", example_en: "I've done everything I can. Now the ball is in your court.", example_pt: "Eu fiz tudo que podia. Agora a decisão é sua." },
    { idiom: "It's raining cats and dogs", meaning: "Está chovendo muito forte.", example_en: "I can't go out, it's raining cats and dogs!", example_pt: "Não posso sair, está chovendo muito forte!" },
    { idiom: "Spill the beans", meaning: "Revelar um segredo.", example_en: "Come on, spill the beans! What happened?", example_pt: "Vamos lá, conte tudo! O que aconteceu?" }
];

const mediaQuizzes = [
    {
        id: 'quiz1',
        title: 'English Conversation for Beginners',
        youtubeId: 'sn6nMp_ELSw',
        questions: [
            {
                question: 'What is the main topic of the video?',
                options: ['Daily routines', 'Basic greetings and introductions', 'Shopping vocabulary', 'Travel tips'],
                correct: 1
            },
            {
                question: 'Which phrase is commonly used to ask someone\'s name?',
                options: ['How old are you?', 'Where are you from?', 'What is your name?', 'What do you do?'],
                correct: 2
            },
            {
                question: 'What does "Nice to meet you" mean?',
                options: ['Goodbye', 'Prazer em conhecê-lo', 'How are you?', 'Thank you'],
                correct: 1
            }
        ]
    },
    {
        id: 'quiz2',
        title: 'Learn English Through Story',
        youtubeId: 'LOl8KMDfsjk',
        questions: [
            {
                question: 'What type of content is this video?',
                options: ['A documentary', 'A news report', 'A story for learning', 'A song'],
                correct: 2
            },
            {
                question: 'Why are stories good for learning English?',
                options: ['They are boring', 'They provide context and vocabulary', 'They are too difficult', 'They are only for children'],
                correct: 1
            },
            {
                question: 'What should you do while watching?',
                options: ['Sleep', 'Pay attention and take notes', 'Skip parts', 'Watch in fast mode'],
                correct: 1
            }
        ]
    },
    {
        id: 'quiz3',
        title: 'English Listening Practice',
        youtubeId: 'xZMxCg3rMk4',
        questions: [
            {
                question: 'What skill does this video help improve?',
                options: ['Writing', 'Listening', 'Grammar', 'Pronunciation only'],
                correct: 1
            },
            {
                question: 'Why is listening practice important?',
                options: ['It\'s not important', 'To understand native speakers', 'Only for exams', 'Just for fun'],
                correct: 1
            },
            {
                question: 'What should you do if you don\'t understand something?',
                options: ['Give up', 'Listen again and use context', 'Skip it', 'Only read subtitles'],
                correct: 1
            }
        ]
    }
];

const cultureTips = [
    {
        title: 'Pedindo Comida em um Restaurante',
        explanation: 'Nos países de língua inglesa, é comum ser educado ao fazer pedidos. Use "please" e "thank you" sempre!',
        phrases: [
            { en: "Can I see the menu, please?", pt: "Posso ver o cardápio, por favor?" },
            { en: "I'd like to order the chicken, please.", pt: "Eu gostaria de pedir o frango, por favor." },
            { en: "Could I have the check, please?", pt: "Poderia me trazer a conta, por favor?" },
            { en: "Is service included?", pt: "O serviço está incluído?" }
        ]
    },
    {
        title: 'Comprando em Lojas',
        explanation: 'Ao fazer compras, é importante saber como perguntar preços e pedir ajuda aos vendedores.',
        phrases: [
            { en: "How much does this cost?", pt: "Quanto custa isso?" },
            { en: "Do you have this in a different size?", pt: "Você tem isso em um tamanho diferente?" },
            { en: "Can I try this on?", pt: "Posso experimentar isso?" },
            { en: "I'm just looking, thank you.", pt: "Estou só olhando, obrigado." }
        ]
    },
    {
        title: 'Usando Transporte Público',
        explanation: 'Navegar pelo transporte público em outro país pode ser desafiador. Aqui estão algumas frases úteis.',
        phrases: [
            { en: "Which bus goes to the city center?", pt: "Qual ônibus vai para o centro da cidade?" },
            { en: "How much is a ticket?", pt: "Quanto custa uma passagem?" },
            { en: "Does this train stop at Central Station?", pt: "Este trem para na Estação Central?" },
            { en: "Excuse me, is this seat taken?", pt: "Com licença, este assento está ocupado?" }
        ]
    },
    {
        title: 'Fazendo Check-in em Hotel',
        explanation: 'Ao chegar em um hotel, você precisará fazer o check-in e pode ter algumas solicitações especiais.',
        phrases: [
            { en: "I have a reservation under the name Smith.", pt: "Tenho uma reserva no nome Smith." },
            { en: "What time is breakfast served?", pt: "A que horas é servido o café da manhã?" },
            { en: "Could I have a wake-up call at 7 AM?", pt: "Poderia me dar uma chamada de despertar às 7h?" },
            { en: "Is Wi-Fi included?", pt: "O Wi-Fi está incluído?" }
        ]
    },
    {
        title: 'Pedindo Direções na Rua',
        explanation: 'Se você se perder, não tenha medo de pedir ajuda! As pessoas geralmente são prestativas.',
        phrases: [
            { en: "Excuse me, how do I get to the museum?", pt: "Com licença, como eu chego ao museu?" },
            { en: "Is it far from here?", pt: "É longe daqui?" },
            { en: "Can you show me on the map?", pt: "Você pode me mostrar no mapa?" },
            { en: "Should I turn left or right?", pt: "Devo virar à esquerda ou à direita?" }
        ]
    },
    {
        title: 'Conversas Informais com Amigos',
        explanation: 'Em situações casuais, a linguagem tende a ser mais relaxada. Aprenda algumas expressões informais.',
        phrases: [
            { en: "What's up?", pt: "E aí? / Como vai?" },
            { en: "Wanna grab a coffee?", pt: "Quer tomar um café?" },
            { en: "I'm gonna head out now.", pt: "Vou indo agora." },
            { en: "Catch you later!", pt: "Te vejo depois!" }
        ]
    }
];

const dailyChallenges = [
    { type: 'order-words', topic: "Estrutura de Frase Complexa", explanation: "Coloque as palavras na ordem correta para formar uma pergunta.", sentence: ["have", "English", "been", "studying", "you", "How", "long"], answer: "How long have you been studying English" },
    { type: 'listening', topic: "Compreensão Auditiva Rápida", explanation: "Ouça com atenção e digite a frase. A pronúncia pode ser mais rápida.", sentence: "I'm thinking of going to the beach this weekend.", answer: "I'm thinking of going to the beach this weekend." },
    { type: 'translate', topic: "Tradução com Expressão", explanation: "Traduza a frase, prestando atenção na expressão idiomática.", sentence: "A prova foi muito fácil.", answer: "The test was a piece of cake." },
];
const guidedConversations = {
    finance: {
        title: "Mercado Financeiro",
        icon: "📈",
        steps: [
            {
                id: 1,
                texto_en: "Welcome to our discussion on the financial market. This is where wealth is built and economies are shaped. Are you more curious about traditional stocks or the new world of cryptocurrencies?",
                texto_pt: "Bem-vindo à nossa discussão sobre o mercado financeiro. É aqui que a riqueza é construída e as economias são moldadas. Você está mais curioso sobre as ações tradicionais ou o novo mundo das criptomoedas?",
                opcoes: [
                    { texto_btn: "I'm interested in stocks", proximo_id: 2 },
                    { texto_btn: "I prefer cryptocurrencies", proximo_id: 3 },
                    { texto_btn: "What's the main difference?", proximo_id: 4 }
                ]
            },
            {
                id: 2,
                texto_en: "Great choice! Stocks, or 'equities', represent ownership in a company. When you buy a stock, you become a shareholder. The key to success is understanding valuation and market trends. What's your goal with stocks?",
                texto_pt: "Ótima escolha! Ações, ou 'equities', representam propriedade em uma empresa. Ao comprar uma ação, você se torna um acionista. A chave para o sucesso é entender a avaliação e as tendências de mercado. Qual seu objetivo com ações?",
                opcoes: [
                    { texto_btn: "Long-term growth", proximo_id: 5 },
                    { texto_btn: "Receiving dividends", proximo_id: 6 },
                    { texto_btn: "I'm a complete beginner", proximo_id: 7 }
                ]
            },
            {
                id: 3,
                texto_en: "Cryptocurrencies are digital assets secured by cryptography. They operate on a decentralized technology called blockchain. They are known for high volatility, meaning high risk but also potential for high returns. What attracts you to them?",
                texto_pt: "Criptomoedas são ativos digitais protegidos por criptografia. Elas operam em uma tecnologia descentralizada chamada blockchain. São conhecidas pela alta volatilidade, o que significa alto risco, mas também potencial para altos retornos. O que te atrai nelas?",
                opcoes: [
                    { texto_btn: "The revolutionary technology", proximo_id: 8 },
                    { texto_btn: "The potential for high profits", proximo_id: 9 },
                    { texto_btn: "I want to understand blockchain", proximo_id: 10 }
                ]
            },
            {
                id: 4,
                texto_en: "The main difference is ownership and decentralization. Stocks give you ownership in a centralized company. Cryptocurrencies are typically decentralized, with value based on their network and technology, not a central entity. Which path seems more interesting now?",
                texto_pt: "A principal diferença é a propriedade e a descentralização. Ações te dão propriedade em uma empresa centralizada. Criptomoedas são tipicamente descentralizadas, com valor baseado em sua rede e tecnologia, não em uma entidade central. Que caminho parece mais interessante agora?",
                opcoes: [
                    { texto_btn: "Stocks seem more stable", proximo_id: 2 },
                    { texto_btn: "Crypto sounds more innovative", proximo_id: 3 }
                ]
            },
            {
                id: 5,
                texto_en: "Excellent goal. For long-term growth, investors often look for 'growth stocks' (companies expected to grow faster than the market) or follow a 'buy and hold' strategy with solid, established companies. This strategy was famously championed by Warren Buffett.",
                texto_pt: "Excelente objetivo. Para crescimento a longo prazo, investidores costumam procurar por 'growth stocks' (empresas que devem crescer mais rápido que o mercado) ou seguir uma estratégia de 'comprar e manter' com empresas sólidas e estabelecidas. Essa estratégia foi famosamente defendida por Warren Buffett.",
                opcoes: [
                    { texto_btn: "Tell me more about Warren Buffett", proximo_id: 11 },
                    { texto_btn: "What are 'growth stocks'?", proximo_id: 12 },
                    { texto_btn: "Back to the main menu, thanks!", proximo_id: 99 }
                ]
            },
            {
                id: 6,
                texto_en: "Dividends are a portion of a company's profits paid to shareholders. It's a great way to generate passive income. 'Dividend stocks' are usually mature, stable companies. This strategy is popular among investors seeking regular cash flow.",
                texto_pt: "Dividendos são uma porção dos lucros de uma empresa pagos aos acionistas. É uma ótima forma de gerar renda passiva. 'Ações de dividendos' são geralmente de empresas maduras e estáveis. Essa estratégia é popular entre investidores que buscam um fluxo de caixa regular.",
                opcoes: [
                    { texto_btn: "How do I find good dividend stocks?", proximo_id: 13 },
                    { texto_btn: "Are dividends guaranteed?", proximo_id: 14 }
                ]
            },
            {
                id: 7,
                texto_en: "No problem! The best starting point for beginners is often an ETF or Index Fund. They provide instant diversification by holding hundreds or thousands of stocks in a single investment, which significantly reduces risk. Do you want to know more?",
                texto_pt: "Sem problemas! O melhor ponto de partida para iniciantes costuma ser um ETF ou Fundo de Índice. Eles fornecem diversificação instantânea ao deter centenas ou milhares de ações em um único investimento, o que reduz o risco significativamente. Quer saber mais?",
                opcoes: [
                    { texto_btn: "Yes, explain ETFs", proximo_id: 15 },
                    { texto_btn: "What's an Index Fund?", proximo_id: 16 }
                ]
            },
            {
                id: 8,
                texto_en: "The technology is indeed the core. Blockchain, a distributed and immutable ledger, enables trust without intermediaries. This has applications far beyond currency, like 'smart contracts' and Decentralized Finance (DeFi).",
                texto_pt: "A tecnologia é de fato o núcleo. Blockchain, um registro distribuído e imutável, permite confiança sem intermediários. Isso tem aplicações muito além de moedas, como 'contratos inteligentes' e Finanças Descentralizadas (DeFi).",
                opcoes: [
                    { texto_btn: "What is DeFi?", proximo_id: 17 },
                    { texto_btn: "What are smart contracts?", proximo_id: 18 }
                ]
            },
            {
                id: 9,
                texto_en: "The profit potential is a major draw, but remember the golden rule: high potential reward comes with high risk. The crypto market is famous for its 'bull' and 'bear' cycles. A solid strategy is crucial. Never invest more than you are willing to lose.",
                texto_pt: "O potencial de lucro é um grande atrativo, mas lembre-se da regra de ouro: alta recompensa potencial vem com alto risco. O mercado cripto é famoso por seus ciclos de 'alta' (bull) e 'baixa' (bear). Uma estratégia sólida é crucial. Nunca invista mais do que você está disposto a perder.",
                opcoes: [
                    { texto_btn: "What's a 'bull' market?", proximo_id: 19 },
                    { texto_btn: "How can I manage the risk?", proximo_id: 20 }
                ]
            },
            {
                id: 10,
                texto_en: "Blockchain is a distributed database that is shared among the nodes of a computer network. As a database, a blockchain stores information electronically in digital format. It guarantees the fidelity and security of a record of data and generates trust without the need for a trusted third party.",
                texto_pt: "Blockchain é um banco de dados distribuído que é compartilhado entre os nós de uma rede de computadores. Como um banco de dados, uma blockchain armazena informações eletronicamente em formato digital. Ela garante a fidelidade e a segurança de um registro de dados e gera confiança sem a necessidade de um terceiro confiável.",
                opcoes: [
                    { texto_btn: "That's clear, thanks!", proximo_id: 99 }
                ]
            },
            {
                id: 11,
                texto_en: "Warren Buffett is one of the most successful investors in history. He is the CEO of Berkshire Hathaway and an advocate for 'value investing' - buying stocks for less than their intrinsic value and holding them for the long term. His wisdom is legendary.",
                texto_pt: "Warren Buffett é um dos investidores mais bem-sucedidos da história. Ele é o CEO da Berkshire Hathaway e um defensor do 'value investing' - comprar ações por menos do que seu valor intrínseco e mantê-las a longo prazo. Sua sabedoria é lendária.",
                opcoes: [
                    { texto_btn: "Interesting! Let's continue.", proximo_id: 5 }
                ]
            },
            {
                id: 12,
                texto_en: "Growth stocks belong to companies that are expected to grow at an above-average rate compared to other companies in the market. They usually don't pay dividends, as they reinvest profits to fuel expansion. Think of technology companies.",
                texto_pt: "Ações de crescimento pertencem a empresas que se espera que cresçam a uma taxa acima da média em comparação com outras empresas no mercado. Elas geralmente não pagam dividendos, pois reinvestem os lucros para impulsionar a expansão. Pense em empresas de tecnologia.",
                opcoes: [
                    { texto_btn: "Got it, thanks!", proximo_id: 5 }
                ]
            },
            {
                id: 13,
                texto_en: "You can find them by researching companies with a history of consistent dividend payments and increases. Look for a healthy 'payout ratio' (the percentage of earnings paid as dividends) and strong financial stability. Many financial websites have screeners for this.",
                texto_pt: "Você pode encontrá-las pesquisando empresas com um histórico de pagamentos e aumentos consistentes de dividendos. Procure por um 'payout ratio' saudável (a porcentagem dos lucros paga como dividendos) e forte estabilidade financeira. Muitos sites financeiros têm filtros para isso.",
                opcoes: [
                    { texto_btn: "Great tip, thank you!", proximo_id: 6 }
                ]
            },
            {
                id: 14,
                texto_en: "No, dividends are not guaranteed. A company's board of directors can decide to increase, decrease, or eliminate them at any time, usually based on the company's financial health. That's why choosing stable companies is important.",
                texto_pt: "Não, os dividendos não são garantidos. O conselho de administração de uma empresa pode decidir aumentá-los, diminuí-los ou eliminá-los a qualquer momento, geralmente com base na saúde financeira da empresa. É por isso que escolher empresas estáveis é importante.",
                opcoes: [
                    { texto_btn: "Understood, thanks!", proximo_id: 6 }
                ]
            },
            {
                id: 15,
                texto_en: "An ETF, or Exchange-Traded Fund, is a basket of securities that you can buy or sell on a stock exchange, just like a single stock. They can contain all sorts of investments, including stocks, commodities, or bonds.",
                texto_pt: "Um ETF, ou Fundo Negociado em Bolsa, é uma cesta de ativos que você pode comprar ou vender em uma bolsa de valores, como uma única ação. Eles podem conter todos os tipos de investimentos, incluindo ações, commodities ou títulos.",
                opcoes: [
                    { texto_btn: "Excellent! Thanks.", proximo_id: 7 }
                ]
            },
            {
                id: 16,
                texto_en: "An Index Fund is a type of mutual fund or ETF with a portfolio constructed to match or track the components of a financial market index, such as the S&P 500. It provides broad market exposure, low operating expenses, and low portfolio turnover.",
                texto_pt: "Um Fundo de Índice é um tipo de fundo mútuo ou ETF com um portfólio construído para corresponder ou rastrear os componentes de um índice de mercado financeiro, como o S&P 500. Ele oferece ampla exposição ao mercado, baixas despesas operacionais e baixa rotatividade de portfólio.",
                opcoes: [
                    { texto_btn: "Very clear, thank you.", proximo_id: 7 }
                ]
            },
            {
                id: 17,
                texto_en: "DeFi stands for Decentralized Finance. It's a new financial system built on blockchain that doesn't rely on central financial intermediaries such as banks. Instead, it uses smart contracts on blockchains, most commonly Ethereum.",
                texto_pt: "DeFi significa Finanças Descentralizadas. É um novo sistema financeiro construído em blockchain que não depende de intermediários financeiros centrais, como bancos. Em vez disso, usa contratos inteligentes em blockchains, mais comumente o Ethereum.",
                opcoes: [
                    { texto_btn: "Sounds revolutionary!", proximo_id: 8 }
                ]
            },
            {
                id: 18,
                texto_en: "Smart contracts are like regular contracts, but they are digital and run on a blockchain. They are automatically executed when certain conditions are met. This removes the need for a third-party intermediary and makes transactions transparent and irreversible.",
                texto_pt: "Contratos inteligentes são como contratos regulares, mas são digitais e rodam em uma blockchain. Eles são executados automaticamente quando certas condições são atendidas. Isso remove a necessidade de um intermediário e torna as transações transparentes e irreversíveis.",
                opcoes: [
                    { texto_btn: "The future is here!", proximo_id: 8 }
                ]
            },
            {
                id: 19,
                texto_en: "A 'bull market' is a period when stock prices are rising, and market sentiment is optimistic. Investors believe the upward trend will continue. The opposite is a 'bear market,' characterized by falling prices and pessimism.",
                texto_pt: "Um 'mercado de alta' (bull market) é um período em que os preços das ações estão subindo e o sentimento do mercado é otimista. Os investidores acreditam que a tendência de alta continuará. O oposto é um 'mercado de baixa' (bear market), caracterizado pela queda dos preços e pessimismo.",
                opcoes: [
                    { texto_btn: "Interesting terminology. Thanks!", proximo_id: 9 }
                ]
            },
            {
                id: 20,
                texto_en: "Risk management is key. Diversification (not putting all your money in one asset), using 'stop-loss' orders to limit potential losses, and dollar-cost averaging (investing a fixed amount regularly) are all effective strategies.",
                texto_pt: "O gerenciamento de risco é fundamental. Diversificação (não colocar todo o seu dinheiro em um único ativo), usar ordens de 'stop-loss' para limitar perdas potenciais e fazer preço médio (investir uma quantia fixa regularmente) são estratégias eficazes.",
                opcoes: [
                    { texto_btn: "Great advice, thank you!", proximo_id: 9 }
                ]
            },
            {
                id: 99,
                texto_en: "You're welcome! It was a pleasure discussing the financial markets with you. Keep learning, stay disciplined, and may your portfolio grow! 🚀",
                texto_pt: "De nada! Foi um prazer discutir os mercados financeiros com você. Continue aprendendo, mantenha a disciplina e que seu portfólio cresça! 🚀",
                opcoes: [
                    { texto_btn: "🏠 Voltar ao Menu", proximo_id: 0 },
                    { texto_btn: "🔄 Começar Novamente", proximo_id: 1 }
                ]
            }
        ]
    },
    quantum: {
        title: "Física Quântica",
        icon: "⚛️",
        steps: [
            {
                id: 1,
                texto_en: "Welcome to the strange and wonderful realm of quantum physics! It governs the universe at the smallest scales. Are you ready to question reality? What concept sparks your curiosity the most?",
                texto_pt: "Bem-vindo ao estranho e maravilhoso reino da física quântica! Ela governa o universo nas menores escalas. Pronto para questionar a realidade? Que conceito desperta mais sua curiosidade?",
                opcoes: [
                    { texto_btn: "Wave-Particle Duality", proximo_id: 2 },
                    { texto_btn: "Quantum Superposition", proximo_id: 3 },
                    { texto_btn: "The Uncertainty Principle", proximo_id: 4 }
                ]
            },
            {
                id: 2,
                texto_en: "A mind-bending concept! It means that quantum objects, like electrons, can behave as both a spread-out wave AND a specific particle. Which behavior they show depends on how we measure them. It's not one or the other; it's both at once.",
                texto_pt: "Um conceito alucinante! Significa que objetos quânticos, como elétrons, podem se comportar tanto como uma onda espalhada QUANTO como uma partícula específica. O comportamento que eles exibem depende de como os medimos. Não é um ou outro; são ambos ao mesmo tempo.",
                opcoes: [
                    { texto_btn: "How was this discovered?", proximo_id: 5 },
                    { texto_btn: "What are the implications?", proximo_id: 6 }
                ]
            },
            {
                id: 3,
                texto_en: "Superposition is the idea that a particle can exist in multiple states or locations at the same time. Think of it as a spinning coin. While it's spinning, it's both heads and tails. Only when we 'observe' it (it lands), does it collapse into a single state. This is the basis for quantum computing.",
                texto_pt: "Superposição é a ideia de que uma partícula pode existir em múltiplos estados ou locais ao mesmo tempo. Pense nela como uma moeda girando. Enquanto gira, é cara e coroa. Somente quando a 'observamos' (ela pousa), ela colapsa para um único estado. Esta é a base da computação quântica.",
                opcoes: [
                    { texto_btn: "Tell me about Schrödinger's Cat", proximo_id: 7 },
                    { texto_btn: "How does this help computers?", proximo_id: 8 }
                ]
            },
            {
                id: 4,
                texto_en: "Heisenberg's Uncertainty Principle states that there is a fundamental limit to how well we can know certain pairs of properties of a particle, such as its position and momentum. The more precisely you know its position, the less precisely you know its momentum, and vice versa.",
                texto_pt: "O Princípio da Incerteza de Heisenberg afirma que existe um limite fundamental para quão bem podemos conhecer certos pares de propriedades de uma partícula, como sua posição e seu momento. Quanto mais precisamente você conhece sua posição, menos precisamente conhece seu momento, e vice-versa.",
                opcoes: [
                    { texto_btn: "So we can never be certain?", proximo_id: 9 },
                    { texto_btn: "Why does this happen?", proximo_id: 10 }
                ]
            },
            {
                id: 5,
                texto_en: "Through the famous 'double-slit experiment'. When electrons were fired at a screen with two slits, they created an interference pattern on the other side, which is characteristic of waves. But when detectors were placed at the slits to see which one they went through, the pattern disappeared, and they acted like particles!",
                texto_pt: "Através do famoso 'experimento da fenda dupla'. Quando elétrons foram disparados em uma tela com duas fendas, eles criaram um padrão de interferência do outro lado, que é característico de ondas. Mas quando detectores foram colocados nas fendas para ver por qual delas eles passavam, o padrão desapareceu, e eles agiram como partículas!",
                opcoes: [
                    { texto_btn: "So observation changes reality?", proximo_id: 11 }
                ]
            },
            {
                id: 6,
                texto_en: "The implications are profound. It challenges our classical intuition about reality and forms the basis for technologies like lasers, transistors (in all electronics), and quantum computing. It means reality at the smallest level is probabilistic, not deterministic.",
                texto_pt: "As implicações são profundas. Desafia nossa intuição clássica sobre a realidade e forma a base para tecnologias como lasers, transistores (em todos os eletrônicos) e computação quântica. Significa que a realidade no nível mais baixo é probabilística, não determinística.",
                opcoes: [
                    { texto_btn: "Amazing. Let's go back.", proximo_id: 1 }
                ]
            },
            {
                id: 7,
                texto_en: "It's a thought experiment to illustrate superposition. Imagine a cat in a sealed box with a radioactive atom that has a 50% chance of decaying in an hour and triggering a poison. Until you open the box and 'observe' the system, the cat is considered to be in a superposition of being both alive AND dead.",
                texto_pt: "É um experimento mental para ilustrar a superposição. Imagine um gato em uma caixa selada com um átomo radioativo que tem 50% de chance de decair em uma hora e acionar um veneno. Até que você abra a caixa e 'observe' o sistema, o gato é considerado em uma superposição de estar tanto vivo QUANTO morto.",
                opcoes: [
                    { texto_btn: "So the cat is really both?", proximo_id: 12 }
                ]
            },
            {
                id: 8,
                texto_en: "Classical computer bits are either 0 or 1. A quantum bit, or 'qubit', thanks to superposition, can be 0, 1, or both at the same time. This allows quantum computers to process a massive number of calculations simultaneously, promising to solve problems impossible for today's supercomputers.",
                texto_pt: "Os bits de um computador clássico são 0 ou 1. Um bit quântico, ou 'qubit', graças à superposição, pode ser 0, 1 ou ambos ao mesmo tempo. Isso permite que computadores quânticos processem um número massivo de cálculos simultaneamente, prometendo resolver problemas impossíveis para os supercomputadores de hoje.",
                opcoes: [
                    { texto_btn: "What kind of problems?", proximo_id: 13 }
                ]
            },
            {
                id: 9,
                texto_en: "Exactly! At the quantum level, certainty is replaced by probability. We can calculate the probability of finding a particle in a certain place, but we can't know for sure until we measure it. It's a fundamental aspect of how the universe works.",
                texto_pt: "Exatamente! No nível quântico, a certeza é substituída pela probabilidade. Podemos calcular a probabilidade de encontrar uma partícula em um certo lugar, mas não podemos saber com certeza até medirmos. É um aspecto fundamental de como o universo funciona.",
                opcoes: [
                    { texto_btn: "Fascinating! Back to concepts.", proximo_id: 1 }
                ]
            },
            {
                id: 10,
                texto_en: "It happens because of the wave nature of particles. To 'see' a particle's position, you have to interact with it, for example, by hitting it with a photon of light. This interaction inevitably disturbs its momentum, making it uncertain. The very act of measuring changes the system.",
                texto_pt: "Acontece por causa da natureza ondulatória das partículas. Para 'ver' a posição de uma partícula, você precisa interagir com ela, por exemplo, atingindo-a com um fóton de luz. Essa interação inevitavelmente perturba seu momento, tornando-o incerto. O próprio ato de medir muda o sistema.",
                opcoes: [
                    { texto_btn: "So measurement is not passive?", proximo_id: 11 }
                ]
            },
            {
                id: 11,
                texto_en: "Precisely. This is one of the most debated topics. In the quantum world, the observer is not separate from the observed system. The act of measurement is an active process that forces the quantum system to 'choose' a state. This is called the 'observer effect'.",
                texto_pt: "Exatamente. Este é um dos tópicos mais debatidos. No mundo quântico, o observador não está separado do sistema observado. O ato de medição é um processo ativo que força o sistema quântico a 'escolher' um estado. Isso é chamado de 'efeito do observador'.",
                opcoes: [
                    { texto_btn: "Incredible. Let's go back.", proximo_id: 1 }
                ]
            },
            {
                id: 12,
                texto_en: "According to the Copenhagen interpretation of quantum mechanics, yes. Before observation, the cat is described by a wave function that is a mix of the 'alive' and 'dead' states. The box itself is in a superposition. Our classical intuition struggles with this, but it's what the math suggests.",
                texto_pt: "De acordo com a interpretação de Copenhague da mecânica quântica, sim. Antes da observação, o gato é descrito por uma função de onda que é uma mistura dos estados 'vivo' e 'morto'. A caixa em si está em uma superposição. Nossa intuição clássica tem dificuldade com isso, mas é o que a matemática sugere.",
                opcoes: [
                    { texto_btn: "Are there other interpretations?", proximo_id: 14 }
                ]
            },
            {
                id: 13,
                texto_en: "They could revolutionize drug discovery by simulating molecules, create new materials, break current encryption methods, and optimize complex systems like financial markets or logistics. The potential is enormous.",
                texto_pt: "Eles poderiam revolucionar a descoberta de medicamentos simulando moléculas, criar novos materiais, quebrar os métodos de criptografia atuais e otimizar sistemas complexos como mercados financeiros ou logística. O potencial é enorme.",
                opcoes: [
                    { texto_btn: "So it's a security risk too?", proximo_id: 15 }
                ]
            },
            {
                id: 14,
                texto_en: "Yes! The 'Many-Worlds' interpretation suggests that every quantum measurement causes the universe to split. In one universe, the cat is alive; in another, it's dead. So, all possible outcomes exist in separate, parallel universes. It avoids the 'collapse' problem.",
                texto_pt: "Sim! A interpretação dos 'Muitos Mundos' sugere que toda medição quântica faz o universo se dividir. Em um universo, o gato está vivo; em outro, está morto. Assim, todos os resultados possíveis existem em universos paralelos e separados. Isso evita o problema do 'colapso'.",
                opcoes: [
                    { texto_btn: "That's even stranger! Thanks.", proximo_id: 99 }
                ]
            },
            {
                id: 15,
                texto_en: "Absolutely. The development of 'quantum-resistant cryptography' is a major field of research right now. We need to create new ways to secure our data before powerful quantum computers become a reality.",
                texto_pt: "Com certeza. O desenvolvimento da 'criptografia resistente à quântica' é um grande campo de pesquisa atualmente. Precisamos criar novas maneiras de proteger nossos dados antes que computadores quânticos poderosos se tornem realidade.",
                opcoes: [
                    { texto_btn: "This is fascinating stuff. Thanks!", proximo_id: 99 }
                ]
            },
            {
                id: 99,
                texto_en: "Exploring the quantum world is a journey into the fundamental nature of reality. It's a field full of mystery and potential. Thanks for diving in! 🌌",
                texto_pt: "Explorar o mundo quântico é uma jornada na natureza fundamental da realidade. É um campo cheio de mistério e potencial. Obrigado por mergulhar nisso! 🌌",
                opcoes: [
                    { texto_btn: "🏠 Voltar ao Menu", proximo_id: 0 },
                    { texto_btn: "🔄 Começar Novamente", proximo_id: 1 }
                ]
            }
        ]
    },
    ai: {
        title: "Inteligência Artificial",
        icon: "🤖",
        steps: [
            {
                id: 1,
                texto_en: "Let's talk about Artificial Intelligence, the field dedicated to making machines think and learn. AI is already all around us, from your phone to medical diagnostics. What area of AI are you most curious about?",
                texto_pt: "Vamos falar sobre Inteligência Artificial, o campo dedicado a fazer máquinas pensar e aprender. A IA já está ao nosso redor, do seu celular a diagnósticos médicos. Qual área da IA te deixa mais curioso?",
                opcoes: [
                    { texto_btn: "How AI 'learns' (Machine Learning)", proximo_id: 2 },
                    { texto_btn: "The creative side (Generative AI)", proximo_id: 3 },
                    { texto_btn: "The future and risks of AI", proximo_id: 4 }
                ]
            },
            {
                id: 2,
                texto_en: "Machine Learning (ML) is the core of modern AI. Instead of being programmed with rules, models are 'trained' on vast amounts of data. They learn to recognize patterns, make predictions, and improve over time. It's like teaching a child by showing it examples, not by giving it a rulebook.",
                texto_pt: "Machine Learning (ML) é o núcleo da IA moderna. Em vez de serem programados com regras, os modelos são 'treinados' em vastas quantidades de dados. Eles aprendem a reconhecer padrões, fazer previsões e melhorar com o tempo. É como ensinar uma criança mostrando exemplos, não dando um livro de regras.",
                opcoes: [
                    { texto_btn: "What's the difference with Deep Learning?", proximo_id: 5 },
                    { texto_btn: "Give me a real-world example.", proximo_id: 6 }
                ]
            },
            {
                id: 3,
                texto_en: "Generative AI is a fascinating branch where AI creates new content. Think of models like DALL-E creating images from text, or GPT (like me!) writing a poem. They are trained on massive datasets and learn the underlying patterns of human creativity, allowing them to generate original works.",
                texto_pt: "IA Generativa é um ramo fascinante onde a IA cria conteúdo novo. Pense em modelos como o DALL-E criando imagens a partir de texto, ou o GPT (como eu!) escrevendo um poema. Eles são treinados em conjuntos de dados massivos e aprendem os padrões subjacentes da criatividade humana, permitindo-lhes gerar trabalhos originais.",
                opcoes: [
                    { texto_btn: "How does an AI 'draw' an image?", proximo_id: 7 },
                    { texto_btn: "Is this 'real' creativity?", proximo_id: 8 }
                ]
            },
            {
                id: 4,
                texto_en: "The future of AI holds immense promise, like curing diseases and solving climate change. But it also comes with risks, such as job displacement, algorithmic bias, and the challenge of creating 'aligned' AI that shares human values. It's a topic of intense debate.",
                texto_pt: "O futuro da IA ​​promete imensamente, como curar doenças e resolver as mudanças climáticas. Mas também traz riscos, como o deslocamento de empregos, o viés algorítmico e o desafio de criar uma IA 'alinhada' que compartilhe os valores humanos. É um tópico de intenso debate.",
                opcoes: [
                    { texto_btn: "What is 'aligned' AI?", proximo_id: 9 },
                    { texto_btn: "Will AI take our jobs?", proximo_id: 10 }
                ]
            },
            {
                id: 5,
                texto_en: "Deep Learning is a specialized subset of Machine Learning. It uses 'deep neural networks' with many layers, inspired by the human brain. This depth allows it to learn very complex patterns from huge amounts of data, making it powerful for tasks like image recognition and natural language processing.",
                texto_pt: "Deep Learning é um subconjunto especializado de Machine Learning. Ele usa 'redes neurais profundas' com muitas camadas, inspiradas no cérebro humano. Essa profundidade permite aprender padrões muito complexos a partir de enormes quantidades de dados, tornando-o poderoso para tarefas como reconhecimento de imagem e processamento de linguagem natural.",
                opcoes: [
                    { texto_btn: "Sounds complex! Thanks.", proximo_id: 2 }
                ]
            },
            {
                id: 6,
                texto_en: "Sure! Your email's spam filter is a classic example. It wasn't programmed with a list of 'spam words'. Instead, it was trained on millions of emails labeled as spam or not spam. It learned the patterns on its own and now makes predictions about new emails.",
                texto_pt: "Claro! O filtro de spam do seu e-mail é um exemplo clássico. Ele não foi programado com uma lista de 'palavras de spam'. Em vez disso, foi treinado em milhões de e-mails rotulados como spam ou não spam. Ele aprendeu os padrões por conta própria e agora faz previsões sobre novos e-mails.",
                opcoes: [
                    { texto_btn: "That's a great example!", proximo_id: 2 }
                ]
            },
            {
                id: 7,
                texto_en: "It's complex, but in simple terms, models like DALL-E learn relationships between words and visual patterns from billions of image-text pairs. When you type 'an astronaut riding a horse', it uses that learned knowledge to generate new pixels that match that description, combining the concepts of 'astronaut', 'horse', and 'riding'.",
                texto_pt: "É complexo, mas em termos simples, modelos como o DALL-E aprendem relações entre palavras e padrões visuais a partir de bilhões de pares de imagem-texto. Quando você digita 'um astronauta cavalgando um cavalo', ele usa esse conhecimento aprendido para gerar novos pixels que correspondem a essa descrição, combinando os conceitos de 'astronauta', 'cavalo' e 'cavalgar'.",
                opcoes: [
                    { texto_btn: "So it understands the words?", proximo_id: 11 }
                ]
            },
            {
                id: 8,
                texto_en: "That's a philosophical debate! AI doesn't have intentions or feelings like a human artist. It's a master of pattern recognition and recombination. It creates statistically probable outputs based on its training data. Whether that constitutes 'real' creativity is a question we are still exploring.",
                texto_pt: "Esse é um debate filosófico! A IA não tem intenções ou sentimentos como um artista humano. É uma mestra no reconhecimento e recombinação de padrões. Ela cria resultados estatisticamente prováveis com base em seus dados de treinamento. Se isso constitui criatividade 'real' é uma questão que ainda estamos explorando.",
                opcoes: [
                    { texto_btn: "Deep question. Let's go back.", proximo_id: 1 }
                ]
            },
            {
                id: 9,
                texto_en: "AI Alignment is the research field dedicated to ensuring that advanced AI systems pursue goals that are aligned with human values. The challenge is to make sure an AI understands our intentions and doesn't achieve its goals in a destructive or unintended way. It's about safety.",
                texto_pt: "Alinhamento de IA é o campo de pesquisa dedicado a garantir que sistemas avançados de IA persigam objetivos que estejam alinhados com os valores humanos. O desafio é garantir que uma IA entenda nossas intenções e não atinja seus objetivos de forma destrutiva ou não intencional. É sobre segurança.",
                opcoes: [
                    { texto_btn: "A very important field.", proximo_id: 4 }
                ]
            },
            {
                id: 10,
                texto_en: "AI will certainly transform the job market. It will automate many repetitive tasks, but it will also create new jobs in areas like AI development, data science, and AI ethics. The key will be adapting and learning new skills for a world where humans and AI work together.",
                texto_pt: "A IA certamente transformará o mercado de trabalho. Ela automatizará muitas tarefas repetitivas, mas também criará novos empregos em áreas como desenvolvimento de IA, ciência de dados e ética em IA. A chave será adaptar-se e aprender novas habilidades para um mundo onde humanos e IA trabalham juntos.",
                opcoes: [
                    { texto_btn: "So it's about collaboration.", proximo_id: 4 }
                ]
            },
            {
                id: 11,
                texto_en: "It doesn't 'understand' in the human sense. It maps words to a mathematical space called an 'embedding'. In this space, words with similar meanings are close together. So 'king' - 'man' + 'woman' is mathematically close to 'queen'. It's a powerful statistical association, not consciousness.",
                texto_pt: "Ela não 'entende' no sentido humano. Ela mapeia palavras para um espaço matemático chamado 'embedding'. Nesse espaço, palavras com significados semelhantes estão próximas. Então 'rei' - 'homem' + 'mulher' está matematicamente perto de 'rainha'. É uma associação estatística poderosa, não consciência.",
                opcoes: [
                    { texto_btn: "That's brilliant! Thanks.", proximo_id: 99 }
                ]
            },
            {
                id: 99,
                texto_en: "AI is undoubtedly one of the most powerful technologies ever created. Understanding it is key to shaping a future where it benefits all of humanity. Thanks for this insightful conversation! 🤖💡",
                texto_pt: "A IA é, sem dúvida, uma das tecnologias mais poderosas já criadas. Entendê-la é fundamental para moldar um futuro onde ela beneficie toda a humanidade. Obrigado por esta conversa perspicaz! 🤖💡",
                opcoes: [
                    { texto_btn: "🏠 Voltar ao Menu", proximo_id: 0 },
                    { texto_btn: "🔄 Começar Novamente", proximo_id: 1 }
                ]
            }
        ]
    }
};








// --- ESTADO DA APLICAÇÃO ---
let progress = {
    score: 0,
    speaking: { basic: [], intermediate: [], advanced: [] },
    exercises: [],
    vocabulary: [],
    achievements: [],
    lastChallengeCompleted: null,
    challengesCompleted: 0,
    lastActivityDate: null,
    streak: 0,
    level: 'Iniciante',
    darkMode: false,
    completedQuizzes: [],
    completedConversations: [],
    levelSuggestionShown: { basic: false, intermediate: false }
};

// --- VARIÁVEIS DE CONTROLE E APIs DO NAVEGADOR ---
let currentLevel = '', currentPhraseIndex = 0, currentExerciseIndex = 0, currentQuizIndex = 0;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if(recognition) {
    recognition.lang = 'en-US';
    recognition.interimResults = false;
}
const synth = window.speechSynthesis;
window.synth = synth;
window.recognition = recognition;

// --- LÓGICA DE NAVEGAÇÃO E TELAS ---
const screens = ['home-screen', 'login-screen', 'speaking-screen', 'listening-screen', 'writing-screen', 'progress-screen', 'daily-challenge-screen', 'idioms-screen', 'vocabulary-screen', 'achievements-screen', 'media-quiz-screen', 'culture-screen', 'conversation-screen'];

function showScreen(screenId) {
    // Lista de telas públicas que não exigem login
    const publicScreens = ['home-screen', 'login-screen'];

    // Se o usuário não estiver logado e tentar acessar uma tela protegida...
    if (!currentUser && !publicScreens.includes(screenId)) {
        // ...redirecione para a tela de login.
        showScreen('login-screen');
        return;
    }

    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
        targetScreen.classList.add('fade-in');
    }

    if (screenId === 'progress-screen') updateProgressView();
    if (screenId === 'speaking-screen') {
        document.getElementById('level-selection-speaking').classList.remove('hidden');
        document.getElementById('practice-area-speaking').classList.add('hidden');
    }
    if (screenId === 'writing-screen') loadExercise(currentExerciseIndex);
    if (screenId === 'listening-screen') loadListeningExercise();
    if (screenId === 'idioms-screen') loadIdioms();
    if (screenId === 'daily-challenge-screen') loadDailyChallenge();
    if (screenId === 'vocabulary-screen') loadVocabulary('all');
    if (screenId === 'achievements-screen') loadAchievements();
    if (screenId === 'media-quiz-screen') loadMediaQuiz();
    if (screenId === 'culture-screen') loadCulture();
    if (screenId === 'home-screen') updateHomeScreen();
}

// --- FUNÇÕES DE AUTENTICAÇÃO ---
function toggleAuthForms(event) {
    event.preventDefault();
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleText = document.getElementById('toggle-text');
    const toggleLink = document.getElementById('toggle-link');
    const title = document.getElementById('login-title');

    if (loginForm.classList.contains('hidden')) {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        title.textContent = 'Acessar Conta';
        toggleText.textContent = 'Não tem uma conta?';
        toggleLink.textContent = 'Crie uma agora';
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        title.textContent = 'Criar Conta';
        toggleText.textContent = 'Já tem uma conta?';
        toggleLink.textContent = 'Faça login';
    }
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('auth-error');
    
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('Usuário logado:', userCredential.user);
            errorEl.textContent = '';
            showScreen('home-screen');
        })
        .catch(error => {
            errorEl.textContent = 'E-mail ou senha inválidos.';
        });
}

function handleRegister() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const errorEl = document.getElementById('auth-error');

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('Usuário criado:', userCredential.user);
            errorEl.textContent = '';
            showScreen('home-screen');
        })
        .catch(error => {
            errorEl.textContent = 'Erro ao criar conta. Verifique os dados.';
        });
}

function handleLogout() {
    auth.signOut().then(() => {
        console.log('Usuário deslogado');
        showScreen('home-screen'); // Pode redirecionar para login-screen se preferir
    });
}

// --- DARK MODE ---
function toggleTheme() {
    progress.darkMode = !progress.darkMode;
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    icon.className = progress.darkMode ? 'fas fa-sun' : 'fas fa-moon';
    saveProgress();
}

// --- SISTEMA DE STREAK ---
function updateStreak() {
    const today = getTodayString();
    const yesterday = getYesterdayString();
    
    if (progress.lastActivityDate === today) {
        // Já praticou hoje
        return;
    }
    
    if (progress.lastActivityDate === yesterday) {
        // Manteve o streak
        progress.streak += 1;
    } else if (progress.lastActivityDate === null) {
        // Primeira atividade
        progress.streak = 1;
    } else {
        // Perdeu o streak
        progress.streak = 1;
    }
    
    progress.lastActivityDate = today;
    saveProgress();
    checkAchievements();
}

function getYesterdayString() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
}

// --- SISTEMA DE NÍVEIS ---
function updateLevel() {
    const score = progress.score;
    let newLevel = 'Iniciante';
    
    if (score >= 1000) newLevel = 'Mestre';
    else if (score >= 500) newLevel = 'Avançado';
    else if (score >= 200) newLevel = 'Intermediário';
    else if (score >= 50) newLevel = 'Básico';
    
    if (newLevel !== progress.level) {
        progress.level = newLevel;
        showAchievementPopup('🎉', `Parabéns! Você alcançou o nível ${newLevel}!`);
    }
}

// --- POPUP DE CONQUISTAS ---
function showAchievementPopup(icon, text) {
    const popup = document.getElementById('achievement-popup');
    document.getElementById('achievement-icon').textContent = icon;
    document.getElementById('achievement-text').textContent = text;
    
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 4000);
}

// --- SISTEMA DE CONQUISTAS ---
function checkAchievements() {
    achievements.forEach(achievement => {
        if (progress.achievements.includes(achievement.id)) return;
        
        let unlocked = false;
        const speakingTotal = progress.speaking.basic.length + progress.speaking.intermediate.length + progress.speaking.advanced.length;
        
        switch(achievement.id) {
            case 'first_word':
                unlocked = speakingTotal >= achievement.requirement;
                break;
            case 'speaker':
                unlocked = speakingTotal >= achievement.requirement;
                break;
            case 'listener':
                unlocked = progress.exercises.filter(e => e.startsWith('listening')).length >= achievement.requirement;
                break;
            case 'writer':
                unlocked = progress.exercises.filter(e => e.startsWith('writing')).length >= achievement.requirement;
                break;
            case 'polyglot':
                unlocked = progress.vocabulary.length >= achievement.requirement;
                break;
            case 'streak_3':
            case 'streak_7':
            case 'streak_30':
                unlocked = progress.streak >= achievement.requirement;
                break;
            case 'points_100':
            case 'points_500':
            case 'points_1000':
                unlocked = progress.score >= achievement.requirement;
                break;
            case 'challenge_master':
                unlocked = progress.challengesCompleted >= achievement.requirement;
                break;
        }
        
        if (unlocked) {
            progress.achievements.push(achievement.id);
            showAchievementPopup(achievement.icon, `${achievement.name} desbloqueada!`);
            addPoints(25); // Bônus por conquista
        }
    });
}

 // --- CARREGAR CONQUISTAS ---
 function loadAchievements() {
     const list = document.getElementById('achievements-list');
     list.innerHTML = '';
     
     achievements.forEach(achievement => {
         const unlocked = progress.achievements.includes(achievement.id);
         const card = document.createElement('div');
         card.className = `badge-item card p-6 rounded-2xl text-center ${unlocked ? '' : 'badge-locked'}`;
         card.innerHTML = `
             <div class="text-5xl mb-3">${achievement.icon}</div>
             <h3 class="font-bold text-lg mb-2 ${unlocked ? 'text-yellow-300' : 'text-gray-400'}">${achievement.name}</h3>
             <p class="text-sm opacity-75 ${unlocked ? 'text-gray-200' : 'text-gray-500'}">${achievement.description}</p>
             ${unlocked ? '<div class="mt-3 text-green-400 font-bold"><i class="fas fa-check-circle"></i> Desbloqueada</div>' : '<div class="mt-3 text-gray-500 font-semibold"><i class="fas fa-lock"></i> Bloqueada</div>'}
         `;
         list.appendChild(card);
     });
 }

// --- CARREGAR VOCABULÁRIO ---
function loadVocabulary(category) {
    // Atualizar botões ativos
    document.querySelectorAll('.vocab-category-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-white');
        btn.classList.add('bg-white/80');
    });
    event?.target.classList.remove('bg-white/80');
    event?.target.classList.add('active', 'bg-white');
    
    const list = document.getElementById('vocabulary-list');
    list.innerHTML = '';
    
    let words = [];
    if (category === 'all') {
        Object.values(vocabulary).forEach(cat => words.push(...cat));
    } else {
        words = vocabulary[category] || [];
    }
    
    words.forEach((item, index) => {
        const learned = progress.vocabulary.includes(`${category}-${index}`);
        const card = document.createElement('div');
        card.className = 'vocab-card card p-5 rounded-2xl cursor-pointer';
         card.innerHTML = `
             <div class="vocab-card-inner relative h-48">
                 <div class="vocab-card-front flex flex-col justify-center items-center h-full">
                     <h3 class="text-3xl font-bold text-purple-200 mb-2">${item.word}</h3>
                     <p class="text-sm text-purple-300">${item.phonetic}</p>
                     <p class="text-sm mt-4 text-gray-300">✨ Clique para ver mais</p>
                 </div>
                 <div class="vocab-card-back flex flex-col justify-center items-center h-full p-4">
                     <p class="text-2xl font-bold text-pink-300 mb-3">${item.translation}</p>
                     <p class="text-sm italic mb-2 text-gray-200">"${item.example}"</p>
                     <button onclick="markVocabLearned('${category}', ${index})" class="mt-3 ${learned ? 'bg-green-500' : 'bg-purple-600'} hover:${learned ? 'bg-green-600' : 'bg-purple-700'} text-white px-4 py-2 rounded-lg text-sm transition">
                         ${learned ? '✓ Aprendida' : 'Marcar como Aprendida'}
                     </button>
                 </div>
             </div>
         `;
        card.onclick = function() {
            this.classList.toggle('flipped');
        };
        list.appendChild(card);
    });
}

function markVocabLearned(category, index) {
    event.stopPropagation(); // Prevenir flip do card
    const vocabId = `${category}-${index}`;
    if (!progress.vocabulary.includes(vocabId)) {
        progress.vocabulary.push(vocabId);
        addPoints(5);
        checkAchievements();
        loadVocabulary(category);
    }
}

// --- ATUALIZAR HOME SCREEN ---
function updateHomeScreen() {
    document.getElementById('user-score').textContent = progress.score;
    document.getElementById('user-streak').textContent = progress.streak;
    document.getElementById('user-level').textContent = progress.level;
}

// --- LÓGICA DO DESAFIO DO DIA ---
function getTodayString() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function loadDailyChallenge() {
    const todayStr = getTodayString();
    const challengeContent = document.getElementById('challenge-content');
    const challengeCompleted = document.getElementById('challenge-completed');

    if (progress.lastChallengeCompleted === todayStr) {
        challengeContent.classList.add('hidden');
        challengeCompleted.classList.remove('hidden');
    } else {
        challengeContent.classList.remove('hidden');
        challengeCompleted.classList.add('hidden');
        
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const challenge = dailyChallenges[dayOfYear % dailyChallenges.length];
        
        challengeContent.innerHTML = '';
        challengeContent.dataset.answer = challenge.answer;
        challengeContent.dataset.type = challenge.type;

         let exerciseHTML = `<h3 class="text-xl font-bold text-purple-300">${challenge.topic}</h3><p class="text-gray-200 mb-4">${challenge.explanation}</p>`;
        
        if (challenge.type === 'order-words') {
            const shuffledWords = [...challenge.sentence].sort(() => Math.random() - 0.5);
            exerciseHTML += `<div id="challenge-word-bank" class="flex flex-wrap gap-2 mb-3">${shuffledWords.map(word => `<span class="word-chip bg-gray-200 p-2 rounded-lg">${word}</span>`).join('')}</div><div id="challenge-answer-area" class="min-h-[56px] p-2 border-2 border-dashed border-gray-400 rounded-lg"></div>`;
        } else if (challenge.type === 'listening') {
            window.currentChallengePhrase = challenge.sentence;
            exerciseHTML += `<button onclick="synth.speak(new SpeechSynthesisUtterance(window.currentChallengePhrase))" class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg mb-4"><i class="fas fa-volume-up text-2xl"></i></button><input type="text" id="challenge-input" class="w-full p-2 border-2 border-purple-400 bg-gray-800 text-white rounded-lg focus:border-purple-300 focus:outline-none">`;
         } else if (challenge.type === 'translate') {
              exerciseHTML += `<p class="text-gray-200 mb-2">Traduza: "${challenge.sentence}"</p><input type="text" id="challenge-input" class="w-full p-2 border-2 border-purple-400 bg-gray-800 text-white rounded-lg focus:border-purple-300 focus:outline-none">`;
        }

        challengeContent.innerHTML = exerciseHTML + `<div id="challenge-feedback" class="h-6 mt-4 font-semibold"></div><button onclick="checkChallengeAnswer()" class="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition">Verificar Desafio</button>`;

        if (challenge.type === 'order-words') {
            document.querySelectorAll('#challenge-word-bank .word-chip').forEach(chip => {
                chip.onclick = () => document.getElementById('challenge-answer-area').appendChild(chip);
            });
            document.getElementById('challenge-answer-area').onclick = (e) => {
                if (e.target.classList.contains('word-chip')) {
                    document.getElementById('challenge-word-bank').appendChild(e.target);
                }
            };
        }
    }
}

function checkChallengeAnswer() {
    const content = document.getElementById('challenge-content');
    const feedbackEl = document.getElementById('challenge-feedback');
    const type = content.dataset.type;
    const correctAnswer = content.dataset.answer;
    let userAnswer = '';
    
    if (type === 'order-words') {
        userAnswer = Array.from(document.querySelectorAll('#challenge-answer-area .word-chip')).map(c => c.textContent).join(' ');
    } else {
        userAnswer = document.getElementById('challenge-input').value.trim();
    }

    if (userAnswer.toLowerCase().replace(/[.,!?;]/g, '') === correctAnswer.toLowerCase().replace(/[.,!?;]/g, '')) {
        feedbackEl.textContent = 'Correto! +50 pontos!';
        feedbackEl.style.color = 'green';
        addPoints(50);
        progress.lastChallengeCompleted = getTodayString();
        progress.challengesCompleted += 1;
        updateStreak();
        checkAchievements();
        saveProgress();
        setTimeout(() => showScreen('home-screen'), 1500);
    } else {
        feedbackEl.textContent = 'Incorreto. Tente novamente!';
        feedbackEl.style.color = 'red';
    }
}

 // --- LÓGICA DAS EXPRESSÕES ---
 function loadIdioms() {
     const listEl = document.getElementById('idioms-list');
     listEl.innerHTML = '';
     idioms.forEach(item => {
         const card = document.createElement('div');
         card.className = 'card p-5 rounded-xl';
         card.innerHTML = `
             <h3 class="text-xl font-bold text-purple-200">${item.idiom}</h3>
             <p class="text-gray-200 italic mt-1">"${item.meaning}"</p>
             <div class="mt-3 bg-purple-900 bg-opacity-30 p-3 rounded-lg border border-purple-500 border-opacity-30">
                 <p class="font-semibold text-sm text-purple-300">Exemplo:</p>
                 <p class="text-gray-100">"${item.example_en}"</p>
                 <p class="text-sm text-gray-300">(${item.example_pt})</p>
             </div>
         `;
         listEl.appendChild(card);
     });
 }

// --- LÓGICA DA FALA ---
function startSpeakingPractice(level) {
    currentLevel = level;
    currentPhraseIndex = 0;
    document.getElementById('level-selection-speaking').classList.add('hidden');
    document.getElementById('practice-area-speaking').classList.remove('hidden');
    loadPhrase();
}

function loadPhrase() {
    const phrase = phrases[currentLevel][currentPhraseIndex];
    document.getElementById('phrase-en').textContent = phrase.en;
    document.getElementById('phrase-pt').textContent = phrase.pt;
    document.getElementById('feedback').textContent = '';
    document.getElementById('user-speech').textContent = '';
    document.getElementById('next-phrase-btn').classList.add('hidden');
}

function listenToPhrase() {
    const phrase = phrases[currentLevel][currentPhraseIndex].en;
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = 'en-US';
    synth.speak(utterance);
}

function recordAndCheck() {
    if (!recognition) {
        showInfoModal("Seu navegador não suporta o reconhecimento de voz.");
        return;
    }
    const speakBtn = document.getElementById('speak-btn');
    speakBtn.classList.add('mic-recording');
    document.getElementById('feedback').textContent = 'Ouvindo...';
    
    recognition.start();

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript;
        document.getElementById('user-speech').textContent = `Você disse: "${speechResult}"`;
        checkSpeech(speechResult);
    };

    recognition.onspeechend = function() {
        stopRecordingAnimation();
    };
    
    recognition.onerror = function(event) {
        stopRecordingAnimation();
        document.getElementById('feedback').textContent = 'Erro ou sem fala detectada.';
    };
}

function stopRecordingAnimation() {
    recognition.stop();
    document.getElementById('speak-btn').classList.remove('mic-recording');
}

function checkSpeech(speech) {
    const originalPhrase = phrases[currentLevel][currentPhraseIndex].en;
    const feedbackEl = document.getElementById('feedback');
    
    const normalizedOriginal = originalPhrase.trim().toLowerCase().replace(/[.,!?;]/g, '');
    const normalizedSpeech = speech.trim().toLowerCase().replace(/[.,!?;]/g, '');

    if (normalizedSpeech === normalizedOriginal) {
        feedbackEl.textContent = "Perfeito!";
        feedbackEl.style.color = 'green';
        document.getElementById('next-phrase-btn').classList.remove('hidden');
        updateSpeakingProgress();
        // Verificar se deve sugerir avanço de nível
        checkLevelSuggestion();
    } else {
        feedbackEl.textContent = "Quase lá, tente de novo!";
        feedbackEl.style.color = 'red';
    }
}

function nextPhrase() {
    if (currentPhraseIndex < phrases[currentLevel].length - 1) {
        currentPhraseIndex++;
        loadPhrase();
    } else {
        showInfoModal('Parabéns! Você completou todas as frases deste nível.', () => showScreen('home-screen'));
    }
}

// --- LÓGICA DE AUDIÇÃO ---
function loadListeningExercise() {
    const allPhrases = [...phrases.basic, ...phrases.intermediate, ...phrases.advanced];
    window.currentListeningPhrase = allPhrases[Math.floor(Math.random() * allPhrases.length)];
    document.getElementById('listening-input').value = '';
    document.getElementById('listening-feedback').textContent = '';
    document.getElementById('next-listening-btn').classList.add('hidden');
}

function listenToExercisePhrase() {
    const utterance = new SpeechSynthesisUtterance(window.currentListeningPhrase.en);
    utterance.lang = 'en-US';
    synth.speak(utterance);
}

function checkListeningAnswer() {
    const userAnswer = document.getElementById('listening-input').value.trim().toLowerCase().replace(/[.,!?;]/g, '');
    const correctAnswer = window.currentListeningPhrase.en.trim().toLowerCase().replace(/[.,!?;]/g, '');
    const feedbackEl = document.getElementById('listening-feedback');
    if (userAnswer === correctAnswer) {
        feedbackEl.textContent = 'Correto!';
        feedbackEl.style.color = 'green';
        document.getElementById('next-listening-btn').classList.remove('hidden');
        updateExerciseProgress('listening', window.currentListeningPhrase.en);
    } else {
        feedbackEl.textContent = 'Incorreto. Tente de novo.';
        feedbackEl.style.color = 'red';
    }
}
function nextListeningExercise() {
    loadListeningExercise();
}

// --- LÓGICA DA ESCRITA ---
function loadExercise(index) {
    const exercise = writingExercises[index];
    document.getElementById('topic-title').textContent = exercise.topic;
    document.getElementById('topic-explanation').textContent = exercise.explanation;
    const exerciseArea = document.getElementById('exercise-area');
    exerciseArea.dataset.type = exercise.type;
    
    let exerciseHTML = '';
     if (exercise.type === 'fill-in-blank') {
         const parts = exercise.sentence.split('___');
         exerciseHTML = `<p class="flex flex-wrap items-center gap-2 text-lg text-gray-200">${parts[0]} <input type="text" id="writing-input" class="border-b-2 border-purple-400 bg-gray-800 text-white focus:outline-none focus:border-purple-300 w-24 text-center"> ${parts[1] || ''}</p>`;
     } else if (exercise.type === 'translate') {
         exerciseHTML = `<p class="text-gray-200 mb-2">Traduza: "${exercise.sentence}"</p><input type="text" id="writing-input" class="w-full p-2 border-2 border-purple-400 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-purple-300">`;
    } else if (exercise.type === 'order-words') {
        const shuffledWords = [...exercise.sentence].sort(() => Math.random() - 0.5);
        exerciseHTML = `<p class="text-gray-200 mb-3">Coloque em ordem:</p><div id="word-bank" class="flex flex-wrap gap-2 mb-3">${shuffledWords.map(word => `<span class="word-chip p-2 rounded-lg">${word}</span>`).join('')}</div><div id="answer-area" class="h-14 p-2 border-2 border-dashed border-purple-400 rounded-lg bg-gray-900 bg-opacity-30"></div>`;
    }
    
    if (exercise.options) {
        const shuffledOptions = [...exercise.options].sort(() => Math.random() - 0.5);
        exerciseHTML += `
            <div class="mt-6 pt-4 border-t border-purple-500 border-opacity-30">
                <p class="text-sm text-purple-300 font-semibold mb-2 text-center">💡 Precisa de uma dica? Aqui estão algumas opções:</p>
                <div class="flex justify-center flex-wrap gap-3">
                    ${shuffledOptions.map(opt => `<span class="bg-purple-900 bg-opacity-40 border border-purple-400 border-opacity-40 text-purple-200 py-1 px-3 rounded-full text-sm">${opt}</span>`).join('')}
                </div>
            </div>
        `;
    }

    exerciseArea.innerHTML = exerciseHTML;

    if (exercise.type === 'order-words') {
        document.querySelectorAll('#word-bank .word-chip').forEach(chip => {
            chip.onclick = () => { document.getElementById('answer-area').appendChild(chip); }
        });
        document.getElementById('answer-area').onclick = (e) => {
            if (e.target.classList.contains('word-chip')) {
                document.getElementById('word-bank').appendChild(e.target);
            }
        };
    }
    
    document.getElementById('writing-feedback').textContent = '';
    document.getElementById('next-exercise-btn').classList.add('hidden');
}

function checkWritingAnswer() {
    const exercise = writingExercises[currentExerciseIndex];
    const feedbackEl = document.getElementById('writing-feedback');
    let userAnswerRaw = '';
    if (exercise.type === 'order-words') {
        userAnswerRaw = Array.from(document.querySelectorAll('#answer-area .word-chip')).map(chip => chip.textContent).join(' ');
    } else {
        const inputElement = document.getElementById('writing-input');
        if (inputElement) {
            userAnswerRaw = inputElement.value;
        }
    }

    const normalizedUserAnswer = userAnswerRaw.trim().toLowerCase().replace(/[.,!?;]/g, '');
    const normalizedCorrectAnswer = exercise.answer.trim().toLowerCase().replace(/[.,!?;]/g, '');

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
        feedbackEl.textContent = 'Correto!';
        feedbackEl.style.color = 'green';
        document.getElementById('next-exercise-btn').classList.remove('hidden');
        updateExerciseProgress('writing', currentExerciseIndex);
    } else {
        feedbackEl.textContent = 'Incorreto, tente de novo.';
        feedbackEl.style.color = 'red';
    }
}

function nextExercise() {
    if (currentExerciseIndex < writingExercises.length - 1) {
        currentExerciseIndex++;
        loadExercise(currentExerciseIndex);
    } else {
        showInfoModal('Parabéns! Você completou todos os exercícios de escrita.', () => showScreen('home-screen'));
    }
}

// --- LÓGICA DE PROGRESSO ---
function loadProgress() {
    const savedProgress = localStorage.getItem('fluencyMasterProgress');
    if (savedProgress) {
        const loadedProgress = JSON.parse(savedProgress);
        // Mesclar com valores padrão para campos novos
        progress = {
            score: 0,
            speaking: { basic: [], intermediate: [], advanced: [] },
            exercises: [],
            vocabulary: [],
            achievements: [],
            lastChallengeCompleted: null,
            challengesCompleted: 0,
            lastActivityDate: null,
            streak: 0,
            level: 'Iniciante',
            darkMode: false,
            completedQuizzes: [],
            completedConversations: [],
            levelSuggestionShown: { basic: false, intermediate: false },
            ...loadedProgress
        };
    }
    
    // Aplicar dark mode se salvo
    if (progress.darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').className = 'fas fa-sun';
    }
    
    updateScoreView();
    updateLevel();
}

function saveProgress() {
    localStorage.setItem('fluencyMasterProgress', JSON.stringify(progress));
    updateScoreView();
    updateLevel();
}

function updateScoreView() {
    const scoreEl = document.getElementById('user-score');
    if (scoreEl) scoreEl.textContent = progress.score;
    
    const streakEl = document.getElementById('user-streak');
    if (streakEl) streakEl.textContent = progress.streak;
    
    const levelEl = document.getElementById('user-level');
    if (levelEl) levelEl.textContent = progress.level;
}

function addPoints(points) {
    progress.score += points;
    saveProgress();
}

function updateSpeakingProgress() {
    const phraseIdentifier = `${currentLevel}-${currentPhraseIndex}`;
    if (!progress.speaking[currentLevel].includes(phraseIdentifier)) {
        progress.speaking[currentLevel].push(phraseIdentifier);
        let points = 10;
        if (currentLevel === 'intermediate') points = 20;
        if (currentLevel === 'advanced') points = 30;
        addPoints(points);
        updateStreak();
        checkAchievements();
    }
}

function updateExerciseProgress(type, id) {
    const exerciseId = `${type}-${id}`;
    if (!progress.exercises.includes(exerciseId)) {
        progress.exercises.push(exerciseId);
        addPoints(15);
        updateStreak();
        checkAchievements();
    }
}

function updateProgressView() {
    document.getElementById('progress-score').innerHTML = `<i class="fas fa-star"></i> ${progress.score}`;
    document.getElementById('progress-streak').textContent = progress.streak;
    
    ['basic', 'intermediate', 'advanced'].forEach(level => {
        const total = phrases[level].length;
        const completed = progress.speaking[level].length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        document.getElementById(`${level}-progress-label`).textContent = `${completed}/${total}`;
        document.getElementById(`${level}-progress-bar`).style.width = `${percentage}%`;
    });
    
    document.getElementById('exercises-progress-label').textContent = progress.exercises.length;
    document.getElementById('vocab-progress-label').textContent = progress.vocabulary.length;
}

function handleResetProgress() {
    showConfirmModal("Tem certeza que quer resetar seu progresso?", () => {
        progress = {
            score: 0,
            speaking: {
                basic: [],
                intermediate: [],
                advanced: []
            },
            exercises: [],
            vocabulary: [],
            achievements: [],
            lastChallengeCompleted: null,
            challengesCompleted: 0,
            lastActivityDate: null,
            streak: 0,
            level: 'Iniciante',
            darkMode: progress.darkMode // Manter preferência de tema
        };
        saveProgress();
        updateProgressView();
        updateHomeScreen();
        showInfoModal("Seu progresso foi resetado.");
    });
}

// --- MODAL ---
const modal = document.getElementById('custom-modal');
const modalMessage = document.getElementById('modal-message');
const modalButtons = document.getElementById('modal-buttons');

 function showInfoModal(message, onOk) {
     modalMessage.textContent = message;
     modalMessage.className = 'mb-5 text-lg text-gray-200';
     modalButtons.innerHTML = `<button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded-lg shadow-lg transition transform hover:scale-105">OK</button>`;
    modalButtons.firstElementChild.onclick = () => {
        hideModal();
        if (onOk) onOk();
    };
    modal.classList.remove('hidden');
}

 function showConfirmModal(message, onConfirm) {
     modalMessage.textContent = message;
     modalMessage.className = 'mb-5 text-lg text-gray-200';
     modalButtons.innerHTML = `
         <button id="confirm-btn" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg mr-2 shadow-lg transition transform hover:scale-105">Sim</button>
         <button id="cancel-btn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105">Cancelar</button>
     `;
    document.getElementById('confirm-btn').onclick = () => {
        hideModal();
        onConfirm();
    };
    document.getElementById('cancel-btn').onclick = hideModal;
    modal.classList.remove('hidden');
}

function hideModal() {
    modal.classList.add('hidden');
}

// --- LÓGICA DO MÍDIA QUIZ ---
function loadMediaQuiz() {
    // Seleciona um quiz aleatório que ainda não foi completado, ou qualquer um se todos já foram feitos
    let availableQuizzes = mediaQuizzes.filter(q => !progress.completedQuizzes.includes(q.id));
    if (availableQuizzes.length === 0) {
        availableQuizzes = mediaQuizzes; // Permite refazer se todos já foram completados
    }
    
    currentQuizIndex = mediaQuizzes.indexOf(availableQuizzes[Math.floor(Math.random() * availableQuizzes.length)]);
    const quiz = mediaQuizzes[currentQuizIndex];
    
    // Atualizar título
    document.getElementById('quiz-title').textContent = quiz.title;
    
    // Carregar vídeo do YouTube
    const iframe = document.getElementById('youtube-player');
    iframe.src = `https://www.youtube.com/embed/${quiz.youtubeId}`;
    
    // Gerar perguntas
    const questionsContainer = document.getElementById('quiz-questions');
    questionsContainer.innerHTML = '';
    
    quiz.questions.forEach((q, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'bg-purple-900 bg-opacity-30 p-4 rounded-lg border border-purple-500 border-opacity-30';
        
        let questionHTML = `
            <p class="font-semibold text-purple-200 mb-3">${qIndex + 1}. ${q.question}</p>
            <div class="space-y-2">
        `;
        
        q.options.forEach((option, oIndex) => {
            questionHTML += `
                <label class="flex items-center space-x-2 cursor-pointer hover:bg-purple-800 hover:bg-opacity-30 p-2 rounded transition">
                    <input type="radio" name="question-${qIndex}" value="${oIndex}" class="form-radio text-purple-500">
                    <span class="text-gray-200">${option}</span>
                </label>
            `;
        });
        
        questionHTML += '</div>';
        questionDiv.innerHTML = questionHTML;
        questionsContainer.appendChild(questionDiv);
    });
    
    // Limpar feedback
    document.getElementById('quiz-feedback').textContent = '';
}

function checkQuizAnswers() {
    const quiz = mediaQuizzes[currentQuizIndex];
    const feedbackEl = document.getElementById('quiz-feedback');
    let correctCount = 0;
    let allAnswered = true;
    
    // Verificar cada pergunta
    quiz.questions.forEach((q, qIndex) => {
        const selectedOption = document.querySelector(`input[name="question-${qIndex}"]:checked`);
        if (!selectedOption) {
            allAnswered = false;
        } else if (parseInt(selectedOption.value) === q.correct) {
            correctCount++;
        }
    });
    
    if (!allAnswered) {
        feedbackEl.textContent = 'Por favor, responda todas as perguntas!';
        feedbackEl.style.color = 'orange';
        return;
    }
    
    const totalQuestions = quiz.questions.length;
    
    if (correctCount === totalQuestions) {
        // Todas corretas!
        feedbackEl.textContent = `Perfeito! Você acertou todas as ${totalQuestions} perguntas! +40 pontos! 🎉`;
        feedbackEl.style.color = 'green';
        
        // Adicionar pontos apenas se não completou este quiz antes
        if (!progress.completedQuizzes.includes(quiz.id)) {
            progress.completedQuizzes.push(quiz.id);
            addPoints(40);
            updateStreak();
            checkAchievements();
        } else {
            feedbackEl.textContent += ' (Quiz já completado anteriormente)';
        }
    } else {
        feedbackEl.textContent = `Você acertou ${correctCount} de ${totalQuestions} perguntas. Assista o vídeo novamente e tente!`;
        feedbackEl.style.color = 'orange';
    }
}

// --- LÓGICA DA CULTURA ---
function loadCulture() {
    const cultureList = document.getElementById('culture-list');
    cultureList.innerHTML = '';
    
    cultureTips.forEach(tip => {
        const card = document.createElement('div');
        card.className = 'card p-6 rounded-2xl shadow-xl';
        
        let phrasesHTML = '';
        tip.phrases.forEach(phrase => {
            phrasesHTML += `
                <div class="mb-3 bg-green-900 bg-opacity-20 p-3 rounded-lg border-l-4 border-green-500">
                    <p class="text-white font-semibold">"${phrase.en}"</p>
                    <p class="text-gray-300 text-sm mt-1 italic">${phrase.pt}</p>
                </div>
            `;
        });
        
        card.innerHTML = `
            <div class="flex items-start gap-3 mb-3">
                <div class="text-3xl">🌍</div>
                <h3 class="text-2xl font-bold text-purple-200">${tip.title}</h3>
            </div>
            <p class="text-gray-200 mb-4 italic">${tip.explanation}</p>
            <div class="space-y-2">
                ${phrasesHTML}
            </div>
        `;
        
        cultureList.appendChild(card);
    });
}

// --- SISTEMA DE SUGESTÃO DE NÍVEL ---
function checkLevelSuggestion() {
    // Não fazer nada se já está no nível mais alto
    if (currentLevel === 'advanced') return;
    
    // Determinar qual o próximo nível
    const levelMap = { 'basic': 'intermediate', 'intermediate': 'advanced' };
    const nextLevel = levelMap[currentLevel];
    
    // Verificar se já mostrou a sugestão para este nível
    if (progress.levelSuggestionShown[currentLevel]) return;
    
    // Calcular porcentagem de conclusão
    const totalPhrases = phrases[currentLevel].length;
    const completedPhrases = progress.speaking[currentLevel].length;
    const percentage = (completedPhrases / totalPhrases) * 100;
    
    // Se atingiu 80% ou mais, mostrar sugestão
    if (percentage >= 80) {
        progress.levelSuggestionShown[currentLevel] = true;
        saveProgress();
        
        showLevelSuggestionModal(nextLevel);
    }
}

function showLevelSuggestionModal(nextLevel) {
    const levelNames = {
        'intermediate': 'Intermediário',
        'advanced': 'Avançado'
    };
    
    const modal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalButtons = document.getElementById('modal-buttons');
    
    modalMessage.className = 'mb-5 text-lg text-purple-200';
    modalMessage.innerHTML = `
        <div class="text-5xl mb-3">🎉</div>
        <p class="font-bold text-2xl mb-2">Parabéns!</p>
        <p>Você completou 80% do nível atual!</p>
        <p class="mt-3">Gostaria de experimentar o nível <strong>${levelNames[nextLevel]}</strong>?</p>
    `;
    
    modalButtons.innerHTML = `
        <div class="flex gap-3 justify-center">
            <button id="accept-level-btn" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                Sim, vamos lá!
            </button>
            <button id="decline-level-btn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                Continuar no atual
            </button>
        </div>
    `;
    
    document.getElementById('accept-level-btn').onclick = () => {
        hideModal();
        // Levar para a tela de fala e iniciar o novo nível
        showScreen('speaking-screen');
        setTimeout(() => {
            startSpeakingPractice(nextLevel);
        }, 100);
    };
    
    document.getElementById('decline-level-btn').onclick = () => {
        hideModal();
    };
    
    modal.classList.remove('hidden');
}

// --- LÓGICA DAS CONVERSAS GUIADAS ---
let currentConversationTopic = '';

function startConversation(topic) {
    currentConversationTopic = topic;
    
    // Mostrar a tela de conversa
    showScreen('conversation-screen');
    
    // Configurar título e ícone
    const conversation = guidedConversations[topic];
    document.getElementById('conversation-topic-title').textContent = conversation.title;
    document.getElementById('conversation-topic-icon').textContent = conversation.icon;
    
    // Renderizar o primeiro passo
    renderStep(topic, 1);
}

function completeConversation(topic) {
    // Verificar se já completou esta conversa antes
    if (!progress.completedConversations.includes(topic)) {
        // Adicionar ao array de conversas completadas
        progress.completedConversations.push(topic);
        
        // Dar recompensa de pontos
        addPoints(30);
        
        // Atualizar streak
        updateStreak();
        
        // Verificar conquistas
        checkAchievements();
        
        // Salvar progresso
        saveProgress();
        
        // Mostrar popup de parabéns
        const topicNames = {
            'finance': 'Mercado Financeiro',
            'quantum': 'Física Quântica',
            'ai': 'Inteligência Artificial'
        };
        
        showAchievementPopup('🎓', `Conversa completada: ${topicNames[topic]}! +30 pontos!`);
    }
}

function renderStep(topic, stepId) {
    // Caso especial: voltar ao menu
    if (stepId === 0) {
        showScreen('home-screen');
        return;
    }
    
    const conversation = guidedConversations[topic];
    const step = conversation.steps.find(s => s.id === stepId);
    
    if (!step) {
        console.error(`Passo ${stepId} não encontrado para ${topic}`);
        return;
    }
    
    // Se chegou ao passo final (99), marcar conversa como completa e dar recompensa
    if (stepId === 99) {
        completeConversation(topic);
    }
    
    // Atualizar mensagem do tutor com botão de áudio
    const textEnElement = document.getElementById('conversation-text-en');
    textEnElement.innerHTML = `
        ${step.texto_en}
        <button class="audio-btn ml-3 inline-flex items-center justify-center w-10 h-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition transform hover:scale-110" title="Ouvir em inglês">
            <i class="fas fa-volume-up"></i>
        </button>
    `;
    
    // Adicionar event listener ao botão de áudio
    const audioBtn = textEnElement.querySelector('.audio-btn');
    audioBtn.onclick = (e) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(step.texto_en);
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // Velocidade ligeiramente mais lenta para clareza
        synth.cancel(); // Cancela qualquer fala anterior
        synth.speak(utterance);
    };
    
    document.getElementById('conversation-text-pt').textContent = step.texto_pt;
    
    // Limpar opções anteriores
    const optionsArea = document.getElementById('conversation-options-area');
    optionsArea.innerHTML = '';
    
    // Criar botões para cada opção
    step.opcoes.forEach((opcao, index) => {
        const button = document.createElement('button');
        button.className = 'w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition transform hover:scale-105 text-left flex items-center gap-3';
        
        // Adicionar emoji de acordo com o texto
        let emoji = '💬';
        if (opcao.texto_btn.includes('🏠')) emoji = '';
        else if (opcao.texto_btn.includes('🔄')) emoji = '';
        else emoji = `${String.fromCharCode(65 + index)}.`; // A, B, C, etc.
        
        button.innerHTML = `
            <span class="text-2xl">${emoji}</span>
            <span class="flex-1">${opcao.texto_btn}</span>
            <i class="fas fa-arrow-right"></i>
        `;
        
        button.onclick = () => {
            // Adicionar efeito visual
            button.classList.add('scale-95');
            setTimeout(() => {
                renderStep(topic, opcao.proximo_id);
            }, 200);
        };
        
        optionsArea.appendChild(button);
    });
    
    // Atualizar progresso
    document.getElementById('conversation-progress').textContent = `Passo ${stepId}`;
}

// --- INICIALIZAÇÃO ---
window.onload = () => {
    loadProgress();
    
    // OUVINTE DE AUTENTICAÇÃO
    auth.onAuthStateChanged(user => {
        if (user) {
            // Usuário está logado
            currentUser = user;
            console.log("Estado de autenticação: Logado", user.email);
            // Aqui você pode, por exemplo, mudar um botão de 'Login' para 'Sair'
        } else {
            // Usuário está deslogado
            currentUser = null;
            console.log("Estado de autenticação: Deslogado");
        }
    });
    
    updateHomeScreen();
    checkAchievements();
    showScreen('home-screen');
    
    // Registro do Service Worker para PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(error => {
                console.log('Falha no registro do Service Worker:', error);
            });
    }
};