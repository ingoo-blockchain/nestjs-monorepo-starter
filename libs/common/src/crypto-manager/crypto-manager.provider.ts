import { ConfigService } from '@nestjs/config'
import crypto from 'crypto'

export const encrypt = (plainText: string): string => {
    const configService = new ConfigService()
    const ivHex = configService.get('ENCRYPTION_IV')
    const iv = Buffer.from(ivHex, 'hex')

    const cipher = crypto.createCipheriv(
        configService.get('ENCRYPTION_METHOD'),
        Buffer.from(configService.get('ENCRYPTION_SALT')),
        iv,
    )
    const encrypted = cipher.update(plainText)

    return `${Buffer.concat([encrypted, cipher.final()]).toString('hex')}`
}
export const decrypt = (encrypted: string): string => {
    const configService = new ConfigService()
    const ivHex = configService.get('ENCRYPTION_IV')

    const encryptedData = Buffer.from(encrypted, 'hex')
    const decipher = crypto.createDecipheriv(
        configService.get('ENCRYPT_METHOD'),
        Buffer.from(configService.get('ENCRYPTION_SALT')),
        ivHex,
    )
    const decrypted = decipher.update(encryptedData)
    const decoded = Buffer.concat([decrypted, decipher.final()]).toString()

    return decoded
}
