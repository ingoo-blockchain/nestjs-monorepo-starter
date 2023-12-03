import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEmployeeDto, Employee, UpdateEmployeeDto } from '@app/database/domain/Employees'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PageDto, PaginationDto } from '@app/common/dto/pagination.dto'
import { DEFAULT_PAGE_SIZE } from '@app/common'

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>) {}

    create(createEmployeeDto: CreateEmployeeDto) {
        const employee = this.employeeRepository.create(createEmployeeDto)
        return this.employeeRepository.save(employee)
    }

    findAll(paginationDto: PaginationDto) {
        const { offset, limit } = paginationDto

        return this.employeeRepository.findAndCount({
            skip: offset,
            take: limit ?? DEFAULT_PAGE_SIZE,
        })
    }

    async findOne(uuid: string) {
        const employee = await this.employeeRepository.findOneBy({ id: uuid })
        if (!employee) {
            throw new NotFoundException('Employee not Found')
        }
        return employee
    }

    async update(uuid: string, updateEmployeeDto: UpdateEmployeeDto) {
        const employee = await this.employeeRepository.preload({
            id: uuid,
            ...updateEmployeeDto,
        })
        if (!employee) {
            throw new NotFoundException('Employee not found')
        }

        return this.employeeRepository.save(employee)
    }

    async remove(uuid: string) {
        const employee = await this.findOne(uuid)
        return this.employeeRepository.remove(employee)
    }
}
