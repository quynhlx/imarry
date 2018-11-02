import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Table } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Table.create({ ...body, createdBy: user })
    .then((table) => table.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Table.count(query)
    .then(count => Table.find(query, select, cursor)
      .populate('createdBy')
      .populate('seats')
      .populate('checkedInSeats')
      .then((tables) => ({
        count,
        rows: tables.map((table) => table.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Table.findById(params.id)
    .populate('createdBy')
    .populate('seats')
    .populate('checkedInSeats')
    .then(notFound(res))
    .then((table) => table ? table.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Table.findById(params.id)
    .populate('createdBy')
    .populate('seats')
    .populate('checkedInSeats')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((table) => table ? Object.assign(table, body).save() : null)
    .then((table) => table ? table.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Table.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((table) => table ? table.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const findByGuest = ({ params }, res, next) =>
  Table.findOne({seats: {$elemMatch: {$in: params.id}}})
    .populate('createdBy')
    .populate('seats')
    .populate('checkedInSeats')
    .then(notFound(res))
    .then((table) => table ? table.view() : null)
    .then(success(res))
    .catch(next)
