import React,{ useState} from 'react';
import {useGetCryptosNewsQuery} from '../services/cryptoNews';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Link} from 'react-router-dom';

import {Autocomplete,Card, CardHeader,CardMedia,Avatar,CardContent,Typography,Grid,Input,TextField,CardActions} from '@mui/material';
import moment from 'moment';
import Loading from './Loading';
const News = ({simplified}) => {
  const [newsCategory,setNewsCategory] = useState('Cryptocurrency');
  const {data:datacrypto,isFetching} = useGetCryptosQuery(100);
  const {data:cryptoNews} = useGetCryptosNewsQuery({newsCategory,count:simplified?10:100});
console.log(datacrypto);
  if(isFetching) return <Loading/>
  return (
    <>
    {!simplified&&(
    <Autocomplete
  disablePortal
  id="combo-box-demo"
  onChange={(e)=>setNewsCategory(e.target.firstChild.data)}
  options={(datacrypto?.data?.coins).map((coin)=>(
    coin.name
  ))}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="News category" />}
/>
    )}

     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {
      cryptoNews?.value?.map((news,index) =>(
        <Grid item xs={2} sm={4} md={4} key={index}>
        <a href={news.url} target="_blank" rel="noreferrer">
          <Card variant="outlined" 
          hoverable
          >
            <CardHeader
             avatar={
              <Avatar  aria-label="provider" src={news?.provider[0]?.image?.thumbnail?.contentUrl}/>
                
            }
             title={`${news?.name}`}
            />
            <CardMedia
        component="img"
        height="194"
        image={news?.image?.thumbnail?.contentUrl}
        alt="Paella dish"
      />
            <CardContent>
            <Typography variant="body2" color="text.secondary">
            <p>{(news?.description)>100?(`${news?.description.subString(0,100)}...`):news?.description}</p>
            </Typography>
          </CardContent>
          <CardActions>
        <Typography variant="body2" color="text.secondary">
            {
              moment(news?.datePublished).startOf('ss').fromNow()
            }
        </Typography>
      </CardActions>
          </Card>
        </a>
    </Grid>

      ))
    }
    </Grid>
    </>
  )
}

export default News
