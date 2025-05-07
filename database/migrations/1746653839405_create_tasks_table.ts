import { BaseSchema } from '@adonisjs/lucid/schema'
import { TASK_STATUS } from '../../app/constants/task.js'
import { TaskStatus } from '../../app/enums/TaskStatus.js'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('title').notNullable()
      table.text('description')
      table.enu('status', TASK_STATUS).defaultTo(TaskStatus.PENDING)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}