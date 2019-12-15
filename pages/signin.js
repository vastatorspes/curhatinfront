import {useEffect} from 'react'
import Layout from '../components/Layout'
import SigninComponent from '../components/auth/SigninComponent'
import Link from 'next/link'
import {isAuth} from '../actions/auth'
import Router from 'next/router'

const Signin = () => {
    
    useEffect(()=>{
        isAuth() && Router.push('/')
    },[])

    return(
        <Layout>
            <h2 className="text-center pt-4 pb-4">Signin</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SigninComponent />
                </div>
            </div>
        </Layout>
    )

}

export default Signin