import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import {getUser} from '../../../services/user';
import FundDialog from './FundDialog';

const Project = ({project, userCoins}) => {
    const user = getUser();

    const [isFunding, setIsFunding] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const onSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    const onFundDialogClose = isSuccess => {
        setIsFunding(false);
        setIsSnackbarOpen(isSuccess);
    };

    const currentFund = project.funds.find(x => x.userId === user.id);

    const fundProject = isWithdrawing => {
        setIsWithdrawing(isWithdrawing);
        setIsFunding(true);
    };

    return (<Box m={2}>
        {isFunding && <FundDialog project={project} userCoins={userCoins} isWithdrawing={isWithdrawing} onClose={onFundDialogClose} />}
        <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={onSnackbarClose}>
            <Alert onClose={onSnackbarClose} severity="success">
                הפעולה בוצעה בהצלחה
            </Alert>
        </Snackbar>

        <IconButton style={{ color: red[500] }} onClick={() => fundProject(true)}>
            <MoneyOffIcon />
        </IconButton>

        {project.name}

        <IconButton style={{ color: green[500] }} onClick={() => fundProject(false)}>
            <MonetizationOnIcon />
        </IconButton>

        {(currentFund && currentFund.amount) ? `(${currentFund.amount})` : ''}
    </Box>);
};

export default Project;
