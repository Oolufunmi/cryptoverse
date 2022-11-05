import React, { useState,useEffect } from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Row,Col} from 'antd';
import {Card, CardHeader,Avatar,CardContent,Typography,Grid,Input,TextField} from '@mui/material';
import { red } from '@mui/material/colors';
import {useGetCryptosQuery} from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ?10:100;
  const [filter,setFilter] = useState("");
  const {data:cryptosList,isFetching} = useGetCryptosQuery(count);
  const [cryptos,setCryptos] = useState (cryptosList?.data?.coins);

  useEffect(() => {
    const filtered = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(filter.toLocaleLowerCase()));
    setCryptos(filtered);
  }, [filter,cryptosList])
  
  
 console.log(cryptos);
  return (
    <>
    {!simplified&&(
    <div sx={{ pt: 10 }}>
    <TextField margin='dense'   id="outlined-basic" label="Search" variant="outlined" autoFocus="true" onChange={(e)=>setFilter(e.target.value)} />
    </div>
    )}
   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {
      cryptos?.map((currency)=>(
        <Grid item xs={2} sm={4} md={4} key={currency.id}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card variant="outlined" 
             
             
              hoverable
              >
                <CardHeader
                 avatar={
                  <Avatar  aria-label="recipe" src={currency.iconUrl}/>
                    
                }
                 title={`${currency.rank}. ${currency.name}`}
                /><CardContent>
                <Typography variant="body2" color="text.secondary">
                <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)} %</p>
                </Typography>
              </CardContent>
                 
              </Card>
            </Link>
        </Grid>
      ))
    }
      </Grid>
    </>
  )
}

export default Cryptocurrencies
