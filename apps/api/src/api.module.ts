import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { secretManagerConfig } from '@app/common/aws'
import { EmployeeModule } from './employee/employee.module'
import { CommonModule } from '@app/common'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'], load: [secretManagerConfig] }),
        DatabaseModule,
        CommonModule,
        EmployeeModule,
    ],
    controllers: [],
    providers: [],
})
export class ApiModule {}
