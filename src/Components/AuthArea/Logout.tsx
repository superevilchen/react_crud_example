import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../Redux/AuthAppState';
import { AuthorsClearAction, authorsReadAction } from '../../Redux/AuthorAppState';
import { AuthorBooksIsReadAction, BooksClearAction, BooksReadAction } from '../../Redux/BookAppState';
import { FavoriteAuthorsClearAction, FavoriteBooksClearAction } from '../../Redux/FavoritesAppState';
import store from '../../Redux/Store';
import notify, { SccMsg } from '../../Utils/Notification/Notify';


function Logout() {

    const navigate = useNavigate();

    useEffect(() => {
        notify.success(SccMsg.LOGOUT_SUCCESS);
        store.dispatch(logoutAction());

        // clear authors reducer
        store.dispatch(authorsReadAction());
        store.dispatch(AuthorsClearAction());

        // clear books reducer
        store.dispatch(AuthorBooksIsReadAction());
        store.dispatch(BooksReadAction());
        store.dispatch(BooksClearAction());

        // clear favorite reducer
        store.dispatch(FavoriteBooksClearAction());
        store.dispatch(FavoriteAuthorsClearAction());


        navigate("/");

        
    });

    return (
        <></>
    );
}


export default Logout