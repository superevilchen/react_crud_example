import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'
import { Author } from '../../Models/Author';
import { yupResolver } from '@hookform/resolvers/yup'
import store from '../../Redux/Store';
import { useFormState, useForm } from 'react-hook-form';
import { updateAuthor } from '../../Utils/ApiArea/AuthorApi';
import { authorsUpdatedAction } from '../../Redux/AuthorAppState';
import { isDirty } from 'zod';
import notify, { SccMsg, ErrMsg } from '../../Utils/Notification/Notify';

function UpdateAuthor() {

    const params = useParams();
    const id = +(params.id || '');

    const navigate = useNavigate();

    const [author, setAuthor] = useState<Author>(store.getState().authors.authors.filter(a => a.id === id)[0]);

    const authorSchema = yup.object().shape({
        name: yup.string().required("Please insert a name"),
        birthday: yup.date().max(new Date()).required("Please insert a description"),
    });
    
    let defaultValuesObj = { ...author };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<Author>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(authorSchema) });

    const { dirtyFields } = useFormState({
        control
    });

    const sendToRemote = (author: Author) => {

        updateAuthor(author)
        .then((response) => {
          store.dispatch(authorsUpdatedAction(response.data))
          notify.success(SccMsg.UPDATED_AUTHOR)
          navigate("/authors")
        })
      .catch(() => notify.error(ErrMsg.FAIL_UPDATED_AUTHOR))
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
      <input type="submit" placeholder="Add Author" disabled={!isDirty}/>
    </form>
  </div>
  )
}

export default UpdateAuthor