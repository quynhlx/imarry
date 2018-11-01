import { Table } from '.'
import { User } from '../user'

let user, table

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  table = await Table.create({ createdBy: user, name: 'test', total: 'test', seats: 'test', checkedInSeats: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = table.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(table.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.name).toBe(table.name)
    expect(view.total).toBe(table.total)
    expect(view.seats).toBe(table.seats)
    expect(view.checkedInSeats).toBe(table.checkedInSeats)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = table.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(table.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.name).toBe(table.name)
    expect(view.total).toBe(table.total)
    expect(view.seats).toBe(table.seats)
    expect(view.checkedInSeats).toBe(table.checkedInSeats)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
