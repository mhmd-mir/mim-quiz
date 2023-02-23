
import { useRoutes } from 'react-router-dom';
import './App.css';
import routes from './routes';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store'
import { useEffect } from 'react';


function App() {

  const allRoutes = useRoutes(routes)


  useEffect(() => {
    // init exams
    store.dispatch({
      type : 'API_REQUEST' ,
      payload : {
        method : 'INIT' ,
        table : 'exams' ,
        onSuccessType : 'exams/INIT_EXAMS' ,
        onErrorType : ''
      } 
    })
  } , [])
  return (
    <Provider store={store}>
      {allRoutes}
    </Provider>
  );
}

export default App;
