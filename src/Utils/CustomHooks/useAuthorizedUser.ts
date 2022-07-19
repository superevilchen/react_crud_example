
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../Redux/Store";
import notify, { ErrMsg } from "../Notification/Notify";


export function useAuthorizedUser() {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().auth.user.token) {
          notify.error(ErrMsg.PLS_LOGIN);
          navigate("/login");
        }
      }, []);
}