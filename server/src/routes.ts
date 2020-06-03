import express from 'express'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router()
const pointsController = new PointsController()
const itemsController = new ItemsController()

/*
-- Controllers Patterns --
index: se for uma listagem
show: se for exibir um único registro daquele
create/store:
update:
delete/destroy:
*/
routes.get('/items', itemsController.index)

routes.post('/points', pointsController.create)

routes.get('/points', pointsController.index)

routes.get('/points/:id', pointsController.show)


export default routes
