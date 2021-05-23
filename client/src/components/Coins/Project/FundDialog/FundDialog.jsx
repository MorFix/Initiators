import React, {useState} from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const FundDialog = ({project, isOpen, onClose, isWithdrawing}) => {
    const dialogTitle = isWithdrawing ? 'משיכת כסף מפרויקט' : 'הפקדת כסף לפרויקט';
    const dialogDescription = isWithdrawing ? 'פעולה זו תמשוך כסף מהפרויקט' : 'פעולה זו תפקיד כסף מחשבונך לפרויקט';

    const sendOperation = () => {
        // TODO: Implement
    };

    return (
        <Dialog fullScreen open={isOpen} onClose={onClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogDescription} <b>{project.name}</b>, נא להזין סכום
                </DialogContentText>
                <TextField autoFocus margin="dense" type="number" fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">ביטול</Button>
                <Button onClick={sendOperation} color="primary" variant="contained">בצע</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FundDialog;
