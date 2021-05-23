import {getUser} from '../services/user';
import axios from "axios";

export const getProjects = cancelToken => {
    const user = getUser();

    return axios.get('/api/projects', {params: {userId: user.id}}, {cancelToken})
        .then(({data}) => data);
};
