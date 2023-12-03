import { PositionType } from './position.type'

describe('PositionType Enum 테스트', () => {
    const Types = PositionType
    const className = `PositionType`
    let text: string, code: string, enumType: PositionType

    beforeAll(() => {
        text = '행정'
        code = '01'
        enumType = Types.STAFF
    })
    it('text를 가지고 Type을 반환해야한다.', () => {
        const input = text
        const result = Types.findByText(input)

        expect(result).toBeDefined()
        expect(result).toBe(enumType)
    })

    it('code를 가지고 Type을 반환해야한다.', () => {
        const input = code
        const result = Types.findByCode(input)

        expect(result).toBeDefined()
        expect(result).toBe(enumType)
    })

    it('text내용이 옳바르지 않을 경우', () => {
        const input = 'text아무데이터'
        expect(() => Types.findByText(input)).toThrowError(`${className} Text가 옳바르지 않습니다.`)
    })

    it('code 내용이 옳바르지 않을 경우', () => {
        const input = '아무것도아닌데이터'
        expect(() => Types.findByCode(input)).toThrowError(`${className} Code가 옳바르지 않습니다.`)
    })
})
