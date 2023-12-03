import { HashTransformer, PoolTypeTransformer, PositionTypeTransformer } from '@app/database/common/transformer'
import { Pool, Position } from '@app/database/common/types'
import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity } from 'typeorm'

@Entity({ name: 'Employees' })
@Unique(['uid'])
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id', comment: 'Employee 고유키값' })
    id: string

    @Column({
        name: 'uid',
        type: 'varchar',
        length: 50,
        nullable: false,
        comment: '직원 아이디',
    })
    uid: string

    @Column({
        name: 'upw',
        type: 'varchar',
        length: 255,
        transformer: new HashTransformer(),
        nullable: false,
        comment: '직원 패스워드',
    })
    upw: string

    @Column({
        name: 'p_image',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '직원 프로필 이미지',
    })
    p_image: string

    @Column({
        name: 'name',
        type: 'varchar',
        length: 30,
        nullable: false,
        comment: '직원 이름',
    })
    name: string

    @Column({
        name: 'email',
        type: 'varchar',
        length: 80,
        nullable: false,
        comment: '직원 이메일 ex) web7722@gmail.com',
    })
    email: string

    @Column({
        name: 'phone',
        type: 'varchar',
        length: 11,
        nullable: false,
        comment: '직원 전화번호 ex) 01089557722',
    })
    phone: string

    @Column({
        name: 'pool',
        type: 'char',
        transformer: new PoolTypeTransformer(),
        length: 2,
        nullable: false,
        comment: '직원 권한',
    })
    pool: Pool

    @Column({
        name: 'position',
        type: 'char',
        transformer: new PositionTypeTransformer(),
        length: 2,
        nullable: false,
        comment: '직원 주요 업무',
    })
    position: Position
}
