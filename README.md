
# NG.CASH (Backend)

Backend do Processo Seletivo NG <> TRYBE.



## Stack utilizada

**Back-end:** Node, Express, Postgres, Typescript, TypeORM


## Como rodar

Primeiro verifique as configurações do banco de dados no arquivo **data-source.ts**  
Em seguida, rode o comando a seguir para instalar as dependências.

```bash
  npm install
```

E para inicializar o servidor:
```bash
  npm run dev
```
    
## Documentação da API

#### Cria um usuário, inicializado com 100 reais na conta

```http
  POST /user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. Nome de usuário |
| `password` | `string` | **Obrigatório**. Senha |

#### Faz uma transação entre dois usuários

```http
  POST /transaction?token=${TOKEN GERADO}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `creditedUsername`      | `string` | **Obrigatório**. Usuário para quem enviar o valor |
| `value`      | `number` | **Obrigatório**. Valor a ser transferido |

#### Faz login gerando um token

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. Nome de usuário |
| `password` | `string` | **Obrigatório**. Senha |

#### Verifica se o token é válido

```http
  POST /jwt/verify
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. Token para validar |

#### Retorna as transações do usuário

```http
  GET /transactions?token=${TOKEN GERADO}&date=${DATA}&filter=${"cash-in" | "cash-out"}
```

#### Retorna o saldo do usuário

```http
  GET /balance?token=${TOKEN GERADO}
```
