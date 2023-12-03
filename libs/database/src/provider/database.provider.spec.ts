import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { DataSource } from 'typeorm'
import { secretManagerConfig } from '@app/common/aws'
import { DatabaseModule } from '../database.module'
import { TypeOrmModule } from '@nestjs/typeorm'

describe('DATA_SOURCE', () => {
    let dataSource: DataSource

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'], load: [secretManagerConfig] }),
            ],
            exports: [DatabaseModule],
        }).compile()

        dataSource = moduleRef.get<DataSource>(DataSource)
    })

    afterEach(() => {
        dataSource.destroy()
    })

    it('dataSource', () => {
        expect(dataSource).toBeDefined()
    })
})
