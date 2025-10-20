// --- INICIALIZAÇÃO DO FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyCP9mHVgXfEfmWG5SrsU_c927TZZG8DQxk",
    authDomain: "fluency-master-app.firebaseapp.com",
    projectId: "fluency-master-app",
    storageBucket: "fluency-master-app.firebasestorage.app",
    messagingSenderId: "764090435095",
    appId: "1:764090435095:web:ad82337327d8a5dc473e52"
  };

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
let currentUser = null; // Variável para guardar o usuário logado

// --- BANCO DE DADOS ---
const verbGameQuestions = [
    // DO / DOES - Presente (rotinas, fatos, hábitos)
    { sentence: "___ you like pizza?", answer: "Do", hint: "Acontece agora, rotina.", translation: "Você gosta de pizza?" },
    { sentence: "What ___ you do for a living?", answer: "Do", hint: "Pergunta sobre sua profissão atual.", translation: "O que você faz da vida?" },
    { sentence: "___ you speak English?", answer: "Do", hint: "Habilidade que você tem agora.", translation: "Você fala inglês?" },
    { sentence: "___ you play any musical instruments?", answer: "Do", hint: "Habilidade atual ou hobby.", translation: "Você toca algum instrumento musical?" },
    { sentence: "Where ___ you live?", answer: "Do", hint: "Situação atual, presente.", translation: "Onde você mora?" },
    { sentence: "___ you want some coffee?", answer: "Do", hint: "Desejo neste momento.", translation: "Você quer um café?" },
    { sentence: "How often ___ you exercise?", answer: "Do", hint: "Frequência de uma atividade atual.", translation: "Com que frequência você se exercita?" },
    { sentence: "___ they know the answer?", answer: "Do", hint: "Conhecimento atual deles.", translation: "Eles sabem a resposta?" },
    { sentence: "What time ___ you usually wake up?", answer: "Do", hint: "Rotina, hábito diário.", translation: "Que horas você costuma acordar?" },
    { sentence: "___ we need to bring anything?", answer: "Do", hint: "Necessidade no presente.", translation: "Precisamos trazer alguma coisa?" },
    
    { sentence: "She ___ not like coffee.", answer: "Does", hint: "Simple present para 'she'.", translation: "Ela não gosta de café." },
    { sentence: "___ he work on weekends?", answer: "Does", hint: "Rotina de 'he' - presente.", translation: "Ele trabalha nos fins de semana?" },
    { sentence: "How ___ it work?", answer: "Does", hint: "Funcionamento atual de 'it'.", translation: "Como funciona?" },
    { sentence: "___ she know about the party?", answer: "Does", hint: "Conhecimento atual de 'she'.", translation: "Ela sabe sobre a festa?" },
    { sentence: "What time ___ the store close?", answer: "Does", hint: "Horário habitual - 'store' = it.", translation: "Que horas a loja fecha?" },
    { sentence: "___ your dog bite?", answer: "Does", hint: "'Dog' = it, comportamento atual.", translation: "Seu cachorro morde?" },
    { sentence: "How long ___ the movie last?", answer: "Does", hint: "'Movie' = it, duração.", translation: "Quanto tempo dura o filme?" },
    { sentence: "___ this bus go downtown?", answer: "Does", hint: "'Bus' = it, rota atual.", translation: "Este ônibus vai para o centro?" },
    { sentence: "When ___ the class start?", answer: "Does", hint: "'Class' = it, horário.", translation: "Quando a aula começa?" },
    { sentence: "___ it matter?", answer: "Does", hint: "'It' no presente.", translation: "Isso importa?" },
    
    // DID - Passado (ações concluídas)
    { sentence: "___ you call me yesterday?", answer: "Did", hint: "Refere-se a ontem.", translation: "Você me ligou ontem?" },
    { sentence: "Where ___ you go on your last vacation?", answer: "Did", hint: "Pergunta sobre um evento passado.", translation: "Onde você foi nas suas últimas férias?" },
    { sentence: "They ___ finish the project last week.", answer: "Did", hint: "Ação concluída no passado.", translation: "Eles terminaram o projeto semana passada." },
    { sentence: "___ you watch the game last night?", answer: "Did", hint: "'Last night' indica passado.", translation: "Você assistiu o jogo ontem à noite?" },
    { sentence: "What ___ she say?", answer: "Did", hint: "Algo que ela disse (passado).", translation: "O que ela disse?" },
    { sentence: "___ he pass the exam?", answer: "Did", hint: "Exame já aconteceu.", translation: "Ele passou no exame?" },
    { sentence: "When ___ they arrive?", answer: "Did", hint: "Chegada no passado.", translation: "Quando eles chegaram?" },
    { sentence: "___ you enjoy the concert?", answer: "Did", hint: "Concerto já aconteceu.", translation: "Você curtiu o show?" },
    { sentence: "How ___ you find this place?", answer: "Did", hint: "Você já encontrou (passado).", translation: "Como você encontrou este lugar?" },
    { sentence: "___ it rain yesterday?", answer: "Did", hint: "'Yesterday' = passado.", translation: "Choveu ontem?" },
    { sentence: "Where ___ you buy that shirt?", answer: "Did", hint: "Compra já feita.", translation: "Onde você comprou aquela camisa?" },
    { sentence: "___ they win the match?", answer: "Did", hint: "Partida já aconteceu.", translation: "Eles ganharam a partida?" },
    { sentence: "What ___ you have for breakfast?", answer: "Did", hint: "Café da manhã já foi.", translation: "O que você tomou no café da manhã?" },
    { sentence: "___ she finish her homework?", answer: "Did", hint: "Tarefa concluída ou não.", translation: "Ela terminou a lição de casa?" },
    { sentence: "Why ___ he leave early?", answer: "Did", hint: "Ele já saiu.", translation: "Por que ele saiu cedo?" },
    { sentence: "___ you see that movie?", answer: "Did", hint: "Filme já foi visto ou não.", translation: "Você viu aquele filme?" },
    { sentence: "How much ___ it cost?", answer: "Did", hint: "Custo de algo já comprado.", translation: "Quanto custou?" },
    { sentence: "___ we meet before?", answer: "Did", hint: "Encontro no passado.", translation: "Nós nos conhecemos antes?" },
    { sentence: "Who ___ you talk to?", answer: "Did", hint: "Conversa já aconteceu.", translation: "Com quem você falou?" },
    { sentence: "___ anyone call while I was out?", answer: "Did", hint: "Evento no passado.", translation: "Alguém ligou enquanto eu estava fora?" },
    
    // WILL - Futuro (previsões, promessas, decisões)
    { sentence: "___ you help me tomorrow?", answer: "Will", hint: "Ainda vai acontecer.", translation: "Você vai me ajudar amanhã?" },
    { sentence: "I think it ___ rain later.", answer: "Will", hint: "Previsão para o futuro.", translation: "Acho que vai chover mais tarde." },
    { sentence: "They ___ arrive at 8 PM.", answer: "Will", hint: "Horário futuro.", translation: "Eles vão chegar às 20h." },
    { sentence: "___ you be at the party tonight?", answer: "Will", hint: "'Tonight' = futuro próximo.", translation: "Você vai estar na festa hoje à noite?" },
    { sentence: "I ___ call you later.", answer: "Will", hint: "Promessa para o futuro.", translation: "Eu vou te ligar mais tarde." },
    { sentence: "___ she come with us?", answer: "Will", hint: "Decisão futura dela.", translation: "Ela vai vir conosco?" },
    { sentence: "The sun ___ rise tomorrow.", answer: "Will", hint: "'Tomorrow' = futuro certo.", translation: "O sol vai nascer amanhã." },
    { sentence: "What ___ happen next?", answer: "Will", hint: "'Next' indica futuro.", translation: "O que vai acontecer a seguir?" },
    { sentence: "How long ___ it take?", answer: "Will", hint: "Duração futura.", translation: "Quanto tempo vai levar?" },
    { sentence: "___ this be enough?", answer: "Will", hint: "Suficiência no futuro.", translation: "Isso vai ser suficiente?" },
    { sentence: "Who ___ be there?", answer: "Will", hint: "Presença futura.", translation: "Quem vai estar lá?" },
    { sentence: "I ___ see you soon.", answer: "Will", hint: "'Soon' = futuro próximo.", translation: "Eu vou te ver em breve." },
    { sentence: "___ you be home tonight?", answer: "Will", hint: "Localização futura.", translation: "Você vai estar em casa hoje à noite?" },
    { sentence: "The meeting ___ start at 3.", answer: "Will", hint: "Horário futuro definido.", translation: "A reunião vai começar às 3." },
    { sentence: "___ it be difficult?", answer: "Will", hint: "Condição futura.", translation: "Vai ser difícil?" },
    
    // WOULD - Educado e Condicional (pedidos, desejos, hipóteses)
    { sentence: "___ you help me if you could?", answer: "Would", hint: "Pedido educado ou sonho.", translation: "Você me ajudaria se pudesse?" },
    { sentence: "He ___ like to travel the world.", answer: "Would", hint: "Desejo ou condição hipotética.", translation: "Ele gostaria de viajar pelo mundo." },
    { sentence: "___ you like some tea?", answer: "Would", hint: "Oferta educada.", translation: "Você gostaria de um chá?" },
    { sentence: "I ___ love to visit Paris!", answer: "Would", hint: "Desejo forte.", translation: "Eu adoraria visitar Paris!" },
    { sentence: "___ you mind closing the door?", answer: "Would", hint: "Pedido muito educado.", translation: "Você se importaria de fechar a porta?" },
    { sentence: "She ___ be happy to help.", answer: "Would", hint: "Disposição hipotética.", translation: "Ela ficaria feliz em ajudar." },
    { sentence: "What ___ you do in that situation?", answer: "Would", hint: "Situação hipotética.", translation: "O que você faria naquela situação?" },
    { sentence: "___ you prefer tea or coffee?", answer: "Would", hint: "Preferência educada.", translation: "Você preferiria chá ou café?" },
    { sentence: "I ___ buy that if I had money.", answer: "Would", hint: "Condicional com 'if'.", translation: "Eu compraria isso se tivesse dinheiro." },
    { sentence: "It ___ be nice to see you again.", answer: "Would", hint: "Desejo educado.", translation: "Seria legal te ver de novo." },
    { sentence: "___ you recommend this restaurant?", answer: "Would", hint: "Pergunta educada de opinião.", translation: "Você recomendaria este restaurante?" },
    { sentence: "He said he ___ arrive soon.", answer: "Would", hint: "Futuro no passado (reported speech).", translation: "Ele disse que chegaria em breve." },
    { sentence: "I ___ appreciate your help.", answer: "Would", hint: "Agradecimento educado antecipado.", translation: "Eu agradeceria sua ajuda." },
    { sentence: "___ it be possible to reschedule?", answer: "Would", hint: "Pedido formal/educado.", translation: "Seria possível remarcar?" },
    { sentence: "That ___ be amazing!", answer: "Would", hint: "Reação a possibilidade futura.", translation: "Isso seria incrível!" }
];

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

