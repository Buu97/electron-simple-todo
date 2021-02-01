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
            default: "",
            nullable: true
        },
        done: {
            type: "boolean",
            default: false
        },
        due_time: {
            type: 'date',
            nullable: true,
            default: () => {
                return 'CURRENT_DATE'
            }
        },
        priority: {
            type: 'int',
            default: 3
        }
    },
    relations: {
        group: {
            target: 'TaskGroup',
            type: 'many-to-one',
            joinColumn: {
                name: 'group',
                referencedColumnName: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    }
});