import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserController {
  public async register ({ request }: HttpContextContract) {

    const postsSchema = schema.create({
      name: schema.string(),
      email: schema.string({}, [
        rules.email()
      ]),
      password: schema.string({}, [
        rules.minLength(6)
      ]),
    })

    await request.validate({
      schema: postsSchema,
    })


    const user = new User()
    user.name = request.input('name')
    user.email = request.input('email')
    user.password = request.input('password')

    return await user.save();
  }
}
