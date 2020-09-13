import React from 'react';
import { FormControl, InputLabel, Select, MenuItem  } from "@material-ui/core";
import {
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
    grey,
    blueGrey,
} from '@material-ui/core/colors/';
import { makeStyles } from '@material-ui/core/styles';

const colourShade = 300

const useStyles = makeStyles((theme) => ({

    red: {
        backgroundColor: red[colourShade],
    },
    pink: {
        backgroundColor: pink[colourShade],
    },
    purple: {
        backgroundColor: purple[colourShade],
    },
    deepPurple: {
        backgroundColor: deepPurple[colourShade],
    },
    indigo: {
        backgroundColor: indigo[colourShade],
    },
    blue: {
        backgroundColor: blue[colourShade],
    },
    lightBlue: {
        backgroundColor: lightBlue[colourShade],
    },
    cyan: {
        backgroundColor: cyan[colourShade],
    },
    teal: {
        backgroundColor: teal[colourShade],
    },
    green: {
        backgroundColor: green[colourShade],
    },
    lightGreen: {
        backgroundColor: lightGreen[colourShade],
    },
    lime: {
        backgroundColor: lime[colourShade],
    },
    yellow: {
        backgroundColor: yellow[colourShade],
    },
    amber: {
        backgroundColor: amber[colourShade],
    },
    orange: {
        backgroundColor: orange[colourShade],
    },
    deepOrange: {
        backgroundColor: deepOrange[colourShade],
    },
    brown: {
        backgroundColor: brown[colourShade],
    },
    grey: {
        backgroundColor: grey[colourShade],
    },
    blueGrey: {
        backgroundColor: blueGrey[colourShade],
    },
}));

const ColourChooser = (props) => {
    const { colour, setColour } = props;
    const classes = useStyles()

    const handleChange = (event) => setColour(event.target.value);

    return (
        <div>
            <FormControl variant="outlined">
                <InputLabel id="colour-chooser-label">Colour</InputLabel>
                <Select
                    labelId="colour-chooser-label"
                    id="colour-chooser"
                    value={colour}
                    onChange={handleChange}
                    label="Colour"
                >
                    <MenuItem value="none">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem className={classes.red} value='red'>Red</MenuItem>
                    <MenuItem className={classes.pink} value='pink'>Pink</MenuItem>
                    <MenuItem className={classes.purple} value='purple'>Purple</MenuItem>
                    <MenuItem className={classes.deepPurple} value='deepPurple'>DeepPurple</MenuItem>
                    <MenuItem className={classes.indigo} value='indigo'>Indigo</MenuItem>
                    <MenuItem className={classes.blue} value='blue'>Blue</MenuItem>
                    <MenuItem className={classes.lightBlue} value='lightBlue'>LightBlue</MenuItem>
                    <MenuItem className={classes.cyan} value='cyan'>Cyan</MenuItem>
                    <MenuItem className={classes.teal} value='teal'>Teal</MenuItem>
                    <MenuItem className={classes.green} value='green'>Green</MenuItem>
                    <MenuItem className={classes.lightGreen} value='lightGreen'>LightGreen</MenuItem>
                    <MenuItem className={classes.lime} value='lime'>Lime</MenuItem>
                    <MenuItem className={classes.yellow} value='yellow'>Yellow</MenuItem>
                    <MenuItem className={classes.amber} value='amber'>Amber</MenuItem>
                    <MenuItem className={classes.orange} value='orange'>Orange</MenuItem>
                    <MenuItem className={classes.deepOrange} value='deepOrange'>DeepOrange</MenuItem>
                    <MenuItem className={classes.brown} value='brown'>Brown</MenuItem>
                    <MenuItem className={classes.grey} value='grey'>Grey</MenuItem>
                    <MenuItem className={classes.blueGrey} value='blueGrey'>BlueGrey</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default ColourChooser;
