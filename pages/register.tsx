import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import {HiAtSymbol, HiFingerPrint,HiOutlineUser} from 'react-icons/hi';
import {useFormik} from 'formik'
import { registerValidate } from '../lib/validate'
import { useRouter } from 'next/router'

const Register = () => {
    const router=useRouter();
    const formik=useFormik({
        initialValues:{
            username:"",
            email:'',
            password:'',
            cpassword:''
        },
        validate:registerValidate,
        onSubmit:async(values)=>{
            fetch('http://localhost:3000/api/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(values)
            }).then(res=>res.json())
            .then(data=>{console.log(data);router.push('http://localhost:3000')})
        }
    })
  const [show,setShow]=useState({password:false,cpassword:false});
  return (
    <Layout>
        <Head>
            <title>Register</title>
        </Head>
        <div className='flex flex-col gap-3'>
            <div className="title">
                <h2 className='font-bold text-3xl '>Register</h2>
                <p className='mx-auto w-3/4 text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, rerum?</p>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-3 mx-4'>
            <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username ?'border-rose-500':''}`}>
                    <input {...formik.getFieldProps('username')} className={styles.input_text} type="text" name='username' placeholder='Username' />
                    <HiOutlineUser className={styles.icon}/>
                </div>
                <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email?'border-rose-500':""}`}>
                    <input {...formik.getFieldProps('email')} className={styles.input_text} type="email" name='email' placeholder='Email' />
                    <HiAtSymbol className={styles.icon}/>
                </div>
                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-500':''}`}>
                <input {...formik.getFieldProps('password')} type={show.password?'text':"password"} className={styles.input_text}  name='password' placeholder='password' />
                <HiFingerPrint onClick={()=>setShow({...show,password:!show.password})}  className={styles.icon}/>
                </div>
                <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-500':''}`}>
                <input {...formik.getFieldProps('cpassword')} type={show.cpassword?'text':'password'} className={styles.input_text}  name='cpassword' placeholder='Confirm Password' />
                <HiFingerPrint onClick={()=>setShow({...show,cpassword:!show.cpassword})}  className={styles.icon}/>
                </div>
                <div>
                    <button  className={styles.button} type='submit'>Register</button>
                </div>
                <div>
                    <p className='text-center'>Already have an account? <Link className='text-blue-500' href='/login'>Sign In</Link></p>
                </div>
            </form>
        </div>
        </Layout>
  )
}

export default Register