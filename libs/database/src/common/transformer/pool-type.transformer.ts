import { ValueTransformer } from 'typeorm'
import { PoolType, Pool } from '../types'

export class PoolTypeTransformer implements ValueTransformer {
    to(status: Pool): string {
        return PoolType[status].code
    }
    from(code: string): string {
        return PoolType.findByCode(code).enumName
    }
}
