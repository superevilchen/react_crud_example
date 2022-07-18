import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authorsDeletedAction } from "../../Redux/AuthorAppState";
import store from "../../Redux/Store";
import { deleteAuthor } from "../../Utils/ApiArea/AuthorApi";
import notify, { ErrMsg, SccMsg } from "../../Utils/Notification/Notify";

function DeleteAuthor() {
  const params = useParams();
  const id = +(params.id || "");

  const navigate = useNavigate();

  const sendToRemote = () => {
    deleteAuthor(id)
      .then(() => {
        store.dispatch(authorsDeletedAction(id));
          notify.success(SccMsg.DELETED_AUTHOR);
          navigate("/authors")
      })
      .catch(() => {
        notify.error(ErrMsg.FAIL_DELETED_AUTHOR);
      });
  };

    return <div>
        <h2>Delete author?</h2>
        <button onClick={sendToRemote}>Yes</button>
        <button onClick={() => navigate("/authors")}>No</button>
  </div>;
}

export default DeleteAuthor;
