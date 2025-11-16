import { v4 as uuidv4 } from 'uuid';

export const BOARD_SECTIONS = {
    backlog: 'backlog',
    'in progress': 'in progress',
    done: 'done',
};

export const tasks = [
    {
        id: uuidv4(),
        title: 'Title 2',
        description: 'Desc 2',
        status: 'backlog',
    },
    {
        id: uuidv4(),
        title: 'Title 3',
        description: 'Desc 3',
        status: 'backlog',
    },
    {
        id: uuidv4(),
        title: 'Title 4',
        description: 'Desc 4',
        status: 'done',
    },
];
