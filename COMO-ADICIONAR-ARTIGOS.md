# Como adicionar novos artigos editoriais

Os artigos são controlados por **código** em um único arquivo. Apenas você (desenvolvedor) edita esse arquivo para publicar novos conteúdos mensais.

## Onde editar

- **Arquivo:** `client/src/data/editorial.ts`
- **Padrão visual:** O artigo *"O futuro da energia solar no Brasil"* (id `"1"`) é o modelo. Novos artigos seguem o mesmo formato.

## Passo a passo para um novo artigo

### 1. Nova imagem (opcional)

Se quiser uma imagem própria para o artigo:

- Coloque o arquivo em `client/src/assets/images/` (ex.: `blog-tech_5.jpg`).
- No topo de `editorial.ts`, adicione o import:
  ```ts
  import blog5 from "@/assets/images/blog-tech_5.jpg";
  ```

Se não precisar, use uma das existentes: `blog1`, `blog2`, `blog3`, `blog4`.

### 2. Conteúdo com o padrão do site (recomendado)

Use a função **`createEditorialContent()`** para manter o mesmo layout (parágrafo de abertura + seções com título e barra roxa, e citações quando quiser):

```ts
content: createEditorialContent({
  lead: "Um parágrafo de abertura que resume o tema do artigo.",
  sections: [
    {
      title: "Título da seção",
      paragraphs: [
        "Primeiro parágrafo da seção.",
        "Segundo parágrafo, se houver.",
      ],
    },
    {
      title: "Outra seção (com citação)",
      paragraphs: [
        "Texto antes da citação.",
      ],
      quote: "Texto da citação entre aspas.",
    },
  ],
}),
```

- **lead:** um único parágrafo de abertura.
- **sections:** array de seções. Cada seção tem:
  - **title:** título (barra roxa à esquerda).
  - **paragraphs:** array de strings (parágrafos).
  - **quote:** opcional; se existir, aparece um blockquote após os parágrafos da seção.

### 3. Inserir o novo artigo no array

No mesmo arquivo, no array `editorialPosts`, **adicione um novo objeto** (por exemplo no início, para ser o destaque):

```ts
{
  id: "8",                    // ID único (string); a URL será /editorial/8
  category: "Sustentabilidade",
  title: "Título do novo artigo",
  excerpt: "Resumo curto que aparece nos cards e listas.",
  date: "08 Fev 2026",        // Formato: "DD Mmm AAAA"
  readTime: "5 min",
  image: blog4,               // ou blog5 se tiver importado
  content: createEditorialContent({
    lead: "...",
    sections: [ /* ... */ ],
  }),
  authorName: "Seu Nome",
  authorRole: "Cargo ou especialidade",
  tags: ["Tag1", "Tag2", "Tag3"],
},
```

- **id:** único; usado na URL `/editorial/:id`.
- **date:** ex.: `"08 Fev 2026"` (dia, mês abreviado, ano).
- **authorName** e **authorRole:** opcionais; se omitidos, usam os valores padrão (Roberto Mendes / Engenheiro Especialista em Renováveis).
- **tags:** opcional; se omitido, usa tags padrão.

### 4. Ordem dos artigos e comportamento "Novo" / laterais / páginas

- **Primeiro do array** = artigo em destaque na home com o badge **"Novo"** (card grande à esquerda).
- **Demais itens** = vão automaticamente para a **lista lateral** (à direita), sem badge "Novo".
- **Paginação:** a lista lateral mostra 3 artigos por página. Conforme você adiciona mais artigos, as páginas aumentam (ex.: 4 artigos no total → 1 em destaque + 3 laterais = 1 página; 8 artigos → 1 destaque + 7 laterais = 3 páginas). Os botões "Mais artigos" e a paginação no mobile só aparecem quando há mais de uma página.
- Para publicar um novo artigo como **"Novo"**, insira-o como **primeiro** elemento de `editorialPosts`. O que era destaque passa a ser o primeiro da lista lateral.

## Conteúdo em HTML livre (avançado)

Se precisar de um layout que `createEditorialContent()` não cobre, você pode passar **HTML** direto em `content` (string). Use o primeiro artigo em `editorial.ts` ou o HTML gerado por `createEditorialContent()` como referência das classes (lead, seções, blockquote, etc.) para manter o padrão visual.

## Resumo

| O que fazer              | Onde                         |
|--------------------------|------------------------------|
| Adicionar/editar artigos | `client/src/data/editorial.ts` |
| Imagens                  | `client/src/assets/images/` + import em `editorial.ts` |
| Padrão do texto          | Função `createEditorialContent()` no mesmo arquivo     |

Não é necessário alterar `landing.tsx` nem `post.tsx`: eles já leem todos os artigos de `editorial.ts`.
