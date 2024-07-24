# sistemaInventarioWebI
Repositório destinado ao projeto de um Sistema Interativo de Inventário, desenvolvido especificamente para a disciplina de Web I (Princípios de Desenvolvimento Web) durante o período 2024.1 na Universidade Federal de Campina Grande (UFCG).

Claro! Aqui está um exemplo de um arquivo README.md para um projeto de Inventário Interativo:

# Inventário Interativo

## Tecnologias Utilizadas

- Node.js/TypeScript
- Express
- ReactJS
- PostgreSQL

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/inventario-interativo.git
   ```

2. Navegue até o diretório do projeto:
   ```sh
   cd inventario-interativo
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

4. Configure o arquivo `.env` com as variáveis de ambiente necessárias, como a URL de conexão com o banco de dados MongoDB.

## Executando a Aplicação

1. Inicie o servidor:
   ```sh
   npm start
   ```

2. A API estará disponível em `http://localhost:3000`.

## Rotas da API

### Para Administradores

#### `GET /users`

Retorna uma lista de todos os usuários.

**Exemplo de resposta:**
```json
[
  {
    "id": "1",
    "name": "João",
    "email": "joao@example.com"
  },
  {
    "id": "2",
    "name": "Maria",
    "email": "maria@example.com"
  }
]
```

#### `GET /usersById/:id`

Retorna os detalhes de um usuário específico com base no ID.

**Parâmetros:**
- `id` (obrigatório): ID do usuário.

**Exemplo de resposta:**
```json
{
  "id": "1",
  "name": "João",
  "email": "joao@example.com"
}
```

#### `GET /products`

Retorna uma lista de todos os produtos.

**Exemplo de resposta:**
```json
[
  {
    "id": "1",
    "name": "Produto 1",
    "description": "Descrição do produto 1",
    "price": 10.0
  },
  {
    "id": "2",
    "name": "Produto 2",
    "description": "Descrição do produto 2",
    "price": 20.0
  }
]
```

#### `GET /productsByUserId/:userId`

Retorna uma lista de produtos de um usuário específico com base no ID do usuário.

**Parâmetros:**
- `userId` (obrigatório): ID do usuário.

**Exemplo de resposta:**
```json
[
  {
    "id": "1",
    "name": "Produto 1",
    "description": "Descrição do produto 1",
    "price": 10.0
  }
]
```

### Para Usuários

#### `POST /products`

Adiciona um novo produto.

**Parâmetros no corpo da requisição:**
- `name` (obrigatório): Nome do produto.
- `description` (opcional): Descrição do produto.
- `price` (obrigatório): Preço do produto.

**Exemplo de corpo da requisição:**
```json
{
  "name": "Produto Novo",
  "description": "Descrição do produto novo",
  "price": 30.0
}
```

**Exemplo de resposta:**
```json
{
  "id": "3",
  "name": "Produto Novo",
  "description": "Descrição do produto novo",
  "price": 30.0
}
```

#### `PUT /products/:id`

Atualiza os detalhes de um produto existente.

**Parâmetros:**
- `id` (obrigatório): ID do produto.

**Parâmetros no corpo da requisição:**
- `name` (opcional): Nome do produto.
- `description` (opcional): Descrição do produto.
- `price` (opcional): Preço do produto.

**Exemplo de corpo da requisição:**
```json
{
  "name": "Produto Atualizado",
  "description": "Nova descrição do produto",
  "price": 35.0
}
```

**Exemplo de resposta:**
```json
{
  "id": "1",
  "name": "Produto Atualizado",
  "description": "Nova descrição do produto",
  "price": 35.0
}
```

#### `DELETE /products/:id`

Deleta um produto existente.

**Parâmetros:**
- `id` (obrigatório): ID do produto.

**Exemplo de resposta:**
```json
{
  "message": "Produto deletado com sucesso."
}
```

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
```

Espero que isso ajude! Se precisar de mais alguma coisa, estou à disposição.
