import Head from 'next/head'
import {Fragment, useState, useEffect} from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {singleCategory} from '../../actions/category'
import {API, DOMAIN, APP_NAME} from '../../config'
import renderHTML from 'react-render-html'
import Card from '../../components/blog/Card'
import moment from 'moment'

const Category = ({category, blogs, query})=>{
    
    const head = ()=>(
        <Head>
            <title>{category.name} | {APP_NAME} </title>
            <meta name="description" content={`Best programming tutorials on ${category.name}`}/>
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`}/>
            <meta property="og:title" content={`${category.name} | ${APP_NAME}`}/>
            <meta property="og:description" content={`Best programming tutorials on ${category.name}`}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`}/>
            <meta property="og:site_name" content={APP_NAME}/>
            
            <meta property="og:image" content={`${DOMAIN}/static/images/perfecto.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/perfecto.png`}/>
            <meta property="og:image:type" content="image/jpg"/>
        </Head>
    )

    return(
        <Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3 w3-content">
                                <h1 className="display-4 pb-3 w3-text-teal w3-center">
                                    {category.name}
                                </h1>
                                {blogs.map((b,i)=> (
                                    <div>
                                        <Card key={i} blog={b}/>
                                        <br/>
                                    </div>
                                    )
                                )}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </Fragment>
    )
}

Category.getInitialProps = ({query})=>{
    return singleCategory(query.slug).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data)
            return {category:data.category, blogs:data.blogs, query}
        }
    })
}

export default Category