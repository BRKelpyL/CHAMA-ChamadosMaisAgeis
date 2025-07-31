# CHAMA - Chamados Mais Ágeis

Esse projeto tem como finalidade registrar o avanço do desenvolvimento do sistema de abertura de resolução de chamados internos.

### Sobre O projeto:

- Objetivo:

  O objetivo do projeto é agilizar e coordenar as demandas da empresa, bem como acompanhar o resultado dos funcionários. Para isso, o sistema deverá possuir, dentre outras características:

  - Baixa curva de aprendizagem;
  - Rápida replicação;
  - Simples implementação; e
  - E fácil manutenção.

- MVP:

  A ideia que temos para o MVP dessa aplicação está separada por área do desenvolvimento.

  No geral, o que esperamos é um app que possibilite:

  - A criação, visualização, edição e exclusão de chamados e usuários;
  - O acesso autenticado dos usuários;
  - Acesso a dados de contato do solicitante para que possa ser solicitada informações que contribuam para resolução do problema;
  - Interface web simples e intuitiva.

- Tecnologias Utilizadas:

  - Typescript;
  - NodeJS;
  - ExpressJS;
  - Docker.

- Project Manager:

  [www.linkedin.com/Kelpy](https://www.linkedin.com/in/kelpy-de-azevedo-lima)

### Como Executar em Sua Máquina
A aplicação foi pensada para todos os níveis de usuários, inclusive para os leigos no assunto. Por enquanto, bastam 4 etapas para utilização do sistema:

Primeiro é necessário instalar em seu servidor Linux ou Windows o Docker. Para isso, basta seguir a documentação que pode ser encontrada no site oficial do projeto (https://docs.docker.com). Se tiver alguma dúvida nessa etapa, recomendo que faça uso do Youtube para compreender como a ferramenta funciona e como prosseguir com a instalação para a sua distribuição de sistema operacional. Acredite, essa ferramenta incrível e poderosa será sua grande aliada quando o assunto é utilização de softwares de código aberto. Vide Canal DioLinux para mais informações didáticas e de fácil acesso sobre o tema.

A segunda etapa consiste na clonagem do código fonte da aplicação para o seu servidor. Essa etapa envolve outras pequenas tarefas que eu espero que você já tenha prévio conhecimento (escolha do local do arquivo, acesso por meio de CLI, etc). Assim que estiver com o terminal na pasta em que deseja salvar os arquivos, digite o comando: 
```
git clone https://github.com/BRKelpyL/CHAMA-ChamadosMaisAgeis.git
```
Ele fará com que o código fonte da aplicação seja baixado localmente em seu servidor.

A terceira etapa é incrivelmente simples e envolve apenas a criação de um arquivo com as variáveis de ambiente necessárias para a execução da aplicação. Para isso crie um arquivo com o nome ".env" (sem as aspas), digite o texto a seguir e insira as informações nos campos em branco:
```
# Variables de ambiente para o Docker Compose
POSTGRES_USER= #ex.: admin
POSTGRES_PASSWORD= #ex.: admin
POSTGRES_DB= #ex.: prod_db

# Application environment variables
SERVER_PORT=4001

# Variáveis de ambiente para o Banco de Dados
PROD_DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@chama-db:5432/${POSTGRES_DB}

DATABASE_URL=${PROD_DATABASE_URL}
```
O ideal é que você já tenha uma noção para que esse arquivo serve e como configurar, mas caso não seja o caso, você pode novamente encontrar materiais bem simples sobre o tema buscando por "Variáveis de Ambiente".

A quarta e última etapa é simplesmente rodar o comando:
```
docker compose up --build
```
Aconteceu algum bug nessa etapa? Aperte ctrl+c e execute o comando novamente, essa foi a resolução para a maioria dos problemas que encontro enquanto desenvolvo. Gostaria de recomendar novamente que busque sobre Docker Compose, esse conhecimento será essencial para compreender quaisquer problemas que possa enfrentar.

### Versão do OS utilizado para testes
Retorno do comando `lsb_release -a`:
```
Distributor ID:	Ubuntu
Description:	Ubuntu 24.04.2 LTS
Release:	24.04
Codename:	noble
```

### Para Dúvidas, Dicas e Apoio Moral
Entre em contato pelo email: kelpy.a.lima@gmail.com, prometo responder o mais rápido possível.

### Buy Me A Coffee
Esse projeto é gratuito e de código aberto. Eu realmente pretendo aprofundar ele e auxiliar a todos da melhor maneira possível. Sou um Bacharelando em Tecnologia da Informação e ainda assim consigo disponibilizar certo tempo para esse projeto e, se Deus permitir, para outros que tenho em mente. Se você julgar válido, considere contribuir com qualquer quantia para a chave pix
kelpy.a.lima@gmail.com