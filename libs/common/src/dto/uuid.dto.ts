import { IsUUID } from 'class-validator'

export class UuidDto {
    @IsUUID()
    readonly uuid: string
}
