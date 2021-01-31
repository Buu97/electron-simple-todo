const { EntitySchema } = require('typeorm');
module.exports = new EntitySchema({
    name: 'Task',
    columns: {
        id: {
            primary: true,
            generated: true,
            type: "int"
        },
        title: {
            type: "varchar",
            nullable: false
        },
        description: {
            type: "text",
            default: ""
        }
    }
});