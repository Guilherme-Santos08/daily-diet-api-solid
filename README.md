# App

Daily Diet app.

## RFs (Requisitos funcionais)
- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível registrar uma refeição feita, com as seguintes informações;
      *As refeições devem ser relacionadas a um usuário.*
      - [ ] Nome
      - [ ] Descrição
      - [ ] Data e Hora
      - [ ] Está dentro ou não da dieta
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima;
- [ ] Deve ser possível apagar uma refeição;
- [ ] Deve ser possível listar todas as refeições de um usuário;
- [ ] Deve ser possível visualizar uma única refeição;
- [ ] Deve ser possível recuperar as métricas de um usuário;
      - [ ] Quantidade total de refeições registradas
      - [ ] Quantidade total de refeições dentro da dieta
      - [ ] Quantidade total de refeições fora da dieta
      - [ ] Melhor sequência por dia de refeições dentro da dieta
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;

## RNFs (Requisitos não-funcionais)
- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);****
