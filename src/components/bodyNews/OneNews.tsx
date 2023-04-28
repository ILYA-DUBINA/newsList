import moment from 'moment';
import { Link } from 'react-router-dom';
import './Map-OneNews.css';

interface IProps { 
  by: string,
  title: string,
  time: number,
  score: number,
  descendants: number,
  id: number,
  kids: Array<number>,
  url: string,
  getObjNews: Function
}

const OneNews = (props: IProps) => {
  let { by, title, time, score, descendants, getObjNews} = props;
  
  return (
    
      <div className="news">
        <Link to="/review" onClick={() => getObjNews(props)}>
          <div className="news__name">
            <span>{by}</span>
          </div>
          <h3 className='news__time'>{moment.unix(time).format('MMMM D, YYYY')}</h3>
          <h1 className='news__title'>{title}</h1>
          <div className="news__container">          
            {score ? <div>Рейтинг: {score}</div> : null}
            {descendants ? <div>Количество комментариев: {descendants}</div> : null}
          </div>   
        </Link>     
      </div>    
  );
};

export default OneNews;

