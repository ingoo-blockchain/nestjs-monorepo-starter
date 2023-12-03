import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { decrypt, encrypt } from './crypto-manager.provider'
import { secretManagerConfig } from '../aws'

describe('CryptoManager', () => {
    let configService: ConfigService
    let cryptoManager: any
    let encrypted: string
    const plainText = 'hello world!'

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, load: [secretManagerConfig] })],
            providers: [
                {
                    provide: 'CryptoManager',
                    useFactory: () => {
                        return {
                            encrypt,
                            decrypt,
                        }
                    },
                    inject: [ConfigService],
                },
            ],
            exports: ['CryptoManager'],
        }).compile()

        configService = moduleRef.get<ConfigService>(ConfigService)
        cryptoManager = moduleRef.get('CryptoManager')
    })

    it('encrypt', () => {
        // const encrypted = cryptoManager.encrypt('asdfasdf')
        // console.log(encrypted)
    })
})
