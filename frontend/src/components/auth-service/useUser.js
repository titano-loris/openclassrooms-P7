import { useState } from 'react';
import getToken from './getToken';
import getUserID from './getUserID';
import getAdmin from './getAdmin';
import saveUserID from './saveUserID';
import saveToken from './saveToken';
import saveAdmin from './saveAdmin';

function useUser() {

    const localInfo = {
        token: getToken() ? getToken() : "",
        userId: getUserID() ? getUserID() : "",
        isAdmin: getAdmin() ? getAdmin() : 0
    }
    const [user, setUser] = useState(localInfo);

    const editUser = (user) => {
        if (user) {
            setUser(user);
            saveUserID(user.userId);
            saveToken(user.token);
            saveAdmin(user.Admin);
        }
    }

    return {
        user: user,
        setUser: editUser
    }
}

export default useUser