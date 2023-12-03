import { IsValidEnum } from '@app/database/common'
import { Pool, PoolType, Position, PositionType } from '@app/database/common/types'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, Validate } from 'class-validator'

export class CreateEmployeeDto {
    // @IsUUID()
    // id: string

    @ApiProperty({ required: true, description: '아이디', example: 'kga' })
    @IsString()
    @IsNotEmpty()
    readonly uid: string

    @ApiProperty({ required: true, description: '비밀번호', example: 'hello$world!' })
    @IsString()
    @IsNotEmpty()
    readonly upw: string

    @ApiProperty({ required: false, description: '프로필 이미지', example: 'https://hello.world.com' })
    @IsString()
    @IsOptional()
    readonly p_image?: string

    @ApiProperty({ required: true, description: '사용자 이름', example: '홍길동' })
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty({ required: true, description: '사용자 이메일', example: 'example@gmail.com' })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @ApiProperty({ required: true, description: '사용자 번호', example: '01012345678' })
    @IsPhoneNumber('KR')
    @IsNotEmpty()
    readonly phone: string

    @ApiProperty({ required: true, description: '직원 권한', example: 'MANAGER' })
    @Validate(IsValidEnum, [PoolType])
    @IsNotEmpty()
    readonly pool: Pool

    @ApiProperty({ required: true, description: '직원 주요 업무', example: 'STAFF' })
    @Validate(IsValidEnum, [PositionType])
    @IsNotEmpty()
    readonly position: Position
}
