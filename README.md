<p align="center">
  <img src="https://i.ibb.co/wzjWgnK/capybara.png">
</p>

<h1 align="center">Kapivara Intregation API</h1>

<p align="center">
  Api para integração entre as plataformas Pipedrive e Bling
</p>

## Características

* 🔍 Busca as oportunidades ganhas no
[Pipedrive](https://www.pipedrive.com/pt) e insere como pedido no [Bling](https://www.bling.com.br/home).
* 📝 Mostrar as oportunidades inseridas no Bling por dia e valor total.
* 🍃 Banco de dados [MongoDB](https://www.mongodb.com/)
* ✍🏼 Desenvolvido utilizando [Typescript](https://www.typescriptlang.org/)
* 🐳 Aplicação em container [Docker](https://www.docker.com/)

## Instalação

### Pré requisitos

Antes de tudo, é necessário ter os seguintes pré requisitos rodando em sua máquina:

* [Git](https://git-scm.com/)
* [NodeJs](https://nodejs.org)
* [Yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com/) (Só se você quiser executar em container)

### Clonando o projeto

O próximo passo é abrir o terminal, clonar o projeto e instalar as dependências instaladas.

```sh
git clone https://github.com/nathanribeiroo/kapivara-intregation.git
```

## Configuração do Arquivo .env

O arquivo `.env` é onde estará as informações de conectividade, ambiente e seguraça. É ela que será alterado caso mude a forma de execução do projeto. A seguir está todas as variáveis listadas.
```ini
DATABASE_URL=*** # url do banco mongoDB
APITOKEN_BLING=*** # token do bling
APITOKEN_PIPEDRIVE=*** # token do pipedrive
PORT=3333 # porta do serviço back-end api
```
**Na raiz do projeto existe um arquivo `example.env`, se quiser é só renomear o arquivo para `.env` que vai funcionar. Ou criar um arquivo com as informações que preferir.**

## Iniciando a aplicação com Docker

Antes de iniciar, configure o arquivo `.env` para essa situação vendo [*aqui*](##-Configuração-do-Arquivo-.env).

```sh
docker-compose up --build
```
E agora nas próximas vezes, só executar:
```sh
docker-compose up
```

## Iniciando a aplicação Localmente

Antes de iniciar, configure o arquivo `.env` para essa situação vendo [*aqui*](##-Configuração-do-Arquivo-.env).


Instalando as dependências
```sh
yarn
```

Criando o build do projeto
```sh
yarn build
```

Executando o projeto
```sh
yarn start
```

## Usando a API

Ao consumir a API, defina como padrão a base url como:

`http://localhost:3333`

### Sincronizar Pipedrive com Bling

Rota para sincronizar as oportunidades ganhas no Pipedrive no Bling e adicionar no banco de dados.

**[GET]** `/opportunities/sync`

**RESPONSE**

**STATUS 201**

retorna as oportunidades inseridas no bling e no mongodb
```json
[
  {
    "_id": "6031a5b3dfedd6001b9f1e2a",
    "numero": "336",
    "idPedido": 11372465576,
    "value": 0,
    "orgName": "sape",
    "__v": 0,
    "createdAt": "2021-02-21T00:13:39.919Z",
    "updatedAt": "2021-02-21T00:13:39.919Z"
  }
  ...
]
```

**STATUS 200**

```json
{
  "message": "Todas as oportunidades já estão sincronizadas com o bling e o banco mongodb."
}
```

**STATUS 404**

```json
{
  "message": "Não foi encontrado oportunidades no pipedrive com status igual a ganho."
}
```

### Listagem de oportunidades por dia

Rota que lista todas as oportunidades por dia

**[GET]** `/opportunities`

**RESPONSE**

**STATUS 200**

```json
[
  {
    "_id": "21/02/2021",
    "totalValue": 0,
    "opportunities": [
      {
        "_id": "6031a5b3dfedd6001b9f1e2a",
        "numero": "336",
        "idPedido": 11372465576,
        "value": 0,
        "orgName": "sape",
        "date": "21/02/2021"
      }
    ]
  },
  ...
```
