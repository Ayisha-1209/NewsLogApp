import './App.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import TopStag from './components/TopStag';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import { requestData } from './data';
import Main from './components/Main';
import { updateNews } from './utils';
import { Outlet } from 'react-router-dom';

function App() {
  useSelector((state) => state.auth.status);
  const [articles, setArticles] = useState([]);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [request, setRequest] = useState(requestData);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(0);
  const [loggingin, setLoggingin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    updateNews(request, setLoadingArticle, setArticles, setPages).then(
      () => setLoading(false)
    );
  }, [request]);

  

  const location = useLocation()
  const isLoginPage = location.pathname === '/login' ||  location.pathname === '/signup'  ;
  
  return !loading ? (
    <>
      <TopStag />
      <Header setRequest={setRequest} request={request} loggingin={loggingin} setLoggingin={setLoggingin} />
      <Outlet context={{ loggingin, setLoggingin }} />
      {!isLoginPage && (
        <main>
          <Main pages={pages} articles={articles} setRequest={setRequest} request={request} loadingArticle={loadingArticle} />
        </main>
      )}
    </>
  ) : <Loader />;
}

export default App;
