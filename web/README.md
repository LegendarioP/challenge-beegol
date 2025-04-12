## Executando o Projeto Sem Docker

Para rodar o projeto localmente sem usar Docker, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados no seu sistema:
- [Node.js](https://nodejs.org/) (recomenda-se a versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos

1. **Clone o Repositório**  
   Clone o repositório do projeto para sua máquina local:
   ```bash
   git clone https://github.com/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as Dependências**  
   Instale as dependências necessárias usando npm ou yarn:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o Servidor de Desenvolvimento**  
   Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a Aplicação**  
   Abra o navegador e navegue até `http://localhost:5173` (ou a porta especificada no terminal) para visualizar a aplicação.

### Comandos Adicionais

- **Build para Produção**  
  Para criar uma build de produção da aplicação:
  ```bash
  npm run build
  # ou
  yarn build
  ```

- **Pré-visualizar a Build de Produção**  
  Para pré-visualizar a build de produção localmente:
  ```bash
  npm run preview
  # ou
  yarn preview
  ```

### Solução de Problemas

Se você encontrar problemas, certifique-se de que todas as dependências foram instaladas corretamente e que a versão do Node.js atende aos requisitos. Você também pode verificar os logs no terminal para mais detalhes.