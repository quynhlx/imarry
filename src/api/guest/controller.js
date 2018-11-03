import { success, notFound } from '../../services/response/'
import { Guest } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Guest.create(body)
    .then((guest) => guest.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  cursor = {
    limit: 1000,
    skip: 0,
    sort: { createdAt: -1 }
  }
  return Guest.count(query)
    .then(count => Guest.find(query, select, cursor)
      .then((guests) => ({
        count,
        rows: guests.map((guest) => guest.view())
      }))
    )
    .then(success(res))
    .catch(next)
}
export const show = ({ params }, res, next) =>
  Guest.findById(params.id)
    .then(notFound(res))
    .then((guest) => guest ? guest.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Guest.findById(params.id)
    .then(notFound(res))
    .then((guest) => guest ? Object.assign(guest, body).save() : null)
    .then((guest) => guest ? guest.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Guest.findById(params.id)
    .then(notFound(res))
    .then((guest) => guest ? guest.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const scan = ({ query }, res, next) => {
  console.log(query)
  Guest.findOne({code: query.code})
    .then(notFound(res))
    .then((guest) => guest ? guest.view() : null)
    .then(success(res))
    .catch(next)
}
