'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');
const StatusCode = use('App/Helpers/StatusCodes');

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  /**
   * Login.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async login ({ request, response, auth }) {
    const { email, password } = request.all();

    const user = await auth.attempt(email, password);

    return response.success(user);
  }


  /**
   * Create new user.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async register ({ request, response, auth }) {
    const user = new User;

    user.username = request.input('username');
    user.email = request.input('email');
    user.password = request.input('password');

    await user.save();

    await auth.generate(user);

    return response.success(user, 'User created successfully', StatusCode.HTTP_CREATED);
  }

  async profile ({ auth, response }) {
    const user = await auth.getUser();

    return response.success(user);
  }

  async revokeUserToken ({ auth, response }) {
    const user = await auth.getUser();
    await user.tokens().update({is_revoked: true});

    return response.showMessage('Tokens revoked');
  }
}

module.exports = AuthController;
