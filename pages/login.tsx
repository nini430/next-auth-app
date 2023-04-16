import Head from 'next/head'
import Image from 'next/image'
import React, { SyntheticEvent, useState } from 'react'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import {HiAtSymbol, HiFingerPrint} from 'react-icons/hi';
import {signIn} from 'next-auth/react'
import {useFormik} from 'formik'
import { loginValidate } from '../lib/validate'
import { useRouter } from 'next/router'
import { Url } from 'next/dist/shared/lib/router/router'

const Login = () => {
    const router=useRouter();
    const formik=useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit:async(values)=>{
            const status=await signIn('credentials',{redirect:false,callbackUrl:'/',email:values.email,password:values.password});

            if(status?.ok) {
                router.push(status.url as Url);
            }
        },
        validate:loginValidate
    })
    const [show,setShow]=useState(false)
    const handleGoogleLogin=async(e:SyntheticEvent)=>{
        e.preventDefault();
        signIn('google',{callbackUrl:'http://localhost:3000'});
    }
    const handleGitLogin=async(e:SyntheticEvent)=>{
        e.preventDefault();
        signIn('github',{callbackUrl:'http://localhost:3000'})
    }
  return (
    <Layout>
        <Head>
            <title>Login</title>
        </Head>
        <div className='flex flex-col gap-3'>
            <div className="title">
                <h2 className='font-bold text-3xl '>Explore</h2>
                <p className='mx-auto w-3/4 text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, rerum?</p>
            </div>
            <form onSubmit={(e)=>{e.preventDefault();formik.handleSubmit()}} className='flex flex-col gap-3 mx-4'>
                <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email?'border-rose-500':''}`}>
                    <input className={styles.input_text} {...formik.getFieldProps('email')}  type="email" name='email' placeholder='Email' />
                    <HiAtSymbol className={styles.icon}/>
                </div>
                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password?'border-rose-500':''}`}>
                <input {...formik.getFieldProps('password')} className={styles.input_text} type={show?'text':'password'} name='password' placeholder='password' />
                <HiFingerPrint onClick={()=>setShow(!show)} className={styles.icon}/>
                </div>
                <div>
                    <button  className={styles.button} type='submit'>Login</button>
                </div>
                <div onClick={handleGoogleLogin} className={styles.custom_button}>
                    <button>Sign In With Google</button>
                    <Image src='/assets/google.svg' alt='google' width='20' height='20'/>
                </div>
                <div onClick={handleGitLogin}  className={styles.custom_button}>
                    <button>Sign in with Github</button>
                    <Image src='/assets/github.svg' alt='github' width='25' height='25'/>
                </div>
                <div>
                    <p className='text-center'>Dont have account yet? <Link className='text-blue-500' href='/register'>Sign Up</Link></p>
                </div>
            </form>
        </div>
        </Layout>
  )
}

export default Login