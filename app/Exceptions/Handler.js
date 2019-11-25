'use strict';

const BaseExceptionHandler = use('BaseExceptionHandler');
const { ValidationException } = require('@adonisjs/validator/src/Exceptions');
const { PasswordMisMatchException } = require('@adonisjs/auth/src/Exceptions');

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
      return response.status(error.status).send({
        code: error.status,
        message: 'Credenciales de acceso incorrectas'
      });
    }

    if (error instanceof ValidationException) {
      return this.resolveValidationExceptions(error, response);
    }

    return response.status(error.status).send({message: error});
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

  resolveValidationExceptions(error, response) {
    return response.status(error.status).send({
      code: error.status,
      message: error.message,
      errors: error.messages
    });
  }
}

module.exports = ExceptionHandler;
