'use strict';

/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

const BaseExceptionHandler = use('BaseExceptionHandler');
const { ValidationException } = require('@adonisjs/validator/src/Exceptions');
const { PasswordMisMatchException, InvalidApiToken } = require('@adonisjs/auth/src/Exceptions');
const { ModelNotFoundException } = require('@adonisjs/lucid/src/Exceptions');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error instanceof PasswordMisMatchException) {
      return this.resolveUnauthorizedException(error, response);
    }

    if (error instanceof ValidationException) {
      return this.resolveValidationException(error, response);
    }

    if (error instanceof InvalidApiToken) {
      return response.error('The api token is missing or invalid', error.status);
    }

    if (error instanceof ModelNotFoundException) {
      let model = error.message.replace('E_MISSING_DATABASE_ROW: Cannot find database row for ', '').split('model')[0].trim().toLowerCase();

      const message = `No existe una instancia de ${model} con el id especificado`;

      return response.error(message, error.status);
    }

    return response.error(error.message, error.status);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }

  resolveUnauthorizedException(error, response){
    return response.error('Credenciales de acceso incorrectas', error.status);
  }

  resolveValidationException(error, response) {
    return response.error(
      error.message,
      error.status,
      {errors: error.messages}
    );
  }
}

module.exports = ExceptionHandler;
