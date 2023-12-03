import { Enum, EnumConstNames, EnumType } from 'ts-jenum'

@Enum('text')
export class PoolType extends EnumType<PoolType>() {
    static readonly ADMIN = new PoolType('01', '최고관리자')
    static readonly SUPERVIOR = new PoolType('02', '슈퍼관리자')
    static readonly MANAGER = new PoolType('11', '관리자')
    static readonly COORDINATOR = new PoolType('12', '행정')
    static readonly PROFESSOR = new PoolType('21', '교수')
    static readonly ASSISTANT = new PoolType('22', '조교')
    static readonly CREW = new PoolType('99', '크루')

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

export type Pool = EnumConstNames<typeof PoolType>
