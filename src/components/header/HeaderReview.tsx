import './Header.css';
import { Link } from 'react-router-dom';

const HeaderReview = ({objNews}: any) => {
  let { url } = objNews.current as {url: string};

  return (
    <header className="header">     
      <div className="header__content">
        <h1 className="header__content-title">Подробно о выбранной новости</h1>
        <Link to={`${url}`}><button className="header__content-button">Переход на данную новость</button></Link>
        <Link to="/"><button className="header__content-button">Возврат к списку новостей</button></Link>
      </div>
    </header>
  );
};

export default HeaderReview;
