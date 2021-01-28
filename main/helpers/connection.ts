import { createConnection } from 'typeorm';
import { Task } from '../database/models/Task';

const connection = createConnection({
    type: 'sqlite',
    database: '../database/todo.db',
    entities: [
        Task
    ],
    synchronize: true
});

export default connection;