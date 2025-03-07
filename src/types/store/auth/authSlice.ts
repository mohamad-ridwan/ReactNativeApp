// STATES
export type AuthSliceT = {
    user: UserState
}

// USER
export interface UserState {
    id?: number | null
    firstName?: string
    lastName?: string
    maidenName?: string
    age?: number;
    gender?: string;
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    birthDate?: string;
    image?: string;
    bloodGroup?: string;
    height?: number;
    weight?: number;
    eyeColor?: string;
    hair?: Hair;
    ip?: string;
    address?: Address;
    macAddress?: string;
    university?: string;
    bank?: Bank;
    company?: Company;
    ein?: string;
    ssn?: string;
    userAgent?: string;
    crypto?: Crypto;
    role?: string;
    token?: Token
}

export interface Token {
    accessToken?: string
    refreshToken?: string
}

export interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

export interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}

export interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}

export interface Hair {
    color: string;
    type: string;
}
