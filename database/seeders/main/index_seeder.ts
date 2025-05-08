import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder}) {
    await new Seeder.default(this.client).run()
  }

  async run() {
    try {
      await this.client.rawQuery('SET FOREIGN_KEY_CHECKS = 0;');
      
      await this.client.rawQuery('TRUNCATE TABLE tasks;');
      await this.client.rawQuery('TRUNCATE TABLE users;');
  
      await this.client.rawQuery('SET FOREIGN_KEY_CHECKS = 1;');
  
      await this.seed(await import('#database/seeders/user_seeder'));
      await this.seed(await import('#database/seeders/task_seeder'));

    } catch(error) {
      console.error('Erro ao executar o seeder:', error.message);
      throw error;
    }
  }
}