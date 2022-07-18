import React, { useEffect, useState } from 'react'
import { Author } from '../../Models/Author';
import { authorDownloadedAction } from '../../Redux/AuthorAppState';
import store from '../../Redux/Store';
import { getAuthors } from '../../Utils/ApiArea/AuthorApi';
import notify, { ErrMsg, SccMsg } from '../../Utils/Notification/Notify';
import EmptyView from '../SharedArea/EmptyView';
import AuthorItem from './AuthorItem';

function AuthorList() {

    // here we write logic, state, effects...

    const [authors, setAuthors] = useState<Author[]>(store.getState().authors.authors);

    useEffect(() => {

        if (!store.getState().authors.isRead) {
            
            getAuthors()
                .then((res) => {
                    setAuthors(res.data) // save to state
                    store.dispatch(authorDownloadedAction(res.data)) // save to redux
                    notify.success(SccMsg.GOT_AUTHOR); // notify that action was successful
                })
            .catch(() => notify.error(ErrMsg.FAIL_GOT_AUTHOR))
        }
        
    }, [])

    // here we write UI - TSX(html, css)

  return (
      <div>
          {authors.length > 0 ? 
              
              authors.map(author => <AuthorItem key={author.id} author={author}/>)

              :

              <EmptyView/>
        }
    </div>
  )
}

export default AuthorList