import React, {useState} from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import {getUser} from '../../../../services/user';
import {log} from '../../../../services/error';

const FundDialog = ({project, onClose, isWithdrawing, userCoins}) => {
    const user = getUser();

    const getSignedAmount = inputValue => {
        const numericAmount = Math.abs(parseInt(inputValue) || 0);

        return isWithdrawing ? (numericAmount * -1) : numericAmount;
    };

    const getDefaultAmount = () => {
        const fund = project.funds.find(x => x.userId === user.id);

        return isWithdrawing ? (fund && fund.amount || 0) : userCoins;
    };

    const [amount, setAmount] = useState(getDefaultAmount());

    const dialogTitle = isWithdrawing ? 'משיכת כסף מפרויקט' : 'הפקדת כסף לפרויקט';
    const dialogDescription = isWithdrawing ? 'פעולה זו תמשוך כסף מהפרויקט' : 'פעולה זו תפקיד כסף מחשבונך לפרויקט';

    const sendOperation = () => {
        axios.put(`/api/projects/${project.id}`, {}, {params: {amount: getSignedAmount(amount), userId: user.id}})
            .then(() => {
                onClose(true);
            })
            .catch(log);
    };

    const onAmountChange = e => {
      setAmount(getSignedAmount(e.target.value));
    };

    return (
        <Dialog fullScreen open={true} onClose={() => onClose(false)}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogDescription} <b>{project.name}</b>, נא להזין סכום
                </DialogContentText>
                <TextField autoFocus margin="dense" type="number" defaultValue={getDefaultAmount()} onChange={onAmountChange} fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)} color="primary">ביטול</Button>
                <Button onClick={sendOperation} color="primary" variant="contained">בצע</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FundDialog;
