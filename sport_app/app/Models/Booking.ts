import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Field from 'App/Models/Field'
import User from 'App/Models/User'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public field_id: number

  @column()
  public user_id: number

  @belongsTo(() => Field)
  public field: BelongsTo<typeof Field>
  users () {
      return this.belongsToMany('App/Model/User','user_bookings')
  }
}
