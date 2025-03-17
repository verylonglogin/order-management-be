import {MigrationInterface, QueryRunner} from "typeorm";

export class FullTextSearchv1742133890784 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX orders_payment_description_tsv_idx ON orders USING gin(payment_description_tsv);
            CREATE FUNCTION orders_tsvector_trigger() RETURNS TRIGGER AS $$
            BEGIN
                NEW.payment_description_tsv := to_tsvector('english', NEW.payment_description);
                RETURN NEW;
            END
            $$ LANGUAGE plpgsql;
            CREATE TRIGGER update_orders_tsvector
            BEFORE INSERT OR UPDATE ON orders
            FOR EACH ROW EXECUTE FUNCTION orders_tsvector_trigger();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS update_orders_tsvector ON orders;
            DROP FUNCTION IF EXISTS orders_tsvector_trigger;
            DROP INDEX IF EXISTS orders_payment_description_tsv_idx;
        `);
    }

}
