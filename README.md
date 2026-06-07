# frontend

Interface web do sistema Rastreador de Habitos. Construida com HTML, CSS e JavaScript puro, consumindo a API do BFF.

## Stack

- HTML5
- CSS3
- JavaScript (ES Modules, sem framework)

## Funcionalidades

- Cadastro de conta com login automatico apos o registro.
- Persistencia de sessao via localStorage.
- Dashboard com cards exibindo nome, descricao, status e streak atual de cada habito.
- Criacao, edicao, ativacao, desativacao e exclusao de habitos.
- Check-in diario com atualizacao imediata do streak.

## Estrutura

```
frontend/
├── index.html       Login e cadastro
├── dashboard.html   Dashboard de gerenciamento de habitos
└── js/
    └── api.js       Todas as chamadas HTTP ao BFF
```

## Executando localmente

Abra o `index.html` com um servidor de arquivos estaticos, como a extensao Live Server do VS Code. O BFF precisa estar em execucao na porta 8082.

## Executando com Docker

Em producao, o frontend e servido pelo Nginx na porta 80. Consulte o repositorio principal da organizacao [rastreador-habitos](https://github.com/rastreador-habitos) para o `docker-compose.yml` completo.
