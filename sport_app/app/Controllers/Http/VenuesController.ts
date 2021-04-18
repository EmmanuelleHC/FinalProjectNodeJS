import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VenueValidator from 'App/Validators/VenueValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Venue from "App/Models/Venue";
import Booking from "App/Models/Booking";
import Field from "App/Models/Field";

export default class VenuesController {
	public async index({response}:HttpContextContract){
		const data=await Venue.all()
		return response.status(200).json(data)
			
	}

	public async show({params,response}:HttpContextContract)
	{
		const data= await Venue.find(params.id)

		return response.status(200).json({message:'success',status:true,venue:data})	
	}
	public async store({request,response}:HttpContextContract)
	{

	    const data=await request.validate(VenueValidator)
	    let venue=new Venue()
		venue.name=data.name
		venue.address=data.address
		venue.phone=data.phone
		await venue.save()
	   
	    return response.created({message:"created new venue"})
	}

	public async update({params,request,response}:HttpContextContract)
	{
		const Info = request.only(['name', 'address', 'phone'])
		const data= await Venue.findOrFail(params.id)

		if (!data) {
		return response.status(404).json({data: 'Resource not found'})
		}
		data.name=Info.name
		data.address=Info.address
		data.phone=Info.phone
		await data.save()
		return 'Venues Updated'
	}
	public async book({params,request,response,auth}:HttpContextContract)
	{
		const Info = request.only(['field_id', 'play_date_start', 'play_date_end','total_players'])
		console.log(Info)
		const data= await Venue.findOrFail(params.id)
		const session_user=auth.user.id
		if (!data) {
		return response.status(404).json({data: 'Venue not found'})
		}
		const data_field= await Field.findOrFail(Info.field_id)
		if (!data_field) {
		return response.status(404).json({data: 'Field not found'})
		}
		let booking=new Booking()
		booking.field_id=Info.field_id
		booking.total_players=Info.total_players
		booking.play_date_start=Info.play_date_start
		booking.play_date_end=Info.play_date_end
		const bookings=await booking.save()
	   	return response.created({message:"successfully booking",status:"true",bookings:bookings})
	}

	public async delete ({params, response}) {
		const data= await Venue.findOrFail(params.id)		
		if (!data) {
		return response.status(404).json({data: 'Resource not found'})
		}

		await data.delete()
		return response.status(204).json(null)
	}
	
}
module.exports = VenuesController
