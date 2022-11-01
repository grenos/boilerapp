import { Realm } from '@realm/react';

export class RTodo extends Realm.Object<RTodo> {
    id!: number;
    title!: string;
    completed!: boolean;
    userId!: number;

    static generate() {
        return {
            id: 0,
            title: '',
            completed: false,
            userId: 0,
        };
    }

    static schema = {
        name: 'RTodo',
        primaryKey: 'id',
        properties: {
            id: 'int',
            title: 'string',
            completed: 'bool',
            userId: 'int',
        },
    };
}
