import { secretManagerConfig } from '../common/src/aws/secret-manager.provider'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import path from 'path'

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'], load: [secretManagerConfig] })],
})
class MigrationModule {}

const dataSource = async () => {
    const app = await NestFactory.create(MigrationModule)
    const configService = app.get(ConfigService)
    const { type, host, port, name, password, user } = configService.get('database')
    const options: DataSourceOptions & SeederOptions = {
        type,
        host,
        port,
        username: name,
        password,
        database: user,
        migrations: [path.resolve(__dirname, 'src/migrations/*{.ts,.js}')],
        entities: [path.resolve(__dirname, 'src/domain/**/*{.ts,.js}')],
        logging: true,
    }

    return new DataSource(options)
}
export default dataSource()
