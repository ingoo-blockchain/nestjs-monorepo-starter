import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { fetchSecrets, secretManagerConfig } from './secret-manager.provider'

describe('secret-manager.config', () => {
    let configService: ConfigService
    let secretName: string
    let SecretManagerConfig: any

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
            providers: [
                {
                    provide: 'secretManagerConfig',
                    useFactory: () => {
                        return {
                            fetchSecrets,
                            secretManagerConfig,
                        }
                    },
                    inject: [ConfigService],
                },
            ],
            exports: ['secretManagerConfig'],
        }).compile()

        configService = moduleRef.get<ConfigService>(ConfigService)
        secretName = configService.get('AWS_SECRET_NAME')
        SecretManagerConfig = moduleRef.get('secretManagerConfig')
    })

    it('ConfigService에서 AWS_SECRET_NAME이 존재하는가', async () => {
        expect(secretName).not.toBeUndefined()
    })

    it('fetchSecrets', async () => {
        const secrets = await SecretManagerConfig.fetchSecrets(secretName)
        expect(secrets).toBeDefined()
    })

    it('secretManagerConfig', async () => {
        const result = await SecretManagerConfig.secretManagerConfig()
        expect(result).toBeDefined()
        expect(result.database).toBeDefined()
    })
})
