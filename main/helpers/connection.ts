import { createConnection } from 'typeorm';
import { Task } from '../database/models/Task';

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