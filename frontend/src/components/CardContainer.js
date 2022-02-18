import React from 'react';
import RecipeCard from './Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '40px',
        paddingRight: '40px',
        paddingTop: '40px',
        backgroundColor: '#E3F1FF',
        alignItems: 'center',
    },

    card: {
        //egen css for kort men burde stå i card.js
    }
});

const CardContainer = () => {
    const classes = useStyles();
    return(
        <Grid container spacing={4} className={classes.gridContainer} >
            <Grid item xs={12} sm={6}>
                <RecipeCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <RecipeCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <RecipeCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <RecipeCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <RecipeCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <RecipeCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <RecipeCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <RecipeCard />
            </Grid>
        </Grid>
    )
}

export default CardContainer;