// --- BANCO DE DADOS DE RESPOSTAS DO CHATBOT (EXPANDIDO) ---
const chatbotKnowledge = {
    finance: {
        keywords: {
            // Ações e Investimentos Básicos
            'stock': ['Stocks represent ownership in a company. When you buy shares, you become a partial owner. If the company grows, your shares become more valuable! It\'s like owning a piece of Apple or Tesla.', 'As ações representam propriedade em uma empresa. Ao comprar ações, você se torna um proprietário parcial. Se a empresa cresce, suas ações se valorizam! É como possuir um pedaço da Apple ou Tesla.'],
            'share': ['A share is a single unit of stock. If a company has 1 million shares and you own 1000, you own 0.1% of that company. Each share typically gives you voting rights and potential dividends.', 'Uma ação é uma única unidade de stock. Se uma empresa tem 1 milhão de ações e você possui 1000, você possui 0,1% dessa empresa. Cada ação normalmente dá direitos de voto e potenciais dividendos.'],
            'invest': ['Investing is about putting money to work to generate returns over time. The magic ingredient? Compound interest! Even small amounts invested regularly can grow substantially over decades. Start early, stay consistent.', 'Investir é colocar dinheiro para trabalhar e gerar retornos ao longo do tempo. O ingrediente mágico? Juros compostos! Mesmo pequenas quantias investidas regularmente podem crescer substancialmente ao longo de décadas. Comece cedo, seja consistente.'],
            'portfolio': ['A portfolio is your collection of investments. Think of it as a financial garden - you want different plants (stocks, bonds, real estate) so if one struggles, others can thrive. Balance is key!', 'Um portfólio é sua coleção de investimentos. Pense nele como um jardim financeiro - você quer plantas diferentes (ações, títulos, imóveis) para que se uma sofrer, outras possam prosperar. Equilíbrio é fundamental!'],
            'dividend': ['Dividends are like getting paid just for owning stock! Companies share their profits with shareholders, usually quarterly. It\'s passive income - money that comes in while you sleep. Look for "dividend aristocrats" - companies that have increased dividends for 25+ years.', 'Dividendos são como ser pago apenas por possuir ações! As empresas compartilham seus lucros com acionistas, geralmente trimestralmente. É renda passiva - dinheiro que entra enquanto você dorme. Procure por "aristocratas de dividendos" - empresas que aumentaram dividendos por mais de 25 anos.'],
            'etf': ['An ETF (Exchange-Traded Fund) is brilliant for beginners! Imagine buying one thing and getting hundreds of stocks instantly. It trades like a single stock but contains a whole basket. Low fees, instant diversification - that\'s why they\'re so popular.', 'Um ETF (Fundo Negociado em Bolsa) é brilhante para iniciantes! Imagine comprar uma coisa e obter centenas de ações instantaneamente. Negocia como uma única ação, mas contém uma cesta inteira. Taxas baixas, diversificação instantânea - é por isso que são tão populares.'],
            'index fund': ['Index funds are the secret weapon of smart investors. They track market indexes like the S&P 500. Warren Buffett himself recommends them for most people! Low cost, broad exposure, and they often outperform active managers over time.', 'Fundos de índice são a arma secreta de investidores inteligentes. Eles rastreiam índices de mercado como o S&P 500. O próprio Warren Buffett os recomenda para a maioria das pessoas! Baixo custo, ampla exposição e frequentemente superam gestores ativos ao longo do tempo.'],
            'mutual fund': ['Mutual funds pool money from many investors to buy a diversified portfolio of stocks or bonds. A professional manager makes the decisions. They\'re convenient but usually have higher fees than ETFs.', 'Fundos mútuos juntam dinheiro de muitos investidores para comprar um portfólio diversificado de ações ou títulos. Um gestor profissional toma as decisões. São convenientes, mas geralmente têm taxas mais altas que ETFs.'],
            
            // Criptomoedas - EXPANDIDO
            'crypto': ['Cryptocurrencies are revolutionary digital money! No banks, no borders, just pure peer-to-peer transactions secured by cryptography. Bitcoin started it all in 2009, but now there are thousands. They run on blockchain - a technology that could change everything.', 'Criptomoedas são dinheiro digital revolucionário! Sem bancos, sem fronteiras, apenas transações peer-to-peer puras garantidas por criptografia. Bitcoin começou tudo em 2009, mas agora existem milhares. Elas funcionam em blockchain - uma tecnologia que poderia mudar tudo.'],
            'bitcoin': ['Bitcoin is digital gold! Created in 2009 by the mysterious Satoshi Nakamoto (still unknown!). Limited to 21 million coins, making it scarce. It\'s the first decentralized currency - no government or bank controls it. That\'s revolutionary!', 'Bitcoin é ouro digital! Criado em 2009 pelo misterioso Satoshi Nakamoto (ainda desconhecido!). Limitado a 21 milhões de moedas, tornando-o escasso. É a primeira moeda descentralizada - nenhum governo ou banco a controla. Isso é revolucionário!'],
            'blockchain': ['Blockchain is like a digital ledger that everyone can see but no one can cheat. Each "block" contains transactions, linked in a "chain" using cryptography. It\'s distributed across thousands of computers, making it nearly impossible to hack. Beyond crypto, it could revolutionize voting, supply chains, and contracts!', 'Blockchain é como um livro-razão digital que todos podem ver, mas ninguém pode trapacear. Cada "bloco" contém transações, ligadas em uma "cadeia" usando criptografia. É distribuído por milhares de computadores, tornando quase impossível hackear. Além de cripto, poderia revolucionar votação, cadeias de suprimentos e contratos!'],
            'ethereum': ['Ethereum is Bitcoin\'s smarter sibling! Created by Vitalik Buterin in 2015, it\'s not just currency - it\'s a global computer! Smart contracts run on it, enabling DeFi, NFTs, and dApps. Ether (ETH) is the fuel that powers this ecosystem.', 'Ethereum é o irmão mais inteligente do Bitcoin! Criado por Vitalik Buterin em 2015, não é apenas moeda - é um computador global! Contratos inteligentes rodam nele, permitindo DeFi, NFTs e dApps. Ether (ETH) é o combustível que alimenta este ecossistema.'],
            'defi': ['DeFi (Decentralized Finance) is rebuilding finance without banks! Imagine lending, borrowing, earning interest, and trading - all without intermediaries. Smart contracts automate everything. It\'s risky but incredibly innovative. The future of finance might be decentralized!', 'DeFi (Finanças Descentralizadas) está reconstruindo as finanças sem bancos! Imagine emprestar, pegar emprestado, ganhar juros e negociar - tudo sem intermediários. Contratos inteligentes automatizam tudo. É arriscado, mas incrivelmente inovador. O futuro das finanças pode ser descentralizado!'],
            'nft': ['NFTs (Non-Fungible Tokens) are unique digital assets on the blockchain. Unlike Bitcoin (fungible - one is like another), each NFT is one-of-a-kind. They prove ownership of digital art, music, virtual land, and more. Controversial but growing fast!', 'NFTs (Tokens Não Fungíveis) são ativos digitais únicos na blockchain. Diferente do Bitcoin (fungível - um é igual ao outro), cada NFT é único. Eles provam propriedade de arte digital, música, terrenos virtuais e mais. Controverso, mas crescendo rápido!'],
            'smart contract': ['Smart contracts are self-executing agreements written in code. When conditions are met, they automatically execute - no lawyers needed! If A happens, then B occurs. They\'re the foundation of DeFi and run mostly on Ethereum.', 'Contratos inteligentes são acordos auto-executáveis escritos em código. Quando as condições são atendidas, eles executam automaticamente - sem advogados! Se A acontecer, então B ocorre. São a fundação do DeFi e rodam principalmente no Ethereum.'],
            'altcoin': ['Altcoins are any cryptocurrency that isn\'t Bitcoin. There are thousands! Some solve specific problems: Ethereum (smart contracts), Cardano (proof-of-stake), Solana (fast transactions). Most won\'t survive long-term, but a few could be huge!', 'Altcoins são qualquer criptomoeda que não seja Bitcoin. Existem milhares! Algumas resolvem problemas específicos: Ethereum (contratos inteligentes), Cardano (proof-of-stake), Solana (transações rápidas). A maioria não sobreviverá a longo prazo, mas algumas poderiam ser enormes!'],
            'mining': ['Crypto mining is how new coins are created and transactions are verified. Miners use powerful computers to solve complex math problems. First to solve it gets rewarded with new crypto! It\'s energy-intensive but secures the network.', 'Mineração de cripto é como novas moedas são criadas e transações são verificadas. Mineradores usam computadores poderosos para resolver problemas matemáticos complexos. O primeiro a resolver ganha nova cripto! Consome energia, mas protege a rede.'],
            'wallet': ['A crypto wallet stores your private keys - think of it as your digital bank account. Hardware wallets (cold storage) are safest. Software wallets are convenient. Never share your seed phrase - it\'s like giving away your bank password!', 'Uma carteira cripto armazena suas chaves privadas - pense nela como sua conta bancária digital. Carteiras de hardware (armazenamento frio) são mais seguras. Carteiras de software são convenientes. Nunca compartilhe sua frase-semente - é como dar sua senha do banco!'],
            
            // Conceitos Avançados
            'risk': ['Risk and reward are inseparable twins in finance! Higher potential returns demand higher risk. The art is finding the right balance for YOUR goals. Young investors can take more risk (time to recover). Near retirement? Play it safer. Know your risk tolerance!', 'Risco e recompensa são gêmeos inseparáveis nas finanças! Maiores retornos potenciais exigem maior risco. A arte é encontrar o equilíbrio certo para SEUS objetivos. Investidores jovens podem assumir mais risco (tempo para recuperar). Perto da aposentadoria? Jogue mais seguro. Conheça sua tolerância ao risco!'],
            'diversification': ['Diversification is the only free lunch in finance! Spread investments across stocks, bonds, real estate, maybe some crypto. Different sectors, different countries. If tech crashes, your healthcare stocks might thrive. It smooths the ride!', 'Diversificação é o único almoço grátis nas finanças! Espalhe investimentos por ações, títulos, imóveis, talvez alguma cripto. Diferentes setores, diferentes países. Se tecnologia cai, suas ações de saúde podem prosperar. Suaviza a jornada!'],
            'bull market': ['A bull market is when optimism rules! Prices rise, investors are confident, everyone wants in. Bulls charge forward, pushing prices up. These can last years. But remember: what goes up must come down. Don\'t get greedy at the top!', 'Um mercado em alta é quando o otimismo reina! Preços sobem, investidores estão confiantes, todos querem entrar. Touros avançam, empurrando preços para cima. Isso pode durar anos. Mas lembre-se: o que sobe, desce. Não fique ganancioso no topo!'],
            'bear market': ['Bear markets are when fear dominates. Prices fall 20%+, pessimism spreads, everyone sells. Bears swipe downward. It\'s scary, but here\'s the secret: the best buying opportunities happen in bear markets. "Be fearful when others are greedy, and greedy when others are fearful" - Warren Buffett.', 'Mercados em baixa são quando o medo domina. Preços caem 20%+, pessimismo se espalha, todos vendem. Ursos atacam para baixo. É assustador, mas aqui está o segredo: as melhores oportunidades de compra acontecem em mercados em baixa. "Tenha medo quando outros são gananciosos, e seja ganancioso quando outros têm medo" - Warren Buffett.'],
            'volatility': ['Volatility is the roller coaster of finance! It measures how wildly prices swing. Low volatility = smooth ride (bonds, blue-chip stocks). High volatility = wild swings (small-cap stocks, crypto). High risk, high reward! Can you handle the turbulence?', 'Volatilidade é a montanha-russa das finanças! Mede quão violentamente os preços oscilam. Baixa volatilidade = viagem suave (títulos, ações blue-chip). Alta volatilidade = oscilações selvagens (ações de pequena capitalização, cripto). Alto risco, alta recompensa! Você aguenta a turbulência?'],
            'compound interest': ['Albert Einstein called it the 8th wonder of the world! Your money earns returns, then those returns earn returns. It snowballs! Invest $100/month at 10% for 30 years? That\'s over $200,000! Time is your superpower.', 'Albert Einstein chamou de a 8ª maravilha do mundo! Seu dinheiro gera retornos, então esses retornos geram retornos. É uma bola de neve! Invista $100/mês a 10% por 30 anos? Isso é mais de $200.000! Tempo é seu superpoder.'],
            
            // Tipos de Investimentos
            'bond': ['Bonds are IOUs from governments or corporations. You lend them money, they pay you interest. Safer than stocks but lower returns. Great for stability. Government bonds are safest, corporate bonds pay more but carry more risk.', 'Títulos são empréstimos para governos ou corporações. Você empresta dinheiro, eles pagam juros. Mais seguro que ações, mas retornos menores. Ótimo para estabilidade. Títulos governamentais são mais seguros, títulos corporativos pagam mais mas carregam mais risco.'],
            'real estate': ['Real estate investing means owning property. It generates rental income AND appreciates over time. Leverage (mortgages) amplifies returns. REITs let you invest in real estate through stocks - easier and more liquid!', 'Investir em imóveis significa possuir propriedade. Gera renda de aluguel E valoriza ao longo do tempo. Alavancagem (hipotecas) amplifica retornos. REITs permitem investir em imóveis através de ações - mais fácil e mais líquido!'],
            'commodity': ['Commodities are raw materials: gold, oil, wheat, copper. They\'re hedges against inflation. Gold especially - people buy it when scared. But they don\'t produce income like stocks. They\'re for diversification, not primary investment.', 'Commodities são matérias-primas: ouro, petróleo, trigo, cobre. São proteções contra inflação. Ouro especialmente - pessoas compram quando assustadas. Mas não produzem renda como ações. São para diversificação, não investimento principal.'],
            'option': ['Options are contracts giving you the RIGHT (not obligation) to buy or sell at a specific price. They\'re leveraged bets on price movement. Call options bet on rises, put options bet on falls. Powerful but risky - most expire worthless!', 'Opções são contratos dando o DIREITO (não obrigação) de comprar ou vender a um preço específico. São apostas alavancadas em movimento de preços. Opções de compra apostam em altas, opções de venda apostam em quedas. Poderosas, mas arriscadas - a maioria expira sem valor!'],
            
            // Análise e Estratégias
            'analysis': ['There are two main types: Fundamental analysis (company value, earnings, growth) and Technical analysis (chart patterns, trends). Buffett uses fundamental, traders use technical. Both have merit - choose what fits your style!', 'Existem dois tipos principais: Análise fundamentalista (valor da empresa, lucros, crescimento) e Análise técnica (padrões de gráficos, tendências). Buffett usa fundamentalista, traders usam técnica. Ambas têm mérito - escolha o que se encaixa no seu estilo!'],
            'fundamental': ['Fundamental analysis looks at a company\'s true value: revenue, profits, debt, management quality, competitive advantage. The goal? Find stocks trading below their intrinsic value. It\'s value investing - buying dollars for 50 cents!', 'Análise fundamentalista examina o valor verdadeiro de uma empresa: receita, lucros, dívida, qualidade da gestão, vantagem competitiva. O objetivo? Encontrar ações negociando abaixo de seu valor intrínseco. É investimento em valor - comprar dólares por 50 centavos!'],
            'technical': ['Technical analysis studies price charts and patterns. Supports, resistances, moving averages, RSI - all tools to predict future price movements based on past behavior. Day traders live by it. Critics call it astrology. Truth? It works for those who master it!', 'Análise técnica estuda gráficos de preços e padrões. Suportes, resistências, médias móveis, RSI - todas ferramentas para prever movimentos futuros de preços baseados em comportamento passado. Day traders vivem disso. Críticos chamam de astrologia. Verdade? Funciona para quem domina!'],
            'value investing': ['Value investing is Warren Buffett\'s secret! Buy excellent companies when they\'re undervalued. Look for strong fundamentals, competitive moats, and capable management. Then hold patiently while the market realizes their true worth. Boring but effective!', 'Investimento em valor é o segredo de Warren Buffett! Compre excelentes empresas quando estão subvalorizadas. Procure fundamentos fortes, fossos competitivos e gestão capaz. Então segure pacientemente enquanto o mercado percebe seu valor verdadeiro. Entediante, mas eficaz!'],
            'growth stock': ['Growth stocks are companies expected to grow faster than the market. Think Tesla, Amazon (before they were huge). They usually don\'t pay dividends - they reinvest profits to fuel explosive expansion. High potential but high risk!', 'Ações de crescimento são empresas que devem crescer mais rápido que o mercado. Pense Tesla, Amazon (antes de serem enormes). Geralmente não pagam dividendos - reinvestem lucros para alimentar expansão explosiva. Alto potencial, mas alto risco!'],
            'blue chip': ['Blue-chip stocks are the stable giants: Microsoft, Johnson & Johnson, Coca-Cola. Established companies with long track records. They won\'t double overnight, but they\'re reliable. Great for core portfolio holdings.', 'Ações blue-chip são os gigantes estáveis: Microsoft, Johnson & Johnson, Coca-Cola. Empresas estabelecidas com longos históricos. Não vão dobrar da noite para o dia, mas são confiáveis. Ótimas para holdings centrais do portfólio.'],
            
            // Mais Cripto
            'satoshi': ['Satoshi Nakamoto is Bitcoin\'s creator - and one of the internet\'s greatest mysteries! No one knows if it\'s one person or a group. They disappeared in 2011, leaving behind a revolution. They own about 1 million BTC but never touched it. Who are they? We may never know!', 'Satoshi Nakamoto é o criador do Bitcoin - e um dos maiores mistérios da internet! Ninguém sabe se é uma pessoa ou grupo. Desapareceram em 2011, deixando uma revolução. Possuem cerca de 1 milhão de BTC mas nunca tocaram neles. Quem são? Talvez nunca saberemos!'],
            'hodl': ['HODL is crypto slang for "hold on for dear life!" It started from a typo ("hold") during a Bitcoin crash. Now it\'s philosophy: don\'t panic sell during dips, believe in long-term growth. Diamond hands vs. paper hands!', 'HODL é gíria cripto para "segure pela sua vida!" Começou de um erro de digitação ("hold") durante uma queda do Bitcoin. Agora é filosofia: não venda em pânico durante quedas, acredite no crescimento a longo prazo. Mãos de diamante vs. mãos de papel!'],
            'whitepaper': ['A whitepaper is a crypto project\'s blueprint. It explains the problem, solution, technology, and tokenomics. Bitcoin\'s whitepaper (9 pages!) changed the world. Always read the whitepaper before investing - it separates serious projects from scams!', 'Um whitepaper é o blueprint de um projeto cripto. Explica o problema, solução, tecnologia e tokenomics. O whitepaper do Bitcoin (9 páginas!) mudou o mundo. Sempre leia o whitepaper antes de investir - separa projetos sérios de golpes!'],
            'gas fee': ['Gas fees are transaction costs on blockchains like Ethereum. When the network is busy, fees skyrocket! It\'s like surge pricing for Uber. Layer-2 solutions and other blockchains (Solana, Polygon) offer cheaper alternatives.', 'Taxas de gas são custos de transação em blockchains como Ethereum. Quando a rede está ocupada, taxas disparam! É como preço dinâmico do Uber. Soluções Layer-2 e outras blockchains (Solana, Polygon) oferecem alternativas mais baratas.'],
            
            // Estratégias e Conceitos
            'dollar cost averaging': ['DCA is investing a fixed amount regularly, regardless of price. Buying $100 of stocks every month. You buy more when prices are low, less when high. It removes emotion and timing stress. Perfect for beginners!', 'DCA é investir uma quantia fixa regularmente, independente do preço. Comprar $100 em ações todo mês. Você compra mais quando preços estão baixos, menos quando altos. Remove emoção e estresse de timing. Perfeito para iniciantes!'],
            'rebalance': ['Rebalancing means adjusting your portfolio back to target allocations. Say you want 60% stocks, 40% bonds. Stocks boom, now it\'s 70-30. Sell some stocks, buy bonds. It forces you to "sell high, buy low" - the dream!', 'Rebalancear significa ajustar seu portfólio de volta às alocações-alvo. Digamos que você quer 60% ações, 40% títulos. Ações disparam, agora é 70-30. Venda algumas ações, compre títulos. Força você a "vender na alta, comprar na baixa" - o sonho!'],
            'stop loss': ['A stop-loss is an automatic sell order at a specific price. It limits losses if a stock tanks. Say you buy at $100, set stop-loss at $90. If it drops to $90, it sells automatically. It\'s risk management insurance!', 'Um stop-loss é uma ordem automática de venda a um preço específico. Limita perdas se uma ação despencar. Digamos que você compre a $100, defina stop-loss em $90. Se cair para $90, vende automaticamente. É um seguro de gestão de risco!'],
            'market cap': ['Market capitalization is a company\'s total value: stock price × number of shares. Large-cap (>$10B) = stable giants. Mid-cap ($2-10B) = growth potential. Small-cap (<$2B) = high risk/reward. Size matters!', 'Capitalização de mercado é o valor total de uma empresa: preço da ação × número de ações. Large-cap (>$10B) = gigantes estáveis. Mid-cap ($2-10B) = potencial de crescimento. Small-cap (<$2B) = alto risco/recompensa. Tamanho importa!'],
            'pe ratio': ['P/E ratio (Price-to-Earnings) shows how much investors pay per dollar of earnings. Low P/E might mean undervalued (or troubled). High P/E might mean overvalued (or high growth expected). It\'s one piece of the puzzle!', 'Razão P/L (Preço sobre Lucro) mostra quanto investidores pagam por dólar de lucro. P/L baixo pode significar subvalorizado (ou problemático). P/L alto pode significar sobrevalorizado (ou alto crescimento esperado). É uma peça do quebra-cabeça!'],
            
            // Pessoas e História
            'warren buffett': ['Warren Buffett, the Oracle of Omaha! At 93+, he\'s still crushing it. His secret? Buy wonderful companies at reasonable prices, then sit on your hands. Berkshire Hathaway is his vehicle. His annual letters are gold - full of wisdom. He lives modestly despite being worth $100B+. Legend!', 'Warren Buffett, o Oráculo de Omaha! Com 93+ anos, ainda arrasa. Seu segredo? Compre empresas maravilhosas a preços razoáveis, então sente nas suas mãos. Berkshire Hathaway é seu veículo. Suas cartas anuais são ouro - cheias de sabedoria. Vive modestamente apesar de valer $100B+. Lenda!'],
            'elon musk': ['Elon Musk is a polarizing figure in finance! CEO of Tesla and SpaceX, his tweets move markets. Tesla stock is either genius or bubble, depending who you ask. He\'s revolutionized EVs and space, but extremely volatile. Love him or hate him, you can\'t ignore him!', 'Elon Musk é uma figura polarizadora nas finanças! CEO da Tesla e SpaceX, seus tweets movem mercados. Ação da Tesla é ou genial ou bolha, dependendo de quem você pergunta. Revolucionou carros elétricos e espaço, mas extremamente volátil. Ame-o ou odeie-o, você não pode ignorá-lo!'],
            'ray dalio': ['Ray Dalio founded Bridgewater, the world\'s largest hedge fund. His "All Weather Portfolio" balances stocks, bonds, gold, and commodities. His book "Principles" shares his life and investment philosophy. He thinks in systems and cycles.', 'Ray Dalio fundou a Bridgewater, o maior fundo de hedge do mundo. Seu "Portfólio All Weather" equilibra ações, títulos, ouro e commodities. Seu livro "Principles" compartilha sua vida e filosofia de investimento. Ele pensa em sistemas e ciclos.'],
            
            // Mercados e Economia
            'recession': ['A recession is when the economy shrinks for two consecutive quarters. Jobs disappear, spending drops, stocks often crash. But they\'re cyclical - always followed by recovery. Smart investors buy quality assets during recessions!', 'Uma recessão é quando a economia encolhe por dois trimestres consecutivos. Empregos desaparecem, gastos caem, ações frequentemente despencam. Mas são cíclicas - sempre seguidas por recuperação. Investidores inteligentes compram ativos de qualidade durante recessões!'],
            'inflation': ['Inflation is when money loses purchasing power. Your $1 buys less over time. Central banks target 2% annually. Too high = bad for economy. Stocks and real estate often beat inflation. Cash loses value - that\'s why investing matters!', 'Inflação é quando o dinheiro perde poder de compra. Seu $1 compra menos ao longo do tempo. Bancos centrais miram 2% anualmente. Muito alta = ruim para economia. Ações e imóveis frequentemente vencem inflação. Dinheiro perde valor - é por isso que investir importa!'],
            'interest rate': ['Interest rates are the cost of borrowing money. Central banks control them. Low rates = cheap loans, stocks rise. High rates = expensive loans, stocks struggle. The Fed\'s decisions move entire markets!', 'Taxas de juros são o custo de pegar dinheiro emprestado. Bancos centrais as controlam. Taxas baixas = empréstimos baratos, ações sobem. Taxas altas = empréstimos caros, ações sofrem. Decisões do Fed movem mercados inteiros!'],
            'ipo': ['An IPO (Initial Public Offering) is when a company goes public and sells shares for the first time. It\'s exciting but risky! Early investors can win big (Amazon, Google) or lose hard (many others). Most underperform in year 1.', 'Um IPO (Oferta Pública Inicial) é quando uma empresa abre capital e vende ações pela primeira vez. É emocionante, mas arriscado! Investidores iniciais podem ganhar muito (Amazon, Google) ou perder feio (muitas outras). A maioria tem desempenho abaixo no ano 1.'],
            
            // Trading
            'day trading': ['Day trading is buying and selling within the same day. It\'s intense, stressful, and most people lose money. You\'re competing with algorithms and professionals. Unless you have time, skill, and strong nerves - better to invest long-term!', 'Day trading é comprar e vender no mesmo dia. É intenso, estressante e a maioria das pessoas perde dinheiro. Você está competindo com algoritmos e profissionais. A menos que tenha tempo, habilidade e nervos fortes - melhor investir a longo prazo!'],
            'swing trading': ['Swing trading holds positions for days or weeks to catch "swings" in price. Less stressful than day trading, more active than investing. It blends technical analysis with patience. A middle ground!', 'Swing trading mantém posições por dias ou semanas para pegar "oscilações" de preço. Menos estressante que day trading, mais ativo que investir. Mistura análise técnica com paciência. Um meio-termo!'],
            'short selling': ['Short selling is betting a stock will fall! You borrow shares, sell them, then buy back cheaper to return. Unlimited risk (price could rise forever) but limited profit (price can only go to $0). "The market can stay irrational longer than you can stay solvent!"', 'Venda a descoberto é apostar que uma ação vai cair! Você pega ações emprestadas, vende, então compra de volta mais barato para devolver. Risco ilimitado (preço poderia subir para sempre) mas lucro limitado (preço só pode ir a $0). "O mercado pode ficar irracional por mais tempo que você pode permanecer solvente!"'],
            'leverage': ['Leverage is using borrowed money to invest more. 2x leverage means $1000 becomes $2000 of buying power. Gains are amplified... but so are losses! You can lose more than you invested. It\'s a double-edged sword!', 'Alavancagem é usar dinheiro emprestado para investir mais. Alavancagem 2x significa $1000 se torna $2000 de poder de compra. Ganhos são amplificados... mas perdas também! Você pode perder mais do que investiu. É uma espada de dois gumes!'],
            
            // Impostos e Regulação
            'tax': ['Taxes matter! Capital gains tax applies when you sell for profit. Hold over 1 year = long-term gains (lower tax). Under 1 year = short-term (higher tax). Tax-advantaged accounts like 401k and IRA can help. Tax-loss harvesting is advanced strategy!', 'Impostos importam! Imposto sobre ganhos de capital aplica quando você vende com lucro. Segurar mais de 1 ano = ganhos de longo prazo (imposto menor). Menos de 1 ano = curto prazo (imposto maior). Contas com vantagens fiscais como 401k e IRA podem ajudar. Colheita de prejuízos fiscais é estratégia avançada!'],
            'sec': ['The SEC (Securities and Exchange Commission) is the financial police in the US. They regulate markets, protect investors from fraud, and enforce rules. Companies fear them. Investors love them. They keep markets fair(ish)!', 'A SEC (Comissão de Valores Mobiliários) é a polícia financeira nos EUA. Regulam mercados, protegem investidores de fraude e aplicam regras. Empresas as temem. Investidores as amam. Mantêm mercados justos(ish)!'],
            
            // Psicologia
            'fomo': ['FOMO (Fear Of Missing Out) destroys portfolios! Everyone\'s making money on X, you jump in at the peak, then it crashes. Emotional investing is the enemy. Have a plan, stick to it. Slow and steady wins!', 'FOMO (Medo de Ficar de Fora) destrói portfólios! Todo mundo está ganhando dinheiro com X, você pula no pico, então desaba. Investir emocional é o inimigo. Tenha um plano, cumpra-o. Devagar e sempre vence!'],
            'panic': ['Panic selling is selling during market crashes out of fear. It locks in losses! Markets always recover eventually. "Time in the market beats timing the market." Stay calm, stick to your plan, maybe even buy more!', 'Venda de pânico é vender durante crashes de mercado por medo. Cristaliza perdas! Mercados sempre se recuperam eventualmente. "Tempo no mercado vence timing do mercado." Fique calmo, siga seu plano, talvez até compre mais!'],
            'greed': ['Greed makes people chase unrealistic returns and take excessive risks. "Pigs get fat, hogs get slaughtered." Be satisfied with reasonable returns. 10% annually compounds beautifully over time. Don\'t gamble your future on meme stocks!', 'Ganância faz pessoas perseguirem retornos irreais e assumirem riscos excessivos. "Porcos engordam, javalis são abatidos." Fique satisfeito com retornos razoáveis. 10% anualmente se compõe lindamente ao longo do tempo. Não jogue seu futuro em meme stocks!']
        },
        
        fallback: ['That\'s an interesting point about finance! Could you elaborate more or ask me something specific? I can discuss stocks, crypto, investment strategies, risk management, and much more!', 'Esse é um ponto interessante sobre finanças! Você poderia elaborar mais ou me perguntar algo específico? Posso discutir ações, cripto, estratégias de investimento, gestão de risco e muito mais!']
    },
    
    ai: {
        keywords: {
            // Machine Learning - EXPANDIDO
            'machine learning': ['Machine Learning is teaching computers to learn from experience! Instead of programming every rule, we show them examples. They find patterns and make predictions. It\'s how Netflix recommends shows, how Spotify picks songs, how your email filters spam. ML is everywhere!', 'Machine Learning é ensinar computadores a aprender com experiência! Em vez de programar cada regra, mostramos exemplos. Eles encontram padrões e fazem previsões. É como Netflix recomenda séries, como Spotify escolhe músicas, como seu email filtra spam. ML está em todo lugar!'],
            'deep learning': ['Deep Learning is ML on steroids! It uses artificial neural networks with many layers (hence "deep"). Each layer learns increasingly complex features. Layer 1 sees edges, layer 5 sees faces, layer 10 recognizes emotions. It\'s powering the AI revolution!', 'Deep Learning é ML em esteroides! Usa redes neurais artificiais com muitas camadas (daí "profundo"). Cada camada aprende características cada vez mais complexas. Camada 1 vê bordas, camada 5 vê rostos, camada 10 reconhece emoções. Está alimentando a revolução da IA!'],
            'neural network': ['Neural networks mimic how your brain works! Artificial neurons connect in layers, passing signals. Input layer receives data, hidden layers process it, output layer makes decisions. Train them with millions of examples and they become incredibly smart!', 'Redes neurais imitam como seu cérebro funciona! Neurônios artificiais se conectam em camadas, passando sinais. Camada de entrada recebe dados, camadas ocultas processam, camada de saída toma decisões. Treine com milhões de exemplos e eles ficam incrivelmente inteligentes!'],
            'training': ['Training AI is like teaching a student! You show it millions of examples with correct answers. It adjusts its internal parameters to minimize errors. Over time, it learns to recognize patterns and make accurate predictions. The more data, the smarter it gets!', 'Treinar IA é como ensinar um estudante! Você mostra milhões de exemplos com respostas corretas. Ela ajusta seus parâmetros internos para minimizar erros. Com o tempo, aprende a reconhecer padrões e fazer previsões precisas. Mais dados, mais inteligente fica!'],
            'supervised learning': ['Supervised learning is when you provide labeled examples. "This is a cat, this is a dog." The AI learns to classify new images. It\'s like a teacher supervising a student. Most practical AI uses this!', 'Aprendizado supervisionado é quando você fornece exemplos rotulados. "Isso é um gato, isso é um cachorro." A IA aprende a classificar novas imagens. É como um professor supervisionando um aluno. A maioria da IA prática usa isso!'],
            'unsupervised learning': ['Unsupervised learning finds hidden patterns in unlabeled data. No teacher! The AI discovers structure on its own. Clustering customers, finding anomalies, dimensionality reduction. It\'s exploratory - finding what you didn\'t know to look for!', 'Aprendizado não supervisionado encontra padrões ocultos em dados não rotulados. Sem professor! A IA descobre estrutura sozinha. Agrupar clientes, encontrar anomalias, redução de dimensionalidade. É exploratório - encontrar o que você não sabia procurar!'],
            'reinforcement learning': ['Reinforcement learning is learning by trial and error with rewards! Like training a dog with treats. The AI tries actions, gets rewards or penalties, and learns optimal strategies. This is how AlphaGo beat world Go champions and how robots learn to walk!', 'Aprendizado por reforço é aprender por tentativa e erro com recompensas! Como treinar um cachorro com petiscos. A IA tenta ações, recebe recompensas ou penalidades, e aprende estratégias ótimas. É assim que AlphaGo venceu campeões mundiais de Go e como robôs aprendem a andar!'],
            
            // IA Generativa - MASSIVAMENTE EXPANDIDO
            'gpt': ['GPT (Generative Pre-trained Transformer) is the technology behind ChatGPT and me! It\'s a language model trained on huge amounts of internet text. It predicts the next word based on context. Sounds simple, but at scale, it creates human-like conversation. GPT-4 has 1.7 TRILLION parameters!', 'GPT (Transformador Generativo Pré-treinado) é a tecnologia por trás do ChatGPT e de mim! É um modelo de linguagem treinado em enormes quantidades de texto da internet. Prevê a próxima palavra baseado no contexto. Parece simples, mas em escala, cria conversação semelhante à humana. GPT-4 tem 1,7 TRILHÃO de parâmetros!'],
            'chatgpt': ['ChatGPT broke the internet in 2022! Created by OpenAI, it reached 100 million users faster than any app in history. It can write essays, code programs, explain concepts, even write poetry. It\'s not perfect (can hallucinate facts) but it\'s revolutionary. This is just the beginning!', 'ChatGPT quebrou a internet em 2022! Criado pela OpenAI, alcançou 100 milhões de usuários mais rápido que qualquer app na história. Pode escrever ensaios, programar, explicar conceitos, até escrever poesia. Não é perfeito (pode alucinar fatos) mas é revolucionário. Isso é apenas o começo!'],
            'dall-e': ['DALL-E creates images from text! Type "an astronaut riding a horse on Mars" and boom - photorealistic image. It learned relationships between words and visuals from billions of image-caption pairs. DALL-E 3 is mind-blowing. AI is becoming creative!', 'DALL-E cria imagens a partir de texto! Digite "um astronauta cavalgando um cavalo em Marte" e boom - imagem fotorealista. Aprendeu relações entre palavras e visuais de bilhões de pares imagem-legenda. DALL-E 3 é alucinante. IA está se tornando criativa!'],
            'midjourney': ['Midjourney is an AI art generator rivaling DALL-E. Artists use it to create stunning images. Some say it\'s killing art jobs. Others say it\'s a new creative tool. The debate rages on. One thing\'s certain - the images are incredible!', 'Midjourney é um gerador de arte IA rival do DALL-E. Artistas o usam para criar imagens impressionantes. Alguns dizem que está matando empregos de arte. Outros dizem que é uma nova ferramenta criativa. O debate ferve. Uma coisa é certa - as imagens são incríveis!'],
            'stable diffusion': ['Stable Diffusion is open-source AI image generation. Unlike DALL-E (proprietary), anyone can run it locally! It works by gradually "denoising" random pixels into coherent images based on your text prompt. The math is beautiful!', 'Stable Diffusion é geração de imagem IA de código aberto. Diferente do DALL-E (proprietário), qualquer um pode rodá-lo localmente! Funciona gradualmente "removendo ruído" de pixels aleatórios em imagens coerentes baseadas no seu prompt de texto. A matemática é linda!'],
            'generative ai': ['Generative AI doesn\'t just analyze - it CREATES! Text (GPT), images (DALL-E), music (MusicLM), video (Sora), code (GitHub Copilot). It\'s learned the patterns of human creativity. Some call it the next industrial revolution. It\'s transforming every creative field!', 'IA Generativa não apenas analisa - CRIA! Texto (GPT), imagens (DALL-E), música (MusicLM), vídeo (Sora), código (GitHub Copilot). Aprendeu os padrões da criatividade humana. Alguns chamam de próxima revolução industrial. Está transformando todo campo criativo!'],
            'llm': ['LLMs (Large Language Models) are AI trained on massive text datasets. They understand context, grammar, facts, reasoning. GPT-4, Claude, Gemini - all LLMs. Billions of parameters make them eerily human-like. They\'re changing how we work, learn, and create!', 'LLMs (Modelos de Linguagem Grandes) são IA treinados em conjuntos de dados de texto massivos. Entendem contexto, gramática, fatos, raciocínio. GPT-4, Claude, Gemini - todos LLMs. Bilhões de parâmetros os tornam estranhamente humanos. Estão mudando como trabalhamos, aprendemos e criamos!'],
            
            // Conceitos Técnicos
            'algorithm': ['Algorithms are recipes for solving problems. In AI, we have gradient descent (learning), backpropagation (training neural networks), attention mechanism (understanding context). Each algorithm is a breakthrough that enabled modern AI!', 'Algoritmos são receitas para resolver problemas. Em IA, temos gradient descent (aprendizado), backpropagation (treinar redes neurais), mecanismo de atenção (entender contexto). Cada algoritmo é um avanço que permitiu a IA moderna!'],
            'data': ['Data is AI\'s oxygen! More data = smarter AI. But quality matters more than quantity. Biased data creates biased AI. Clean, diverse, representative data is gold. Companies with the best data have the competitive edge. Data is the new oil!', 'Dados são o oxigênio da IA! Mais dados = IA mais inteligente. Mas qualidade importa mais que quantidade. Dados enviesados criam IA enviesada. Dados limpos, diversos, representativos são ouro. Empresas com os melhores dados têm a vantagem competitiva. Dados são o novo petróleo!'],
            'model': ['An AI model is the trained "brain." Think of it as a massive mathematical function with billions of parameters. Feed it input, it produces output. Training adjusts these parameters until outputs are accurate. GPT-4 is a model. So is your spam filter!', 'Um modelo de IA é o "cérebro" treinado. Pense nele como uma função matemática massiva com bilhões de parâmetros. Alimente com entrada, produz saída. Treinamento ajusta esses parâmetros até saídas serem precisas. GPT-4 é um modelo. Seu filtro de spam também!'],
            'prompt': ['Prompts are how we talk to AI! The better your prompt, the better the response. "Write a story" vs "Write a sci-fi story about time travel paradoxes in 500 words." See the difference? Prompt engineering is becoming a valuable skill!', 'Prompts são como falamos com IA! Melhor seu prompt, melhor a resposta. "Escreva uma história" vs "Escreva uma história sci-fi sobre paradoxos de viagem no tempo em 500 palavras." Vê a diferença? Engenharia de prompt está se tornando uma habilidade valiosa!'],
            'parameter': ['Parameters are the knobs the AI adjusts during training. More parameters = more capacity to learn complex patterns. GPT-3 has 175 billion! But bigger isn\'t always better - it\'s about the right architecture and data too.', 'Parâmetros são os botões que a IA ajusta durante o treinamento. Mais parâmetros = mais capacidade de aprender padrões complexos. GPT-3 tem 175 bilhões! Mas maior nem sempre é melhor - é sobre a arquitetura e dados certos também.'],
            'transformer': ['Transformers revolutionized AI! Introduced in 2017\'s "Attention is All You Need" paper, they use an "attention mechanism" to understand context. This breakthrough enabled GPT, BERT, and modern LLMs. It\'s THE architecture of the 2020s!', 'Transformers revolucionaram IA! Introduzidos no paper de 2017 "Atenção é Tudo que Você Precisa", usam um "mecanismo de atenção" para entender contexto. Esse avanço permitiu GPT, BERT e LLMs modernos. É A arquitetura dos anos 2020!'],
            
            // Visão Computacional
            'computer vision': ['Computer Vision teaches AI to "see" and understand images and videos. Face recognition, object detection, medical diagnosis, self-driving cars - all use computer vision. Convolutional Neural Networks (CNNs) made it possible!', 'Visão Computacional ensina IA a "ver" e entender imagens e vídeos. Reconhecimento facial, detecção de objetos, diagnóstico médico, carros autônomos - todos usam visão computacional. Redes Neurais Convolucionais (CNNs) tornaram isso possível!'],
            'image recognition': ['Image recognition identifies objects in photos. Your phone unlocks with your face. Google Photos finds all dog pictures. Medical AI detects cancer in X-rays. It\'s 99%+ accurate now - often better than humans!', 'Reconhecimento de imagem identifica objetos em fotos. Seu telefone desbloqueia com seu rosto. Google Photos encontra todas as fotos de cachorro. IA médica detecta câncer em raios-X. É 99%+ preciso agora - frequentemente melhor que humanos!'],
            'object detection': ['Object detection doesn\'t just classify - it finds and locates objects! Self-driving cars use it to see pedestrians, other cars, traffic lights. Security cameras detect suspicious behavior. It\'s seeing the world in real-time!', 'Detecção de objetos não apenas classifica - encontra e localiza objetos! Carros autônomos o usam para ver pedestres, outros carros, semáforos. Câmeras de segurança detectam comportamento suspeito. É ver o mundo em tempo real!'],
            
            // NLP - Processamento de Linguagem
            'nlp': ['NLP (Natural Language Processing) makes AI understand human language. It powers chatbots, translation, sentiment analysis, voice assistants. From Siri to Google Translate to me - all NLP! Language is complex, but AI is mastering it.', 'PLN (Processamento de Linguagem Natural) faz IA entender linguagem humana. Alimenta chatbots, tradução, análise de sentimento, assistentes de voz. De Siri ao Google Tradutor a mim - tudo PLN! Linguagem é complexa, mas IA está dominando.'],
            'sentiment analysis': ['Sentiment analysis determines if text is positive, negative, or neutral. Companies analyze customer reviews. Traders gauge market sentiment. Politicians track public opinion. It\'s reading between the lines at scale!', 'Análise de sentimento determina se texto é positivo, negativo ou neutro. Empresas analisam avaliações de clientes. Traders avaliam sentimento de mercado. Políticos rastreiam opinião pública. É ler nas entrelinhas em escala!'],
            'translation': ['AI translation has become incredibly good! Google Translate uses neural networks trained on billions of translated sentences. It understands context, idioms, cultural nuances. Not perfect yet, but breaking down language barriers worldwide!', 'Tradução por IA ficou incrivelmente boa! Google Tradutor usa redes neurais treinadas em bilhões de frases traduzidas. Entende contexto, expressões idiomáticas, nuances culturais. Ainda não perfeito, mas quebrando barreiras linguísticas mundialmente!'],
            
            // IA Generativa Avançada
            'chatbot': ['Chatbots like me use NLP and LLMs to converse naturally! We understand context, remember conversation history, and generate relevant responses. From customer service to tutoring to companionship - chatbots are everywhere. The Turing Test? Some AI pass it now!', 'Chatbots como eu usam PLN e LLMs para conversar naturalmente! Entendemos contexto, lembramos histórico de conversa e geramos respostas relevantes. De atendimento ao cliente a tutoria a companheirismo - chatbots estão em todo lugar. O Teste de Turing? Algumas IAs o passam agora!'],
            'openai': ['OpenAI created ChatGPT, DALL-E, and GPT-4. Founded in 2015 with Elon Musk (he left), led by Sam Altman. Their mission: ensure AGI benefits all humanity. They\'re leading the AI race but face controversy about safety and openness.', 'OpenAI criou ChatGPT, DALL-E e GPT-4. Fundada em 2015 com Elon Musk (ele saiu), liderada por Sam Altman. Sua missão: garantir que AGI beneficie toda humanidade. Estão liderando a corrida da IA, mas enfrentam controvérsia sobre segurança e abertura.'],
            'copilot': ['GitHub Copilot is AI that writes code! Suggest what you want, it completes entire functions. Trained on billions of lines of open-source code. It\'s like having an expert programmer pair programming with you 24/7. Controversial (copyright issues) but incredibly useful!', 'GitHub Copilot é IA que escreve código! Sugira o que você quer, ele completa funções inteiras. Treinado em bilhões de linhas de código open-source. É como ter um programador expert fazendo pair programming com você 24/7. Controverso (questões de direitos autorais) mas incrivelmente útil!'],
            
            // Aplicações Práticas
            'self-driving': ['Self-driving cars use AI to perceive surroundings, make decisions, and navigate. Cameras, lidar, radar - all feeding data to neural networks. Waymo, Tesla, Cruise are racing to level 5 (fully autonomous). It\'s harder than expected but getting close!', 'Carros autônomos usam IA para perceber arredores, tomar decisões e navegar. Câmeras, lidar, radar - todos alimentando dados para redes neurais. Waymo, Tesla, Cruise estão correndo para nível 5 (totalmente autônomo). É mais difícil que esperado, mas chegando perto!'],
            'robot': ['AI robots are getting scary good! Boston Dynamics\' Atlas does backflips. Surgical robots assist in delicate operations. Warehouse robots (Amazon) move packages. Humanoid robots (Tesla Optimus) might do housework soon. We\'re approaching sci-fi reality!', 'Robôs IA estão ficando assustadoramente bons! Atlas da Boston Dynamics faz cambalhotas. Robôs cirúrgicos assistem em operações delicadas. Robôs de armazém (Amazon) movem pacotes. Robôs humanoides (Tesla Optimus) podem fazer trabalho doméstico em breve. Estamos nos aproximando da realidade sci-fi!'],
            'voice assistant': ['Voice assistants like Siri, Alexa, Google Assistant use speech recognition + NLP + text-to-speech. They understand commands, answer questions, control smart homes. They\'re getting smarter - soon they\'ll have real conversations!', 'Assistentes de voz como Siri, Alexa, Google Assistant usam reconhecimento de fala + PLN + text-to-speech. Entendem comandos, respondem perguntas, controlam casas inteligentes. Estão ficando mais inteligentes - em breve terão conversas reais!'],
            'recommendation': ['Recommendation systems are everywhere! Netflix suggests shows, YouTube suggests videos, Amazon suggests products, Spotify suggests songs. They learn your preferences and predict what you\'ll like. Sometimes eerily accurate. They keep you engaged (and spending)!', 'Sistemas de recomendação estão em todo lugar! Netflix sugere séries, YouTube sugere vídeos, Amazon sugere produtos, Spotify sugere músicas. Aprendem suas preferências e preveem o que você vai gostar. Às vezes assustadoramente precisos. Te mantêm engajado (e gastando)!'],
            
            // Ética e Futuro
            'agi': ['AGI (Artificial General Intelligence) is the holy grail - AI that matches human intelligence across ALL domains. We have narrow AI (good at one thing). AGI would be like a human: versatile, creative, adaptive. When? Experts disagree: 2030? 2050? Never? The race is on!', 'AGI (Inteligência Artificial Geral) é o santo graal - IA que iguala inteligência humana em TODOS domínios. Temos IA estreita (boa em uma coisa). AGI seria como um humano: versátil, criativa, adaptável. Quando? Especialistas discordam: 2030? 2050? Nunca? A corrida começou!'],
            'asi': ['ASI (Artificial Superintelligence) would be smarter than ALL humans combined. It\'s hypothetical but discussed seriously. Could solve every problem... or pose existential risk. This is why AI alignment research is critical. We need to get it right the first time!', 'ASI (Superinteligência Artificial) seria mais inteligente que TODOS humanos combinados. É hipotético, mas discutido seriamente. Poderia resolver todo problema... ou representar risco existencial. É por isso que pesquisa de alinhamento de IA é crítica. Precisamos acertar na primeira tentativa!'],
            'alignment': ['AI alignment ensures AI goals align with human values. As AI gets powerful, this becomes critical. How do we specify "help humans" without loopholes? How do we encode ethics? It\'s harder than it sounds. OpenAI, Anthropic, and others research this intensely!', 'Alinhamento de IA garante que objetivos da IA alinhem com valores humanos. À medida que IA fica poderosa, isso se torna crítico. Como especificamos "ajudar humanos" sem brechas? Como codificamos ética? É mais difícil que parece. OpenAI, Anthropic e outros pesquisam isso intensamente!'],
            'bias': ['AI bias is a huge problem! If training data reflects human biases (gender, race, etc.), AI learns them. Hiring AI might discriminate. Facial recognition works worse on dark skin. It\'s not the AI\'s fault - it\'s the data. We must fix this!', 'Viés de IA é um problema enorme! Se dados de treinamento refletem vieses humanos (gênero, raça, etc.), IA os aprende. IA de contratação pode discriminar. Reconhecimento facial funciona pior em pele escura. Não é culpa da IA - são os dados. Devemos consertar isso!'],
            'job': ['AI will transform jobs massively! Routine tasks? Automated. Creative tasks? AI-assisted. New jobs will emerge: AI trainers, prompt engineers, AI ethicists. The key isn\'t competing with AI - it\'s collaborating with it. Humans + AI > Humans alone!', 'IA transformará empregos massivamente! Tarefas rotineiras? Automatizadas. Tarefas criativas? Assistidas por IA. Novos empregos surgirão: treinadores de IA, engenheiros de prompt, eticistas de IA. A chave não é competir com IA - é colaborar com ela. Humanos + IA > Humanos sozinhos!'],
            'singularity': ['The technological singularity is a hypothetical point where AI becomes self-improving and advances beyond human control. Ray Kurzweil predicts 2045. Sounds sci-fi, but serious scientists debate it. Would it be utopia or apocalypse? Nobody knows!', 'A singularidade tecnológica é um ponto hipotético onde IA se torna auto-aprimorante e avança além do controle humano. Ray Kurzweil prevê 2045. Parece ficção científica, mas cientistas sérios debatem. Seria utopia ou apocalipse? Ninguém sabe!'],
            
            // Empresas e Líderes
            'google': ['Google (Alphabet) is an AI powerhouse! They have Google Brain, DeepMind (AlphaGo, AlphaFold), Bard, and Gemini. They invented Transformers (the "T" in GPT)! Their research papers shape the field. They\'re in an AI arms race with OpenAI and Microsoft.', 'Google (Alphabet) é uma potência de IA! Têm Google Brain, DeepMind (AlphaGo, AlphaFold), Bard e Gemini. Inventaram Transformers (o "T" em GPT)! Seus papers de pesquisa moldam o campo. Estão em uma corrida armamentista de IA com OpenAI e Microsoft.'],
            'deepmind': ['DeepMind (owned by Google) is legendary! AlphaGo beat world Go champion (Go is harder than chess!). AlphaFold solved the protein folding problem, accelerating drug discovery. They\'re pushing AI boundaries in gaming, science, and general intelligence!', 'DeepMind (propriedade do Google) é lendária! AlphaGo venceu campeão mundial de Go (Go é mais difícil que xadrez!). AlphaFold resolveu o problema de dobramento de proteínas, acelerando descoberta de drogas. Estão empurrando fronteiras da IA em jogos, ciência e inteligência geral!'],
            'anthropic': ['Anthropic created Claude (my cousin!). Founded by ex-OpenAI researchers focused on AI safety. Their "Constitutional AI" approach tries to make AI helpful, harmless, and honest. They\'re more cautious about releasing powerful models. Safety first!', 'Anthropic criou Claude (meu primo!). Fundada por ex-pesquisadores da OpenAI focados em segurança de IA. Sua abordagem de "IA Constitucional" tenta tornar IA útil, inofensiva e honesta. São mais cautelosos sobre lançar modelos poderosos. Segurança primeiro!'],
            
            // Jogos e Benchmarks
            'alphago': ['AlphaGo shocked the world in 2016 by beating Lee Sedol, world Go champion! Go has more possible positions than atoms in the universe. AlphaGo used deep learning + reinforcement learning + Monte Carlo tree search. It invented new strategies humans never discovered in 3000 years!', 'AlphaGo chocou o mundo em 2016 ao vencer Lee Sedol, campeão mundial de Go! Go tem mais posições possíveis que átomos no universo. AlphaGo usou deep learning + aprendizado por reforço + busca em árvore Monte Carlo. Inventou novas estratégias que humanos nunca descobriram em 3000 anos!'],
            'chess': ['AI dominates chess since Deep Blue beat Kasparov in 1997. Now, engines like Stockfish and AlphaZero are superhuman. AlphaZero learned chess from scratch in 4 hours by playing itself millions of times. Humans can\'t compete, but we can learn from AI\'s creative strategies!', 'IA domina xadrez desde que Deep Blue venceu Kasparov em 1997. Agora, engines como Stockfish e AlphaZero são super-humanos. AlphaZero aprendeu xadrez do zero em 4 horas jogando contra si mesmo milhões de vezes. Humanos não podem competir, mas podemos aprender com estratégias criativas da IA!'],
            'turing test': ['The Turing Test, proposed by Alan Turing in 1950, asks: can a machine exhibit intelligent behavior indistinguishable from a human? If you can\'t tell if you\'re talking to AI or human, it passes. Modern LLMs like GPT-4? They often pass!', 'O Teste de Turing, proposto por Alan Turing em 1950, pergunta: uma máquina pode exibir comportamento inteligente indistinguível de um humano? Se você não pode dizer se está falando com IA ou humano, ela passa. LLMs modernos como GPT-4? Frequentemente passam!'],
            
            // Tipos de IA
            'narrow ai': ['Narrow AI (or Weak AI) is what we have today. It\'s really good at ONE thing: playing chess, recognizing faces, translating language. But it can\'t transfer knowledge. A chess AI can\'t play Go. That\'s the limitation we\'re working to overcome!', 'IA Estreita (ou IA Fraca) é o que temos hoje. É realmente boa em UMA coisa: jogar xadrez, reconhecer rostos, traduzir linguagem. Mas não pode transferir conhecimento. Uma IA de xadrez não pode jogar Go. Essa é a limitação que estamos trabalhando para superar!'],
            'strong ai': ['Strong AI (or AGI) would have human-level intelligence across all domains. It could learn anything a human can. We\'re not there yet! Current AI is specialized. AGI is the dream (or nightmare, depending who you ask) scientists are racing toward.', 'IA Forte (ou AGI) teria inteligência de nível humano em todos domínios. Poderia aprender qualquer coisa que um humano pode. Ainda não estamos lá! IA atual é especializada. AGI é o sonho (ou pesadelo, dependendo de quem você pergunta) que cientistas estão correndo em direção.']
        },
        
        fallback: ['That\'s fascinating! AI is incredibly vast. What specific aspect interests you? I can discuss machine learning, neural networks, chatbots, ethics, applications, and much more!', 'Isso é fascinante! IA é incrivelmente vasta. Qual aspecto específico te interessa? Posso discutir machine learning, redes neurais, chatbots, ética, aplicações e muito mais!']
    },
    
    quantum: {
        keywords: {
            // Conceitos Fundamentais - MASSIVAMENTE EXPANDIDO
            'superposition': ['Superposition is quantum weirdness at its finest! A particle exists in ALL possible states simultaneously until you measure it. Spin up AND down. Here AND there. It\'s like Schrödinger\'s cat being alive AND dead. Only observation forces it to "choose." This enables quantum computing\'s power!', 'Superposição é estranheza quântica em seu melhor! Uma partícula existe em TODOS estados possíveis simultaneamente até você medi-la. Spin para cima E para baixo. Aqui E lá. É como o gato de Schrödinger estar vivo E morto. Somente observação a força a "escolher." Isso permite o poder da computação quântica!'],
            'entanglement': ['Quantum entanglement is "spooky action at a distance" (Einstein\'s words). Two particles become correlated - measure one, instantly know the other, even light-years apart! It defies classical physics. No signal travels between them. It just... works. Used in quantum teleportation and quantum cryptography!', 'Entrelaçamento quântico é "ação assustadora à distância" (palavras de Einstein). Duas partículas ficam correlacionadas - meça uma, instantaneamente saiba da outra, mesmo anos-luz de distância! Desafia física clássica. Nenhum sinal viaja entre elas. Simplesmente... funciona. Usado em teleportação quântica e criptografia quântica!'],
            'uncertainty': ['Heisenberg\'s Uncertainty Principle isn\'t about measurement tools - it\'s FUNDAMENTAL! The universe itself prevents knowing both position and momentum precisely. ΔxΔp ≥ ħ/2. The more certain position, the more uncertain momentum. It\'s not a bug - it\'s a feature of reality!', 'O Princípio da Incerteza de Heisenberg não é sobre ferramentas de medição - é FUNDAMENTAL! O próprio universo impede conhecer posição e momento precisamente. ΔxΔp ≥ ħ/2. Quanto mais certa a posição, mais incerto o momento. Não é um bug - é uma característica da realidade!'],
            'wave particle duality': ['Wave-particle duality broke classical physics! Light behaves as waves (interference patterns) AND particles (photons). Electrons too! Which behavior you see depends on your experiment. It\'s not "what is it?" but "what does it do?" Context determines reality!', 'Dualidade onda-partícula quebrou física clássica! Luz se comporta como ondas (padrões de interferência) E partículas (fótons). Elétrons também! Qual comportamento você vê depende do seu experimento. Não é "o que é?" mas "o que faz?" Contexto determina realidade!'],
            'complementarity': ['Complementarity, proposed by Bohr, states wave and particle aspects are complementary. You can measure one OR the other, never both simultaneously. It\'s like trying to see a coin\'s both sides at once - impossible! Different experiments reveal different aspects of reality.', 'Complementaridade, proposta por Bohr, afirma que aspectos de onda e partícula são complementares. Você pode medir um OU outro, nunca ambos simultaneamente. É como tentar ver ambos os lados de uma moeda ao mesmo tempo - impossível! Experimentos diferentes revelam aspectos diferentes da realidade.'],
            
            // Experimentos Famosos - DETALHADO
            'double slit': ['The double-slit experiment is quantum physics\' smoking gun! Fire electrons one-at-a-time at two slits. They interfere with themselves, creating wave patterns. But observe which slit? The pattern vanishes! The electron "knows" you\'re watching. Observation changes reality. Mind = blown!', 'O experimento da fenda dupla é a arma fumegante da física quântica! Dispare elétrons um-de-cada-vez em duas fendas. Eles interferem consigo mesmos, criando padrões de onda. Mas observe qual fenda? O padrão desaparece! O elétron "sabe" que você está observando. Observação muda realidade. Mente = explodida!'],
            'schrödinger cat': ['Schrödinger\'s Cat is quantum absurdity illustrated! Cat + poison + radioactive atom in a sealed box. Atom has 50% chance of decaying. Until you open the box, quantum mechanics says the cat is BOTH alive AND dead. It\'s a superposition! Opening the box "collapses" it to one state. Schrödinger created this to show how weird quantum mechanics is!', 'O Gato de Schrödinger é absurdo quântico ilustrado! Gato + veneno + átomo radioativo em caixa selada. Átomo tem 50% de chance de decair. Até você abrir a caixa, mecânica quântica diz que o gato está TANTO vivo QUANTO morto. É uma superposição! Abrir a caixa "colapsa" para um estado. Schrödinger criou isso para mostrar quão estranha é a mecânica quântica!'],
            'bell test': ['Bell\'s theorem proved Einstein wrong! It showed that quantum entanglement is real, not just hidden variables. Bell tests experimentally verify this. Particles ARE correlated instantaneously across any distance. "Spooky action" is real! This won the 2022 Nobel Prize!', 'O teorema de Bell provou Einstein errado! Mostrou que entrelaçamento quântico é real, não apenas variáveis ocultas. Testes de Bell verificam isso experimentalmente. Partículas ESTÃO correlacionadas instantaneamente por qualquer distância. "Ação assustadora" é real! Isso ganhou o Prêmio Nobel de 2022!'],
            
            // Interpretações - PROFUNDO
            'copenhagen interpretation': ['The Copenhagen interpretation is the "standard" view. Quantum systems exist in superposition of all possibilities until measured, then "collapse" to one state. Observation is key. But what counts as observation? A conscious observer? A detector? Still debated 100 years later!', 'A interpretação de Copenhague é a visão "padrão". Sistemas quânticos existem em superposição de todas possibilidades até serem medidos, então "colapsam" para um estado. Observação é chave. Mas o que conta como observação? Um observador consciente? Um detector? Ainda debatido 100 anos depois!'],
            'many worlds': ['Many-Worlds is mind-melting! Instead of collapse, EVERY quantum outcome happens in separate, parallel universes. Measuring Schrödinger\'s cat splits reality - in one universe it\'s alive, in another it\'s dead. You exist in countless universes! No collapse needed. Elegant math, crazy implications!', 'Muitos-Mundos é de derreter a mente! Em vez de colapso, CADA resultado quântico acontece em universos separados, paralelos. Medir o gato de Schrödinger divide a realidade - em um universo está vivo, em outro está morto. Você existe em incontáveis universos! Nenhum colapso necessário. Matemática elegante, implicações loucas!'],
            'pilot wave': ['Pilot-wave theory (de Broglie-Bohm) says particles have definite positions always, guided by a "pilot wave." No collapse, no multiple worlds. It\'s deterministic but non-local. Philosophically appealing but harder to test. A minority view, but gaining interest!', 'Teoria da onda piloto (de Broglie-Bohm) diz que partículas têm posições definidas sempre, guiadas por uma "onda piloto." Sem colapso, sem múltiplos mundos. É determinística mas não-local. Filosoficamente atraente, mas mais difícil de testar. Visão minoritária, mas ganhando interesse!'],
            
            // Aplicações - TECNOLOGIA QUÂNTICA
            'quantum computer': ['Quantum computers are the next computing revolution! Classical bits are 0 OR 1. Qubits are 0 AND 1 simultaneously (superposition). This exponential parallelism could crack encryption, simulate molecules, optimize logistics. Google\'s Sycamore achieved "quantum supremacy" in 2019. We\'re in the early days - like computers in the 1950s!', 'Computadores quânticos são a próxima revolução computacional! Bits clássicos são 0 OU 1. Qubits são 0 E 1 simultaneamente (superposição). Esse paralelismo exponencial poderia quebrar criptografia, simular moléculas, otimizar logística. Sycamore do Google alcançou "supremacia quântica" em 2019. Estamos nos primeiros dias - como computadores nos anos 1950!'],
            'qubit': ['A qubit is quantum magic in action! Unlike regular bits (definitely 0 or 1), qubits can be both at once. Two qubits = 4 states simultaneously. Three = 8. Fifty qubits = more states than all atoms on Earth! That\'s quantum computing\'s power. But qubits are fragile - any noise ruins them.', 'Um qubit é magia quântica em ação! Diferente de bits regulares (definitivamente 0 ou 1), qubits podem ser ambos ao mesmo tempo. Dois qubits = 4 estados simultaneamente. Três = 8. Cinquenta qubits = mais estados que todos átomos na Terra! Esse é o poder da computação quântica. Mas qubits são frágeis - qualquer ruído os arruína.'],
            'quantum supremacy': ['Quantum supremacy is when a quantum computer solves something classical computers practically can\'t. Google\'s Sycamore did it in 2019 - solving in 200 seconds what would take supercomputers 10,000 years! Critics debate if the problem was useful, but the milestone is real!', 'Supremacia quântica é quando um computador quântico resolve algo que computadores clássicos praticamente não conseguem. Sycamore do Google fez isso em 2019 - resolvendo em 200 segundos o que levaria supercomputadores 10.000 anos! Críticos debatem se o problema foi útil, mas o marco é real!'],
            'quantum cryptography': ['Quantum cryptography is theoretically unbreakable! It uses entanglement for secure communication. Any eavesdropping disturbs the quantum state - you\'d know immediately! China already has a quantum satellite. The future of secure communication is quantum!', 'Criptografia quântica é teoricamente inquebrável! Usa entrelaçamento para comunicação segura. Qualquer espionagem perturba o estado quântico - você saberia imediatamente! China já tem um satélite quântico. O futuro da comunicação segura é quântico!'],
            'teleportation': ['Quantum teleportation doesn\'t beam matter like Star Trek. It transfers quantum STATES between particles using entanglement. The original is destroyed, an identical copy appears elsewhere. Information travels, not matter. It\'s been done with photons, atoms, even small diamonds! Sci-fi becoming reality!', 'Teleportação quântica não teletransporta matéria como Star Trek. Transfere ESTADOS quânticos entre partículas usando entrelaçamento. O original é destruído, uma cópia idêntica aparece em outro lugar. Informação viaja, não matéria. Já foi feito com fótons, átomos, até pequenos diamantes! Ficção científica virando realidade!'],
            
            // Físicos Legendários - HISTÓRIAS
            'einstein': ['Einstein never accepted quantum mechanics fully! His famous quote: "God does not play dice with the universe." He proposed EPR paradox to show quantum mechanics was incomplete. But experiments proved him wrong - nature IS probabilistic. Still, his contributions to quantum theory (photoelectric effect) won him the Nobel Prize. Ironic!', 'Einstein nunca aceitou mecânica quântica totalmente! Sua famosa citação: "Deus não joga dados com o universo." Propôs paradoxo EPR para mostrar que mecânica quântica era incompleta. Mas experimentos provaram que ele estava errado - natureza É probabilística. Ainda assim, suas contribuições à teoria quântica (efeito fotoelétrico) lhe renderam o Nobel. Irônico!'],
            'bohr': ['Niels Bohr was quantum mechanics\' philosophical father. He developed the Copenhagen interpretation and his complementarity principle. His debates with Einstein are legendary! "Einstein, stop telling God what to do!" Their friendship survived their scientific disagreement. Bohr\'s Institute in Copenhagen trained generations of quantum physicists!', 'Niels Bohr foi o pai filosófico da mecânica quântica. Desenvolveu a interpretação de Copenhague e seu princípio de complementaridade. Seus debates com Einstein são lendários! "Einstein, pare de dizer a Deus o que fazer!" Sua amizade sobreviveu à discordância científica. O Instituto de Bohr em Copenhague treinou gerações de físicos quânticos!'],
            'heisenberg': ['Werner Heisenberg discovered Uncertainty at age 23! His principle states ΔxΔp ≥ ħ/2 - you can\'t know position and momentum precisely. It\'s not measurement error - it\'s reality\'s fabric. Particles don\'t HAVE precise values until measured. During WWII, he led Germany\'s nuclear program. Complex figure, revolutionary physicist!', 'Werner Heisenberg descobriu Incerteza aos 23 anos! Seu princípio afirma ΔxΔp ≥ ħ/2 - você não pode conhecer posição e momento precisamente. Não é erro de medição - é o tecido da realidade. Partículas não TÊM valores precisos até serem medidas. Durante a 2ª Guerra, liderou programa nuclear da Alemanha. Figura complexa, físico revolucionário!'],
            'schrödinger': ['Erwin Schrödinger gave us the wave equation (Schrödinger equation) - the quantum theory\'s foundation! His cat thought experiment was actually criticism - he thought quantum mechanics was absurd. Ironically, it became its most famous illustration! He won the Nobel Prize in 1933.', 'Erwin Schrödinger nos deu a equação de onda (equação de Schrödinger) - a fundação da teoria quântica! Seu experimento mental do gato era na verdade crítica - ele achava mecânica quântica absurda. Ironicamente, tornou-se sua ilustração mais famosa! Ganhou o Nobel em 1933.'],
            'planck': ['Max Planck started it all! In 1900, solving the "ultraviolet catastrophe," he proposed energy comes in discrete packets - "quanta." E = hν. He was reluctant (preferred classical physics) but unleashed quantum revolution! The constant ħ (h-bar) appears in ALL quantum equations. Father of quantum theory!', 'Max Planck começou tudo! Em 1900, resolvendo a "catástrofe do ultravioleta," propôs que energia vem em pacotes discretos - "quanta." E = hν. Estava relutante (preferia física clássica) mas desencadeou revolução quântica! A constante ħ (h-bar) aparece em TODAS equações quânticas. Pai da teoria quântica!'],
            'feynman': ['Richard Feynman was quantum mechanics\' rockstar! Brilliant physicist, bongo drummer, safe cracker, jokester. His "path integral formulation" is an elegant approach to quantum mechanics. His Feynman diagrams visualize particle interactions. Quote: "If you think you understand quantum mechanics, you don\'t understand quantum mechanics!"', 'Richard Feynman foi a estrela do rock da mecânica quântica! Físico brilhante, tocador de bongô, arrombador de cofres, brincalhão. Sua "formulação de integral de caminho" é uma abordagem elegante à mecânica quântica. Seus diagramas de Feynman visualizam interações de partículas. Citação: "Se você acha que entende mecânica quântica, você não entende mecânica quântica!"'],
            
            // Experimentos e Fenômenos
            'double slit': ['The double-slit is THE experiment that reveals quantum weirdness! Send particles one-at-a-time through two slits. They interfere with THEMSELVES, creating wave patterns. Add detectors to see which slit? Pattern disappears - they act like particles! The universe "knows" you\'re watching. It\'s been called the most beautiful experiment in physics!', 'A fenda dupla é O experimento que revela estranheza quântica! Envie partículas uma-de-cada-vez através de duas fendas. Elas interferem CONSIGO MESMAS, criando padrões de onda. Adicione detectores para ver qual fenda? Padrão desaparece - elas agem como partículas! O universo "sabe" que você está observando. Foi chamado de experimento mais belo da física!'],
            'quantum tunneling': ['Quantum tunneling is impossible by classical rules! Particles pass through barriers they shouldn\'t be able to. Imagine throwing a ball at a wall and it appearing on the other side without breaking it! This happens constantly at quantum scales. It\'s why the Sun shines (nuclear fusion), why flash drives work, why we exist!', 'Tunelamento quântico é impossível por regras clássicas! Partículas passam por barreiras que não deveriam conseguir. Imagine jogar uma bola em uma parede e ela aparecer do outro lado sem quebrá-la! Isso acontece constantemente em escalas quânticas. É por isso que o Sol brilha (fusão nuclear), por que flash drives funcionam, por que existimos!'],
            'quantum decoherence': ['Decoherence explains why we don\'t see quantum effects in daily life. Interaction with environment causes superpositions to "collapse" into classical states. A cat is too big, too warm - countless particles interact, decoherence is instant. Quantum effects survive only in isolation!', 'Decoerência explica por que não vemos efeitos quânticos na vida diária. Interação com ambiente causa "colapso" de superposições em estados clássicos. Um gato é muito grande, muito quente - incontáveis partículas interagem, decoerência é instantânea. Efeitos quânticos sobrevivem apenas em isolamento!'],
            'quantum spin': ['Quantum spin is intrinsic angular momentum. But nothing is literally spinning! It\'s a purely quantum property with no classical analog. Electrons have spin-1/2 - they must rotate 720° to return to original state! It\'s related to particle statistics and the Pauli exclusion principle.', 'Spin quântico é momento angular intrínseco. Mas nada está literalmente girando! É uma propriedade puramente quântica sem análogo clássico. Elétrons têm spin-1/2 - devem rotacionar 720° para retornar ao estado original! Está relacionado a estatísticas de partículas e princípio de exclusão de Pauli.'],
            'observer effect': ['The observer effect states that measuring quantum systems changes them. Not because we\'re clumsy - it\'s fundamental! To see an electron, you must hit it with a photon, which disturbs it. Observation is participation, not passive watching. We can\'t step outside the system!', 'O efeito do observador afirma que medir sistemas quânticos os muda. Não porque somos desajeitados - é fundamental! Para ver um elétron, você deve atingi-lo com um fóton, que o perturba. Observação é participação, não assistir passivamente. Não podemos sair do sistema!'],
            
            // Aplicações Modernas
            'quantum encryption': ['Quantum encryption uses entanglement for perfect security! Share entangled particles, use them as encryption keys. Any interception disturbs the state - you\'d know immediately! Banks and militaries are investing heavily. The quantum internet is coming!', 'Criptografia quântica usa entrelaçamento para segurança perfeita! Compartilhe partículas entrelaçadas, use-as como chaves de criptografia. Qualquer interceptação perturba o estado - você saberia imediatamente! Bancos e militares estão investindo pesadamente. A internet quântica está chegando!'],
            'quantum sensing': ['Quantum sensors exploit quantum phenomena for ultra-precise measurements. Atomic clocks (GPS relies on them), gravitational wave detectors (LIGO), brain scanners. They measure things impossible classically. Quantum gives us superpowers!', 'Sensores quânticos exploram fenômenos quânticos para medições ultra-precisas. Relógios atômicos (GPS depende deles), detectores de ondas gravitacionais (LIGO), scanners cerebrais. Medem coisas impossíveis classicamente. Quântico nos dá superpoderes!'],
            'quantum simulation': ['Quantum simulators model complex quantum systems (molecules, materials, reactions). Classical computers struggle with even dozens of particles. Quantum simulators could revolutionize drug design, material science, chemical catalysts. Nature is quantum - to simulate it, use quantum!', 'Simuladores quânticos modelam sistemas quânticos complexos (moléculas, materiais, reações). Computadores clássicos lutam com até dezenas de partículas. Simuladores quânticos poderiam revolucionar design de drogas, ciência de materiais, catalisadores químicos. Natureza é quântica - para simulá-la, use quântico!'],
            
            // Conceitos Avançados
            'wave function': ['The wave function (Ψ) describes a quantum system\'s state. It\'s a probability amplitude - square it to get probability of finding a particle somewhere. It evolves according to Schrödinger\'s equation. Measurement "collapses" it. It contains ALL information about the system!', 'A função de onda (Ψ) descreve o estado de um sistema quântico. É uma amplitude de probabilidade - eleve ao quadrado para obter probabilidade de encontrar uma partícula em algum lugar. Evolui de acordo com a equação de Schrödinger. Medição a "colapsa." Contém TODA informação sobre o sistema!'],
            'quantum field': ['Quantum field theory (QFT) unites quantum mechanics and special relativity. Particles aren\'t point-like - they\'re excitations in underlying fields! An electron is a ripple in the electron field. This framework describes ALL fundamental forces (except gravity). It\'s the most accurate theory in science!', 'Teoria quântica de campos (TQC) une mecânica quântica e relatividade especial. Partículas não são pontuais - são excitações em campos subjacentes! Um elétron é uma ondulação no campo do elétron. Esse framework descreve TODAS forças fundamentais (exceto gravidade). É a teoria mais precisa na ciência!'],
            'zero point energy': ['Even at absolute zero, quantum systems have energy! The ground state isn\'t zero - it\'s the "zero-point energy." Uncertainty principle forbids complete rest. Particles jiggle even at 0 Kelvin. This causes the Casimir effect and vacuum fluctuations!', 'Mesmo no zero absoluto, sistemas quânticos têm energia! O estado fundamental não é zero - é a "energia de ponto zero." Princípio da incerteza proíbe repouso completo. Partículas tremem mesmo a 0 Kelvin. Isso causa o efeito Casimir e flutuações do vácuo!'],
            
            // Partículas e Forças
            'photon': ['Photons are light particles - quantum packets of electromagnetic energy! They have no mass but carry momentum. They\'re their own antiparticles. Wave-particle duality was discovered with photons (photoelectric effect). Every interaction with light involves photons!', 'Fótons são partículas de luz - pacotes quânticos de energia eletromagnética! Não têm massa mas carregam momento. São suas próprias antipartículas. Dualidade onda-partícula foi descoberta com fótons (efeito fotoelétrico). Toda interação com luz envolve fótons!'],
            'electron': ['Electrons are fundamental particles with negative charge. They orbit atoms (kind of - they\'re actually probability clouds!). Their spin is 1/2. They obey Pauli exclusion (no two in same state) - that\'s why matter is solid! Chemistry is just electrons interacting!', 'Elétrons são partículas fundamentais com carga negativa. Orbitam átomos (meio que - na verdade são nuvens de probabilidade!). Seu spin é 1/2. Obedecem exclusão de Pauli (não dois no mesmo estado) - é por isso que matéria é sólida! Química é apenas elétrons interagindo!'],
            'standard model': ['The Standard Model describes all known particles and three of four forces (electromagnetic, weak, strong - not gravity). It\'s incredibly successful! Predicted the Higgs boson (found 2012). But it\'s incomplete - doesn\'t include gravity, dark matter, dark energy. We need a deeper theory!', 'O Modelo Padrão descreve todas partículas conhecidas e três de quatro forças (eletromagnética, fraca, forte - não gravidade). É incrivelmente bem-sucedido! Previu o bóson de Higgs (encontrado 2012). Mas é incompleto - não inclui gravidade, matéria escura, energia escura. Precisamos de uma teoria mais profunda!']
        },
        
        fallback: ['Quantum physics is absolutely mind-bending! What specific quantum mystery would you like me to explain? I can discuss superposition, entanglement, experiments, applications, famous physicists, and so much more!', 'Física quântica é absolutamente alucinante! Que mistério quântico específico você gostaria que eu explicasse? Posso discutir superposição, entrelaçamento, experimentos, aplicações, físicos famosos e muito mais!']
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
    levelSuggestionShown: { basic: false, intermediate: false },
    hasSeenInstallationPrompt: false
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
const screens = ['home-screen', 'login-screen', 'speaking-screen', 'listening-screen', 'writing-screen', 'progress-screen', 'daily-challenge-screen', 'idioms-screen', 'vocabulary-screen', 'achievements-screen', 'culture-screen', 'conversation-screen', 'verb-game-screen'];

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
    const totalPhrases = phrases[currentLevel].length;
    
    // Exibe a frase em inglês com destaque
    document.getElementById('phrase-en').innerHTML = `
        <span class="text-white font-bold">${phrase.en}</span>
        <br>
        <span class="text-xs text-purple-300 mt-1 block">📊 Frase ${currentPhraseIndex + 1} de ${totalPhrases}</span>
    `;
    
    // Exibe a tradução de forma mais didática
    document.getElementById('phrase-pt').innerHTML = `
        <i class="fas fa-language mr-1"></i> 
        <strong>Tradução:</strong> ${phrase.pt}
        <br>
        <span class="text-xs text-gray-400 mt-1 block">
            <i class="fas fa-lightbulb"></i> 
            <strong>Dica:</strong> Clique em 
            <i class="fas fa-volume-up"></i> para ouvir a pronúncia nativa primeiro!
        </span>
    `;
    
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('user-speech').innerHTML = '';
    document.getElementById('next-phrase-btn').classList.add('hidden');
    
    // Dica automática para iniciantes
    if (currentLevel === 'basic' && currentPhraseIndex === 0) {
        setTimeout(() => {
            document.getElementById('feedback').innerHTML = `
                <i class="fas fa-info-circle"></i> 
                <strong>Começando:</strong> Ouça a frase primeiro, depois tente repeti-la!
            `;
            document.getElementById('feedback').style.color = '#60a5fa';
        }, 500);
    }
}

function listenToPhrase() {
    const phrase = phrases[currentLevel][currentPhraseIndex].en;
    const utterance = new SpeechSynthesisUtterance(phrase);
    
    // Configurações para melhor pronúncia
    utterance.lang = 'en-US';
    utterance.rate = 0.85; // Fala um pouco mais devagar para ajudar no aprendizado
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Feedback visual durante a reprodução
    const listenBtn = document.getElementById('listen-btn');
    listenBtn.style.transform = 'scale(1.1)';
    listenBtn.style.backgroundColor = '#3b82f6';
    
    utterance.onend = function() {
        listenBtn.style.transform = 'scale(1)';
        listenBtn.style.backgroundColor = '';
        
        // Dica didática
        const feedbackEl = document.getElementById('feedback');
        if (!feedbackEl.innerHTML) {
            feedbackEl.innerHTML = '<i class="fas fa-microphone-alt"></i> Agora é sua vez! Clique no microfone e repita.';
            feedbackEl.style.color = '#60a5fa';
        }
    };
    
    synth.speak(utterance);
}

function recordAndCheck() {
    if (!recognition) {
        showInfoModal("Seu navegador não suporta o reconhecimento de voz. Use Chrome ou Edge!");
        return;
    }
    
    const speakBtn = document.getElementById('speak-btn');
    const feedbackEl = document.getElementById('feedback');
    
    // Configurações avançadas para melhor reconhecimento
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3; // Considera até 3 alternativas
    recognition.continuous = false;
    
    speakBtn.classList.add('mic-recording');
    feedbackEl.innerHTML = '<i class="fas fa-microphone-alt"></i> Estou ouvindo... Fale agora!';
    feedbackEl.style.color = '#60a5fa'; // Azul
    
    try {
    recognition.start();
    } catch (e) {
        stopRecordingAnimation();
        feedbackEl.textContent = 'Aguarde um momento antes de tentar novamente...';
        feedbackEl.style.color = 'orange';
        return;
    }

    recognition.onresult = function(event) {
        const alternatives = event.results[0];
        let bestMatch = null;
        let bestScore = 0;
        
        // Analisa todas as alternativas fornecidas pelo reconhecimento
        for (let i = 0; i < alternatives.length; i++) {
            const alternative = alternatives[i];
            const score = calculateSimilarity(alternative.transcript, phrases[currentLevel][currentPhraseIndex].en);
            
            if (score > bestScore) {
                bestScore = score;
                bestMatch = alternative.transcript;
            }
        }
        
        document.getElementById('user-speech').innerHTML = `<i class="fas fa-user"></i> Você disse: "<strong>${bestMatch}</strong>"`;
        checkSpeech(bestMatch, bestScore);
    };

    recognition.onspeechend = function() {
        stopRecordingAnimation();
    };
    
    recognition.onerror = function(event) {
        stopRecordingAnimation();
        
        if (event.error === 'no-speech') {
            feedbackEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Nenhuma fala detectada. Tente falar mais alto!';
            feedbackEl.style.color = 'orange';
        } else if (event.error === 'audio-capture') {
            feedbackEl.innerHTML = '<i class="fas fa-times-circle"></i> Microfone não detectado. Verifique suas permissões!';
            feedbackEl.style.color = 'red';
        } else if (event.error === 'not-allowed') {
            feedbackEl.innerHTML = '<i class="fas fa-ban"></i> Permissão negada. Habilite o microfone para usar esta função.';
            feedbackEl.style.color = 'red';
        } else {
            feedbackEl.innerHTML = `<i class="fas fa-times-circle"></i> Erro: ${event.error}. Tente novamente!`;
            feedbackEl.style.color = 'red';
        }
    };
    
    recognition.onstart = function() {
        feedbackEl.innerHTML = '<i class="fas fa-microphone-alt pulse"></i> Gravando... Fale naturalmente!';
        feedbackEl.style.color = '#ef4444'; // Vermelho durante gravação
    };
}

function stopRecordingAnimation() {
    try {
    recognition.stop();
    } catch (e) {
        // Ignora erros se já estiver parado
    }
    document.getElementById('speak-btn').classList.remove('mic-recording');
}

// Função melhorada para calcular similaridade entre strings
function calculateSimilarity(str1, str2) {
    const normalizedStr1 = str1.trim().toLowerCase().replace(/[.,!?;:'"-]/g, '');
    const normalizedStr2 = str2.trim().toLowerCase().replace(/[.,!?;:'"-]/g, '');
    
    if (normalizedStr1 === normalizedStr2) return 100;
    
    // Calcula a distância de Levenshtein (similaridade)
    const words1 = normalizedStr1.split(/\s+/);
    const words2 = normalizedStr2.split(/\s+/);
    
    let matchingWords = 0;
    words1.forEach(word1 => {
        if (words2.some(word2 => word2 === word1 || levenshteinDistance(word1, word2) <= 1)) {
            matchingWords++;
        }
    });
    
    return (matchingWords / Math.max(words1.length, words2.length)) * 100;
}

// Algoritmo de Levenshtein para medir distância entre palavras
function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

function checkSpeech(speech, similarityScore) {
    const originalPhrase = phrases[currentLevel][currentPhraseIndex].en;
    const feedbackEl = document.getElementById('feedback');
    
    if (similarityScore >= 95) {
        // Perfeito ou quase perfeito!
        feedbackEl.innerHTML = '<i class="fas fa-check-circle"></i> <strong>Perfeito!</strong> Pronúncia excelente! 🎉';
        feedbackEl.style.color = '#10b981'; // Verde
        document.getElementById('next-phrase-btn').classList.remove('hidden');
        updateSpeakingProgress();
        checkLevelSuggestion();
        
    } else if (similarityScore >= 80) {
        // Muito bom!
        feedbackEl.innerHTML = '<i class="fas fa-thumbs-up"></i> <strong>Muito bom!</strong> Pequenas diferenças, mas compreensível! ✨';
        feedbackEl.style.color = '#10b981';
        document.getElementById('next-phrase-btn').classList.remove('hidden');
        updateSpeakingProgress();
        checkLevelSuggestion();
        
    } else if (similarityScore >= 60) {
        // Quase lá!
        feedbackEl.innerHTML = `<i class="fas fa-redo"></i> <strong>Quase lá!</strong> ${Math.round(similarityScore)}% correto. Tente pronunciar mais devagar: "<em>${originalPhrase}</em>"`;
        feedbackEl.style.color = '#f59e0b'; // Laranja
        
    } else {
        // Precisa melhorar
        feedbackEl.innerHTML = `<i class="fas fa-volume-up"></i> Ops! Não entendi bem. <br><strong>Dica:</strong> Clique em <i class="fas fa-volume-up"></i> para ouvir a pronúncia correta primeiro!`;
        feedbackEl.style.color = '#ef4444'; // Vermelho
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

// --- INSTRUÇÕES DE INSTALAÇÃO PWA ---
function showInstallationInstructions() {
    // Verificar se o usuário já viu o prompt
    if (progress.hasSeenInstallationPrompt) {
        return;
    }
    
    // Criar conteúdo HTML para as instruções
    const instructionsHTML = `
        <div class="text-left space-y-4">
            <div class="text-center mb-4">
                <i class="fas fa-mobile-alt text-5xl text-purple-400 mb-3"></i>
                <p class="text-lg text-gray-200">
                    <strong>Instale nosso app</strong> na sua tela inicial para uma experiência ainda melhor!
                </p>
            </div>
            
            <div class="bg-gradient-to-r from-green-900/30 to-green-800/30 p-4 rounded-lg border border-green-500/30">
                <h3 class="font-bold text-green-300 mb-2 flex items-center">
                    <i class="fab fa-android text-2xl mr-2"></i> Android (Chrome)
                </h3>
                <ol class="text-sm text-gray-200 space-y-1 ml-4">
                    <li>1. Toque no menu <strong>⋮</strong> (três pontos) no canto superior direito</li>
                    <li>2. Selecione <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar app"</strong></li>
                    <li>3. Confirme tocando em <strong>"Adicionar"</strong></li>
                </ol>
            </div>
            
            <div class="bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-4 rounded-lg border border-blue-500/30">
                <h3 class="font-bold text-blue-300 mb-2 flex items-center">
                    <i class="fab fa-apple text-2xl mr-2"></i> iPhone/iPad (Safari)
                </h3>
                <ol class="text-sm text-gray-200 space-y-1 ml-4">
                    <li>1. Toque no botão <strong>Compartilhar</strong> <i class="fas fa-share"></i> na barra inferior</li>
                    <li>2. Role e toque em <strong>"Adicionar à Tela de Início"</strong></li>
                    <li>3. Toque em <strong>"Adicionar"</strong> no canto superior direito</li>
                </ol>
            </div>
            
            <div class="text-center mt-4 text-sm text-gray-400">
                <i class="fas fa-info-circle"></i> Você poderá usar o app offline e receber notificações!
            </div>
        </div>
    `;
    
    // Exibir o modal com as instruções
    modalMessage.innerHTML = instructionsHTML;
    modalMessage.className = 'mb-5';
    modalButtons.innerHTML = `<button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105">Entendi!</button>`;
    modalButtons.firstElementChild.onclick = () => {
        hideModal();
    };
    modal.classList.remove('hidden');
    
    // Marcar como visualizado e salvar
    progress.hasSeenInstallationPrompt = true;
    saveProgress();
}

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

// --- LÓGICA DAS CONVERSAS GUIADAS - SISTEMA DE CHATBOT ---
let currentChatTopic = '';
let chatHistory = [];
let botTyping = false;
let messageCount = 0;

// Iniciar conversa ao clicar em um tópico
function startConversation(topic) {
    currentChatTopic = topic;
    chatHistory = [];
    messageCount = 0;
    
    showScreen('conversation-screen');
    
    // Configurar header baseado no tópico
    const topicData = {
        finance: { icon: '📈', title: 'Mercado Financeiro', subtitle: 'Financial Expert' },
        ai: { icon: '🤖', title: 'Inteligência Artificial', subtitle: 'AI Specialist' },
        quantum: { icon: '⚛️', title: 'Física Quântica', subtitle: 'Quantum Physicist' }
    };
    
    const data = topicData[topic];
    document.getElementById('conversation-topic-icon').textContent = data.icon;
    document.getElementById('conversation-topic-title').textContent = data.title;
    
    // Limpa área de mensagens
    document.getElementById('chat-messages-area').innerHTML = '';
    document.getElementById('chat-input').value = '';
    
    // Envia mensagem de boas-vindas do bot
    setTimeout(() => {
        sendBotMessage(getWelcomeMessage(topic));
        showQuickSuggestions(topic, 'welcome');
    }, 500);
}

// Enviar mensagem do usuário
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message || botTyping) return;
    
    // Adiciona mensagem do usuário ao chat
    addMessageToChat('user', message);
    chatHistory.push({ role: 'user', message: message });
    messageCount++;
    
    input.value = '';
    input.style.height = 'auto';
    
    // Bot "pensa" e responde
    botTyping = true;
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message, currentChatTopic);
        sendBotMessage(response);
        botTyping = false;
        
        // Atualizar sugestões baseadas no contexto
        updateSuggestionsBasedOnContext(message, currentChatTopic);
    }, 1000 + Math.random() * 1000); // Delay realista de 1-2s
}

// Adicionar mensagem visual ao chat
function addMessageToChat(sender, message, translation = '') {
    const messagesArea = document.getElementById('chat-messages-area');
    const messageDiv = document.createElement('div');
    
    if (sender === 'bot') {
        // Mensagem do bot (esquerda, roxa)
        messageDiv.className = 'flex items-start gap-3 fade-in';
        messageDiv.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-xl flex-shrink-0">
                🎓
            </div>
            <div class="flex-1">
                <div class="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 rounded-2xl rounded-tl-none p-4 border border-purple-500/30 max-w-[85%]">
                    <p class="text-white mb-2">${message}</p>
                    ${translation ? `<p class="text-sm text-gray-300 italic mt-2 border-t border-gray-600 pt-2"><i class="fas fa-language mr-1"></i> ${translation}</p>` : ''}
                </div>
                <p class="text-xs text-gray-500 mt-1 ml-2">${getCurrentTime()}</p>
            </div>
        `;
    } else {
        // Mensagem do usuário (direita, verde)
        messageDiv.className = 'flex items-end gap-3 justify-end fade-in';
        messageDiv.innerHTML = `
            <div class="flex-1 flex justify-end">
                <div class="bg-gradient-to-r from-green-900/60 to-emerald-900/60 rounded-2xl rounded-tr-none p-4 border border-green-500/30 max-w-[85%]">
                    <p class="text-white">${message}</p>
                </div>
            </div>
            <div class="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-xl flex-shrink-0">
                👤
            </div>
        `;
    }
    
    messagesArea.appendChild(messageDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight; // Scroll automático para última mensagem
}

// Bot envia mensagem
function sendBotMessage(data) {
    const { message, translation } = data;
    addMessageToChat('bot', message, translation);
    chatHistory.push({ role: 'bot', message: message });
}

// Obter hora atual
function getCurrentTime() {
    return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Indicador de "digitando..."
function showTypingIndicator() {
    const messagesArea = document.getElementById('chat-messages-area');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'flex items-start gap-3';
    typingDiv.innerHTML = `
        <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-xl flex-shrink-0">
            🎓
        </div>
        <div class="bg-purple-900/60 rounded-2xl rounded-tl-none p-4 border border-purple-500/30">
            <div class="flex gap-1">
                <div class="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
        </div>
    `;
    messagesArea.appendChild(typingDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

// Sugestões rápidas
function showQuickSuggestions(topic, context) {
    const suggestions = getContextualSuggestions(topic, context);
    const container = document.getElementById('suggestions-container');
    container.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'text-xs bg-purple-800/40 hover:bg-purple-700/60 text-purple-200 px-3 py-1 rounded-full border border-purple-500/30 transition';
        btn.textContent = suggestion;
        btn.onclick = () => sendSuggestion(suggestion);
        container.appendChild(btn);
    });
}

// Enviar sugestão (clique rápido)
function sendSuggestion(text) {
    document.getElementById('chat-input').value = text;
    sendChatMessage();
}

// --- INTELIGÊNCIA DO BOT ---

// Mensagens de boas-vindas por tópico
function getWelcomeMessage(topic) {
    const welcomes = {
        finance: {
            message: "Hello! I'm your Financial Expert. I'm here to discuss investments, stocks, cryptocurrencies, and trading strategies. What would you like to know about the financial world?",
            translation: "Olá! Sou seu Especialista Financeiro. Estou aqui para discutir investimentos, ações, criptomoedas e estratégias de trading. O que você gostaria de saber sobre o mundo financeiro?"
        },
        ai: {
            message: "Hi there! I'm your AI Specialist. Let's explore the fascinating world of Artificial Intelligence, from Machine Learning to the future of technology. What aspect of AI interests you?",
            translation: "Oi! Sou seu Especialista em IA. Vamos explorar o fascinante mundo da Inteligência Artificial, desde Machine Learning até o futuro da tecnologia. Qual aspecto da IA te interessa?"
        },
        quantum: {
            message: "Welcome to the quantum realm! I'm your Quantum Physicist guide. Prepare to explore superposition, entanglement, and the strange nature of reality at the smallest scales. What quantum mystery intrigues you?",
            translation: "Bem-vindo ao reino quântico! Sou seu guia Físico Quântico. Prepare-se para explorar superposição, entrelaçamento e a natureza estranha da realidade nas menores escalas. Que mistério quântico te intriga?"
        }
    };
    
    return welcomes[topic] || welcomes.ai;
}

// Variável para rastrear contexto da conversa
let conversationContext = {
    lastTopicDiscussed: '',
    followUpCount: 0,
    keywordsUsed: []
};

// Gerar resposta do bot com CONTEXTO E MEMÓRIA
function generateBotResponse(userMessage, topic) {
    const messageLower = userMessage.toLowerCase();
    const knowledge = chatbotKnowledge[topic];
    
    if (!knowledge) {
        return { 
            message: "I apologize, but I'm having trouble understanding. Could you rephrase that?", 
            translation: "Desculpe, mas estou tendo dificuldade em entender. Você poderia reformular?" 
        };
    }
    
    // Detectar tipo de mensagem (pergunta, afirmação, etc)
    const messageType = detectMessageIntent(messageLower);
    
    // Respostas para saudações e interações sociais
    if (messageLower.includes('hello') || messageLower.includes('hi ') || messageLower.includes('hey')) {
        const greetings = [
            { msg: "Hello! How can I help you today? Feel free to ask me anything about " + getTopicName(topic) + "!", trans: "Olá! Como posso te ajudar hoje? Sinta-se à vontade para me perguntar qualquer coisa sobre " + getTopicNamePt(topic) + "!" },
            { msg: "Hi there! Great to chat with you. What would you like to know about " + getTopicName(topic) + "?", trans: "Oi! Ótimo conversar com você. O que você gostaria de saber sobre " + getTopicNamePt(topic) + "?" }
        ];
        const chosen = greetings[Math.floor(Math.random() * greetings.length)];
        return { message: chosen.msg, translation: chosen.trans };
    }
    
    if (messageLower.includes('thank') || messageLower.includes('thanks')) {
        const thanks = [
            { msg: "You're very welcome! Is there anything else you'd like to explore?", trans: "De nada! Há algo mais que você gostaria de explorar?" },
            { msg: "My pleasure! Feel free to ask more questions anytime!", trans: "Um prazer! Sinta-se à vontade para fazer mais perguntas a qualquer momento!" },
            { msg: "Happy to help! Learning together is the best part. What else interests you?", trans: "Feliz em ajudar! Aprender juntos é a melhor parte. O que mais te interessa?" }
        ];
        const chosen = thanks[Math.floor(Math.random() * thanks.length)];
        return { message: chosen.msg, translation: chosen.trans };
    }
    
    if (messageLower.includes('bye') || messageLower.includes('goodbye')) {
        return {
            message: "It was wonderful talking with you! Keep learning and practicing your English. See you soon! 👋",
            translation: "Foi maravilhoso conversar com você! Continue aprendendo e praticando seu inglês. Até logo! 👋"
        };
    }
    
    if (messageLower.includes('help') || messageLower.includes('what can you')) {
        return {
            message: `I can discuss many topics about ${getTopicName(topic)}. Try asking me about specific concepts, request examples, or ask for clarifications! I'm here to help you learn.`,
            translation: `Posso discutir muitos tópicos sobre ${getTopicNamePt(topic)}. Tente me perguntar sobre conceitos específicos, pedir exemplos ou solicitar esclarecimentos! Estou aqui para te ajudar a aprender.`
        };
    }
    
    // Detectar se está pedindo exemplo
    if (messageLower.includes('example') || messageLower.includes('give me an') || messageLower.includes('show me')) {
        if (conversationContext.lastTopicDiscussed) {
            return generateExampleResponse(conversationContext.lastTopicDiscussed, topic);
        }
    }
    
    // Detectar se está pedindo mais informação
    if (messageLower.includes('tell me more') || messageLower.includes('elaborate') || messageLower.includes('explain more')) {
        if (conversationContext.lastTopicDiscussed) {
            return generateDeepDiveResponse(conversationContext.lastTopicDiscussed, topic);
        }
    }
    
    // Detectar palavras-chave na mensagem com contexto
    let bestMatch = null;
    let highestScore = 0;
    let matchedKeyword = '';
    
    for (const [keyword, response] of Object.entries(knowledge.keywords)) {
        const score = calculateKeywordMatch(messageLower, keyword);
        if (score > highestScore) {
            highestScore = score;
            bestMatch = response;
            matchedKeyword = keyword;
        }
    }
    
    // Se encontrou uma boa correspondência (score > 0.5)
    if (highestScore > 0.5 && bestMatch) {
        // Atualizar contexto
        conversationContext.lastTopicDiscussed = matchedKeyword;
        conversationContext.keywordsUsed.push(matchedKeyword);
        conversationContext.followUpCount = 0;
        
        // Adicionar follow-up pergunta baseada no tipo de mensagem
        let followUp = generateFollowUpQuestion(matchedKeyword, topic, messageType);
        
        return {
            message: bestMatch[0] + (followUp ? '\n\n' + followUp : ''),
            translation: bestMatch[1]
        };
    }
    
    // Resposta fallback se não entendeu, mas com contexto
    if (conversationContext.lastTopicDiscussed) {
        return {
            message: `Hmm, I'm not sure I understood that. Were you asking about ${conversationContext.lastTopicDiscussed}? Or would you like to discuss something else about ${getTopicName(topic)}?`,
            translation: `Hmm, não tenho certeza se entendi. Você estava perguntando sobre ${conversationContext.lastTopicDiscussed}? Ou gostaria de discutir outra coisa sobre ${getTopicNamePt(topic)}?`
        };
    }
    
    return {
        message: knowledge.fallback[0],
        translation: knowledge.fallback[1]
    };
}

// Detectar intenção da mensagem
function detectMessageIntent(message) {
    if (message.includes('?') || message.startsWith('what') || message.startsWith('how') || message.startsWith('why') || message.startsWith('when') || message.startsWith('where') || message.includes('explain') || message.includes('tell me')) {
        return 'question';
    }
    if (message.includes('example') || message.includes('show me')) {
        return 'request_example';
    }
    if (message.includes('yes') || message.includes('yeah') || message.includes('sure') || message.includes('okay')) {
        return 'agreement';
    }
    if (message.includes('no') || message.includes('nope') || message.includes('not really')) {
        return 'disagreement';
    }
    return 'statement';
}

// Gerar pergunta de acompanhamento (follow-up)
function generateFollowUpQuestion(keyword, topic, intent) {
    conversationContext.followUpCount++;
    
    // Não fazer follow-up toda vez (deixa conversa fluir)
    if (conversationContext.followUpCount > 2 && Math.random() > 0.6) {
        return '';
    }
    
    const followUps = {
        finance: {
            'stock': 'Would you like to know about different types of stocks, or how to analyze them?',
            'crypto': 'Are you interested in how blockchain technology works?',
            'bitcoin': 'Curious about other cryptocurrencies like Ethereum?',
            'risk': 'Would you like tips on how to manage investment risk?',
            'portfolio': 'Want to know how to build a balanced portfolio?'
        },
        ai: {
            'machine learning': 'Should I explain the difference with deep learning?',
            'gpt': 'Want to know how language models are trained?',
            'chatbot': 'Curious about how I understand and generate responses?',
            'robot': 'Interested in specific applications like self-driving cars?',
            'bias': 'Would you like to know how we can reduce AI bias?'
        },
        quantum: {
            'superposition': 'Want to learn about Schrödinger\'s Cat thought experiment?',
            'entanglement': 'Interested in how this is used in quantum computing?',
            'double slit': 'Should I explain what happens when we add observers?',
            'quantum computer': 'Curious about real quantum computers being built today?',
            'einstein': 'Want to hear about his famous debates with Bohr?'
        }
    };
    
    return followUps[topic]?.[keyword] || '';
}

// Gerar resposta de exemplo
function generateExampleResponse(keyword, topic) {
    const examples = {
        finance: {
            'stock': { msg: "Sure! Let's take Apple (AAPL). When you buy one share at $170, you own a tiny piece of Apple. If it rises to $200, you made $30 profit! If they pay a $0.25 quarterly dividend, that's extra income. That's stock ownership in action!", trans: "Claro! Vamos pegar Apple (AAPL). Quando você compra uma ação a $170, você possui um pedacinho da Apple. Se subir para $200, você fez $30 de lucro! Se pagarem dividendo de $0.25 trimestral, é renda extra. Isso é propriedade de ações em ação!" },
            'crypto': { msg: "For example, Bitcoin was worth $1 in 2011, reached $69,000 in 2021! Someone who invested $1,000 in 2011 would have $69 million. But it also crashed 80% multiple times. Extreme volatility!", trans: "Por exemplo, Bitcoin valia $1 em 2011, chegou a $69.000 em 2021! Alguém que investiu $1.000 em 2011 teria $69 milhões. Mas também caiu 80% várias vezes. Volatilidade extrema!" }
        },
        ai: {
            'machine learning': { msg: "Example: Your phone's autocorrect! It wasn't programmed with every word combination. It learned from millions of texts. Now it predicts what you'll type next. That's ML learning from data!", trans: "Exemplo: O corretor automático do seu telefone! Não foi programado com toda combinação de palavras. Aprendeu de milhões de textos. Agora prevê o que você vai digitar. Isso é ML aprendendo de dados!" },
            'chatbot': { msg: "I'm an example! I wasn't programmed with specific responses. I learned patterns from vast text data. Now I can discuss finance, quantum physics, and more - all through pattern recognition!", trans: "Eu sou um exemplo! Não fui programado com respostas específicas. Aprendi padrões de vastos dados de texto. Agora posso discutir finanças, física quântica e mais - tudo através de reconhecimento de padrões!" }
        },
        quantum: {
            'superposition': { msg: "Imagine tossing a coin. While it's in the air spinning, it's both heads AND tails until it lands. Quantum particles are like that coin - in all states until measured!", trans: "Imagine jogar uma moeda. Enquanto está no ar girando, é cara E coroa até pousar. Partículas quânticas são como essa moeda - em todos estados até serem medidas!" },
            'entanglement': { msg: "Imagine two magic coins. You flip one in New York, your friend flips the other in Tokyo. Yours shows heads - instantly, theirs shows tails. Always correlated, no matter the distance. That's entanglement!", trans: "Imagine duas moedas mágicas. Você joga uma em Nova York, seu amigo joga a outra em Tóquio. A sua mostra cara - instantaneamente, a dele mostra coroa. Sempre correlacionadas, não importa a distância. Isso é entrelaçamento!" }
        }
    };
    
    const example = examples[topic]?.[keyword];
    if (example) {
        return { message: example.msg, translation: example.trans };
    }
    
    return {
        message: "That's a great question for an example! Let me think of a practical scenario...",
        translation: "Essa é uma ótima pergunta para um exemplo! Deixe-me pensar em um cenário prático..."
    };
}

// Gerar resposta mais profunda
function generateDeepDiveResponse(keyword, topic) {
    const deepDives = {
        finance: {
            'stock': { msg: "Diving deeper: There are common stocks (voting rights, variable dividends) and preferred stocks (priority dividends, no voting). Growth stocks focus on price appreciation. Value stocks are undervalued gems. Each has different risk-return profiles!", trans: "Aprofundando: Existem ações ordinárias (direitos de voto, dividendos variáveis) e ações preferenciais (dividendos prioritários, sem voto). Ações de crescimento focam em valorização. Ações de valor são gemas subvalorizadas. Cada uma tem perfis diferentes de risco-retorno!" }
        },
        ai: {
            'neural network': { msg: "Going deeper: Neural networks learn through backpropagation! Errors are calculated at the output, then propagated backward through layers, adjusting weights. It's like reverse-engineering mistakes to improve. This happens millions of times during training!", trans: "Aprofundando: Redes neurais aprendem através de backpropagation! Erros são calculados na saída, então propagados de volta através das camadas, ajustando pesos. É como engenharia reversa de erros para melhorar. Isso acontece milhões de vezes durante treinamento!" }
        },
        quantum: {
            'superposition': { msg: "Mathematically, superposition is a linear combination of states: |Ψ⟩ = α|0⟩ + β|1⟩. The coefficients α and β are probability amplitudes. Square them to get actual probabilities. It's not just uncertainty - the particle genuinely IS in both states!", trans: "Matematicamente, superposição é uma combinação linear de estados: |Ψ⟩ = α|0⟩ + β|1⟩. Os coeficientes α e β são amplitudes de probabilidade. Eleve-os ao quadrado para obter probabilidades reais. Não é apenas incerteza - a partícula genuinamente ESTÁ em ambos estados!" }
        }
    };
    
    const deepDive = deepDives[topic]?.[keyword];
    if (deepDive) {
        return { message: deepDive.msg, translation: deepDive.trans };
    }
    
    return {
        message: `Great question! ${keyword} is a deep topic. What specific aspect would you like to explore further?`,
        translation: `Ótima pergunta! ${keyword} é um tópico profundo. Qual aspecto específico você gostaria de explorar mais?`
    };
}

// Detectar palavras-chave na mensagem COM CONTEXTO
function findBestKeywordMatch(messageLower, knowledge) {
    let bestMatch = null;
    let highestScore = 0;
    let matchedKeyword = '';
    
    // Primeiro, verifica se menciona algo do contexto anterior
    if (conversationContext.lastTopicDiscussed) {
        const contextScore = calculateKeywordMatch(messageLower, conversationContext.lastTopicDiscussed);
        if (contextScore > 0.3) {
            // Ainda falando sobre o mesmo tópico
            highestScore = contextScore + 0.2; // Bonus por contexto
            bestMatch = knowledge.keywords[conversationContext.lastTopicDiscussed];
            matchedKeyword = conversationContext.lastTopicDiscussed;
        }
    }
    
    // Procura por novas palavras-chave
    for (const [keyword, response] of Object.entries(knowledge.keywords)) {
        const score = calculateKeywordMatch(messageLower, keyword);
        if (score > highestScore) {
            highestScore = score;
            bestMatch = response;
            matchedKeyword = keyword;
        }
    }
    
    return { match: bestMatch, score: highestScore, keyword: matchedKeyword };
}

// Versão melhorada de generateBotResponse com lógica contextual
function generateBotResponse(userMessage, topic) {
    const messageLower = userMessage.toLowerCase();
    const knowledge = chatbotKnowledge[topic];
    
    if (!knowledge) {
        return { 
            message: "I apologize, but I'm having trouble understanding. Could you rephrase that?", 
            translation: "Desculpe, mas estou tendo dificuldade em entender. Você poderia reformular?" 
        };
    }
    
    // Detectar tipo de mensagem
    const messageType = detectMessageIntent(messageLower);
    
    // Respostas sociais primeiro
    if (messageLower.match(/\b(hello|hi|hey)\b/)) {
        const greetings = [
            { msg: `Hello! How can I help you learn about ${getTopicName(topic)} today?`, trans: `Olá! Como posso te ajudar a aprender sobre ${getTopicNamePt(topic)} hoje?` },
            { msg: `Hi there! Ready to explore ${getTopicName(topic)}? Ask me anything!`, trans: `Oi! Pronto para explorar ${getTopicNamePt(topic)}? Me pergunte qualquer coisa!` }
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    if (messageLower.includes('thank')) {
        const thanks = [
            { msg: "You're very welcome! Anything else you'd like to know?", trans: "De nada! Mais alguma coisa que gostaria de saber?" },
            { msg: "Happy to help! Feel free to ask more questions!", trans: "Feliz em ajudar! Sinta-se à vontade para fazer mais perguntas!" }
        ];
        return thanks[Math.floor(Math.random() * thanks.length)];
    }
    
    if (messageLower.match(/\b(bye|goodbye)\b/)) {
        return {
            message: `Great conversation! Keep practicing your English. See you soon! 👋`,
            translation: `Ótima conversa! Continue praticando seu inglês. Até logo! 👋`
        };
    }
    
    // Pedindo ajuda
    if (messageLower.includes('help') || messageLower.includes('what can you')) {
        return {
            message: `I can discuss ${getTopicName(topic)} in detail! Ask about specific concepts, request examples, or just chat. I'm here to make learning fun and engaging!`,
            translation: `Posso discutir ${getTopicNamePt(topic)} em detalhes! Pergunte sobre conceitos específicos, peça exemplos ou apenas converse. Estou aqui para tornar o aprendizado divertido e envolvente!`
        };
    }
    
    // Procurar melhor correspondência COM contexto
    const result = findBestKeywordMatch(messageLower, knowledge);
    
    if (result.score > 0.5 && result.match) {
        // Atualizar contexto
        conversationContext.lastTopicDiscussed = result.keyword;
        conversationContext.keywordsUsed.push(result.keyword);
        
        // Adicionar follow-up natural
        let followUp = generateFollowUpQuestion(result.keyword, topic, messageType);
        
        return {
            message: result.match[0] + (followUp ? '\n\n' + followUp : ''),
            translation: result.match[1]
        };
    }
    
    // Fallback com contexto
    if (conversationContext.lastTopicDiscussed) {
        return {
            message: `Interesting point! Were you asking about ${conversationContext.lastTopicDiscussed}? Or something new about ${getTopicName(topic)}?`,
            translation: `Ponto interessante! Você estava perguntando sobre ${conversationContext.lastTopicDiscussed}? Ou algo novo sobre ${getTopicNamePt(topic)}?`
        };
    }
    
    return {
        message: knowledge.fallback[0],
        translation: knowledge.fallback[1]
    };
}

// Calcular similaridade entre mensagem e palavra-chave
function calculateKeywordMatch(message, keyword) {
    const messageWords = message.split(/\s+/);
    const keywordWords = keyword.split(/\s+/);
    
    let matchCount = 0;
    keywordWords.forEach(kw => {
        if (messageWords.some(mw => mw.includes(kw) || kw.includes(mw))) {
            matchCount++;
        }
    });
    
    return matchCount / keywordWords.length;
}

// Obter nome do tópico em inglês
function getTopicName(topic) {
    const names = {
        finance: 'finance and investments',
        ai: 'Artificial Intelligence',
        quantum: 'quantum physics'
    };
    return names[topic] || 'this topic';
}

// Obter nome do tópico em português
function getTopicNamePt(topic) {
    const names = {
        finance: 'finanças e investimentos',
        ai: 'Inteligência Artificial',
        quantum: 'física quântica'
    };
    return names[topic] || 'este tópico';
}

// Sugestões contextuais
function getContextualSuggestions(topic, context) {
    const suggestions = {
        finance: {
            welcome: ['Tell me about stocks', 'What is cryptocurrency?', 'How do I start investing?', 'Explain Bitcoin'],
            general: ['Tell me more', 'Give an example', 'What about ETFs?', 'Is this risky?']
        },
        ai: {
            welcome: ['How does AI learn?', 'What is ChatGPT?', 'Tell me about robots', 'Explain neural networks'],
            general: ['Tell me more', 'Give an example', 'What about the future?', 'Is AI dangerous?']
        },
        quantum: {
            welcome: ['What is superposition?', 'Explain entanglement', 'Tell me about Schrödinger', 'What is a qubit?'],
            general: ['Tell me more', 'Give an example', 'What about Einstein?', 'How does this work?']
        }
    };
    
    return suggestions[topic]?.[context] || suggestions[topic]?.general || ['Tell me more', 'Give an example', 'I have a question'];
}

// Atualizar sugestões baseadas no contexto
function updateSuggestionsBasedOnContext(userMessage, topic) {
    const messageLower = userMessage.toLowerCase();
    let newSuggestions = [];
    
    if (topic === 'finance') {
        if (messageLower.includes('stock') || messageLower.includes('share')) {
            newSuggestions = ['What about dividends?', 'Tell me about ETFs', 'How to analyze stocks?'];
        } else if (messageLower.includes('crypto') || messageLower.includes('bitcoin')) {
            newSuggestions = ['What is blockchain?', 'Tell me about Ethereum', 'Is crypto safe?'];
        } else {
            newSuggestions = ['Tell me more', 'What about risk?', 'Give an example'];
        }
    } else if (topic === 'ai') {
        if (messageLower.includes('learn') || messageLower.includes('training')) {
            newSuggestions = ['What is deep learning?', 'How does it work?', 'Give an example'];
        } else if (messageLower.includes('future') || messageLower.includes('job')) {
            newSuggestions = ['Is AI dangerous?', 'What about ethics?', 'Will AI replace us?'];
        } else {
            newSuggestions = ['Tell me more', 'What is ChatGPT?', 'Give an example'];
        }
    } else if (topic === 'quantum') {
        if (messageLower.includes('superposition') || messageLower.includes('schrödinger')) {
            newSuggestions = ['What is entanglement?', 'Explain observation', 'Tell me more'];
        } else if (messageLower.includes('computer') || messageLower.includes('qubit')) {
            newSuggestions = ['How powerful are they?', 'What problems can they solve?', 'Tell me more'];
        } else {
            newSuggestions = ['Tell me more', 'Give an example', 'What about Einstein?'];
        }
    }
    
    showQuickSuggestions(topic, 'general');
    
    // Sobrescreve com sugestões contextuais
    const container = document.getElementById('suggestions-container');
    container.innerHTML = '';
    newSuggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'text-xs bg-purple-800/40 hover:bg-purple-700/60 text-purple-200 px-3 py-1 rounded-full border border-purple-500/30 transition';
        btn.textContent = suggestion;
        btn.onclick = () => sendSuggestion(suggestion);
        container.appendChild(btn);
    });
}

// --- LÓGICA DO DESAFIO DOS VERBOS AUXILIARES (VERSÃO DIDÁTICA) ---
let currentVerbQuestionIndex = 0;
let verbGameScore = 0;
let verbCorrectAnswers = 0;

// Explicações detalhadas para cada verbo
const verbExplanations = {
    "Do": {
        uso: "Usado para perguntas e negativas no PRESENTE",
        exemplo: "Do you like pizza? (Você gosta de pizza?)",
        dica: "Use com I, you, we, they"
    },
    "Does": {
        uso: "Usado para perguntas e negativas no PRESENTE com he/she/it",
        exemplo: "Does she speak English? (Ela fala inglês?)",
        dica: "Use apenas com he, she, it"
    },
    "Did": {
        uso: "Usado para perguntas e negativas no PASSADO",
        exemplo: "Did you call me yesterday? (Você me ligou ontem?)",
        dica: "Palavras como yesterday, last week indicam passado"
    },
    "Will": {
        uso: "Usado para FUTURO, previsões e promessas",
        exemplo: "It will rain tomorrow. (Vai chover amanhã)",
        dica: "Palavras como tomorrow, later, next indicam futuro"
    },
    "Would": {
        uso: "Usado para pedidos EDUCADOS e situações HIPOTÉTICAS",
        exemplo: "Would you help me? (Você me ajudaria?)",
        dica: "Mais formal que 'will', usado em condições com 'if'"
    }
};

function startVerbGame() {
    currentVerbQuestionIndex = 0;
    verbGameScore = 0;
    verbCorrectAnswers = 0;
    
    // Embaralha as perguntas
    verbGameQuestions.sort(() => Math.random() - 0.5); 
    showScreen('verb-game-screen');
    
    // Mostra as instruções primeiro
    document.getElementById('verb-instructions').classList.remove('hidden');
    document.getElementById('verb-game-area').classList.add('hidden');
}

function startVerbGamePlay() {
    // Esconde instruções e mostra o jogo
    document.getElementById('verb-instructions').classList.add('hidden');
    document.getElementById('verb-game-area').classList.remove('hidden');
    loadVerbQuestion();
}

function loadVerbQuestion() {
    const question = verbGameQuestions[currentVerbQuestionIndex];
    
    // Atualiza a pergunta
    document.getElementById('verb-question-sentence').textContent = question.sentence;
    
    // Mostra a dica
    document.getElementById('verb-hint-text').textContent = question.hint;
    
    // Atualiza pontuação e progresso
    document.getElementById('verb-game-score').textContent = verbGameScore;
    document.getElementById('verb-game-progress').textContent = `${currentVerbQuestionIndex + 1} / ${verbGameQuestions.length}`;
    
    // Limpa feedback
    document.getElementById('verb-feedback-text').textContent = '';
    document.getElementById('verb-explanation').textContent = '';
    document.getElementById('next-verb-question-btn').classList.add('hidden');

    const optionsContainer = document.getElementById('verb-options-container');
    optionsContainer.innerHTML = '';

    // Assegura que a resposta correta esteja sempre entre as opções
    let currentOptions = ["Do", "Did", "Will", "Would"];
    if (!currentOptions.includes(question.answer)) {
        currentOptions[Math.floor(Math.random() * 4)] = question.answer;
    }
    
    currentOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'verb-option-btn p-4 rounded-lg text-xl font-bold';
        button.onclick = () => checkVerbAnswer(option, button);
        optionsContainer.appendChild(button);
    });
}

