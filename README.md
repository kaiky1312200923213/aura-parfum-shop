# AURA Parfum — Loja Virtual

**Autor:** Kaiky Yoshio Ono Marins  
**Categoria:** Desenvolvimento web · E-commerce  
**Status:** Projeto web em desenvolvimento

## Visão geral

Projeto de loja virtual voltado ao catálogo de perfumes. O repositório contém uma aplicação web baseada em Vite e TypeScript, com integração do cliente Supabase e configuração de publicação para Netlify.

**Demonstração:** [auraparfum.netlify.app](https://auraparfum.netlify.app/)

## Tecnologias identificadas

- Vite
- TypeScript
- Supabase
- Tailwind CSS
- Netlify

## Estrutura do projeto

- `src/` — código-fonte da aplicação.
- `public/` — arquivos públicos.
- `perfumes/` — recursos relacionados ao catálogo.
- `supabase/` — arquivos de integração com Supabase.
- `.env.example` — modelo das variáveis de ambiente.
- `netlify.toml` e `vercel.json` — configurações de publicação.

## Como executar

1. Instale uma versão atual do Node.js.
2. Execute `npm install`.
3. Copie `.env.example` para `.env` e preencha as variáveis necessárias do Supabase.
4. Execute `npm run dev` para desenvolvimento.
5. Execute `npm run build` para gerar a versão de produção.

**Segurança:** nunca publique a chave Service Role do Supabase. Utilize apenas chaves públicas apropriadas no frontend e mantenha segredos no ambiente do provedor de hospedagem.

© 2026 Kaiky Yoshio Ono Marins.