import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, CardHeader, Typography, CardMedia } from '@material-ui/core';

const RecipeCard = () => {
    return (
        <Card style={{maxWidth: "400px"}} >
            <CardHeader title="Spaghetti" subheader='Februar 17, 2021'></CardHeader>
            <CardMedia
                component="img"
                height="194"
                image="/static/images/spaghetti.jpeg"
                alt="Spaghetti"
            />
            <CardContent className="recipe_card" >
                <Typography id="text" color='textSecondary'>
                Spagetti (bokmål) eller spaghetti (riksmål) er en type pasta 
                som er formet som lange, tynne, runde strimler eller tråder 
                av middels tykkelse . Spagetti blir laget av vann, eventuelt 
                egg, og durumhvete, men også andre typer mel blir brukt.
                </Typography>
            </CardContent>
        </Card>
    )
}
export default RecipeCard;
