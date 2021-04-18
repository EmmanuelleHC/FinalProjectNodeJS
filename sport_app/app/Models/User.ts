import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Booking from 'App/Models/Booking'
import Venue from 'App/Models/Venue'

import Venue from 'App/Models/Venue'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany, 
  HasMany,
  manyToMany, 
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

   @column()
  public name: string

   @column()
  public role: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Booking,{
    localKey:'id',
    pivotForeignKey:'user_id',
    relatedKey:'id',
    pivotTable: 'user_bookings',
    pivotRelatedForeignKey:'booking_id'
  })
  public bookings: ManyToMany<typeof Booking> 
  
  @hasMany(() => Venue)
  public venues: HasMany<typeof Venue>
  
  hasRole(roles){
    const role = this.role
    return roles.includes(role)
  } 
  bookings () {
  return this
    .belongsToMany('App/Models/Booking')
    .pivotModel('App/Models/UserBooking')
  }


  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
