import { generateHash } from '@app/common'
import { ValueTransformer } from 'typeorm'

export class HashTransformer implements ValueTransformer {
    to(pw: string): string {
        return generateHash(pw)
    }
    from(hash: string): string {
        return hash
    }
}
