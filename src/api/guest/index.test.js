import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Guest } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, guest

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  guest = await Guest.create({})
})

test('POST /guests 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', phoneNumber: 'test', status: 'test', avatar: 'test', address: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.phoneNumber).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.avatar).toEqual('test')
  expect(body.address).toEqual('test')
})

test('POST /guests 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /guests 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /guests 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /guests 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /guests 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /guests/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${guest.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(guest.id)
})

test('GET /guests/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${guest.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /guests/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${guest.id}`)
  expect(status).toBe(401)
})

test('GET /guests/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /guests/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${guest.id}`)
    .send({ access_token: adminSession, name: 'test', phoneNumber: 'test', status: 'test', avatar: 'test', address: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(guest.id)
  expect(body.name).toEqual('test')
  expect(body.phoneNumber).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.avatar).toEqual('test')
  expect(body.address).toEqual('test')
})

test('PUT /guests/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${guest.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /guests/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${guest.id}`)
  expect(status).toBe(401)
})

test('PUT /guests/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', phoneNumber: 'test', status: 'test', avatar: 'test', address: 'test' })
  expect(status).toBe(404)
})

test('DELETE /guests/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${guest.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /guests/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${guest.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /guests/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${guest.id}`)
  expect(status).toBe(401)
})

test('DELETE /guests/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
