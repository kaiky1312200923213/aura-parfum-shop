# AURA Parfum — Loja virtual

**Autor:** Kaiky Yoshio Ono Marins  
**Portfólio:** [kaikysec.vercel.app](https://kaikysec.vercel.app/)  
**Demonstração:** [auraparfum.netlify.app](https://auraparfum.netlify.app/)  
**Categoria:** Desenvolvimento web · E-commerce  
**Status:** Projeto em desenvolvimento

## Visão geral

Projeto de loja virtual voltado ao catálogo de perfumes. O repositório contém uma aplicação web baseada em Vite e TypeScript, integração com o cliente Supabase e configuração de publicação para Netlify.

## Objetivo

Construir a estrutura de uma experiência de e-commerce, conectando a interface web aos serviços de dados e organizando o projeto para desenvolvimento local e publicação.

## Tecnologias identificadas

- Vite
- TypeScript
- Tailwind CSS
- Supabase
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
4. Execute `npm run dev` para iniciar o ambiente de desenvolvimento.
5. Execute `npm run build` para gerar a versão de produção.

## Segurança e status

O projeto ainda está em desenvolvimento. Nunca publique a chave Service Role do Supabase. Utilize no front-end somente as chaves públicas apropriadas e mantenha segredos em variáveis de ambiente do provedor de hospedagem. Revise as políticas de acesso do Supabase antes de utilizar dados reais.

## O que este projeto demonstra

- Organização de um projeto web com Vite e TypeScript.
- Integração do front-end com Supabase.
- Preparação de comandos de desenvolvimento e build.

© 2026 Kaiky Yoshio Ono Marins.
