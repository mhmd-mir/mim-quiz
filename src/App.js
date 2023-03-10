
import { useRoutes } from 'react-router-dom';
import './App.css';
import routes from './routes';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store'
import { useEffect } from 'react';
import Loader from './components/Loader/Loader';


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
    // init questions
    store.dispatch({
      type : 'API_REQUEST' ,
      payload : {
        method : 'INIT' ,
        table : 'questions' ,
        onSuccessType : 'questions/INIT_QUESTIONS' ,
        onErrorType : ''
      } 
    })
    // init users 
    store.dispatch({
      type  : 'API_REQUEST' , 
      payload : {
        method : 'INIT' ,
        table : 'users' ,
        onSuccessType : 'users/INIT_USERS' ,
        onErrorType : ''
      }
    })
  // init logs 
  store.dispatch({
    type  : 'API_REQUEST' , 
    payload : {
      method : 'INIT' ,
      table : 'logs' ,
      onSuccessType : 'logs/INIT_LOGS' ,
      onErrorType : ''
    }
  })
    // forien key
    // store.dispatch({
    //   type : 'API_REQUEST' ,
    //   payload : {
    //     method : 'TEST' ,
    //     table : 'questions' ,
    //     onSuccessType : 'questions/INIT_QUESTIONS' ,
    //     onErrorType : ''
    //   } 
    // })


  } , [])
  return (
    <Provider store={store}>
      {allRoutes}
    </Provider>
  );
}

export default App;
