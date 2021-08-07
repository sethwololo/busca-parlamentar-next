<p align="center">
  <a href="https://busca-parlamentar.vercel.app" >
    <img src="https://svgshare.com/i/Zua.svg" alt="BuscaParlamentar" width="420" />
  </a>
</p>
<p align="center">
  Busque dados sobre os senadores rapidamente
</p>
&nbsp;&nbsp;
<p align="center">
  <a href="#sobre">Sobre</a> •
  <a href="#pré-requisitos">Pré-requisitos</a> •
  <a href="#instalando-e-rodando">Instalando e rodando</a> •
  <a href="#em-produção">Em produção</a>
</p>

## **Sobre**

O **BuscaParlamentar** é uma aplicação que busca dados da API de Dados Abertos do Senado Federal e do Serviço de Dados do IBGE para disponibilizar os dados dos parlamentares do Senado Federal de maneira clara e objetiva.

> 💡 ***A aplicação gera as páginas de forma estática e revalida os dados a cada 24 horas. Em caso de erro ao buscar os dados em alguma das APIs, será apresentada uma página sem dados e haverá uma nova tentativa de revalidação em duas horas.***

### **Esse projeto foi construído com:**
+ [Typescript](https://chakra-ui.com/)
+ [React](https://reactjs.org/)
+ [NextJS](https://nextjs.org/)
+ [Chakra UI](https://chakra-ui.com/)


## **Pré-requisitos**

É necessario ter o NodeJS (12.0+) instalado, juntamente com o NPM ou Yarn. O NextJS oferece suporte a sistemas Linux, Windows e MacOS

## **Instalando e rodando**

### Instalando dependências

Apos clonar ou baixar o ZIP do projeto, rode o seguinte comando na pasta raíz para baixar as dependências

```bash
npm install
# ou
yarn install
```

### Iniciando o servidor de desenvolvimento

Para iniciar o servidor de desenvolvimento, execute o seguinte comando

```bash
npm run dev
# ou
yarn dev
```

> A aplicação executará em [http://localhost:3000](http://localhost:3000).

## **Em produção**

### Gerando e executando uma build de produção

Para gerar a build de produção, execute o comando 

```bash
npm run build
# ou
yarn build
```

Após gerar o build, execute o servidor de produção com

```bash
# É possível mudar a porta com o argumento -p
# Por exemplo: yarn start -p 3001

npm run start
# ou
yarn start
```


