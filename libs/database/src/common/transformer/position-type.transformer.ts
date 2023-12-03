import { ValueTransformer } from 'typeorm'
import { Position, PositionType } from '../types'

export class PositionTypeTransformer implements ValueTransformer {
    to(status: Position): string {
        return PositionType[status].code
    }
    from(code: string): string {
        return PositionType.findByCode(code).enumName
    }
}
