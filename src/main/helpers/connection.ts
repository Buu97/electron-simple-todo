import { createConnection } from 'typeorm';
import { Task } from '../models/Task';

const connection = createConnection({
    type: 'sqlite',
    database: 'todo.db',
    entities: [
        Task
    ],
    synchronize: true
});

export default async () => {
    return await connection
}