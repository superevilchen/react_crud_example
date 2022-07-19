import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { User } from '../../Models/User';
import store from '../../Redux/Store';


function AuthMenu() {

    const [user, setUser] = useState(store.getState().auth.user);

    useEffect(() => {

        return store.subscribe(() => {
            setUser(store.getState().auth?.user || new User(0, '', '', ''))
        })
    },[])

  return (
      <div>
          {user?.token ?
        
              <>
                  <span>{user.email}</span>
                  <Link to='/logout'>logout</Link>
              </>

              :

              <>
                  <span>hello guest</span>
                  <Link to="/login">login</Link>
                  <Link to="/register">register</Link>
              </>
        
        }
    </div>
  )
}

export default AuthMenu