import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, 
  HasMany, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import Field from 'App/Models/Field'
import User from 'App/Models/User'

export default class Venue extends BaseModel {
  public static table='venues'
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string
  @column()
  public address:string
  @column()
  public phone:number


  @column()
  public user_id: number

  @hasMany(() => Field)
  public fields: HasMany<typeof Field>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ 
  	autoCreate: true,
  	serialize :(value)=>value.toFormat('dd LLL yyyy')
  })
  public createdAt: DateTime


  @column.dateTime({ 
  	autoCreate: true, 
  	autoUpdate: true,
  	serialize :(value)=>value.toFormat('dd LLL yyyy')
  	})
  public updatedAt: DateTime
}
