import { Pool, PoolType } from '../types'
import { PoolTypeTransformer } from './pool-type.transformer'

describe('PoolTypeTransformer', () => {
    let transformer: PoolTypeTransformer
    let enumName: Pool
    let code: string

    beforeAll(() => {
        enumName = 'ADMIN'
        code = PoolType[enumName].code
        transformer = new PoolTypeTransformer()
    })

    it('transformer 가 ValueTransformer 로 구현되어있는가', () => {
        expect(transformer.to).toBeInstanceOf(Function)
        expect(transformer.from).toBeInstanceOf(Function)
    })

    it('enumName 을 code 으로 변환해야 함', () => {
        const input = enumName
        const result: string = transformer.to(input)

        expect(result).toBe(code)
    })

    it('code 를 enumName 으로 변환해야 함', () => {
        const result = transformer.from(code)
        expect(result).toBe(enumName)
    })
})
