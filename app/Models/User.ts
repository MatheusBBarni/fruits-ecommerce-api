import { column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import BaseEntity from './BaseEntity'

export default class User extends BaseEntity {
  public static table = 'users'

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.hash(user.password)
    }
  }
}
