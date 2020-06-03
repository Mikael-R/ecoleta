import express from 'express'
import cors from 'cors'
import routes from './routes'
import path from 'path'

const app = express()

// O app.use é como uma importação de plugins para o express

// O cors define quais url web terão acesso a api
app.use(cors())

// Faz com que o app entenda o corpo da requisição em formato json
app.use(express.json())

// Usa as rotas em outro arquivo
app.use(routes)

/*
-- Definições --
ROTA: Endereço completo de requisição
RECURSO: Qual entidade estamos acessando no sistema

-- Tipos de Rotas --
GET: Buscar uma ou mais informações no back-end
POST: Criar uma nova informação no back-end
PUT: Atualizar uma informação no back-end
DELETE: Remover uma informação no back-end

-- Exemplos de Rotas --
POST: http://localhost:3333/users = Criar um usuário
GET: http://localhost:3333/users = Buscar usuários
GET: http://localhost:3333/users/0 = Buscar usuário com ID 0

-- Tipos de Parâmetros --
Request Param: Parâmetros que vem na própria rota que indentificam um recurso sendo obrigatório
Query Param: Parâmetros que vem na própria rota geralmente opcionais para filtro e paginação
Request Body: Parâmetros para criação e atualização de informações

-- Exemplos de Parâmetros --
Request Param: http://localhost:3333/users/0
Query Param: http://localhost:3333/users?search=Mi
Request Body:
*/

// Serve arquivos estaticos http://localhost:3333/uploads/baterias.svg
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333)
