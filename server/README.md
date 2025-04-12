# Backend do Servidor BEEGOL

Este é o backend do servidor BEEGOL, desenvolvido em Flask com suporte a autenticação JWT e integração com banco de dados MySQL. O projeto utiliza Docker para facilitar o desenvolvimento e deploy.

## Funcionalidades Implementadas

### Autenticação
- Endpoint `/login` para autenticação de usuários
- Proteção de rotas com JWT (JSON Web Tokens)

### Diagnósticos
- Endpoint `/diagnostics` para consulta de diagnósticos com suporte a:
  - Paginação (`page` e `limit`)
  - Filtros por:
    - `device_id`
    - `city`
    - `state`
    - `date`

### Localizações
- Endpoint `/diagnostics/locations` para listar todas as cidades e estados disponíveis
- Retorna dados agrupados por estado

### Métricas
- Endpoint `/metrics` para análise de métricas com:
  - Soma de latência por dia
  - Soma de perda de pacotes por dia
  - Filtros por estado e cidade

## Tecnologias Utilizadas
- Flask (Framework Python)
- MySQL (Banco de Dados)
- JWT (Autenticação)
- Docker (Containerização)
- Flask-CORS (Cross-Origin Resource Sharing)

## Instruções de Execução

1. **Pré-requisitos**
   - Docker instalado
   - Docker Compose instalado

2. **Configuração do Ambiente**
   ```bash
   # Construir as imagens Docker
   docker-compose build

   # Iniciar os containers
   docker-compose up
   ```

3. **Acesso à API**
   - A API estará disponível em `http://localhost:5000`
   - Credenciais padrão:
     - Usuário: `admin`
     - Senha: `123456`

4. **Endpoints Disponíveis**
   - `POST /login` - Autenticação
   - `GET /diagnostics` - Lista de diagnósticos
   - `GET /diagnostics/locations` - Lista de localizações
   - `GET /metrics` - Métricas de desempenho

## Estrutura do Projeto
```
.
├── main.py              # Arquivo principal da aplicação
├── docker-compose.yml   # Configuração do Docker Compose
├── init/               # Scripts de inicialização
└── db/                 # Arquivos relacionados ao banco de dados
```

