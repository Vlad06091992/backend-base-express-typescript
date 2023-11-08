//SQL

//table
type User = {
    id: number //auto inc - db task 🔑 первичный ключ
    firstName: string
    lastName: string
}

//table
type Wallet = {
    id: string //uuid - app level 🔑 первичный ключ
    currency: "BTC" | "USD" | "RUB"
    title: string
    ownerId: number // 🗝 вторичный ключ связь многие к одному
}

//table
type Profile = {
    hobby: string
    education: string
    userId: number // 🗝 вторичный ключ
}

//table
type WalletsSharing = {
    id: string // 🔑🗝 ключ в зависимости от запроса
    userId: string // 🔑🗝 ключ в зависимости от запроса
    walletId: string // 🔑🗝 ключ в зависимости от запроса
    AddedDate: Date
    status: "Paused" | "Active" | "Delete"
}

//table
type WalletsSharingLimits = {
    walletsSharindId: string // 🗝 вторичный ключ
    limitPerDay: number
    limitPerWeek: number
    limitPerMonth: number
}
