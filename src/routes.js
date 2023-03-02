// root 
import Index from './pages/Index/Index' ;
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'


// admin panel pages
import AdminIndex from './pages/adminPanel/AdminIndex'
import AdminDashboard from './pages/adminPanel/AdminDashboard/AdminDashboard'
import NewQuiz from './pages/adminPanel/NewQuiz/NewQuiz'
import Exams from './pages/adminPanel/Exams/Exams'
import EditQuiz from './pages/adminPanel/EditQuiz/EditQuiz'
import NewQuestion from './pages/adminPanel/NewQuestion/NewQuestion'
import Questions from './pages/adminPanel/Questions/Questions'
import EditQuestion from './pages/adminPanel/EditQuestion/EditQuestion'
import NewUser from './pages/adminPanel/NewUser/NewUser'
import Users from './pages/adminPanel/Users/Users'
import EditUser from './pages/adminPanel/EditUser/EditUser'


// user panel pages
import UserIndex from './pages/userPanel/UserIndex'
import UserDashboard from './pages/userPanel/UserDashboard/UserDashboard'
import UserExams from './pages/userPanel/UserExams/UserExams'
import UserAccountInfo from './pages/userPanel/UserAccountInfo/UserAccountInfo'

const routes = [
    {
        path : '/' , 
        element : <Index />
    } ,
    {
        path : '/register' , 
        element : <Register />
    },
    {
        path : '/login' , 
        element : <Login />
    },
    { 
        path : '/p-admin' ,
        element : <AdminIndex /> ,
        children : [
            { path : '' , element : <AdminDashboard /> } ,

            { path : 'newQuiz' , element : <NewQuiz /> } ,
            { path : 'editQuiz/:id' , element : <EditQuiz /> } ,
            { path : 'exams' , element : <Exams /> } ,

            { path : 'newQuestion' , element : <NewQuestion /> } ,
            { path : 'editQuestion/:id' , element : <EditQuestion />  } ,
            { path : 'questions' , element : <Questions /> } ,

            { path : 'newUser' , element : <NewUser />  } ,
            { path : 'editUser/:id' , element : <EditUser /> } ,
            { path : 'users'  , element : <Users />} ,


        ]
    } ,
    {
        path : '/my-account' , 
        element : <UserIndex /> ,
        children : [
            { path : '' , element : <UserDashboard /> },
            { path : 'exams' , element : <UserExams /> },
            { path : 'account-info' , element : <UserAccountInfo /> },
        ]
    }
]

export default routes ;