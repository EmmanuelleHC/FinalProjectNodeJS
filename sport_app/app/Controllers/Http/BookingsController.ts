import { HttpContextContract } from '@ioc:Adonis/Core/'
import Booking from 'App/Models/Booking'
import User from 'App/Models/User'
export default class BookingsController {
	public async index({response}:HttpContextContract){
		const data=await Booking.all()
		return response.status(200).json(data)
	

	}

	public async schedules({response,auth}:HttpContextContract){
		
		const session_user=auth.user.id

		const data=await User.query().preload('bookings')
		return response.status(200).json({message:'success',status:'true',data:data})
			
	}

	public async show({params,response}:HttpContextContract)
	{
		const data= await Booking.find(params.id)
		
		return response.status(200).json(data)	
	}
	public async join({params,request,response,auth}:HttpContextContract)
	{
		const data= await Booking.find(params.id)

		if (!data) {
		return response.status(404).json({data: 'Booking not found'})
		}
		const session_user=auth.user.id
		console.log(auth.user)
		const user= await User.find(session_user)

		await user.related('bookings').attach([params.id])

		return response.created({message:"Succesfully Join",status:"true"})

	}

	public async unjoin({params,request,response,auth}:HttpContextContract)
	{
		const data= await Booking.find(params.id)

		if (!data) {
		return response.status(404).json({data: 'Booking not found'})
		}
		const session_user=auth.user.id
		const user= await User.find(session_user)

		await user.related('bookings').detach([params.id])

		return response.created({message:"Succesfully UnJoin",status:"true"})

	}	
}
module.exports = BookingsController

