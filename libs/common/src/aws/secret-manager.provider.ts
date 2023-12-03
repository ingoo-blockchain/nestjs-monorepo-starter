import { ConfigService } from '@nestjs/config'
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

export const fetchSecrets = async (secretName: string) => {
    const configService = new ConfigService()
    const region = configService.get('AWS_REGION')
    const endpoint = configService.get('AWS_HOST')
    const client = new SecretsManagerClient({
        region,
        endpoint,
    })

    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
            }),
        )
        return JSON.parse(response.SecretString)
    } catch (e) {
        throw e
    }
}

export const secretManagerConfig = async () => {
    const configService = new ConfigService()
    const secretName = configService.get('AWS_SECRET_NAME')
    if (!secretName) return configService
    const secrets = await fetchSecrets(secretName)
    return {
        database: {
            host: secrets.DB_HOST,
            port: +secrets.DB_PORT,
            name: secrets.DB_USERNAME,
            password: secrets.DB_PASSWORD,
            type: secrets.DB_TYPE,
            user: secrets.DB_DATABASE,
        },
    }
}
