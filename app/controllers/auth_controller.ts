import UnauthorizedException from '#exceptions/UnauthorizedException';
import User from '#models/user';
import { authLoginValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash';

export default class AuthController {

    async login({ request, response }: HttpContext){
        try {
            const { email, password } = await authLoginValidator.validate(request.only(['email', 'password']));

            const user = await User.findByOrFail({email});

            const isPasswrordValid = await hash.verify(user.password, password);
            if (!isPasswrordValid) {
                throw new UnauthorizedException('Senha inválida');
            }

            const token = await User.accessTokens.create(user, ['*'], {
                expiresIn: '30 days'
            });

            return response.ok({
                status: 'sucesso',
                data: {
                    type: 'bearer',
                    token: token.value!.release(),
                    expiresAt: token.expiresAt,
                    user: {
                        id: user.id,
                        email: user.email
                    }
                }
            });

        } catch(error) {
            console.error(`Erro ao tentar fazer login: ${error.message}`);
            throw new UnauthorizedException(error.message);
        }
    }


    async me({ auth, response }: HttpContext){
        try {
            const user = auth.getUserOrFail();

            return response.ok({
                status: 'sucesso',
                data: {
                    user: {
                        id: user.id,
                        email: user.email
                    }
                }
            });
            
        }catch(error){
            console.error(`Erro ao tentar obter informações do usuário: ${error.message}`);
            throw new UnauthorizedException('Não foi possível obter informações do usuário');
        }

    }

    async logout({ auth, response }: HttpContext){
        try {
            await auth.use('api').invalidateToken();
            
            return response.ok({
                status: 'sucesso',
                message: 'Logout realizado com sucesso'
            });
        } catch (error) {
            console.error(`Erro ao fazer logout: ${error.message}`);
            throw new UnauthorizedException('Não foi possível realizar o logout');
        }
    }
}