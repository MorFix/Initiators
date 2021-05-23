import axios from 'axios';
import React, {useEffect, useRef} from 'react';
import {log} from '../services/error';

export default (fetchFn, interval = 1500) => {
    const timeoutId = useRef(0);
    const cancelTokenSource = useRef(null);

    const setDataFetchTimeout = () => {
        timeoutId.current = setTimeout(loadData, interval);
    };

    const loadData = () => {
        cancelTokenSource.current = axios.CancelToken.source();

        fetchFn()
            .then(interval)
            .catch(log)
            .finally(setDataFetchTimeout);
    };

    useEffect(() => {
        loadData();

        return () => {
            clearTimeout(timeoutId.current);

            if (cancelTokenSource.current) {
                cancelTokenSource.current.cancel();
            }
        };
    }, []);

    return cancelTokenSource;
};
