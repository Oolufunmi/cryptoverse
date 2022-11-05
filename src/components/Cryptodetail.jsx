import React,{ useState} from 'react';
import HTMLReactParser from 'html-react-parser';
import {useParams} from 'react-router-dom';
import millify from 'millify';
import {Select} from 'antd';
import {Linechart} from './';
import {Autocomplete,Card, CardHeader,CardMedia,Avatar,CardContent,Typography,Grid,Input,TextField,CardActions} from '@mui/material';
import {NumberOutlined,CheckOutlined,ThunderboltOutlined, MoneyCollectOutlined,DollarCircleOutlined,FundOutlined,ExclamationCircleOutlined,StopOutlined,TrophyOutlined } from '@ant-design/icons';
import {useGetCryptoDetailsQuery} from '../services/cryptoApi';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loading from './Loading';

const {Title,Text}  = Typography;
const {Option} = Select;





const Cryptodetail = () => {
  const [timePeriod,setTimePeriod] = useState('7d');
  const {coinId} = useParams();
  const {data,isFetching} = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const {data:coinHistory} = useGetCryptoHistoryQuery({coinId,timePeriod});
  console.log(coinHistory?.data?.history);
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  if(isFetching) return <Loading/>;
  return (
    <>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
    <Grid item xs={12} sm={12} md={12}>
     
           {`${cryptoDetails?.name}(${cryptoDetails?.symbol}) Price`}
            
          
            <Typography variant="body2" color="text.secondary">
            {
              cryptoDetails?.name} live price in US Dollars
              View value statistics, market cap and supply
              
                 
</Typography>
          
                
                <Autocomplete
  disablePortal
  id="combo-box-demo"
  defaultValue="7d"
  onChange={(e)=>setTimePeriod(e.target.firstChild.data)}
  options={(time).map((date)=>(
    date
  ))}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Duration" />}
/>
            <br></br>
            <Linechart coinHistory={coinHistory?.data?.history} timePeriod={timePeriod} />
          </Grid>
          </Grid>
          <Grid container  columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid spacing={{ xs: 2, md: 3 }} item xs={6} sm={6} md={6}>
            <p>{cryptoDetails?.name} Value Statistics</p>
                  {
                      
                    stats.map(({icon,title,value})=>(
                      <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                      <Grid item xs={6} sm={6} md={6} key={title}>
                       <div> {icon}

                        {title}</div>
                      </Grid>
                      {value}
                    </Grid>
                    ))
                   
                  }
                </Grid>
                <Grid  item xs={6} sm={6} md={6}>
            <p>Other  Statistics</p>
                  {
                      
                    genericStats.map(({icon,title,value})=>(
                      <Grid  container columns={{ xs: 12, sm: 12, md: 12 }}>
                      <Grid  item xs={6} sm={6} md={6} key={title}>
                       <div> {icon}

                        {title}</div>
                      </Grid>
                      {value}
                    </Grid>
                    ))
                   
                  }
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                <h3>What is {cryptoDetails?.name}</h3> 
                {HTMLReactParser(cryptoDetails.description)}
                </Grid>
                </Grid>
  
       
       
                </>
  )
}

export default Cryptodetail
