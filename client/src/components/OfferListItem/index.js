import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Collapse,
    Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import formatDate from '../../utils/formatDate';

const useStyles = makeStyles((theme) => ({
    indented: {
        marginLeft: theme.spacing(5),
    },
}));

const OfferListItem = (props) => {
    //temp until variables are utilized
    //eslint-disable-next-line
    const { handleRemove, handleEdit, _id, date, notes, salary, accepted } = props;
    const [showDetails, setShowDetails] = useState(false);
    const classes = useStyles();

    return (
        <>
            <ListItem>
                <ListItemIcon>
                    <IconButton onClick={() => setShowDetails(!showDetails)}>
                        {!showDetails ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary={formatDate(date)} secondary={salary || ''} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="remove" onClick={handleRemove}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={showDetails} timeout="auto" unmountOnExit>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Typography variant="subtitle2" className={classes.indented}>
                            {notes}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton onClick={handleEdit}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Collapse>
        </>
    );
};

export default OfferListItem;
