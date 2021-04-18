import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserOtps extends BaseSchema {
  protected tableName = 'user_otps'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email')
      table.integer('email_otp')
      table.string('used_flag')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
