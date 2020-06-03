import { Request, Response} from 'express'
import knex from '../database/connection'

class PointsController {
  async index(req: Request, resp: Response) {
    const { city, uf, items } = req.query

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    const points = await knex('points')
      .join('points', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    return resp.json(points)
  }

  async show(req: Request, resp: Response) {
    const { id } = req.params

    const point = await knex('points').where('id', id).first()

    if (!point) return resp.status(400).json({ message: 'Point not found'})

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return resp.json({ point, items })

  }

  async create(req: Request, resp: Response) {
    // short sintax com desestruturação
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body

    // transaction é usado caso uma query falhar as outras não serão salvas
    const trx = await knex.transaction()

    const point = {
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const insertedIds = await trx('points').insert(point)

    const point_id = insertedIds[0]

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      }
    })

    await trx('point_items').insert(pointItems)

    await trx.commit() // para realmente fazer a transaction

    return resp.json({
      id: point_id,
      ...point // ... pega tudo dentro de um objeto e coloca em outro
    })
  }
}

export default PointsController
