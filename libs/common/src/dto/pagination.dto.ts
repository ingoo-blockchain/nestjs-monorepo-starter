import { IsInt, IsOptional, IsPositive } from 'class-validator'
import { IsCardinal } from '../decorators'
import { DEFAULT_PAGE_SIZE } from '../constans'
import { Exclude } from 'class-transformer'

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    pageSize: number = DEFAULT_PAGE_SIZE ?? 10

    @IsOptional()
    @IsCardinal()
    readonly page: number = 1

    @IsOptional()
    @IsInt()
    @IsPositive()
    get limit() {
        return this.pageSize
    }

    @IsOptional()
    @IsInt()
    get offset() {
        return ((this.page ?? 1) - 1) * this.pageSize
    }
}

export class PageDto extends PaginationDto {
    @IsOptional()
    @IsCardinal()
    readonly page: number = 1
}
