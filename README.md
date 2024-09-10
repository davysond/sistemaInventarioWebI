# sistemaInventarioWebI
Repositório destinado ao projeto de um Sistema Interativo de Inventário, desenvolvido especificamente para a disciplina de Web I (Princípios de Desenvolvimento Web) durante o período 2024.1 na Universidade Federal de Campina Grande (UFCG).

## Tecnologias Utilizadas

- Node.js/TypeScript
- Express
- ReactJS
- PostgreSQL

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/davysond/sistemaInventarioWebI.git
   ```

2. Navegue até o diretório do projeto:
   ```sh
   cd sistemaInventarioWebI
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

4. Configure o arquivo `.env` com as variáveis de ambiente necessárias, como a URL de conexão com o banco de dados PostgreSQL.

## Executando a Aplicação

1. Inicie o servidor:
   ```sh
   npm start
   ```

2. A API estará disponível em `http://localhost:3001`.

## Swagger

URL definida para especificação da documentação através do Swagger em `http://localhost:3001/api-sistemaInventarioWebI/`

## Rotas da API

#### `POST /users/createUser`

Cria um novo usuário no sistema a partir das propriedades informadas.

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

#### `POST /users/promoteToAdmin`

Promove um usuário existente para administrador através do seu ID.

**Exemplo de resposta:**
```json
  {
    "userId": 1
  }
```

#### `DELETE /users/delete`

Deleta um usuário existe no sistema através do seu ID. Essa funcionalidade está disponível unicamente para usuários que também são administradores.

**Exemplo de resposta:**
```json
  {
    "adminUserId": 1,
    "userId": 2
  }
```

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

#### `GET /users/:id`

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
#### `POST /products/createProduct`

Adiciona um novo produto.

**Parâmetros no corpo da requisição:**
- `name` (obrigatório): Nome do produto.
- `description` (opcional): Descrição do produto.
- `price` (obrigatório): Preço do produto.
- `userId` (opcional): ID do usuário propretário do produto.

**Exemplo de corpo da requisição:**
```json
[
  {
    "id": "1",
    "name": "Smartphone",
    "description": "My Smartphone",
    "price": 1000,
    "userId": 1
  },
  {
    "id": "2",
    "name": "Secondary Smartphone",
    "description": "My secondary smartphone",
    "price": 900,
    "userId": 1
  }
]
```

**Exemplo de resposta:**
```json
[
  {
    "id": "1",
    "name": "Smartphone",
    "description": "My Smartphone",
    "price": 1000,
    "userId": 1
  },
  {
    "id": "2",
    "name": "Secondary Smartphone",
    "description": "My secondary smartphone",
    "price": 900,
    "userId": 1
  }
]
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

#### `POST /orders`

Cria um novo pedido com itens opcionais.

**Exemplo de resposta:**
```json
{
  "id": "1",
  "userId": "1",
  "totalAmount": 59.99,
  "createdAt": "2024-08-16T00:00:00Z",
  "paymentMethod": "CREDIT_CARD",
  "paymentStatus": "PENDING",
  "orderItems": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 29.99
    }
  ]
}
```

#### `POST /orders/:orderId/payment`

Finaliza o pagamento de um pedido existente.

**Exemplo de resposta:**
```json
{
  "id": "1",
  "paymentStatus": "COMPLETED"
}
```

#### `POST /order-items/:orderId`

Adiciona um item a um pedido existente.

**Exemplo de resposta:**
```json
{
  "orderId": "1",
  "productId": "1",
  "quantity": 2,
  "price": 29.99
}
```

#### `GET /orders`

Retorna uma lista de todos os pedidos.

**Exemplo de resposta:**
```json
[
  {
    "id": "1",
    "userId": "1",
    "totalAmount": 59.99,
    "createdAt": "2024-08-16T00:00:00Z",
    "paymentMethod": "CREDIT_CARD",
    "paymentStatus": "PENDING"
  },
  {
    "id": "2",
    "userId": "2",
    "totalAmount": 89.99,
    "createdAt": "2024-08-16T00:00:00Z",
    "paymentMethod": "PAYPAL",
    "paymentStatus": "COMPLETED"
  }
]
```
#### `GET /orders/:id`

Retorna detalhes de um pedido específico pelo ID.

**Exemplo de resposta:**
```json
{
  "id": "1",
  "userId": "1",
  "totalAmount": 59.99,
  "createdAt": "2024-08-16T00:00:00Z",
  "paymentMethod": "CREDIT_CARD",
  "paymentStatus": "PENDING",
  "orderItems": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 29.99
    }
  ]
}
```

#### `DELETE /orders/:id`

Deleta um pedido pelo ID.

**Parâmetros:**
- `id` (obrigatório): ID do pedido.

**Exemplo de resposta:**
```json
{
  "message": "Pedido deletado com sucesso."
}
```

#### `DELETE /orders-items/:id`

Deleta um item de pedido pelo ID.

**Parâmetros:**
- `id` (obrigatório): ID do item de pedido.

**Exemplo de resposta:**
```json
{
  "message": "Item do pedido deletado com sucesso."
}
```

#### `POST /category/`

Cria uma nova categoria.

**Exemplo de resposta:**
```json
{
  "id": "1",
  "name": "Electronics",
  "description": "Devices and gadgets"
}
```

#### `GET /category`

Retorna uma lista de todas as categorias.

**Exemplo de resposta:**
```json
[
  {
    "id": "1",
    "name": "Electronics",
    "description": "Devices and gadgets"
  },
  {
    "id": "2",
    "name": "Furniture",
    "description": "Home and office furniture"
  }
]
```

#### `DELETE /category/:id`

Deleta uma categoria pelo ID.

**Parâmetros:**
- `id` (obrigatório): ID da categoria.

**Exemplo de resposta:**
```json
{
  "message": "Categoria deletada com sucesso."
}
```



