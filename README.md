## Desenvolvimento Next.js

- Telas criadas e objetivos
  - `Home` (`src/app/page.tsx:1`): apresenta a proposta da plataforma ReUse, com chamadas para ação “Ver itens” e “Publicar item” em tema verde sustentável.
  - `Itens` (`src/app/items/page.tsx:1`): lista itens disponíveis consumindo a API interna (`/api/items`) e renderização no servidor com atualização dinâmica.
  - `Publicar Item` (`src/app/items/new/page.tsx:1`): formulário cliente para cadastro de novos itens, enviando `POST` para `/api/items`.

- Estilo e acessibilidade
  - Paleta verde e variáveis de tema em `src/app/globals.css:1`.
  - Navegação com `next/link` em `src/app/layout.tsx:15`, header e footer sustentáveis.

- Como executar
  - Variável `DATABASE_URL` em `.env`.
  - Gerar Prisma Client: `npm run prisma:generate`.
  - Iniciar dev: `npm run dev` e abrir `http://localhost:3000/`.

- Link do repositório GitHub
  - Este projeto está em ambiente local; publique para obter um link remoto. Assim que o repositório for criado, inclua aqui a URL.

## Prisma ORM

- Integração
  - Cliente Prisma em instância única em `src/lib/prisma.ts:1` para evitar múltiplas instâncias em desenvolvimento.
  - Configuração em `prisma.config.ts:6`, apontando para `DATABASE_URL`.
  - Schema em `prisma/schema.prisma:14` com `User`, `Item`, `Offer` e enums de estado.

- Uso por tela/contexto
  - `Itens` (lista): chama `GET /api/items` que usa `prisma.item.findMany` com proprietário (`owner`) incluído e retorno de contingência quando o banco está indisponível (`src/app/api/items/route.ts:1`).
  - `Publicar Item`: envia `POST /api/items`, que faz `upsert` de usuário convidado e `item.create` (`src/app/api/items/route.ts:28`).
  - Ofertas: `GET/POST /api/offers` manipulam propostas de troca ligadas a `Item` e `User`, com tratamento de indisponibilidade do banco (`src/app/api/offers/route.ts:1`).

- Scripts úteis
  - `prisma:generate`: gerar client.
  - `prisma:db:push`: aplicar schema no banco.
  - `prisma:migrate`: criar/aplicar migrações.

- Link do repositório GitHub
  - Quando o repositório remoto for disponibilizado, inclua a URL aqui para documentação do desenvolvimento integrado ao Next.js e Prisma.

## Banco de Dados

- Tabelas e objetivos
  - `User`: cadastro de usuários da plataforma; relaciona com itens publicados e ofertas enviadas (`prisma/schema.prisma:16`).
  - `Item`: objetos disponíveis para troca; inclui título, descrição, condição, categoria e relacionamento com o usuário proprietário (`prisma/schema.prisma:26`).
  - `Offer`: propostas de troca associadas a um item e ao usuário que oferece; controla status de negociação (`prisma/schema.prisma:39`).

- Enums
  - `Condition`: `new`, `good`, `fair`, `poor` — estado do item (`prisma/schema.prisma:54`).
  - `OfferStatus`: `pending`, `accepted`, `rejected`, `canceled` — estado da proposta (`prisma/schema.prisma:60`).

- Conexão
  - `.env` define `DATABASE_URL` para Postgres.
  - Opcional: `docker-compose.yml` para subir Postgres localmente.

## Gestão Low-Code (Node-RED)

- **Descrição do Desenvolvimento**:
  - **Telas Criadas**: Foi criado um Dashboard Administrativo ("Backoffice ReUse") que serve como o painel central de controle para a operação da plataforma.
  - **Parametrizações Implementadas**:
    - **Habilitar/Desativar Trocas (`exchanges_enabled`)**: Um controle do tipo *switch* que permite suspender instantaneamente a publicação de novos itens na plataforma (útil para períodos de manutenção ou auditoria).
    - **Mensagem de Anúncio (`announcement_text`)**: Um campo de entrada de texto (*text input*) que define uma mensagem global exibida dinamicamente no topo da Home da aplicação.
  - **Fluxo do Node-RED**: O arquivo contendo todo o fluxo exportado está disponível em [node-red-flow.json](node-red-flow.json).
  - **Link do Repositório GitHub**: [URL_DO_REPOSITORIO_AQUI] (Incluir link após o upload).

- **Integrações com API**:
  - **APIs Utilizadas**: O painel administrativo consome a própria API da plataforma para persistir as mudanças de configuração.
  - **APIs Criadas**:
    - `POST /api/settings`: Recebe a chave da configuração, o novo valor e o tipo de dado para salvar ou atualizar no banco de dados via Prisma.
    - `GET /api/settings/[key]`: Utilizada pela aplicação Next.js para consultar o estado atual de uma configuração específica em tempo real.
  - **Conexão com a Lógica**:
    - Quando um administrador altera um valor no Dashboard do Node-RED, um nó de função prepara um objeto JSON e dispara uma requisição HTTP POST para a API de configurações.
    - A aplicação Next.js, por sua vez, verifica essas flags (Feature Flags) durante a renderização das páginas (Server-Side Rendering) para decidir, por exemplo, se o botão de "Publicar Item" deve ser renderizado ou se um banner de anúncio deve aparecer.

- **Como utilizar**:
  1. Importe o arquivo `node-red-flow.json` no seu ambiente Node-RED.
  2. Certifique-se de que a aplicação Next.js está rodando em `http://localhost:3000`.
  3. Utilize o dashboard do Node-RED para alterar as configurações e veja o impacto imediato na Home da plataforma ReUse.
