import { SpinerLoading } from '../spinerLoading/spinerLoading.jsx';
import './Map-OneComment.css';
import React from 'react';
import  OneComment  from './OneComment';

interface IProps { 
  arrayComment: Array<object>,
  getKidsComment: Function,
  kidsObjComment: Array<object> | null,
  parentId: number | null,
}

const MapCreateComments = ({arrayComment, getKidsComment, kidsObjComment, parentId}: IProps) => {

  let elements = arrayComment.map((item: object) => {
    if (item === null) {
      return <SpinerLoading />;
    }
    const { by, text, time,
            id, kids, deleted
          } = item as { by: string, text: string, 
                        time: number, id: number, kids: Array<number>, deleted: boolean
                      };
    
    return <OneComment by={by} text={text} time={time} 
            id={id} kids={kids} key={id + Math.random()} getKidsComment={getKidsComment} 
            kidsObjComment={kidsObjComment} parentId={parentId} deleted={deleted}
           />;
  });

  return <React.Fragment>{elements}</React.Fragment>;
};

export default MapCreateComments;


