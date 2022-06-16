# Projeto TrybeSmith :hammer_and_pick:

## Contexto :selfie:

Neste projeto, foi desenvolvido um **CRUD** (_Create, Read, Update_ e _Delete_) de itens medievais, no formato de uma _API_, utilizando _Typescript_ e alguns _endpoints_ capazes de ler e escrever em um banco de dados, utilizando o **MySQL**.


## Técnologias usadas :technologist:

- Projeto desenvolvido em NodeJs, utilizando a biblioteca Express para criação da API RESTful.
- Sequelize para criação e associação de tabelas MySQL.

## Habilidades desenvolvidas

Neste projeto, consegui desenvolver as seguintes habilidades:

- Declarar variáveis e funções com tipagens _Typescript_;

- Construir uma _API Node Express_ utilizando o _Typescript_.

## Executando aplicação

1. Clone o repositório
  * `git clone git@github.com:LucasAccurcio/trybesmith.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd trybesmith`

2. Instalando os pacotes necessários:
  - `npm install`

3. Altere o arquivo .env-example para .env
  * Altere os dados de usuário conforme os dados do MySql instalado em sua máquina

4. Inicialize o servidor de banco de dados MySQL:
  - **Na própria máquina:**
    * Certifique-se que o servidor MySQL esteja rodando com o comando:
      `sudo systemctl status mysql`
    - Para iniciar o serviço:
      `sudo systemctl start mysql`
    
  - **Através do Docker**
    * Certifique-se que já tenha o Docker instalado em sua máquina.
      - Inicie um container com a imagem do MySQL:
        * `docker container run --name trybesmith -e MYSQL_ROOT_PASSWORD=suasenha -d -p 3306:3306 mysql:5`
        * `docker exec -it trybesmith bash`
         
        * `Não se esqueça de alterar o arquivo .env` :blush:
        * `MYSQL_USER=root`
        * `MYSQL_PASSWORD=suasenha`
        

5. Inicializando a API:
  - `npm start`

6. Utilize a extensão no VSCode "Thunder Client" ou instale o Postman em sua máquina.

Acesse um endpoint para verificar seu funcionamento:

Cria um usuário - Método POST http://localhost:3000/users

body:
  {
    "username": "No do seu usuário",
    "classe": "ferreiro",
    "level": 1,
    "password": "password_do_seu_usuario"
  }

Será gerado um token que deve ser utilizado para conseguir acessar as próximas rotas.
O token deve ser copiado e colado na guia "Headers" no campo a ser criado "Authorization".
Pronto, você já terá acesso as seguintes rotas:
get('/users');
post('/login');  
post('/products');
get('/products');
get('/orders');
post('/orders');
get('/orders/:id');

Vamos criar um produto e depois consultá-lo?
acesse a rota: POST http://localhost:3000/products
Copie o token no campo Authorization
Na guia body copie o seguinte texto:
  {
    "name": "Espada longa",
    "amount": "30 peças de ouro"
  }

Crie mais outro item:
  {
    "name": "Martelo",
    "amount": "10 peças de ouro"
  }

Mude para rota GET http://localhost:3000/products

Conseguimos consultar todos os produtos criados.