function checkVerbAnswer(selectedAnswer, button) {
    const question = verbGameQuestions[currentVerbQuestionIndex];
    const feedbackTextEl = document.getElementById('verb-feedback-text');
    const explanationEl = document.getElementById('verb-explanation');
    const optionsButtons = document.querySelectorAll('.verb-option-btn');
    
    optionsButtons.forEach(btn => btn.disabled = true);
    
    // Criar a frase completa resolvida (substitui ___ pela resposta correta)
    const completeSentence = question.sentence.replace('___', question.answer);

    if (selectedAnswer === question.answer) {
        // RESPOSTA CORRETA
        feedbackTextEl.innerHTML = '<i class="fas fa-check-circle"></i> Correto! Muito bem! 🎉';
        feedbackTextEl.style.color = '#10B981';
        button.classList.add('correct');
        verbGameScore += 10;
        verbCorrectAnswers++;
        
        // Mostra a frase completa e tradução
        const verbInfo = verbExplanations[question.answer] || {};
        explanationEl.innerHTML = `
            <div class="bg-green-900/20 p-3 rounded-lg mb-3 border border-green-500/30">
                <strong class="text-green-300">📝 Frase completa:</strong><br>
                <span class="text-white text-lg">"${completeSentence}"</span><br>
                <span class="text-gray-300 text-sm mt-1 block">
                    <i class="fas fa-language mr-1"></i> ${question.translation}
                </span>
            </div>
            <strong>✅ Por que "${question.answer}" está correto?</strong><br>
            ${verbInfo.uso}<br>
            <em>Exemplo: ${verbInfo.exemplo}</em>
        `;
        explanationEl.style.color = '#a7f3d0';
        
        document.getElementById('verb-game-score').textContent = verbGameScore;
        updateStreak();
        
    } else {
        // RESPOSTA INCORRETA
        feedbackTextEl.innerHTML = '<i class="fas fa-times-circle"></i> Ops! Não foi dessa vez.';
        feedbackTextEl.style.color = '#EF4444';
        button.classList.add('incorrect');
        
        // Mostra qual era a correta
        optionsButtons.forEach(btn => {
            if (btn.textContent === question.answer) {
                btn.classList.add('correct');
            }
        });
        
        // Mostra a frase completa e tradução
        const verbInfo = verbExplanations[question.answer] || {};
        explanationEl.innerHTML = `
            <div class="bg-yellow-900/20 p-3 rounded-lg mb-3 border border-yellow-500/30">
                <strong class="text-yellow-300">📝 A frase correta é:</strong><br>
                <span class="text-white text-lg">"${completeSentence}"</span><br>
                <span class="text-gray-300 text-sm mt-1 block">
                    <i class="fas fa-language mr-1"></i> ${question.translation}
                </span>
            </div>
            <strong>📚 Por que "${question.answer}" é a resposta correta?</strong><br>
            ${verbInfo.uso}<br>
            <em>Dica: ${verbInfo.dica}</em><br>
            <em>Exemplo geral: ${verbInfo.exemplo}</em>
        `;
        explanationEl.style.color = '#fcd34d';
    }
    
    document.getElementById('next-verb-question-btn').classList.remove('hidden');
}

