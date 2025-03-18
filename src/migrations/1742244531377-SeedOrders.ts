import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedOrders1742244531377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            console.log("SeedOrders1742244531377 ==>> ")
            await queryRunner.query(`
                INSERT INTO orders (id, order_number, payment_description, street_address, town, country, amount, currency, payment_due_date) VALUES 
                ('c8f69c28', 110000, 'Payment for Order #110000', '123 Example Street', 'Tallinn', 'Estonia', 250.75, 'EUR', '2025-04-01'),
                ('a4b12d34', 220000, 'Payment for Order #2220000', '56 Example Street', 'Quito', 'Ecuador', 340.50, 'USD', '2025-04-15'),
                ('f6c3a7b8', 320000, 'Payment for Order #320000', '89 Example Street', 'Geneva', 'Switzerland', 420.30, 'CHF', '2025-04-30'),
                ('e9a5d1a2', 420000, 'Payment for Order #420000', '12 Example Street', 'Tartu', 'Estonia', 180.20, 'EUR', '2025-04-01'),
                ('b5d6e7f8', 520000, 'Payment for Order #520000', '98 Example Street', 'Guayaquil', 'Ecuador', 300.99, 'USD', '2025-04-15'),
                ('c7e8f901', 200000, 'Payment for Order #200000', '77 Example Street', 'Zurich', 'Switzerland', 150.60, 'CHF', '2025-04-30'),
                ('d1a2b3c4', 5500000, 'Payment for Order #5500000', '34 Example Street', 'Pärnu', 'Estonia', 225.75, 'EUR', '2025-04-01'),
                ('a2b3c4d5', 5800000, 'Payment for Order #5800000', '44 Example Street', 'Cuenca', 'Ecuador', 375.45, 'USD', '2025-04-15');
            `);

        } catch (error) {
            console.error("Migration failed:", error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}