import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { registerNew } from '../../Utils/ApiArea/UserApi';
import store from '../../Redux/Store';
import { isDirty, isValid } from 'zod';
import { registerAction } from '../../Redux/AuthAppState';
import notify, { ErrMsg, SccMsg } from '../../Utils/Notification/Notify';

function Register() {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required(),
        confirm: yup.string()
            .required("Confirm your password")
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<any>({
        resolver: yupResolver(schema),
        mode: 'all'
    });
    
    const registerUser = (user: any) => {
        registerNew(user.email, user.password)
            .then((response) => {
                store.dispatch(registerAction())
                notify.success(SccMsg.REGISTER_SUCCESS)
                navigate('/')
            })
            .catch(() => {
                notify.error(ErrMsg.FAIL_REGISTER)
                navigate('/')
            })
    }
    

  return (
      <div>
          <form onSubmit={handleSubmit(registerUser)}>
              <input type="text" placeholder="email" {...register('email')}/>
              {/* <p>{ errors.email?.message }</p> */}
              <input type="text" placeholder="password" {...register('password')}/>
              {/* <p>{ errors.password?.message }</p> */}
              <input type="text" placeholder="confirm password" {...register('confirm')}/>
              {/* <p>{errors.confirm?.message}</p> */}
              <button type="submit" disabled={!isDirty || !isValid}>register</button>
          </form>
    </div>
  )
}

export default Register