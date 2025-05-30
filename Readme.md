# Calculadora de IMC

## Descrição do Projeto
&ensp;Esta aplicação web foi desenvolvida com Node.js, Express.js e EJS seguindo o padrão de arquitetura MVC (Model-View-Controller). O sistema permite calcular o Índice de Massa Corporal (IMC) dos usuários e mantém um histórico de medições. A base de dados PostgreSQL armazena informações do usuário, registros de altura e peso, garantindo o acompanhamento do histórico de cada usuário.

## Funcionalidades
- Cadastro e identificação de usuários por email
- Registro de medidas de altura e peso
- Cálculo automático de IMC
- Visualização de histórico de medições
- Classificação do IMC de acordo com padrões de saúde

## Tecnologias Utilizadas
- **Backend**: Node.js, Express.js
- **Frontend**: EJS, CSS, JavaScript
- **Banco de Dados**: PostgreSQL
- **Padrão de Arquitetura**: MVC (Model-View-Controller)
- **Outras ferramentas**: dotenv (variáveis de ambiente), pg (conexão PostgreSQL)


## Modelo de Banco de Dados
O banco de dados consiste em quatro tabelas principais:
- **users**: Armazena informações dos usuários (ID, nome, email)
- **height**: Registra medidas de altura por usuário
- **weight**: Registra medidas de peso por usuário
- **bmi**: Armazena os cálculos de IMC relacionando altura e peso

## Como Executar o Projeto

### Pré-requisitos
- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)

### Instalação
1. Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```
2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
DB_USER=seu_usuario DB_HOST=seu_host DB_DATABASE=seu_banco DB_PASSWORD=sua_senha DB_PORT=5432 DB_SSL=false PORT=3000
```
4. Inicialize o banco de dados:

```bash
npm run init-db
```
5. Inicie o servidor:
```bash
npm start
```
6. Acesse a aplicação no navegador:
```
http://localhost:3000
```

## Uso da Aplicação
1. Na página inicial, preencha seu nome, email, altura (em metros) e peso (em kg)
2. Clique em "Calcular IMC" para obter seu resultado
3. O sistema mostrará seu IMC calculado e sua classificação
4. Acesse "Ver Histórico" para visualizar suas medições anteriores

## Classificação de IMC
- Abaixo de 18,5: Abaixo do peso
- Entre 18,5 e 24,9: Peso normal
- Entre 25 e 29,9: Sobrepeso
- Entre 30 e 34,9: Obesidade Grau I
- Entre 35 e 39,9: Obesidade Grau II
- Acima de 40: Obesidade Grau III

## Autor
Gabriel Andrei dos Reis
