# 🧪 Guia de Teste - Novas Funcionalidades

## 🎯 Objetivo
Testar todas as 4 novas funcionalidades implementadas para garantir que estão funcionando perfeitamente antes do deploy.

---

## 🚀 Como Iniciar o Teste

### Opção 1: Abrir Diretamente
```
1. Navegue até a pasta do projeto
2. Clique duas vezes em index.html
3. O app abrirá no navegador padrão
```

### Opção 2: Servidor Local (Recomendado)
```bash
# Com Python
python -m http.server 8000

# Com Node.js
npx http-server

# Com PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

---

## ✅ TESTE 1: Mídia Quiz

### Passos:
1. ✅ Na tela inicial, localize o botão **🎬 Mídia Quiz** (vermelho, no grid de 5 botões)
2. ✅ Clique no botão
3. ✅ **Verificar:** Tela de quiz deve abrir
4. ✅ **Verificar:** Vídeo do YouTube deve carregar
5. ✅ **Verificar:** Título do quiz deve aparecer
6. ✅ **Verificar:** 3 perguntas devem aparecer abaixo do vídeo
7. ✅ Selecione uma resposta para cada pergunta (radio buttons)
8. ✅ Clique em **"Verificar Respostas"**
9. ✅ **Verificar:** Feedback deve aparecer
   - Se todas certas: "Perfeito! Você acertou todas as 3 perguntas! +40 pontos! 🎉"
   - Se errou alguma: "Você acertou X de 3 perguntas..."
10. ✅ **Verificar:** Se acertou todas, os pontos devem aumentar na home
11. ✅ Volte ao menu e entre novamente
12. ✅ **Verificar:** Pode ser um quiz diferente (sistema aleatório)
13. ✅ Complete o mesmo quiz novamente
14. ✅ **Verificar:** Deve mostrar "(Quiz já completado anteriormente)" - SEM dar pontos novamente ✅

### ✅ Resultado Esperado:
- Vídeo carrega ✅
- Perguntas aparecem ✅
- Validação funciona ✅
- +40 pontos apenas na primeira vez ✅
- Não permite farming ✅

---

## ✅ TESTE 2: Cultura e Situações

### Passos:
1. ✅ Na tela inicial, localize o botão **🌍 Cultura** (verde, na linha de 4 botões secundários)
2. ✅ Clique no botão
3. ✅ **Verificar:** Tela deve abrir com título "🌍 Cultura & Situações 🌍"
4. ✅ **Verificar:** Deve aparecer 6 cards empilhados
5. ✅ Role pela página
6. ✅ **Verificar:** Cada card deve ter:
   - Ícone 🌍
   - Título da situação
   - Explicação em itálico
   - 4 frases em caixas verdes (inglês + português)
7. ✅ Leia algumas frases
8. ✅ **Verificar:** Textos devem estar legíveis e bem formatados

### Situações que devem aparecer:
1. 🍽️ Pedindo Comida em um Restaurante
2. 🛍️ Comprando em Lojas
3. 🚌 Usando Transporte Público
4. 🏨 Fazendo Check-in em Hotel
5. 🗺️ Pedindo Direções na Rua
6. 💬 Conversas Informais com Amigos

### ✅ Resultado Esperado:
- 6 cards aparecem ✅
- Frases em inglês e português ✅
- Design bonito e organizado ✅
- Scroll funciona ✅

---

## ✅ TESTE 3: Conversas Guiadas (PRINCIPAL!)

### Teste 3A: Fluxo Básico

1. ✅ Na tela inicial, role até ver a seção **"💬 Conversas Guiadas"**
2. ✅ **Verificar:** Deve haver 3 cards:
   - 📈 Mercado Financeiro (verde)
   - ⚛️ Física Quântica (azul)
   - 🤖 Inteligência Artificial (roxo)
3. ✅ Clique em **"📈 Mercado Financeiro"**
4. ✅ **Verificar:** Tela de conversa deve abrir
5. ✅ **Verificar:** Título deve ser "Mercado Financeiro"
6. ✅ **Verificar:** Ícone 📈 deve aparecer no topo
7. ✅ **Verificar:** Mensagem do tutor deve aparecer em inglês
8. ✅ **Verificar:** Tradução em português deve aparecer abaixo
9. ✅ **NOVO!** Procure o botão **🔊** ao lado do texto em inglês
10. ✅ **Clique no botão 🔊**
11. ✅ **VERIFICAR ÁUDIO:** Deve ouvir a voz em inglês! 🎧
12. ✅ **Verificar:** Efeito de hover deve animar o botão
13. ✅ **Verificar:** Deve haver botões de opção (A, B, C...)
14. ✅ Clique em uma opção (ex: "I'm interested in stocks")
15. ✅ **Verificar:** Conversa deve progredir (nova mensagem)
16. ✅ **Verificar:** "Passo X" deve atualizar no rodapé
17. ✅ Continue escolhendo opções
18. ✅ Explore até chegar ao final (mensagem de despedida)
19. ✅ **VERIFICAR RECOMPENSA:** Popup deve aparecer: "🎓 Conversa completada: Mercado Financeiro! +30 pontos!"
20. ✅ **Verificar:** Pontos devem aumentar +30
21. ✅ **Verificar:** Botões finais: 🏠 Voltar ao Menu | 🔄 Começar Novamente

### Teste 3B: Testar Diferentes Caminhos

1. ✅ Clique em 🔄 "Começar Novamente"
2. ✅ Escolha opções **diferentes** desta vez
3. ✅ **Verificar:** Conversa deve seguir caminho diferente
4. ✅ **Verificar:** Mensagens diferentes devem aparecer
5. ✅ Complete até o final novamente
6. ✅ **VERIFICAR FARMING:** Deve mostrar que já completou (SEM dar +30 pontos novamente) ✅

### Teste 3C: Testar Outros Tópicos

1. ✅ Volte ao menu (🏠)
2. ✅ Clique em **"⚛️ Física Quântica"**
3. ✅ **Verificar:** Ícone muda para ⚛️
4. ✅ **Verificar:** Título muda para "Física Quântica"
5. ✅ **Verificar:** Conteúdo é sobre física quântica
6. ✅ Clique no botão 🔊
7. ✅ **Verificar:** Áudio fala sobre física quântica
8. ✅ Complete a conversa
9. ✅ **Verificar:** +30 pontos para esta conversa também
10. ✅ Repita para **"🤖 Inteligência Artificial"**

### Teste 3D: Testar Botão de Áudio Múltiplas Vezes

1. ✅ Entre em qualquer conversa
2. ✅ Clique no botão 🔊 e deixe falar
3. ✅ Enquanto ainda está falando, clique 🔊 novamente
4. ✅ **Verificar:** A fala anterior deve ser cancelada ✅
5. ✅ **Verificar:** Nova fala deve começar do início ✅
6. ✅ Avance para próximo passo
7. ✅ Clique 🔊 no novo passo
8. ✅ **Verificar:** Deve falar o texto do novo passo ✅

---

## ✅ TESTE 4: Sugestão de Nível Adaptativa

### Preparação:
Este teste requer paciência, pois você precisa completar 80% de um nível.

### Passos:

**Para Nível Básico → Intermediário:**
1. ✅ Clique em **"🎤 Fala"**
2. ✅ Escolha **"Básico"**
3. ✅ Complete **10 frases** (80% de 12 frases)
   - Clique 🔊 para ouvir
   - Clique 🎤 e fale
   - Acerte para avançar
4. ✅ **Na 10ª frase completada:**
5. ✅ **VERIFICAR POPUP:** Modal deve aparecer automaticamente! 🎉
6. ✅ **Verificar:** Deve dizer "Você completou 80% do nível atual!"
7. ✅ **Verificar:** Deve perguntar "Gostaria de experimentar o nível Intermediário?"
8. ✅ **Teste Opção 1:** Clique em **"Sim, vamos lá!"**
   - **Verificar:** Deve levar para nível Intermediário automaticamente ✅
9. ✅ Volte ao menu
10. ✅ Vá em Fala → Básico novamente
11. ✅ Complete mais algumas frases
12. ✅ **VERIFICAR:** Popup NÃO deve aparecer novamente ✅ (já mostrou)

**Para Nível Intermediário → Avançado:**
1. ✅ Complete **8 frases** do intermediário (80% de 10)
2. ✅ **Verificar:** Popup deve aparecer sugerindo "Avançado"
3. ✅ **Teste Opção 2:** Clique em **"Continuar no atual"**
   - **Verificar:** Modal fecha ✅
   - **Verificar:** Continua no nível intermediário ✅
4. ✅ Complete mais frases
5. ✅ **Verificar:** Popup NÃO aparece novamente ✅

### ✅ Resultado Esperado:
- Popup aparece automaticamente aos 80% ✅
- Opção "Aceitar" leva para próximo nível ✅
- Opção "Recusar" fecha o modal ✅
- Popup aparece apenas 1x por nível ✅
- Estado persiste (não mostra de novo) ✅

---

## 🎮 TESTE 5: Integração Completa

### Verificar Sistema de Pontuação:

1. ✅ Anote sua pontuação atual
2. ✅ Complete um quiz de mídia → +40 pontos
3. ✅ Complete uma conversa guiada → +30 pontos
4. ✅ Complete uma frase de fala → +10/20/30 pontos
5. ✅ **Verificar:** Pontuação total está correta na home
6. ✅ **Verificar:** Número aparece no card de "Pontos" ⭐

### Verificar Sistema de Streak:

1. ✅ Faça qualquer atividade que dá pontos
2. ✅ **Verificar:** Streak deve atualizar (se é primeiro uso do dia)
3. ✅ **Verificar:** Número aparece no card de "Dias Seguidos" 🔥

### Verificar Conquistas:

1. ✅ Acumule pontos fazendo várias atividades
2. ✅ Vá em **"🏆 Conquistas"**
3. ✅ **Verificar:** Conquistas desbloqueadas aparecem coloridas
4. ✅ **Verificar:** Conquistas bloqueadas aparecem em cinza
5. ✅ **Verificar:** Mensagem de conquista aparece quando desbloqueia

### Verificar Progresso:

1. ✅ Vá em **"📊 Progresso"**
2. ✅ **Verificar:** Pontuação total aparece
3. ✅ **Verificar:** Streak aparece
4. ✅ **Verificar:** Barras de progresso (Básico/Intermediário/Avançado)
5. ✅ **Verificar:** Contador de exercícios
6. ✅ **Verificar:** Contador de vocabulário

---

## 💾 TESTE 6: Persistência de Dados

### Teste de LocalStorage:

1. ✅ Complete um quiz de mídia
2. ✅ Complete uma conversa guiada
3. ✅ Anote sua pontuação atual
4. ✅ **Feche completamente o navegador**
5. ✅ Abra novamente o index.html
6. ✅ **Verificar:** Pontuação permanece salva ✅
7. ✅ Complete o mesmo quiz novamente
8. ✅ **Verificar:** NÃO ganha pontos (já completado) ✅
9. ✅ Complete a mesma conversa novamente
10. ✅ **Verificar:** NÃO ganha pontos (já completada) ✅

### Console do Navegador (F12):

```javascript
// Ver progresso atual
console.log(progress);

