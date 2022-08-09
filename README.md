# Orenda-Softeng Test

A preliminary test from Orenda for recruitement purposes.

## Run Locally

Clone the project

```bash
  git clone https://github.com/primeXist/Orenda-Softeng.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

# API Reference

## Register

Endpoint to register one or more users.

```http
  POST /api/register
```

| Body                                                    |
| :------------------------------------------------------ |
| `{ User:[“example1@email.com”,”example2@email.com”] } ` |

#### Response : **204** No Content

## Remove task

Endpoint to assign task for each user.

```http
  GET /api/unassign
```

| Body                                                            |
| :-------------------------------------------------------------- |
| `{user: “example1@email.com”, tasks: [“Buy eggs”, “Buy milk”]}` |

#### Response : **204** No Content

## Assign task

Endpoint to remove task for each user.

```http
  GET /api/assign
```

| Body                                                            |
| :-------------------------------------------------------------- |
| `{user: “example1@email.com”, tasks: [“Buy eggs”, “Buy milk”]}` |

#### Response : **204** No Content

## Common task

Endpoint to check common task between users.

```http
  GET /api/tasks/common
```

| Body                                                    |
| :------------------------------------------------------ |
| ` { user:[“example1@email.com”,”example2@email.com”] }` |

#### Response : **200**

```json
{ "tasks": [“Buy eggs”, “Buy milk”]}
```
