import { Position, PositionType } from '../types'
import { PositionTypeTransformer } from './position-type.transformer'

describe('PositionTypeTransformer', () => {
    let transformer: PositionTypeTransformer
    const Types = PositionType
    let enumName: Position
    let code: string

    beforeAll(() => {
        enumName = 'ASSISTANT'
        code = Types[enumName].code
        transformer = new PositionTypeTransformer()
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
