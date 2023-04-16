import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { getSession, useSession, signOut } from 'next-auth/react'

const Home: NextPage = () => {
  const handleSignOut=()=>{
    signOut()
  }
  const {data:session}=useSession()
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      {session? User({session,handleSignOut}):Guest()}
    </div>
  )
}

function Guest() {
  return (
    
    <main>
    <h3 className='text-indigo-500 text-center'>Guest Page</h3>
    <div className='flex justify-center '>
      <Link className='bg-indigo-500 text-white p-2 rounded-md' href='/login'>Sign In</Link>
    </div>
</main>
  )
}


function User({session,handleSignOut}:{session:any,handleSignOut:()=>void}) {
  return (
    <main>
      <h3 className='text-indigo-500 text-center'>Authorized User page</h3>
      <div className='flex justify-center flex-col items-center'>
      <Link className='bg-indigo-500 text-white p-2 rounded-md' href='/profile'>Profile Page</Link>
      <div className='flex justify-center flex-col items-center'>
        <h3>{session.user.name}</h3>
        <h3>{session.user.email}</h3>
      </div>
      <button onClick={handleSignOut} className='bg-indigo-500 px-1 py-2 text-white rounded-md'>Sign Out</button>
      </div>
      
    </main>
  )
}

export default Home

export const getServerSideProps:GetServerSideProps=async({req})=>{
    const session=await getSession({req});
    if(!session) {
      return {
        redirect:{
          destination:'/login',
          permanent:false
        }
      }
    }

    return {
      props:{
        session
      }
    }

} 
