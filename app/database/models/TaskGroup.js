const { EntitySchema } = require('typeorm');
module.exports = new EntitySchema({
    name: 'TaskGroup',
    tableName: 'task_group',
    columns: {
        id: {
            primary: true,
            generated: true,
            type: 'int'
        },
        title: {
            type: 'varchar',
            nullable: false
        },
        isDefault: {
            type: 'boolean',
            default: false
        }
    }
});