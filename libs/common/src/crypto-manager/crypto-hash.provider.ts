import crypto from 'crypto'

export const generateHash = (plainText: string) => {
    const hash = crypto.createHash('sha256')
    hash.update(plainText)
    return hash.digest('hex')
}
