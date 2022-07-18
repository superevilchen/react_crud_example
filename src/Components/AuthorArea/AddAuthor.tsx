import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { Author } from '../../Models/Author';
import { yupResolver } from '@hookform/resolvers/yup'
import { addAuthor } from '../../Utils/ApiArea/AuthorApi';
import store from '../../Redux/Store';
import { authorsAddedAction } from '../../Redux/AuthorAppState';
import notify, { ErrMsg, SccMsg } from '../../Utils/Notification/Notify';
import { useNavigate } from 'react-router-dom';


function AddAuthor() {

  const navigate = useNavigate();

  const authorSchema = yup.object().shape({
    name: yup.string().required("Please insert a name"),
    birthday: yup.date().max(new Date()).required("Please insert a description"),
  });
  
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<Author>({
    resolver: yupResolver(authorSchema),
    mode: "all",
  });
  
  const sendToRemote = (author: Author) => {

    addAuthor(author)
      .then((response) => {
        store.dispatch(authorsAddedAction(response.data))
        notify.success(SccMsg.ADDED_AUTHOR)
        navigate("/authors")
      })
    .catch(() => notify.error(ErrMsg.FAIL_ADDED_AUTHOR))
  }
    
  return (
    <div>
      <form onSubmit={handleSubmit(sendToRemote)}>
        <span>Name of Author: </span>
        <input type="text" {...register("name")} />
        <p>{ errors.name?.message }</p>
        <span>Birthday: </span>
        <input type="date" {...register("birthday")} />
        <p>{ errors.birthday?.message }</p>
        <input type="submit" placeholder="Add Author" disabled={!isValid}/>
      </form>
    </div>
  )
}

export default AddAuthor