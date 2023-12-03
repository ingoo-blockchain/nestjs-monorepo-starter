import { Module } from '@nestjs/common'
import { EmployeeService } from './employee.service'
import { EmployeeController } from './employee.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Employee } from '@app/database'

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})
export class EmployeeModule {}
