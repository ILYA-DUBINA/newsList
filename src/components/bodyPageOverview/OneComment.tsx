import moment from 'moment';
import React, { useState } from 'react';
import MapCreateComments from './MapCreateComments';
import './Map-OneComment.css';
import {Story, NewsServerData} from '../../server/news-server';

interface IProps { 
  by: string,
  text: string,
  time: number,
  id: number,
  kids: Array<number>,
  getKidsComment: Function,
  kidsObjComment: Array<object> | null,
  parentId: number | null,
  deleted: boolean,
}

const OneComment = (props: IProps) => {
  let { by, text, time, id, getKidsComment, kidsObjComment, parentId, deleted, kids} = props;
  const [parentIdKids, setParentIdKids] = useState(0 as number);
  let [parentObjKids, setParentObjKids] = useState([] as Story[]);  
  const [parentObj] = useState(kidsObjComment as Story[]);

  const getKidsCommentKids = async (idKids: number) => {   
    try{  
      const idx = parentObj.findIndex((el) => el.id === idKids);
      let newItem = parentObj[idx];
      setParentIdKids(newItem.id);
      const dataArrayKids = await NewsServerData(newItem.kids.slice(0, 100));  
      setParentObjKids(dataArrayKids);   
    } catch(e){
      throw Error(`Что то пошло не так ${e}`)
    } 
  }
  
  return (   
    <React.Fragment>
      {deleted ? null :    
        <li className="news comment" onClick={(e) => {e.stopPropagation(); getKidsComment(id)}}>    
          <div className="news__name comment__name">
            <span>{by}</span>
          </div>
          <h3 className='news__time'>{moment.unix(time).format('MMMM D, YYYY')}</h3>
          <h4 className='news__text comment__text'>{text}</h4>
          {kids?.length ? <div className="news__kidsComments">Количество комментариев: <b>{kids?.length}</b></div> : null}
          {parentId === id && parentObj?.length 
            ? 
            <ul className="header__content-listKids">
              <MapCreateComments arrayComment={parentObj} getKidsComment={getKidsCommentKids} 
                                 kidsObjComment={parentObjKids} parentId={parentIdKids}
              />
            </ul> 
            : null                             
          }
        </li>    
      }
    </React.Fragment> 
  );
};

export default OneComment;