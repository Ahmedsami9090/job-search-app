import bcrypt from 'bcrypt'

export const hashData = async (data, salt = +process.env.HASH_ROUNDS)=>{
    const hash = bcrypt.hash(data, salt)
    return hash
}
export const hashCompare = async (encryption, data)=>{
    return bcrypt.compare(data, encryption)
}
