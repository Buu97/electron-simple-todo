const { createConnection } = require('typeorm');

module.exports = createConnection({
    type: 'sqlite',
    database: 'todo.db',
    synchronize: true,
    entities: [
        require('./models/Task'),
        require('./models/TaskGroup')
    ]
});