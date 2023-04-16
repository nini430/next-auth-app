import React from 'react'
import styles from '../styles/Layout.module.css'

interface ILayoutProps {
    children:React.ReactNode
}

const Layout = ({children}:ILayoutProps) => {
  return (
    <div className='bg-blue-400 h-screen flex'>
        <div className='bg-slate-50 w-3/5 h-3/4 rounded-md grid lg:grid-cols-2 m-auto'>
            <div className={styles.imgStyle}>
                <div className={styles.cartoonImg}/>
                <div className={styles.cloud_one}/>
                <div className={styles.cloud_two}/>
            </div>
            <div className='flex flex-col justify-evenly'>
                <div className='text-center py-10'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout;