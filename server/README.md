# Backend do Servidor BEEGOL

Este é o backend do servidor BEEGOL, desenvolvido em ambiente Docker para facilitar a criação de imagens e acelerar o processo de deploy.

> **Observação:** O projeto está em desenvolvimento. Abaixo, você encontra um checklist atualizado com os pontos implementados e pendentes.

---

## Checklist de Implementação

- [x] **Rota "diagnostics":**  
  - Início da implementação da rota para acesso aos diagnósticos de rede.
  
- [x] **Estrutura dos Endpoints:**  
  - Definição inicial da estrutura, separando endpoints responsáveis por paginação e agregação.

- [x] **Conexão com o Banco de Dados:**  
  - Criação dos scripts iniciais para conexão, utilizando SQLite para desenvolvimento (ou outro banco definido).

- [x] **Endpoint de Paginação:**  
  - Desenvolvimento da lógica para retornar dados de forma paginada, com suporte aos parâmetros `page` e `limit`.
  - Implementação de filtros de consulta por `city` e `state` para refinar os resultados.

- [ ] **Endpoint de Agregação:**  
  - Implementar a lógica para agrupar os diagnósticos por data, realizando a soma de latência e perda de pacotes.
  - Adicionar suporte aos filtros (caso aplicável).

- [ ] **Documentação:**  
  - Atualizar este README com detalhes dos endpoints implementados e instruções de execução do backend.

---

## Instruções de Execução

1. **Ambiente Docker:**  
   Garanta que o Docker esteja instalado em sua máquina. Utilize os arquivos de configuração disponíveis para criar e iniciar o container da aplicação.

2. **Criação da Imagem:**  
   Execute os comandos do Makefile para build e deploy da imagem, facilitando a execução e os testes do servidor.

3. **Testes:**  
   Realize testes dos endpoints implementados (por exemplo, via Postman ou cURL) para confirmar o funcionamento da rota "diagnostics" e da funcionalidade de paginação.

4. **Atualizações:**  
   Consulte este README para acompanhar as próximas etapas de desenvolvimento e atualizações na documentação.

---

Este documento será atualizado conforme o progresso do projeto. Em caso de dúvidas ou para contribuições, favor contatar a equipe de desenvolvimento.
