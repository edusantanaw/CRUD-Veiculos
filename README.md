
## Explicação do que foi feito:
## Backend
O Backend foi organizado nas seguintes pastas:
    
* Main: Configurações do servidor, middlewares, factorys, adapters e routes.
* Presentational: Controllers, schemas de validação e helpers.
* Infra: Repositorios que faz o acesso ao banco de dados.
* Domain: Entidades e contratos de casos de uso.
* Data: Implementações de casos de uso.
* types: Tipos globais da aplicação.
* util: Funcionalidades reutilizaveis.

Outros
* Test: Testes unitarios e mocks.
* Prisma: Models e configurações do primsa.

Funcionalidades:
  
  * Autenticação: Para a implemetação da autenticação foi utilizado o jwt, o usario pode se autenticar via as rotas publicas signin e signup, após se cadastrar ou fazer o login é gerado um token, que é enviado para o lado do cliente e salvo no local ou session storage da aplicação. Para verificar se o usuario está de fato autênticado foi criado um middleware.
 * Crud de carros: Para a criação ou atualizaçao de carros, foi criado um schema de validação com o zod, se os dados fornecidos forem validos o caso de uso de criação ou atualização é chamado. Para a consulta foram criados dois controllers e dois casos de genericos, loadAll e loadById, para a criação desses objetos, usei o padrão factory, que especifico apenas o positorio será usado. Para deletar o carro foi criado um controller generico e um caso de uso especifico para a exclusão de carros, que verifica se não existe reabastecimento relacionados antes da exclusao.
* Crud de abastecimento: Este crud foi criado de uma forma muito parecida com o de carros.

## Frontend

O Frontend foi oganizado nas seguintes pastas:

* Pages: As paginás do projeto como  as de autenticação, carros e abastecimennto.
* Constants: Variaveis constantes na aplicação.
* Routes: As rotas do projeto como signin, signup, carros, abastecimento.
* Services: Requisições especificas para o backend.
* Shared: Arquivos compartilhados no projeto como os de layout, hooks, componentes, contextos, tipos e schema de validação.
* Styles: Estilos globais da aplicação.

### Funcionalidades: 
* Autenticação: Para a autenticação foi criado um contexto, neste contexto existe os estados de token e usuario, função para autenticação e funcões para gerenciar o storage. Tambem foi criado um hook que verifica se o usuario está logado.
* Criação de carros: Para criação de carro foi utilizado o formik e yup para fazer a validação destes inputs, se estes dados estiverem corretos, é chamada a função handleCreate, que chama a função usePost para usado fazer a requisição a api e persiste estes dados.
* Consuta de dados: Para a consulta de dados, foi criado um hook chamdo useFetch, no qual a faz uma requisição a api usando o metodo get.
* Vizualição em datagrid: Para a vizualição dos dados, foi utilizado o data-grid do Material Ui, utilizando os o hook useFetching para obter estes dados. este grid tem as funcionalidades edit e remover, que ao selecionalas e aberto um modal.

## Como iniciar o projeto?

### Backend
Para instalar e executar o backend projeto em sua máquina local, siga estas etapas: 

 * Para a instalação de dependecias, execute o comando:

           yarn ou npm install

 * No arquivo .env, mude a string de conexão com as credências do o banco de dados. Seguindo o exemplo: 

         "postgresql://user:password@localhost:5432/database?schema=public"

* Em seguida, no terminal execute o comando para iniciar o backend.

        yarn dev ou npm run dev


### Frontend

Para instalar e executar o frontend projeto em sua máquina local, siga estas etapas:

* Para a instalação de dependecias, execute o comando: 

        yarn ou npm install   
    
 * Em seguida, no terminal execute o comando para iniciar o frontend:

        yarn dev ou npm run dev

   

## Tecnlogias utilizadas: 

### Frontend
   *  ReactJs
   *  Material UI
   *  Typescript
   *  Formik
   *  Styled components
   *  Yup
   *  Vite

### Backend
   *  NodeJs
   *  Postgres
   *  Prisma
   *  ExpressJS
   *  Zod
   *  Jest
   *  Typescript