import React, { useEffect, useState } from "react";
import moment from 'moment';
import { NewsServerData, NewsServerId } from "../server/news-server";
import {Story} from '../server/news-server';
import MapCreateComments from "../components/bodyPageOverview/MapCreateComments";
import { SpinerLoading } from "../components/spinerLoading/spinerLoading";

interface IProps {
  objNews: object; 
  by: string,
  title: string,
  time: number,
  descendants: number,
  id: number,
  kids: Array<number>,
}

const AppDetailedNews = ({objNews}: any) => {
    let { by, title, time, descendants, id, kids} = objNews.current as IProps;
    const [arrayComment, setArrayComment] = useState([] as Story[]) ;
    const [kidsObjComment, setKidsObjComment] = useState({} as Story[]) ;
    const [parentId, setParentId] = useState(0 as number) ;
    const [isLoading, setIsLoading] = useState(true as boolean);

    const getComments = async() => {
      try{
        const dataArray = await NewsServerData(kids.slice(0, 100));  
        setArrayComment(dataArray);
        setIsLoading(false);
      } catch(e){
        throw Error(`Что то пошло не так ${e}`)
      } 
    }

    const getUpdateComment = async () => {
      try{
        const oneObjComment = await NewsServerId(id);
        const dataArrayUpdate = await NewsServerData(oneObjComment.kids.slice(0, 100));  
        setArrayComment(dataArrayUpdate);
        setKidsObjComment({} as Story[])
        setIsLoading(false);
      } catch(e){
        throw Error(`Что то пошло не так ${e}`)
      } 
    }

    const getKidsComment = async (id: number) => {
      try{
        const idx = arrayComment.findIndex((el) => el.id === id);
        let newItem = arrayComment[idx];
        setParentId(newItem.id);
        const dataArrayKids = await NewsServerData(newItem.kids.slice(0, 100));  
        setKidsObjComment(dataArrayKids);
        setIsLoading(false);
      } catch(e){
        throw Error(`Что то пошло не так ${e}`)
      } 
    }

    useEffect(() => {
      getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <React.Fragment>
        <div className="review">
          <div className="review__header">
            <div className="review__header-user">
              <div className="review__header-name">{by}</div>
              <div className="review__header-time">{moment.unix(time).format('MMMM D, YYYY')}</div>
            </div>          
            <h2 className="review__header-title">{title}</h2>
          </div>
          <div className="review__body">
            <div className="review__body-counter">
              <div className="counter__number">Общее число комментариев: <b>{descendants}</b></div>            
            </div>
            <button className="header__content-button counter__button" onClick={getUpdateComment}>Обновление комментариев</button>
            <ul className="header__content-list" >
              {isLoading ? <SpinerLoading/> : <MapCreateComments  
                                                      arrayComment={arrayComment} getKidsComment={getKidsComment} 
                                                      kidsObjComment={kidsObjComment} parentId={parentId}
                                              />
              }
            </ul>
          </div>
        </div>
      </React.Fragment>
  );
};

export default AppDetailedNews;