// Ver quizzes completados
console.log(progress.completedQuizzes);

// Ver conversas completadas
console.log(progress.completedConversations);

// Ver sugestões de nível mostradas
console.log(progress.levelSuggestionShown);
```

---

## 🎧 TESTE 7: Sistema de Áudio (CRÍTICO!)

### Teste do Botão 🔊 nas Conversas:

1. ✅ Entre em qualquer conversa guiada
2. ✅ Localize o botão **🔊** ao lado do texto em inglês
3. ✅ **Verificar:** Botão é pequeno, roxo e redondo ✅
4. ✅ Passe o mouse sobre o botão
5. ✅ **Verificar:** Deve ter efeito de hover (scale + animação) ✅
6. ✅ **Clique no botão 🔊**
7. ✅ **VERIFICAR ÁUDIO:** Deve ouvir voz em inglês falando o texto! 🎧
8. ✅ **Verificar:** Voz está em inglês (en-US) ✅
9. ✅ **Verificar:** Velocidade é confortável (0.9x) ✅
10. ✅ Enquanto ainda está falando, clique 🔊 novamente
11. ✅ **Verificar:** Fala anterior para e nova começa ✅
12. ✅ Avance para próximo passo da conversa
13. ✅ Clique 🔊 no novo passo
14. ✅ **Verificar:** Fala o novo texto corretamente ✅

### Se o áudio NÃO funcionar:
- Verifique se está em HTTPS (Netlify faz automaticamente)
- Teste em navegador diferente (Chrome recomendado)
- Verifique permissões do navegador

---

## 📱 TESTE 8: Responsividade Mobile

### Simular Mobile (DevTools - F12):

1. ✅ Abra DevTools (F12)
2. ✅ Clique no ícone de dispositivo móvel (Ctrl+Shift+M)
3. ✅ Escolha iPhone ou Android
4. ✅ **Verificar:** Conversas Guiadas aparecem em 1 coluna
5. ✅ **Verificar:** Botões de opção têm tamanho adequado
6. ✅ **Verificar:** Player YouTube é responsivo
7. ✅ **Verificar:** Texto é legível
8. ✅ **Verificar:** Botão 🔊 é clicável
9. ✅ Teste todas as funcionalidades em mobile

---

## 🔍 TESTE 9: Navegação Completa

### Testar Todos os Caminhos:

**Mídia Quiz:**
- ✅ Menu → Mídia Quiz → Verificar → (não) voltar automaticamente
- ✅ Botão voltar ← funciona

**Cultura:**
- ✅ Menu → Cultura → Botão voltar ← funciona

**Conversas:**
- ✅ Menu → Conversa → Explorar → 🏠 Voltar ao Menu
- ✅ Menu → Conversa → Explorar → 🔄 Começar Novamente
- ✅ Verificar se recomeçar realmente volta ao passo 1

---

## 🎯 CHECKLIST FINAL

### Funcionalidades Core:
- [ ] ✅ Mídia Quiz carrega vídeos
- [ ] ✅ Mídia Quiz valida respostas
- [ ] ✅ Mídia Quiz dá +40 pontos (1x)
- [ ] ✅ Cultura mostra 6 situações
- [ ] ✅ Cultura mostra 24 frases totais
- [ ] ✅ Conversas abrem corretamente
- [ ] ✅ Conversas mostram texto bilíngue
- [ ] ✅ Botão 🔊 funciona (síntese de voz)
- [ ] ✅ Botão 🔊 cancela fala anterior
- [ ] ✅ Botão 🔊 tem animação hover
- [ ] ✅ Opções de conversa funcionam
- [ ] ✅ Navegação entre passos funciona
- [ ] ✅ Conversa dá +30 pontos ao completar (1x)
- [ ] ✅ Sugestão de nível aparece aos 80%
- [ ] ✅ Sugestão de nível aparece apenas 1x

### Sistema de Pontuação:
- [ ] ✅ Quiz dá +40 pontos na 1ª vez
- [ ] ✅ Quiz NÃO dá pontos na 2ª vez
- [ ] ✅ Conversa dá +30 pontos na 1ª vez
- [ ] ✅ Conversa NÃO dá pontos na 2ª vez
- [ ] ✅ Pontos aparecem na home
- [ ] ✅ Pontos salvam no LocalStorage

### Persistência:
- [ ] ✅ Quizzes completados salvam
- [ ] ✅ Conversas completadas salvam
- [ ] ✅ Sugestões de nível salvam
- [ ] ✅ Dados persistem após fechar navegador

### Interface:
- [ ] ✅ Todos os botões estão visíveis
- [ ] ✅ Todas as telas abrem
- [ ] ✅ Textos são legíveis
- [ ] ✅ Cores e estilos consistentes
- [ ] ✅ Animações funcionam
- [ ] ✅ Responsivo em mobile

### Áudio:
- [ ] ✅ Síntese de voz funciona
- [ ] ✅ Voz está em inglês
- [ ] ✅ Velocidade é adequada
- [ ] ✅ Cancela fala anterior
- [ ] ✅ Botão tem boa aparência

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### Problema: Vídeo do YouTube não carrega
**Solução:** 
- Verifique conexão com internet
- Alguns vídeos podem estar bloqueados em certas regiões
- Teste em navegador diferente

### Problema: Áudio não funciona
**Solução:**
- Verifique se o site está em HTTPS (no Netlify funcionará)
- Teste em Chrome/Edge (melhor suporte)
- Verifique volume do sistema
- Abra console (F12) e veja se há erros

### Problema: Pontos não salvam
**Solução:**
- Verifique se LocalStorage está habilitado
- Modo anônimo pode ter limitações
- Verifique console (F12) para erros

### Problema: Sugestão de nível não aparece
**Solução:**
- Verifique se completou 80% ou mais
- Verifique se já não mostrou antes (verificar `progress.levelSuggestionShown`)
- Teste em nível que ainda não viu a sugestão

---

## 📊 MÉTRICAS DE SUCESSO

### O teste é considerado APROVADO se:

✅ **Todas as 4 funcionalidades funcionam**
✅ **Sistema de áudio funciona perfeitamente**
✅ **Sistema de recompensas funciona**
✅ **Não há farming de pontos**
✅ **Dados persistem no LocalStorage**
✅ **Interface é responsiva**
✅ **Sem erros no console**

---

## 🎊 PRÓXIMOS PASSOS APÓS OS TESTES

### Se todos os testes passaram:

1. ✅ **Commit no Git:**
```bash
git add .
git commit -m "Versão 2.0 - Novas funcionalidades: Mídia Quiz, Cultura, Conversas Guiadas e Trilha Adaptativa"
git push origin main
```

2. ✅ **Deploy no Netlify:**
   - Siga o guia em `DEPLOY.md`
   - Método recomendado: GitHub integration

3. ✅ **Teste no Site Publicado:**
   - Refaça alguns testes acima
   - Verifique se áudio funciona em HTTPS
   - Teste em diferentes dispositivos

4. ✅ **Compartilhe!** 🌍
   - Seu app de inglês agora é PREMIUM!

---

## 🎁 BÔNUS: Teste de Exploração Livre

### Explore as Conversas Livremente:

**Mercado Financeiro:**
- Explore o caminho de Stocks
- Explore o caminho de Crypto
- Veja quantos passos diferentes você consegue alcançar
- Anote termos novos que aprendeu

**Física Quântica:**
- Explore Wave-Particle Duality
- Explore Superposition
- Explore Uncertainty Principle
- Veja se consegue chegar em todos os finais

**Inteligência Artificial:**
- Explore Machine Learning
- Explore Generative AI
- Explore Future and Risks
- Teste diferentes combinações

### Objetivo:
Explorar o máximo de conteúdo possível e verificar se todos os caminhos funcionam!

---

<div align="center">

# ✨ BOA SORTE COM OS TESTES! ✨

**Se tudo funcionar (e vai funcionar!), seu app está pronto para o mundo!** 🌍

🎬 Mídia Quiz  
🌍 Cultura  
💬 Conversas Guiadas  
🔊 Áudio Integrado  
🚀 Trilha Adaptativa  
🏆 Recompensas Completas  

**= APLICATIVO PREMIUM DE INGLÊS!** 🌟

---

*Tempo estimado de teste: 20-30 minutos*  
*Diversão garantida: 100%* 😄  
*Aprendizado: MÁXIMO!* 🎓

</div>

