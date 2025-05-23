# SEIDOR-2025

**SEIDOR-2025** é uma API RESTful desenvolvida em TypeScript utilizando Node.js, Express e TypeORM. O projeto gerencia entidades como Carros, Motoristas e o uso de veículos, permitindo operações de criação, leitura, atualização e exclusão (CRUD).

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Express**: Framework web para Node.js.
- **TypeORM**: ORM para TypeScript e JavaScript.
- **tsyringe**: Injeção de dependência baseada em decorators.
- **Jest**: Framework de testes em JavaScript.


## 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/mviniciusgc/SEIDOR-2025.git
cd SEIDOR-2025

Instale as dependências:

npm install ou yarn install

Configure o banco de dados:

Está sendo útilizado o PostgresDB, o mesmo está sendo configurado pelo DockerCopose.
Para inciar precisa ter instalado o docker e rodar o comando  "docker compose up".

Inicie a aplicação:

npm run dev ou yarn dev

Testes
Para executar os testes unitários:

npm run test


Rotas da API

🚗 Carros
GET /cars/find Lista todos os carros é possiel fazer o filtro pela cor e marca.

exemplo body:

{
    "cor": "Preto",
    "marca": "toyota"
}

GET /cars/findOne/:id Obtém detalhes de um carro específico.

POST /cars Cria um novo carro.

exemplo body:

{
    "marca": "toyota",
    "cor":"branco",
    "placa": "11111"
}

PUT /cars/update/:id Atualiza as informações de um carro existente.

exemplo body:

{
    "placa": "5555"
}

DELETE /cars/delete/:id Remove um carro.

👨‍✈️ Motoristas

GET /drive/find Lista todos os motoristas.

GET /drive/findOne/:id Obtém detalhes de um motorista específico.

POST /drive Cria um novo motorista.

exemplo body:

{
    "nome": "Marcos"
}

PUT /drive/:id Atualiza as informações de um motorista existente.

exemplo body:

{
    "nome": "Marcos Silva"
}

DELETE /drive/:id Remove um motorista.

🚘 Uso de Veículos

GET /carUse/find Lista todos os registros de uso de veículos.

POST /carUse Cria um novo registro de uso de veículo.

exemplo body:

{
    "carId": "Id do carro cadastrado",
    "driveId": "Id do motorista cadastrado",
    "dataInicio": "2025-05-23T12:00:00.000Z",
    "dataFim": "2025-05-25T12:00:00.000Z",
    "motivo": "Aluguel"
}

DELETE /carUse/delete/:id: Remove um registro de uso de veículo.

---