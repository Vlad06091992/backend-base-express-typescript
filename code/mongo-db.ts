//MONGO DB

//collection
type UserMongo = {
    id: number //auto inc - db task
    firstName: string
    lastName: string
    profile: Array<{
        hobby: string
        education: string
    }> // 1 к 1 (1 юзер 1 кошелек)
    sharedWalletsForMe:{title:string,walletId:string}[] //многие ко многим
}

//collection
type WalletMongo = {
    id: string //uuid - app level 🔑 первичный ключ
    currency: "BTC" | "USD" | "RUB"
    title: string
    ownerId: number // 🗝 вторичный ключ
    sharedWalletForUsersId:{fullName:string,userId:string}[] //многие ко многим
    status:"Paused" | "Active" | "Delete"
}