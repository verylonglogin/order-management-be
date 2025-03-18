import {MigrationInterface, QueryRunner} from "typeorm";

export class FullTextSearchv1742133890784 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("FullTextSearchv1742133890784 ==>> ")
        await queryRunner.query(`
        CREATE INDEX "IDX_orders_payment_description_tsv" 
        ON "orders" 
        USING GIN (to_tsvector('english', payment_description));
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX  IF  EXISTS IDX_orders_payment_description_tsv;
        `);
    }
}
