Calculadora de IMC
Descrição do Projeto
O projeto é uma aplicação web desenvolvida com Node.js, Express.js e EJS e utiliza o padrão MVC. O sistema tem como objetivo permitir o cálculo do Índice de Massa Corporal (IMC) dos usuários, assim como manter um pequeno histórico. A base de dados é feita para armazenar a identificação do usuário e registros de altura e de peso, garantindo o histórico do usuário.

Estrutura do Projeto
server.js: Arquivo principal para iniciar o servidor.

routes/: Contém as rotas principais do sistema.

controllers/: Lógica de controle separada por funcionalidade.

models/: Representa a estrutura dos dados (usuários e medidas).

views/: Páginas renderizadas com EJS.

public/: Arquivos estáticos (CSS, imagens, etc.).

Modelagem do Banco de Dados

A base de dados armazena:

Usuário: 
ID do usuário

Medidas:
registros de altura e de peso por usuário

Como Rodar o Projeto
Clone o repositório:

bash
Copy
Edit
git clone no repositório

Instale as dependências:

bash
Copy
Edit
npm install
Inicie o servidor:

bash
Copy
Edit
npm start
Acesse no navegador: http://localhost:3000

Tecnologias Utilizadas:

Node.js

Express.js

EJS