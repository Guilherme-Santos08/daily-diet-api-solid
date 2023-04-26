# App

Daily Diet app.

## RFs (Requisitos funcionais)
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações;
      *As refeições devem ser relacionadas a um usuário.*
      - [x] Nome
      - [x] Descrição
      - [x] Data e Hora
      - [x] Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima;
- [x] Deve ser possível apagar uma refeição;
- [x] Deve ser possível listar todas as refeições de um usuário;
- [x] Deve ser **possível** visualizar uma única refeição;
- [x] Deve ser possível recuperar as métricas de um usuário;
      - [x] Quantidade total de refeições registradas
      - [x] Quantidade total de refeições dentro da dieta
      - [x] Quantidade total de refeições fora da dieta
      - [/] Melhor sequência por dia de refeições dentro da dieta
- [/] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;

## RNFs (Requisitos não-funcionais)
- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);


## Documentação da API

#### Registra o usuário

```http
  POST /users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `Body - String` | **Obrigatório**. Nome do usuário. |
| `email` | `Body - String` | **Obrigatório**. Email do usuário. |
| `password` | `Body - String` | **Obrigatório**. Senha do usuário. Mínimo 6 caracteres. |

#### Autentica o usuário

```http
  POST /session
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `Body - String` | **Obrigatório**. Email do usuário. |
| `password` | `Body - String` | **Obrigatório**. Senha do usuário. |

#### Realiza refresh do access token

```http
  PATCH /token/refresh
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `refreshToken` | `Cookie - String` | **Obrigatório**. Refresh token do usuário. |

---

#### Todas as rotas abaixo precisam que o usuário autentique

#### Retorna o perfil do usuário

```http
  GET /me
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |

#### Retorna todos os lanches do usuário

```http
  GET /snacks/get-all-user-snack/:userId
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `id` | `Query - Number` | **Obrigatório**. Id do usuário. |


#### Retorna todas metricas do usuário

```http
  GET /snacks/get-user-metrics/:userId
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `id` | `Query - Number` | **Obrigatório**. Id do usuário. |

### Retorna um lanche específico

```http
  GET /snacks/get-only-snack/:snackId
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `id` | `Query - Number` | **Obrigatório**. Id do lanche. |

#### Cria um novo lanche

```http
  POST /snacks
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `name` | `Body - String` | **Obrigatório**. Nome do lanche. |
| `description` | `Body - String` | **Obrigatório** Descricão do lanche. |
| `insideDiet` | `Body - Boolean` | **Obrigatório** Esta dentro da dieta?. |

#### Editar informação do lance

```http
  put /snacks/edit/:snackId
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `name` | `Body - String` | Nome do lanche. |
| `description` | `Body - String` | Descricão do lanche. |
| `insideDiet` | `Body - Boolean` | Esta dentro da dieta?. |
| `id` | `Query - Number` | **Obrigatório**. Id do lanche. |

### Deletar um Lanche específico

```http
  DELETE /snacks/delete/:snackId
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accessToken` | `Cookie - String` | **Obrigatório**. Access token do usuário. |
| `id` | `Query - Number` | **Obrigatório**. Id do lanche. |

## Stack utilizada

**Back-end:** Node, Fastify, Vitest, zod, potergress, Prisma, bycript, supertest


## Rodando localmente

- Clone o projeto

  ```sh
    git clone https://github.com/Guilherme-Santos08/daily-diet-api-solid.git
  ```

- Entre no diretório do projeto

  ```sh
    cd ignite-node/daily-diet-api-solid
  ```

- Configuração do docker

  ```sh
    docker compose up -d
  ```

- Instale as dependências

  ```sh
    npm install
  ```

- Inicie o servidor

  ```sh
    npm run start:dev
  ```

- Rodar os testes unitários

  ```sh
    npm run test

    # ou

    npm run test:watch
  ```

- Rodar os testes e2e

  ```sh
    npm run test:e2e

    #ou 

    npm run test:e2e:watch
  ```

- Rodar testes usando uma UI

  ```sh
    npm run test:ui
  ```

  ```bash
    npm run test:coverage
  ```

Crie um arquivo .env com as variaveis do .env.example
