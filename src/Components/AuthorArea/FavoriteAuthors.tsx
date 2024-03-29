import React, { useEffect, useState } from 'react'
import { Author } from '../../Models/Author'
import { FavoriteAuthorsDownloadedAction } from '../../Redux/FavoritesAppState';
import store from '../../Redux/Store'
import { getFavoriteAuthors } from '../../Utils/ApiArea/AuthorApi';
import notify, { ErrMsg, SccMsg } from '../../Utils/Notification/Notify';
import EmptyView from '../SharedArea/EmptyView';
import AuthorItem from './AuthorItem';

function FavoriteAuthors() {

    const [authors, setAuthors] = useState<Author[]>(store.getState().favorites.favoriteAuthors);

    useEffect(() => {

        if (!store.getState().favorites.favoriteAuthorsRead) {
            getFavoriteAuthors()
                .then(response => {
                    setAuthors(response.data)
                    store.dispatch(FavoriteAuthorsDownloadedAction(response.data))
                    notify.success(SccMsg.GOT_AUTHOR)
                })
            .catch(() => {notify.error(ErrMsg.FAIL_GOT_AUTHOR)})
        }
    }, [])

  return (
      <div>
          {authors.length > 0 ? authors.map(a => <AuthorItem key={a.id} author={a}/>) : <EmptyView/>}
    </div>
  )
}

export default FavoriteAuthors