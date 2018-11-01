import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Guest, { schema } from './model'

const router = new Router()
const { name, phoneNumber, status, avatar, address } = schema.tree

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
 * @apiSuccess {Object} guest Guest's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guest not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, phoneNumber, status, avatar, address }),
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
 * @apiParam name Guest's name.
 * @apiParam phoneNumber Guest's phoneNumber.
 * @apiParam status Guest's status.
 * @apiParam avatar Guest's avatar.
 * @apiParam address Guest's address.
 * @apiSuccess {Object} guest Guest's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guest not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, phoneNumber, status, avatar, address }),
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
