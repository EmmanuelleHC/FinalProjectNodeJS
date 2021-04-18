import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.datetime('play_date_start')
      table.datetime('play_date_end')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('field_id').unsigned().references('id').inTable('fields')
      table.timestamps(true)
    })
  }



  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
