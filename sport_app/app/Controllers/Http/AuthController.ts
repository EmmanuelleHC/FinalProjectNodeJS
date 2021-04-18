import { HttpContextContract } from '@ioc:Adonis/Core/'
import User from 'App/Models/User'
import Booking from 'App/Models/Booking'
import Database from '@ioc:Adonis/Lucid/Database'

import UserOtp from 'App/Models/UserOtp'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class AuthController {

      public async login({request, auth}:HttpContextContract) {

       const email =request.input('email')
       const password=request.input('password')
       const token=await auth.use('api').attempt(email,password)
       return token.toJSON()
      }

       

      public async register({request,response}:HttpContextContract){
        const email=request.input('email')
        const password=request.input('password')
        const name=request.input('name')
        const role=request.input('role')
        const otp=Math.floor(100000 + Math.random() * 900000)

        const newUser= await User.create({name,email,password,role})
        let user_otp=new UserOtp()
        user_otp.email=email
        user_otp.email_otp=otp
        user_otp.used_flag='N'
        await user_otp.save()

        Mail.send((message) => {
          message
            .from('info@example.com')
            .to(email)
            .subject('Welcome New User!')
            .html(`<b>Dengan Hormat,</b>
                   <br><br>
                   <p>Registrasi user anda sukses</p>
                   <table>
                   <tr>
                   <td>Email</td>
                   <td>:</td>
                   <td>${email}</td>
                   </tr>
                   <tr>
                   <td>Name</td>
                   <td>:</td>
                   <td>${name}</td>
                   </tr>
                   <tr>
                   <td>Role</td>
                   <td>:</td>
                   <td>${role}</td>
                   </tr>
                   <tr>
                   <td>Otp Code</td>
                   <td>:</td>
                   <td>${otp}</td>
                   </tr>
                   </table>
                   <br><br>
                   <p>Silahkan verifikasi OTP Anda</p>

              `)

        })
        return response.created({message:'register success, please verify your otp code'})
      }

       public async otp_confirmation({request,response}:HttpContextContract){
        const email_user=request.input('email')
        const otp_code=request.input('otp_code')
        const booking_id=request.input('booking_id')
        const data=await Booking.findBy('id',booking_id)
        const data_otp=await UserOtp.query().where('email',email_user).where('used_flag','N').where('email_otp',otp_code)
        if(data_otp.length>0)
        {
            data.delete()
            const affectedRows = await Database.from('user_otps')
                        .where('email',email_user)
                        .where('used_flag','N')
                        .where('email_otp',otp_code)
                        .update({ used_flag:'Y'})
            return response.created({message:'berhasil konfirmasi OTP'})

        }
        
       
        return response.status(404).json({message:'gagal konfirmasi OTP'})


      }

      
    }

module.exports = AuthController