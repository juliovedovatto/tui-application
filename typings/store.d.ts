export interface RootStateStorable {}

export interface HotelOfffersStateStorable {
  items: Record<string, HotelOfffersStateStorableItem>
  offer: Maybe<HotelOfferStateStorableItem>
  loading: boolean
}

export interface HotelStorableStateItem {
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
}

export interface HotelOfffersStateStorableItem extends HotelStorableStateItem {
  offers?: {
    id: string
    description: string
    guests: number
    price: string
  }[]
}

export interface HotelOfferStateStorableItem {
  hotel: HotelStorableStateItem,
  category: string
  checkInDate: string
  checkOutDate: string
  description: string
  guests: number
  acceptedPayments: string[]
  price: {
    currency: string
    base: number
    taxes: {
      type: string,
      amount: number,
      included: boolean
    }[]
  }
}

export interface WeatherStateStorable {
  forecast: PlainObject[],
  loading: boolean
}
