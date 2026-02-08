# Configuração da API do Instagram para o Carousel do Footer

Este documento explica como configurar a Meta App e obter as credenciais necessárias para exibir os últimos posts do Instagram no carousel do footer do site.

---

## O que você precisa

| Item | Descrição |
|------|-----------|
| **INSTAGRAM_ACCESS_TOKEN** | Token de acesso de longa duração da Meta |
| **INSTAGRAM_USER_ID** | ID numérico da conta Instagram (@track.energia) |
| **INSTAGRAM_CACHE_TTL_HOURS** | (Opcional) Horas de cache. Padrão: 6 |

---

## Pré-requisitos

- **Conta Instagram**: O @track.energia precisa ser **Business** ou **Creator**
- **Página Facebook**: Uma Página do Facebook conectada ao @track.energia
- **Admin**: Quem gera o token deve ser administrador dessa Página

---

## Parte 1: Criar e configurar a Meta App (Desenvolvedor)

### 1.1 Criar a app

1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. Faça login com sua conta pessoal
3. **Meus Apps** → **Criar App**
4. Escolha **Negócios** (ou **Outro**)
5. Dê um nome (ex: "Track Site") e crie

### 1.2 Adicionar o produto correto

O caso de uso **"Incorporar conteúdo do Facebook, Instagram e Threads"** oferece apenas **oEmbed** (embed de posts individuais). Isso **não serve** para listar vários posts.

É necessário adicionar um caso de uso ou produto que inclua a **Instagram Graph API** com permissões para ler mídia, por exemplo:

- **"Gerenciar e publicar conteúdo no Instagram"**
- **"Instagram API"**
- **"Ler conteúdo/dados do Instagram"**

**Como fazer:**
- Vá em **Casos de uso** → **Adicionar casos de uso**
- Procure opções relacionadas a **Instagram** ou **gerenciar conteúdo**
- Ou em **Funções do app** / **Configurações do app**, verifique se há opção de adicionar o produto **Instagram** ou **Instagram Graph API**

### 1.3 Permissões necessárias

O token deve ter acesso a:

- `instagram_basic`
- `pages_read_engagement` ou `pages_show_list`

---

## Parte 2: Gerar Token e User ID (Cliente ou quem tem admin)

O cliente (ou pessoa com admin na Página do Facebook conectada ao @track.energia) deve:

### 2.1 Gerar o Access Token

1. No painel da app: **Ferramentas** → **Token de Acesso** (ou **Graph API Explorer**)
2. Clique em **Gerar Token de Acesso**
3. Selecione as permissões: `instagram_basic`, `pages_show_list`, `pages_read_engagement`
4. Faça login com a conta Facebook que administra a Página conectada ao @track.energia
5. Copie o token gerado

> **Importante:** Tokens curtos expiram em ~1h. Para produção, é necessário trocar por um **Long-Lived Token** (60 dias). A Meta tem documentação sobre esse processo.

### 2.2 Obter o Instagram User ID

1. Com o token em mãos, use o **Graph API Explorer** ou faça a requisição:

   ```
   GET https://graph.facebook.com/v21.0/me/accounts?access_token=SEU_TOKEN
   ```

2. Na resposta, identifique a Página conectada ao @track.energia e pegue o `id` da Página.

3. Em seguida, busque as contas Instagram conectadas:

   ```
   GET https://graph.facebook.com/v21.0/{PAGE_ID}?fields=instagram_business_account&access_token=SEU_TOKEN
   ```

4. O campo `instagram_business_account.id` é o **INSTAGRAM_USER_ID**.

Ou use o Graph API Explorer em [developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer) navegando por esses endpoints.

---

## Parte 3: Configurar o projeto

1. Na raiz do projeto, crie o arquivo `.env` (copie do `.env.example` se existir)

2. Adicione as variáveis:

   ```env
   INSTAGRAM_ACCESS_TOKEN=seu_token_aqui
   INSTAGRAM_USER_ID=id_numérico_da_conta_instagram
   
   # Opcional: tempo de cache em horas (padrão: 6)
   INSTAGRAM_CACHE_TTL_HOURS=6
   ```

3. Reinicie o servidor para carregar as novas variáveis

---

## Resumo: quem faz o quê

| Quem | O que faz |
|------|-----------|
| **Desenvolvedor** | Cria a Meta App, configura produtos/permissões e prepara a integração |
| **Cliente** | Gera o token e o User ID (precisa ser admin da Página + Instagram) |
| **Desenvolvedor** | Recebe token e User ID, coloca no `.env` e faz o deploy |

---

## Custos

A Instagram Graph API para leitura de mídia (posts) **não cobra** pelo uso. Há apenas limites de rate (muitas requisições em pouco tempo podem ser bloqueadas temporariamente).

---

## Referências

- [Instagram Graph API - Documentação](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api)
- [IG User Media - Endpoint](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media)
- [Tokens de Acesso - Meta](https://developers.facebook.com/docs/facebook-login/guides/access-tokens)
