'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');

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

    return response.status(200).send(user);
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

    return response.status(201).send(user);
  }
}

module.exports = AuthController;
