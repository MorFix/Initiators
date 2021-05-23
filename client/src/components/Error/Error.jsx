import React, {useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Snackbar from '@material-ui/core/Snackbar';

const Error = ({message}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={() => setIsOpen(false)}>
            <Alert variant="filled" severity="error" onClose={() => setIsOpen(false)}>
                <AlertTitle>שגיאה</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Error;
