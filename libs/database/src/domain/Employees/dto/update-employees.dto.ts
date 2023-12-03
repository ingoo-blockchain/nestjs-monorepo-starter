import { PartialType } from '@nestjs/mapped-types'
import { CreateEmployeeDto } from '.'

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
