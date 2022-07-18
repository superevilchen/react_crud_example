import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { authorsDeletedAction } from '../../Redux/AuthorAppState';
import store from '../../Redux/Store';
import { deleteBook } from '../../Utils/ApiArea/BookApi';
import notify, { SccMsg, ErrMsg } from '../../Utils/Notification/Notify';

function DeleteBook() {
    
    const params = useParams();
    const id = +(params.id || "");
  
    const navigate = useNavigate();
  
    const sendToRemote = () => {

      deleteBook(id)
        .then(() => {
          store.dispatch(authorsDeletedAction(id));
            notify.success(SccMsg.DELETED_BOOK);
            navigate("/authors")
        })
        .catch(() => {
          notify.error(ErrMsg.FAIL_DELETED_BOOK);
        });
    };
  
      return <div>
          <h2>Delete book?</h2>
          <button onClick={sendToRemote}>Yes</button>
          <button onClick={() => navigate("/books")}>No</button>
    </div>;
  }

export default DeleteBook