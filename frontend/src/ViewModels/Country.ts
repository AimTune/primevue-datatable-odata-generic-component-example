import { oDataResource } from '@buchatsky/jinqu-odata'
import type Region from './Region'

@oDataResource('Countries')
class Country extends Object {
  Id: string
  Name: string
  Region: Region
  inlineCount: Number
}

export default Country
