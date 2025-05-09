import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { DomainException } from './DomainException.js'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {

    // Gerenciamento de exceções de domínio da aplicação [regras de negocio e etc]
    if(error instanceof DomainException){
      return ctx.response.status(error.status).json({
        status: 'erro', 
        message: error.message,
        code: error.code,
        details: error.details ? error.details : {}
      })
    }

    if(error.code === "E_VALIDATION_ERROR"){
      return ctx.response.unprocessableEntity({
        status: 'erro',
        message: 'Erro de validação',
        error: error.messages
      });
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
