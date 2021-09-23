import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Truncate from 'react-truncate';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: "300px",
        backgroundSize: 'contain',
    },
});

export default function MediaCard({ item }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    alt="#"
                    image={item.poster}
                    // style={{backgroundSize: "contain"}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Truncate lines={3}>{item.description}</Truncate>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3">
                        {item.price} USD
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}
