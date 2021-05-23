import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

import {getUser} from '../../../services/user';
import FundDialog from "./FundDialog";

const user = getUser();

const Project= ({project}) => {
    const [isFunding, setIsFunding] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const currentFund = project.funds.find(x => x.userId === user.id);

    const fundProject = isWithdrawing => {
        setIsWithdrawing(isWithdrawing);
        setIsFunding(true);
    };

    return (<Box m={2}>
        <FundDialog project={project} isWithdrawing={isWithdrawing} isOpen={isFunding} onClose={() => setIsFunding(false)} />

        <IconButton style={{ color: red[500] }} onClick={() => fundProject(true)}>
            <MoneyOffIcon />
        </IconButton>

        {project.name}

        <IconButton style={{ color: green[500] }} onClick={() => fundProject(false)}>
            <MonetizationOnIcon />
        </IconButton>

        {currentFund && `(${currentFund.amount})`}
    </Box>);
};

export default Project;
