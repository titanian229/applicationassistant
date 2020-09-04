import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Collapse, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const DisplayRow = (props) => {
    // const { name, roleTitle, businessName, contactMethods, notes, associatedTodos } = props
    const { columns, data, expandComponent } = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>{data[column.id]}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {/* Below here insert a contact view object */}
                            {expandComponent}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default DisplayRow;
