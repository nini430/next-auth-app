import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

const Profile = () => {
  return (
    <div>
        <h1>User Profile Page</h1>
    </div>
  )
}

export default Profile

export const getServerSideProps:GetServerSideProps=async({req})=>{
    const session=await getSession({req});

    if(!session) {
        return {
            redirect:{
                destination:"/login",
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