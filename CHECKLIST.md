# ✅ Checklist de Verificação - Pré-Deploy

## 📋 Verificação de Estrutura

- [x] Pasta `css/` criada com `style.css`
- [x] Pasta `js/` criada com `app.js`
- [x] Pasta `assets/` criada com `videoUniverso.mp4`
- [x] Arquivo `index.html` na raiz
- [x] Arquivo `netlify.toml` configurado
- [x] Arquivo `_headers` criado
- [x] Arquivo `manifest.json` criado
- [x] Arquivo `robots.txt` criado
- [x] Arquivo `.gitignore` criado
- [x] Arquivo `.gitattributes` criado

---

## 🔍 Verificação de Caminhos

### No `index.html`:
- [x] CSS: `href="css/style.css"`
- [x] JS: `src="js/app.js"`
- [x] Vídeo: `src="assets/videoUniverso.mp4"`
- [x] Manifest: `href="manifest.json"`

---

## 🎨 Verificação de Funcionalidades

### Teste Local (abra index.html no navegador):

#### Tela Principal
- [ ] O vídeo do universo carrega no fundo
- [ ] As estrelas estão animadas
- [ ] Pontuação, streak e nível aparecem (iniciando em 0)
- [ ] Botão de tema (lua/sol) funciona
- [ ] Botão "Desafio do Dia" funciona

#### Exercícios de Fala
- [ ] Botões de nível (Básico, Intermediário, Avançado) funcionam
- [ ] Frase em inglês e português aparecem
- [ ] Botão de ouvir (🔊) funciona (sintetiza a voz)
- [ ] Botão de microfone funciona (pede permissão)
- [ ] Reconhecimento de voz detecta a fala
- [ ] Feedback "Perfeito!" ou "Quase lá" aparece
- [ ] Pontos são adicionados quando acerta
- [ ] Botão "Próxima Frase" aparece após acerto

#### Exercícios de Audição
- [ ] Botão de ouvir frase funciona
- [ ] Campo de texto aceita digitação
- [ ] Botão "Verificar" funciona
- [ ] Feedback correto/incorreto aparece
- [ ] Pontos são adicionados quando acerta
- [ ] Botão "Próximo" carrega novo exercício

#### Exercícios de Escrita
- [ ] Tópico e explicação aparecem
- [ ] Exercício de preencher lacuna funciona
- [ ] Exercício de tradução funciona
- [ ] Exercício de ordenar palavras funciona
- [ ] Chips de palavras são clicáveis
- [ ] Feedback correto/incorreto aparece
- [ ] Pontos são adicionados quando acerta

#### Vocabulário
- [ ] Botões de categoria funcionam
- [ ] Cards de vocabulário aparecem
- [ ] Cards viram ao clicar (flip animation)
- [ ] Botão "Marcar como Aprendida" funciona
- [ ] Pontos são adicionados ao marcar palavra

#### Expressões Idiomáticas
- [ ] Lista de expressões carrega
- [ ] Cards mostram idiom, significado e exemplo
- [ ] Design está legível

#### Desafio do Dia
- [ ] Desafio carrega corretamente
- [ ] Diferentes tipos de desafio funcionam
- [ ] Botão "Verificar Desafio" funciona
- [ ] Marca como completado ao acertar
- [ ] Dá 50 pontos
- [ ] Não permite fazer novamente no mesmo dia
- [ ] Mostra mensagem "já completou" se já fez

#### Conquistas
- [ ] Grid de conquistas carrega
- [ ] Conquistas bloqueadas aparecem em cinza
- [ ] Conquistas desbloqueadas aparecem coloridas
- [ ] Ícones das conquistas aparecem
- [ ] Descrição e requisitos são claros

#### Progresso
- [ ] Pontuação total aparece
- [ ] Streak de dias consecutivos aparece
- [ ] Barras de progresso (Básico/Intermediário/Avançado) funcionam
- [ ] Contadores de exercícios funcionam
- [ ] Botão "Resetar Progresso" funciona
- [ ] Modal de confirmação aparece antes de resetar

---

## 💾 Verificação de Persistência

### LocalStorage:
- [ ] Feche o navegador e abra novamente
- [ ] A pontuação permanece salva
- [ ] O streak permanece salvo
- [ ] O progresso de exercícios permanece
- [ ] As palavras aprendidas permanecem
- [ ] As conquistas permanecem
- [ ] O desafio do dia permanece (só pode fazer 1x por dia)
- [ ] A preferência de tema (claro/escuro) permanece

---

## 🎯 Verificação de Sistema

### Sistema de Pontuação:
- [ ] Exercício de fala básico: +10 pontos
- [ ] Exercício de fala intermediário: +20 pontos
- [ ] Exercício de fala avançado: +30 pontos
- [ ] Exercício de audição: +15 pontos
- [ ] Exercício de escrita: +15 pontos
- [ ] Marcar vocabulário: +5 pontos
- [ ] Desafio do dia: +50 pontos
- [ ] Conquista desbloqueada: +25 pontos (bônus)

