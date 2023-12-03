import { Enum, EnumConstNames, EnumType } from 'ts-jenum'

@Enum('text')
export class PositionType extends EnumType<PositionType>() {
    static readonly STAFF = new PositionType('01', '행정') // 행정
    static readonly PROFESSOR = new PositionType('02', '캡틴') // 교수
    static readonly ASSISTANT = new PositionType('03', '부스터') // 조교
    static readonly MANAGER = new PositionType('04', '가디언스') // 매니저

    private constructor(
        readonly code: string,
        readonly text: string,
    ) {
        super()
    }

    static findByText(text: string) {
        try {
            return this.valueOf(text)
        } catch (e) {
            throw new Error(`${this.name} Text가 옳바르지 않습니다.`)
        }
    }

    static findByCode(code: string) {
        const result = this.find((type) => type.code === code)
        if (!result) throw new Error(`${this.name} Code가 옳바르지 않습니다.`)
        return result
    }
}

export type Position = EnumConstNames<typeof PositionType>
