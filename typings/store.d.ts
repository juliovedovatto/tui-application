export interface RootStateStorable {}

export interface HotelOfffersStateStorable {
  items: Record<string, HotelOfffersStateStorableItem>
}

export interface HotelOfffersStateStorableItem {
  hotelId: string
  name: string
  description: string
  cityCode: string
  latitude: number
  longitude: number
  address: string
  contact: string
  amenities: string[]
  media: string
  offers: {
    id: string
    description: string
    guests: number
    price: string
  }[]
}