### Sistema de Streak:
- [ ] Primeiro uso: streak = 1
- [ ] Usar novamente no mesmo dia: streak não aumenta
- [ ] Usar no dia seguinte: streak aumenta (+1)
- [ ] Pular um dia: streak reseta para 1

### Sistema de Níveis:
- [ ] 0-49 pontos: Iniciante
- [ ] 50-199 pontos: Básico
- [ ] 200-499 pontos: Intermediário
- [ ] 500-999 pontos: Avançado
- [ ] 1000+ pontos: Mestre
- [ ] Popup aparece ao subir de nível

### Sistema de Conquistas:
- [ ] "Primeiras Palavras": 1 frase completa
- [ ] "Orador": 10 exercícios de fala
- [ ] "Ouvinte Atento": 10 exercícios de audição
- [ ] "Escritor": 10 exercícios de escrita
- [ ] "Poliglota": 25 palavras aprendidas
- [ ] "Dedicação": 3 dias consecutivos
- [ ] "Persistência": 7 dias consecutivos
- [ ] "Mestre da Disciplina": 30 dias consecutivos
- [ ] "Colecionador": 100 pontos
- [ ] "Estrela Cadente": 500 pontos
- [ ] "Rei do Conhecimento": 1000 pontos
- [ ] "Mestre dos Desafios": 10 desafios completos
- [ ] Popup animado aparece ao desbloquear

---

## 📱 Verificação Mobile/Responsivo

### Em dispositivos móveis ou usando DevTools (F12):
- [ ] Design se adapta a telas pequenas
- [ ] Texto é legível
- [ ] Botões são clicáveis (tamanho adequado)
- [ ] Vídeo de fundo funciona
- [ ] Grid se reorganiza corretamente
- [ ] Modal não ultrapassa a tela
- [ ] Scroll funciona normalmente
- [ ] Performance é aceitável

---

## 🌐 Verificação de Compatibilidade

### Teste nos navegadores:
- [ ] Chrome/Edge (recomendado)
- [ ] Firefox
- [ ] Safari
- [ ] Opera

### APIs do Navegador:
- [ ] Web Speech API (reconhecimento de voz) funciona
- [ ] Speech Synthesis API (falar) funciona
- [ ] LocalStorage funciona
- [ ] Vídeo HTML5 funciona

---

## 🔒 Verificação de Segurança

### Headers HTTP:
- [ ] X-Frame-Options configurado
- [ ] X-XSS-Protection configurado
- [ ] X-Content-Type-Options configurado
- [ ] Referrer-Policy configurado

### Privacidade:
- [ ] Nenhum dado é enviado para servidores externos
- [ ] Tudo funciona offline (exceto CDNs)
- [ ] LocalStorage é local (não compartilhado)

---

## 📦 Verificação Pré-Deploy

### Arquivos:
- [ ] Todos os arquivos estão commitados no Git
- [ ] `.gitignore` está configurado
- [ ] Nenhum arquivo temporário ou desnecessário
- [ ] Tamanho do repositório é razoável

### Documentação:
- [ ] README.md está completo
- [ ] DEPLOY.md tem instruções claras
- [ ] ESTRUTURA.md documenta organização
- [ ] Comentários no código (se necessário)

---

## 🚀 Pronto para Deploy?

### Se todos os itens acima estiverem ✅:

1. **Commit final:**
```bash
git add .
git commit -m "Projeto completo e testado - pronto para deploy no Netlify"
git push origin main
```

2. **Deploy no Netlify:**
   - Siga as instruções no `DEPLOY.md`
   - Método recomendado: GitHub integration

3. **Teste o site publicado:**
   - Refaça alguns testes acima no site publicado
   - Verifique HTTPS (deve ser automático)
   - Teste em diferentes dispositivos

4. **Compartilhe!** 🎉

---

## 🐛 Problemas Comuns

### Vídeo não carrega:
- Verifique o caminho: `assets/videoUniverso.mp4`
- Tamanho máximo no Netlify gratuito: 100MB
- Formato: MP4 (H.264)

### Microfone não funciona:
- Site precisa estar em HTTPS
- Usuário precisa dar permissão
- Navegador precisa suportar Web Speech API

### Progresso não salva:
- Verifique se LocalStorage está habilitado
- Modo anônimo pode ter limitações
- Limpar cache pode apagar dados

### CSS/JS não carrega no Netlify:
- Verifique os caminhos (case-sensitive no Linux)
- Verifique se os arquivos foram commitados
- Veja os logs de deploy no Netlify

---

**✨ Checklist completo! Seu projeto está pronto para brilhar no Netlify! 🚀**

