import React, {useState} from 'react';
import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';

import Box from '@material-ui/core/Box';

import usePeriodicFetch from '../../hooks/use-period-fetch';
import {getProjects} from "../../api/projects.api";

const Report = () => {
    const [projects, setProjects] = useState([]);

    const loadProjects = () => getProjects(cancelTokenSource.current.token)
        .then(projects => {
            setProjects(projects);
        });

    const cancelTokenSource = usePeriodicFetch(loadProjects);

    const getProjectCoins = x => sumBy(x.funds, 'amount');
    const projectsWithCoins = projects.map(x => ({...x, totalCoins: getProjectCoins(x)}));

    return (
        orderBy(projectsWithCoins, 'totalCoins', 'desc')
            .map(project => <Box key={project.id} m={2}>
                {project.name} - {project.totalCoins}
            </Box>)
    );
};

export default Report;

