# Calculadora de IMC - Documento de Aplicação Web (WAD)

## Autor
Gabriel Andrei dos Reis

## 1. Introdução
&ensp;A aplicação web tem como objetivo calcular o Índice de Massa Corporal (IMC) de um usuário a partir de dados de altura e peso. O sistema permite o cadastro de usuários, bem como o registro de entradas de altura e de peso por usuário, armazenando essas informações em um banco de dados. A arquitetura da aplicação segue o padrão MVC, utilizando Node.js com o framework Express.js e EJS.

## 2. Arquitetura do Sistema

### 2.1 Visão Geral
&ensp;A aplicação segue o padrão de arquitetura MVC (Model-View-Controller), que separa a lógica de negócios da interface do usuário, permitindo desenvolvimento, manutenção e evolução independentes. O sistema utiliza uma arquitetura em camadas distribuída conforme demonstrado no diagrama abaixo:

![Diagrama de Arquitetura](../assets/arquitetura.jpg)

### 2.2 Detalhamento da Arquitetura

#### 2.2.1 Frontend (Parte Visual)
- **Tecnologia**: EJS para criar as páginas
- **O que tem**: 
  - Páginas HTML organizadas
  - CSS para deixar bonito
  - JavaScript para interações
- **O que faz**:
  - Mostra as páginas para o usuário
  - Verifica se os dados estão corretos
  - Comunicação com o backend

#### 2.2.2 Backend (Servidor)
- **Tecnologia**: Node.js com Express
- **Atributos da aplicação**:
  - Server.js - arquivo principal
  - Middlewares para processar requisições
  - Sistema de rotas organizado

#### 2.2.3 Organização MVC

**Models (Dados)**:
- `userModel.js` - usa os dados de usuários
- `measurementModel.js` - usa os dados de altura, peso e IMC
- Se conectam com o banco PostgreSQL

**Views (Telas)**:
- `calculator.ejs` - tela da calculadora
- `history.ejs` - tela do histórico
- `error.ejs` - tela de erro

**Controllers (Lógica)**:
- `userController.js` - cuida dos usuários
- `bmiController.js` - cuida dos cálculos de IMC
- Comunicação entre as telas e os dados

**Services (Regras de Negócio)**:
- `userService.js` - regras específicas dos usuários

#### 2.2.4 Banco de Dados
- **Sistema**: PostgreSQL
- **Como funciona**: Pool de conexões para ser mais rápido
- **Estrutura**: 4 tabelas conectadas
- **Segurança**: Proteção contra ataques SQL

### 2.3 Como os Dados Circulam

#### 2.3.1 No cálculo de IMC
1. Usuário preenche o formulário
2. Tela envia os dados para o servidor
3. Rota direciona para o controller certo
4. Controller valida e processa os dados
5. Model salva no banco de dados
6. Resultado volta para a tela
7. Usuário vê o resultado

#### 2.3.2 Erro
- Sistema captura erros em todas as partes
- Mostra mensagens claras para o usuário
- Registra erros para correção

### 2.4 Performance e Crescimento

#### 2.4.1 performance
- **Conexões do Banco**: Reutiliza conexões
- **Consultas**: Otimizadas para serem rápidas
- **Código**: Bem organizado em módulos

## 3. Banco de Dados

### 3.1 Modelagem do Banco de Dados
![Diagrama da base de dados](../assets/DBdiagram.png)

### 3.2 Estrutura das Tabelas

#### Tabela: users
| Campo | Tipo | Descrição |
|-------|------|-----------|
| user_id | SERIAL | Identificador único do usuário (PK) |
| name | VARCHAR(100) | Nome do usuário |
| email | VARCHAR(100) | Email do usuário (UNIQUE) |
| created_at | TIMESTAMP | Data e hora de criação do registro |

#### Tabela: height
| Campo | Tipo | Descrição |
|-------|------|-----------|
| height_id | SERIAL | Identificador único da altura (PK) |
| user_id | INTEGER | Referência ao usuário (FK) |
| value | FLOAT | Valor da altura em metros |
| entry_date | DATE | Data de registro da altura |

#### Tabela: weight
| Campo | Tipo | Descrição |
|-------|------|-----------|
| weight_id | SERIAL | Identificador único do peso (PK) |
| user_id | INTEGER | Referência ao usuário (FK) |
| value | FLOAT | Valor do peso em kg |
| entry_date | DATE | Data de registro do peso |

#### Tabela: bmi
| Campo | Tipo | Descrição |
|-------|------|-----------|
| bmi_id | SERIAL | Identificador único do IMC (PK) |
| height_id | INTEGER | Referência à altura (FK) |
| weight_id | INTEGER | Referência ao peso (FK) |
| value | FLOAT | Valor calculado do IMC |
| measure_date | DATE | Data de cálculo do IMC |

### 3.3 Relacionamentos
- Um usuário pode ter múltiplos registros de altura (1:N)
- Um usuário pode ter múltiplos registros de peso (1:N)
- Cada registro de IMC está associado a um registro de altura e um de peso (N:1)

## 4. API e Endpoints

### 4.1 API REST
&ensp;A aplicação expõe uma API REST para interação com o frontend e possíveis integrações com outros sistemas.

#### Endpoints de Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/users | Lista todos os usuários |
| GET | /api/users/:id | Obtém detalhes de um usuário específico |
| POST | /api/users | Cria um novo usuário |
| PUT | /api/users/:id | Atualiza dados de um usuário existente |
| DELETE | /api/users/:id | Remove um usuário |

#### Endpoints de IMC
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/bmi/calculate | Calcula e armazena o IMC |
| GET | /api/bmi/history/:userId | Obtém histórico de IMC de um usuário |

### 4.2 Rotas do Frontend
| Método | Endpoint | View | Descrição |
|--------|----------|------|-----------|
| GET | / | calculator.ejs | Página principal com calculadora de IMC |
| GET | /history | history.ejs | Histórico de medições do usuário |

## 5. Fluxo de Dados e Funcionalidades

### 5.1 Cálculo de IMC
1. Usuário insere nome, email, altura e peso no formulário
2. Aplicação verifica se o usuário já existe (pelo email)
3. Registros de altura e peso são criados e associados ao usuário
4. IMC é calculado (peso / altura²) e armazenado
5. Resultado é exibido para o usuário com sua classificação

### 5.2 Visualização de Histórico
1. Usuário acessa a página de histórico
2. Sistema busca todas as medições associadas ao usuário
3. Dados são organizados em ordem cronológica
4. Histórico é exibido com valores de altura, peso, IMC e classificação

## 6. Segurança e Performance

### 6.1 Segurança
- Validação de dados de entrada
- Proteção contra injeção SQL usando consultas parametrizadas
- Variáveis de ambiente para credenciais sensíveis

### 6.2 Performance
- Conexões de banco de dados otimizadas usando pool de conexões
- Indices nas colunas mais consultadas para melhorar a performance
- Carregamento assíncrono de recursos

## 7. Conclusão
&ensp;A Calculadora de IMC proporciona uma maneira simples e eficiente para os usuários calcularem e acompanharem seu Índice de Massa Corporal ao longo do tempo. A arquitetura MVC proporciona uma base sólida para manutenção e expansão futura do sistema.