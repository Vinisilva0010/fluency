# 🚀 Guia de Deploy no Netlify

## Método 1: Deploy via GitHub (Recomendado)

### Passo a Passo:

1. **Commit e Push para o GitHub:**
```bash
git add .
git commit -m "Projeto pronto para deploy no Netlify"
git push origin main
```

2. **Conectar no Netlify:**
   - Acesse: https://app.netlify.com
   - Clique em **"Add new site"** → **"Import an existing project"**
   - Escolha **GitHub**
   - Selecione seu repositório `aprender-ingles`

3. **Configurações de Build:**
   - **Branch to deploy:** `main`
   - **Build command:** (deixe vazio)
   - **Publish directory:** `.` (ponto)
   - **Functions directory:** (deixe vazio)

4. **Deploy:**
   - Clique em **"Deploy site"**
   - Aguarde alguns segundos
   - ✅ Site publicado!

5. **Configurar Domínio Personalizado (Opcional):**
   - Vá em **Site settings** → **Domain management**
   - Clique em **"Add custom domain"**
   - Siga as instruções

---

## Método 2: Deploy via Drag & Drop (Mais Rápido)

### Passo a Passo:

1. **Preparar os Arquivos:**
   - Certifique-se de que todos os arquivos estão nas pastas corretas
   - A estrutura deve estar assim:
   ```
   aprender-ingles/
   ├── index.html
   ├── manifest.json
   ├── robots.txt
   ├── netlify.toml
   ├── _headers
   ├── css/
   ├── js/
   └── assets/
   ```

2. **Deploy:**
   - Acesse: https://app.netlify.com/drop
   - Arraste toda a pasta `aprender-ingles` para o navegador
   - Aguarde o upload
   - ✅ Site publicado instantaneamente!

---

## Método 3: Deploy via Netlify CLI

### Passo a Passo:

1. **Instalar Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login no Netlify:**
```bash
netlify login
```

3. **Deploy:**
```bash
# Na pasta do projeto
netlify deploy

# Para deploy em produção
netlify deploy --prod
```

---

## ✅ Checklist Pré-Deploy

- [x] Estrutura de pastas organizada (css/, js/, assets/)
- [x] Todos os caminhos de arquivos corretos
- [x] netlify.toml configurado
- [x] _headers para otimização
- [x] manifest.json para PWA
- [x] Meta tags para SEO
- [x] .gitignore configurado
- [x] README.md documentado

---

## 🔧 Após o Deploy

### 1. Testar o Site
- Abra o site no navegador
- Teste todas as funcionalidades:
  - ✅ Exercícios de fala (permita acesso ao microfone)
  - ✅ Exercícios de audição
  - ✅ Exercícios de escrita
  - ✅ Vocabulário
  - ✅ Desafio diário
  - ✅ Sistema de conquistas
  - ✅ Modo escuro

### 2. Configurar HTTPS
- O Netlify configura HTTPS automaticamente
- Aguarde alguns minutos se ainda não estiver ativo

### 3. Otimizações Adicionais (Opcional)
No painel do Netlify, você pode:
- Configurar domínio personalizado
- Adicionar formulários
- Configurar notificações
- Adicionar integração contínua

---

## 🎯 URLs Importantes

Após o deploy, você receberá:
- **URL temporária:** `random-name-123456.netlify.app`
- Você pode alterar para: `seu-nome.netlify.app`

---

## 🐛 Solução de Problemas

### O vídeo não carrega
- Verifique se o arquivo está em `assets/videoUniverso.mp4`
- Verifique o tamanho do vídeo (máximo 100MB no plano gratuito)

### Reconhecimento de voz não funciona
- O site precisa estar em HTTPS (Netlify faz isso automaticamente)
- O usuário precisa permitir acesso ao microfone

### Progresso não salva
- Verifique se o navegador permite Local Storage
- Teste em modo anônimo para descartar extensões

---

## 📊 Monitoramento

O Netlify oferece:
- Analytics de visitantes
- Logs de deploy
- Monitoramento de erros
- Estatísticas de performance

Acesse em: **Site overview** → **Analytics**

---

## 🔄 Atualizações Futuras

Para atualizar o site:
1. Faça alterações localmente
2. Commit e push para o GitHub
3. O Netlify faz deploy automaticamente!

---

**Dica:** Salve a URL do seu site após o deploy!

🌟 Boa sorte com o deploy! 🚀

