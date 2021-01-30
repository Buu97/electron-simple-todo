import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    title: string;

    @Column("text")
    description: string;

    @Column("date")
    due_date: Date;

    @Column("integer", {
        nullable: true
    })
    priority: number;

    @Column("boolean", {
        default: false
    })
    done: boolean;
}