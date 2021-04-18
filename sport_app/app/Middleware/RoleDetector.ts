import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleDetector {
  public async handle ({ auth, request,response }: HttpContextContract, next: () => Promise<void>,rule) {
  	const roles = rule
    if (roles.length == 0) {
      await next()
    } else {
      try {
        const user = await auth.current.user
        const role = user.role
        if(roles.includes(role)){
          await next()
        } else {
          throw new Error(`Only user with role: ${roles} can access the route`)  
        }
      } catch (e) {
         throw new Error(`Only user with role: ${roles} can access the route`)  
     
      }
    }
    await next()
  }
}

module.exports = RoleDetector;