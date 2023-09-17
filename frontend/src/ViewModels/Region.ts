import { oDataResource } from '@buchatsky/jinqu-odata'

@oDataResource('Regions')
export default class Region {
  Id: number
  Name: string
}
