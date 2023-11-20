import { type UserClass, type BeatsClass } from '.'

export interface Order {
  beat: BeatsClass
  buyer: UserClass
  seller: UserClass
  _id: string
  operationType: 'Compra' | 'Venta'
  date: string
}
