'use strict';

class StoreUser {
  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users,email',
      password: 'required'
    };
  }

  get messages () {
    return {
      'username.required': 'El campo usuario es requerido',
      'email.required': 'El campo email es requerido',
      'email.unique': 'El campo email ya existe',
      'email.email': 'El campo email no es válido',
      'password.required': 'El campo password es requerido'
    };
  }
}

module.exports = StoreUser;
