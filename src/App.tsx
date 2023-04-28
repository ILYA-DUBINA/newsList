import { Route, Routes } from 'react-router-dom';
import AppNews from './page/AppNews';
import AppDetailedNews from './page/AppDetailedNews';
import Header from './components/header/Header';
import React, { useRef, useState } from 'react';
import HeaderReview from './components/header/HeaderReview';

const App = () => {
  const [update, setUpdate] = useState(false);
  let objNews = useRef({});

  const updateNews = () => {
    setUpdate(true);
  }

  const updateNewsBack = () => {
    setUpdate(false);
  }

  const getObjNews = (obj: object)=>{
    objNews.current = obj;  
  }

  return (
    <div className="allContent">           
      <Routes>
        <Route path="/" element={ <React.Fragment>
                                    <Header updateNews={updateNews} />
                                    <AppNews update={update} updateNewsBack={updateNewsBack} getObjNews={getObjNews} />
                                  </React.Fragment>} 
        />
        <Route path="/review" element={  <React.Fragment>
                                          <HeaderReview objNews={objNews}/>
                                          <AppDetailedNews objNews={objNews}/>
                                        </React.Fragment>} 
        />
      </Routes>
    </div>
  );
};

export default App;
