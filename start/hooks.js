const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const StatusCodes = use('App/Helpers/StatusCodes');  
  const Response = use('Adonis/Src/Response');

  Response.macro('success', function (data, message = 'OK', code = StatusCodes.HTTP_OK, extras = {}) {
    return this.make(data, message, code, extras);
  });

  Response.macro('error', function (message, code, extras = {}) {
    return this.make(null, message, code, extras);
  });

  Response.macro('showMessage', function (message, code = StatusCodes.HTTP_OK) {
    return this.make(null, message, code, {});
  });

  Response.macro('make', function (data, message, code, extras) {
    let result = { 
        jsonapi: {
            version: '1.0.0'
        },
        code, 
        message 
    };

    if (data) {
        result.data = data;
    }

    result = Object.assign(result, extras);

    return this.status(code).send(result);
  });
});