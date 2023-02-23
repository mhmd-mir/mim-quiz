
// admin panel pages
import AdminIndex from './pages/adminPanel/AdminIndex'
import AdminDashboard from './pages/adminPanel/AdminDashboard/AdminDashboard'
import NewQuiz from './pages/adminPanel/NewQuiz/NewQuiz'


const routes = [
    { 
        path : '/p-admin' ,
        element : <AdminIndex /> ,
        children : [
            { path : '' , element : <AdminDashboard /> } ,
            { path : 'newQuiz' , element : <NewQuiz /> } ,
        ]
    } ,
]

export default routes ;