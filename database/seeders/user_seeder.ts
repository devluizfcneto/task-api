import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        id: 1,
        email: "devluizfcneto@gmail.com",
        password: "secret"
      },
      {
        id: 2,
        email: "luiz.cunha@edu.unirio.br",
        password: "anotherSecret"
      }
    ]);
  }
}