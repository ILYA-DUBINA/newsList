import React from 'react';
import { SpinerLoading } from '../spinerLoading/spinerLoading.jsx';
import OneNews from './OneNews';

interface IProps { 
  data: Array<object>,
  getObjNews: Function,
}

const MapNewsArray = ({data, getObjNews}: IProps) => {
  
  let elements = data.map((item: object) => {
    if (item === null) {
      return <SpinerLoading />;
    }
    
    const { by, title, time, 
            score, descendants, id, 
            kids, url
          } = item as { by: string, title: string, time: number, 
                        score: number, descendants: number, id: number, 
                        kids: Array<number>, url: string};

    return  <OneNews by={by} title={title} time={time} 
                    score={score} descendants={descendants} id={id} 
                    kids={kids} url={url} getObjNews={getObjNews} key={id + Math.random()}
            />;
  });

  return <React.Fragment>{elements}</React.Fragment>;
};

export default MapNewsArray;



