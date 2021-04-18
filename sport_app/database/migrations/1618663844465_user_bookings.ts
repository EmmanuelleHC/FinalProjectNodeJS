import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserBookings extends BaseSchema {
  protected tableName = 'user_bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
       table.integer('user_id')
       table.integer('booking_id')
       table.foreign('user_id').references('users.id').onDelete('cascade')
       table.foreign('booking_id').references('bookings.id').onDelete('cascade')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
