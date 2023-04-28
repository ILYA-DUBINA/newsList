import React, { useEffect, useState } from 'react';
import { NewsServer, NewsServerData, Story} from '../server/news-server';
import MapNewsArray from '../components/bodyNews/MapNewsArray';

import './AppNews-DetailedNews.css';
import { SpinerLoading } from '../components/spinerLoading/spinerLoading';

interface IProps {
  update: boolean,
  updateNewsBack: () => void,
  getObjNews: Function,
}

const AppNews = ({update, updateNewsBack, getObjNews}: IProps) => {
  const [arrayNewsObj, setArrayNewsObj] = useState([] as Story[]);
  const [isLoading, setIsLoading] = useState(true as boolean);

  const loadNewsData = async () => {
    try{
      const dataNumberNewsId = await NewsServer();
      let dataNumberNewsObj = await NewsServerData(dataNumberNewsId.slice(0, 100));
      dataNumberNewsObj = dataNumberNewsObj.sort((a, b) => b.time - a.time);
      setArrayNewsObj(dataNumberNewsObj);
      setIsLoading(false);
    } catch(e){
      throw Error(`Что то пошло не так ${e}`)
    }    
  }
 
  useEffect(() => {
    loadNewsData();  
    updateNewsBack(); 

    let timer = setInterval(() => {
        loadNewsData();  
      }, 60000);   
    return () => clearInterval(timer);
  }, [update, updateNewsBack]);

  return (
    <React.Fragment>   
      <div className="container">
        {isLoading ? <SpinerLoading/> : <MapNewsArray data={arrayNewsObj} getObjNews={getObjNews}/>}
      </div>      
    </React.Fragment>
  );
};

export default AppNews;

