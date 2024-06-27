import * as React from 'react';
import {FC, ReactNode} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {makeStyles} from 'tss-react/mui';
import {apiUrl} from "../../../store/config";
import {Link} from "react-router-dom";
import {IArtistApi} from "../../../models/IArtist";
import {IAlbumApi} from "../../../models/IAlbum";

interface ArtistCardProps {
  element: IArtistApi | IAlbumApi,
  shortImg: boolean,
  isLink?: boolean,
  path?: string,
  information?: string,
  date?: string,
  children?: ReactNode
}

const useStyles = makeStyles()(() => ({
  cards: {
    cursor: 'default',
    userSelect: 'auto'
  }
}));

const MyCard: FC<ArtistCardProps> = (props) => {
  const {element, shortImg, isLink = true, path, information, date, children} = props;
  const { classes } = useStyles();
  const {title, image, _id} = element;

  return (
    <Card sx={{width: '100%', border: 'none', borderRadius: 0}} >
      <CardActionArea component={isLink ? Link : "div"} to={`/${path}/${_id}`} className={!isLink ? classes.cards : undefined}>
        <CardMedia
          component="img"
          height={shortImg ? "140" : 'auto'}
          image={apiUrl + image}
          alt={title}
        />
        <CardContent sx={{p: 0, pt: 1}}>
          <Typography gutterBottom>
            {date && <>Album name:</>} {title}
          </Typography>
          {information &&
            <Typography color="text.secondary" component="div">
              {information}
            </Typography>
          }
          {date &&
            <Typography color="text.secondary" component="div">
              Date of publication: {new Date(date).toLocaleDateString()}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
      {children}
    </Card>
  )
};

export default MyCard;