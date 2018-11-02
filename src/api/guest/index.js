import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, scan } from './controller'
import { schema } from './model'
export Guest, { schema } from './model'

const router = new Router()
const { name, phoneNumber, status, avatar, address, code, group } = schema.tree

/**
 * @api {post} /guests Create guest
 * @apiName CreateGuest
 * @apiGroup Guest
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Guest's name.
 * @apiParam phoneNumber Guest's phoneNumber.
 * @apiParam status Guest's status.
 * @apiParam avatar Guest's avatar.
 * @apiParam address Guest's address.
 * @apiParam code Guest's code.
 * @apiSuccess {Object} guest Guest's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guest not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, phoneNumber, status, avatar, address, code, group }),
  create)

/**
 * @api {get} /guests Retrieve guests
 * @apiName RetrieveGuests
 * @apiGroup Guest
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} guests List of guests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /tables/:id Retrieve table
 * @apiName RetrieveTable
 * @apiGroup Table
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} table Table's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Table not found.
 * @apiError 401 user access only.
 */
router.get('/scan',
  token({ required: true }),
  query(),
  scan)

/**
 * @api {get} /guests/:id Retrieve guest
 * @apiName RetrieveGuest
 * @apiGroup Guest
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} guest Guest's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guest not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /guests/:id Update guest
 * @apiName UpdateGuest
 * @apiGroup Guest
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Guest's name.
 * @apiParam {String} phoneNumber Guest's phoneNumber.
 * @apiParam {Number} status Guest's status.
 * @apiParam {String} avatar Guest's avatar.
 * @apiParam {String} address Guest's address.
 * @apiParam {String} code Guest's code
 * @apiSuccess {Object} guest Guest's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guest not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, phoneNumber, status, avatar, address, code, group }),
  update)

/**
 * @api {delete} /guests/:id Delete guest
 * @apiName DeleteGuest
 * @apiGroup Guest
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Guest not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
