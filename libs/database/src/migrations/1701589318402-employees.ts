import { MigrationInterface, QueryRunner } from 'typeorm'

export class Employees1701589318402 implements MigrationInterface {
    name = 'Employees1701589318402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`Employees\` (\`id\` varchar(36) NOT NULL COMMENT 'Employee 고유키값', \`uid\` varchar(50) NOT NULL COMMENT '직원 아이디', \`upw\` varchar(255) NOT NULL COMMENT '직원 패스워드', \`p_image\` varchar(255) NOT NULL COMMENT '직원 프로필 이미지', \`name\` varchar(30) NOT NULL COMMENT '직원 이름', \`email\` varchar(80) NOT NULL COMMENT '직원 이메일 ex) web7722@gmail.com', \`phone\` varchar(11) NOT NULL COMMENT '직원 전화번호 ex) 01089557722', \`pool\` char(2) NOT NULL COMMENT '직원 권한', \`position\` char(2) NOT NULL COMMENT '직원 주요 업무', UNIQUE INDEX \`IDX_16c084c32a7bca6ec4d934d7a5\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_16c084c32a7bca6ec4d934d7a5\` ON \`Employees\``)
        await queryRunner.query(`DROP TABLE \`Employees\``)
    }
}
