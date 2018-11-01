import { Guest } from '.'

let guest

beforeEach(async () => {
  guest = await Guest.create({ name: 'test', phoneNumber: 'test', status: 'test', avatar: 'test', address: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = guest.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(guest.id)
    expect(view.name).toBe(guest.name)
    expect(view.phoneNumber).toBe(guest.phoneNumber)
    expect(view.status).toBe(guest.status)
    expect(view.avatar).toBe(guest.avatar)
    expect(view.address).toBe(guest.address)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = guest.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(guest.id)
    expect(view.name).toBe(guest.name)
    expect(view.phoneNumber).toBe(guest.phoneNumber)
    expect(view.status).toBe(guest.status)
    expect(view.avatar).toBe(guest.avatar)
    expect(view.address).toBe(guest.address)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
