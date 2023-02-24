
// admin panel pages
import AdminIndex from './pages/adminPanel/AdminIndex'
import AdminDashboard from './pages/adminPanel/AdminDashboard/AdminDashboard'
import NewQuiz from './pages/adminPanel/NewQuiz/NewQuiz'
import Exams from './pages/adminPanel/Exams/Exams'
import EditQuiz from './pages/adminPanel/EditQuiz/EditQuiz'
import NewQuestion from './pages/adminPanel/NewQuestion/NewQuestion'


const routes = [
    { 
        path : '/p-admin' ,
        element : <AdminIndex /> ,
        children : [
            { path : '' , element : <AdminDashboard /> } ,
            { path : 'newQuiz' , element : <NewQuiz /> } ,
            { path : 'editQuiz/:id' , element : <EditQuiz /> } ,
            { path : 'exams' , element : <Exams /> } ,
            { path : 'newQuestion' , element : <NewQuestion /> } ,
            { path : 'editQuestion/:id'  } ,
            { path : 'questions' } ,
        ]
    } ,
]

export default routes ;