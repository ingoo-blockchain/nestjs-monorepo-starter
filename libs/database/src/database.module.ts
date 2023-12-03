import { Module } from '@nestjs/common'
import databaseProvider from './provider/database.provider'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { Employee } from './domain/Employees'
import { secretManagerConfig } from '@app/common/aws'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            // imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'], load: [secretManagerConfig] })],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const { type, host, port, name, password, user } = configService.get('database')

                return {
                    type,
                    host,
                    port,
                    username: name,
                    password,
                    database: user,
                    entities: [Employee],
                    synchronize: false,
                    logging: true,
                }
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
