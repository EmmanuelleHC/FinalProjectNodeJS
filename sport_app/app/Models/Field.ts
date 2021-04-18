import { DateTime } from 'luxon'
import { BaseModel, column. belongsTo, BelongsTo,hasMany, 
  HasMany, } from '@ioc:Adonis/Lucid/Orm'
import Venue from 'App/Models/Venue'
import Booking from 'App/Models/Booking'
export default class Field extends BaseModel {
  public static table='fields'

  @column({ isPrimary: true })
  public id: number
  @column()
  public type:string


  @column()
  public venue_id: number

  @hasMany(() => Booking)
  public bookings: HasMany<typeof Booking>


  @belongsTo(() => Venue)
  public venue: BelongsTo<typeof Venue>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
