import {getProject, getProjects, saveProject, saveUser} from '../../services/db/db.js';
import Project from '../../models/Project.js';
import Fund from '../../models/Fund.js';

export const getAllProjects = () => Object.values(getProjects() || {})
    .map(Project.fromDb);

export const fundProject = (projectId, user, amount) => {
    if (amount > 0 && user.coins < amount) {
        throw new Error('אין לך מספיק מטבעות בשביל זה');
    }

    const projectDb = getProject(projectId);
    if (!projectDb) {
        throw new Error('הפרויקט המבוקש לא נמצא');
    }

    const project = Project.fromDb(projectDb);
    let fund = project.funds.find(x => x.userId === user.id);
    if (!fund) {
        fund = new Fund(user.id, 0);
        project.funds.push(fund);
    }

    // Are you withdrawing too much ?
    const absAmount = Math.abs(amount);
    if (amount < 0 && fund.amount < absAmount)  {
        throw new Error(`עדיין לא תרמת ${absAmount} מטבעות לפרויקט הזה`);
    }

    user.coins -= amount;
    fund.amount += amount;

    saveUser(user.id, user);
    saveProject(project.id, project);
};
