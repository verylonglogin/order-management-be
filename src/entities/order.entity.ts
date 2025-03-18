import {Column, Entity, Index, PrimaryColumn} from "typeorm";

@Entity("orders")
export class Order {
    @PrimaryColumn({
        unique: true
    })
    id: string;

    @Column()
    @Index({unique: true})
    order_number: number;

    @Column({
        type: 'text',
        nullable: false,
    })
    payment_description: string;

    @Column()
    street_address: string;

    @Column()
    town: string;

    @Column()
    country: string;

    @Column('decimal')
    amount: string;

    @Column()
    currency: string;

    @Column({type: 'date'})
    payment_due_date: Date;

}