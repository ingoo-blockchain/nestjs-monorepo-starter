import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { Employee } from '../domain'

const dataSource = {
    provide: 'DATA_SOURCE',

    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const { type, host, port, name, password, user } = configService.get('database')
        const dataSource = new DataSource({
            type,
            host,
            port,
            username: name,
            password,
            database: user,
            entities: [Employee],
            synchronize: false,
            logging: true,
        })

        return dataSource.initialize()
    },
}

export default dataSource
