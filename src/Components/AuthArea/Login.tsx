import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { User } from '../../Models/User';
import { login } from '../../Utils/ApiArea/UserApi';
import { loginAction } from '../../Redux/AuthAppState';
import store from '../../Redux/Store';
import notify, { ErrMsg, SccMsg } from '../../Utils/Notification/Notify';

function Login() {

  const navigate = useNavigate();

    const schema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
    })
  
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const loginUser = (credentials: any) => {
    login(credentials.email, credentials.password)
      .then((response) => {
        console.log(response.data)
        store.dispatch(loginAction(response.data))
        notify.success(SccMsg.LOGIN_SUCCESS)
        navigate('/')
      })
      .catch(() => {
        notify.error(ErrMsg.FAIL_LOGIN)
        navigate('/')
    })
  }

  return (
      <div>
          <form onSubmit={handleSubmit(loginUser)}>
        <input type="text" placeholder="email" {...register('email')} />
        {/* <p>{ errors.email?.message }</p> */}
        <input type="text" placeholder="password" {...register('password')} />
        {/* <p>{ errors.password?.message }</p> */}
              <button type="submit">login</button>
          </form>
    </div>
  )
}

export default Login