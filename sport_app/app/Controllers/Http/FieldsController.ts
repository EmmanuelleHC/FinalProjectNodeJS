import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FieldValidator from 'App/Validators/FieldValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Field from "App/Models/Field";
export default class FieldsController {
	public async index({response}:HttpContextContract){
		const data = await Field.query()
			      .with("venues")
			      .fetch();
		return response.status(200).json(data)
			
	}

	public async show({params,response}:HttpContextContract)
	{
		const data= await Field.find(params.id)
		

		return response.status(200).json(data)	
	}
	public async store({request}:HttpContextContract)
	{
		
	    const data=await request.validate(FieldValidator)

	    const insertData = await Database.table('fields').insert
	    ([{name:data.name,type:data.type}])
	    return 'Fields Created'
	}

	public async update({params,request,response}:HttpContextContract)
	{
		const Info = request.only(['name', 'type'])
		const data = await Database.from('fields').where('id',params.id)
		if (!data) {
		return response.status(404).json({data: 'Resource not found'})
		}

		const affectedRows = await Database.from('fields')
							  .where('id',params.id)
							  .update({ name:Info.name, type: Info.type})
		return 'Fields Updated'
	}

	public async delete ({params, response}) {
		const data = await Database.from('fields').where('id',params.id)
		if (!data) {
		return response.status(404).json({data: 'Resource not found'})
		}

		const affectedRows = await Database
						  .from('fields')
						  .where('id',params.id)
						  .delete()
		return response.status(204).json(null)
	}
}
module.exports = FieldsController
