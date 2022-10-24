import Banner from './Banner'
import Timeline from './Timeline'
import LogIn from './Login'
import SignUp from './Signup'
import NewPost from './NewPost'
import {                            // installation du module 'react router' pour definir les URL avec les composants
    BrowserRouter as Router,        // browserrouter utilise historique du html5
    Routes as Switch,
    Route
} from 'react-router-dom';
import { createContext } from 'react'
import useUser from './auth-service/useUser'
import { ThemeProvider } from '@mui/material'
import { appTheme } from './appTheme'

export const UserContext = createContext();

function App() {

    const { user, setUser } = useUser();

    return (
        <UserContext.Provider value={user}>
            <ThemeProvider theme={appTheme}>
                <Router>
                    <div>
                        <Banner />

                        <Switch>
                            <Route path='/login' element={<LogIn setUser={setUser} />} />
                            <Route path='/home' element={<Timeline />} />
                            <Route path='/signup' element={<SignUp />} />
                            <Route path='/newPost' element={<NewPost />} />
                        </Switch>
                    </div>
                </Router>
            </ThemeProvider>
        </UserContext.Provider>
    );
}

export default App