import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common'
import { EmployeeService } from './employee.service'

import { CreateEmployeeDto, UpdateEmployeeDto } from '@app/database/domain/Employees'
import { UuidDto } from '@app/common/dto/uuid.dto'
import { PageDto, PaginationDto } from '@app/common/dto/pagination.dto'
import { TransformResponseInterceptor } from '@app/common/interceptors/transform-response.interceptor'

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeeService.create(createEmployeeDto)
    }

    @Get()
    @UseInterceptors(TransformResponseInterceptor)
    findAll(@Query() paginationDto: PaginationDto) {
        const employee = this.employeeService.findAll(paginationDto)

        return employee
    }

    @Get(':uuid')
    findOne(@Param() { uuid }: UuidDto) {
        return this.employeeService.findOne(uuid)
    }

    @Patch(':uuid')
    update(@Param() { uuid }: UuidDto, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeeService.update(uuid, updateEmployeeDto)
    }

    @Delete(':uuid')
    remove(@Param() { uuid }: UuidDto) {
        return this.employeeService.remove(uuid)
    }
}
