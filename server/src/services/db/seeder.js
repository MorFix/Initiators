import {v4 as uuidv4} from 'uuid';
import Project from '../../models/Project.js';
import {getProjects, saveProject} from './db.js';

const initProjects = () => {
    const INITIAL_PROJECTS = 10;

    for (let i = 1; i <= INITIAL_PROJECTS; i++) {
        const id = uuidv4();

        saveProject(id, new Project(id, `פרויקט ${i}`));
    }
};

export const initDb = () => {
    const projects = getProjects();
    if (projects) {
        return;
    }

    initProjects();
};
