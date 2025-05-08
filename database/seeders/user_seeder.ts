import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash';

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        id: 1,
        email: "devluizfcneto@gmail.com",
        password: await hash.make("secret")
      },
      {
        id: 2,
        email: "luiz.cunha@edu.unirio.br",
        password: await hash.make("anotherSecret")
      }
    ]);
  }
}