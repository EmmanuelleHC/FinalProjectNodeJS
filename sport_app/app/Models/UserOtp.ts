import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserOtp extends BaseModel {
  public static table='user_otps'

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string



  @column()
  public used_flag: string


  @column()
  public email_otp: integer

}
