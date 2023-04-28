import './Header.css';

interface IProps {
  updateNews: () => void,  
}

const Header = ({updateNews}: IProps) => {
  return (
    <header className="header">     
      <div className="header__content">
        <h1 className="header__content-title">Список новостей</h1>
        <button className="header__content-button" onClick={updateNews}>Обновление новостей</button>
      </div>
    </header>
  );
};

export default Header;
