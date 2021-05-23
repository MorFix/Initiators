import axios from 'axios';
import React, {useState} from 'react';
import Box from '@material-ui/core/Box';

import usePeriodicFetch from '../../hooks/use-period-fetch';

import {getUser} from '../../services/user';
import {getProjects} from '../../api/projects.api';
import Project from './Project/Project';

const Projects = () => {
    const user = getUser();

    const [loaded, setLoaded] = useState(false);
    const [coins, setCoins] = useState(0);
    const [projects, setProjects] = useState([]);

    if (user) {
        const loadCoins = () => axios.get('/api/user', {params: {userId: user.id}}, {cancelToken: cancelTokenSource.current.token})
            .then(({data: {coins}}) => {
                setCoins(coins);
            });

        const loadProjects = () => getProjects(cancelTokenSource.current.token)
            .then(projects => {
                setProjects(projects);
            });

        const loadData = () => Promise.all([loadCoins(), loadProjects()])
            .then(() => {
                setLoaded(true);
            });

        const cancelTokenSource = usePeriodicFetch(loadData);
    }

    return (
        <>
            <Box>
                {!loaded && <span>טוען את המידע שלך...</span>}
                {loaded && <span>
                    יש לך <b>{coins}</b> מטבעות
                </span>}
            </Box>

            {projects.map(x => <Project key={x.id} project={x} userCoins={coins}/>)}
        </>
    );
};

export default Projects;
