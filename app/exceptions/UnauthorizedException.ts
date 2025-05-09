import { DomainException } from "./DomainException.js";

export default class UnauthorizedException extends DomainException {
  constructor(details: any) {
    super(
        'Acesso não autorizado - Credenciais inválidas',
        'E_UNAUTHORIZED_ACCESS',
        401,
        details
    );
    this.name = 'UnauthorizedException';
  }
}