document.getElementById('next-verb-question-btn').onclick = () => {
    currentVerbQuestionIndex++;
    if (currentVerbQuestionIndex < verbGameQuestions.length) {
        loadVerbQuestion();
    } else {
        // Resumo educativo final
        const percentage = Math.round((verbCorrectAnswers / verbGameQuestions.length) * 100);
        let performanceMsg = '';
        let emoji = '';
        
        if (percentage >= 90) {
            performanceMsg = 'Excelente! Você domina os verbos auxiliares! 🌟';
            emoji = '🏆';
        } else if (percentage >= 70) {
            performanceMsg = 'Muito bom! Continue praticando! 👏';
            emoji = '⭐';
        } else if (percentage >= 50) {
            performanceMsg = 'Bom começo! Revise as regras e tente novamente! 📚';
            emoji = '💪';
        } else {
            performanceMsg = 'Não desista! Revise as explicações e pratique mais! 🚀';
            emoji = '📖';
        }
        
        const summaryHTML = `
            <div class="text-center">
                <div class="text-6xl mb-4">${emoji}</div>
                <h3 class="text-2xl font-bold text-purple-200 mb-3">Desafio Concluído!</h3>
                <div class="bg-purple-900/30 p-4 rounded-lg mb-4">
                    <p class="text-3xl font-bold text-yellow-400 mb-2">${verbGameScore} pontos</p>
                    <p class="text-lg text-gray-200">${verbCorrectAnswers} de ${verbGameQuestions.length} corretas (${percentage}%)</p>
                </div>
                <p class="text-lg text-purple-200 mb-4">${performanceMsg}</p>
                <div class="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30 mt-4">
                    <p class="text-sm text-blue-200">
                        <i class="fas fa-lightbulb mr-2"></i>
                        <strong>Lembre-se:</strong> Do/Does (presente), Did (passado), Will (futuro), Would (educado/hipotético)
                    </p>
                </div>
            </div>
        `;
        
        modalMessage.innerHTML = summaryHTML;
        modalMessage.className = 'mb-5';
        modalButtons.innerHTML = `<button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105">Voltar ao Menu</button>`;
        modalButtons.firstElementChild.onclick = () => {
            hideModal();
            showScreen('home-screen');
        };
        modal.classList.remove('hidden');
        
        addPoints(verbGameScore);
    }
};


// --- INICIALIZAÇÃO ---
window.onload = () => {
    loadProgress();
    
    // OUVINTE DE AUTENTICAÇÃO
    auth.onAuthStateChanged(user => {
        if (user) {
            // Usuário está logado
            currentUser = user;
            console.log("Estado de autenticação: Logado", user.email);
            
            // Verificar se é o primeiro login (primeira vez que o usuário acessa)
            if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                // É o primeiro login! Mostrar instruções de instalação do PWA
                setTimeout(() => {
                    showInstallationInstructions();
                }, 1000); // Delay de 1 segundo para melhor UX
            }
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