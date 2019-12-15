import Head from 'next/head'
import {Fragment, useState, useEffect} from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {singleTag} from '../../actions/tag'
import {API, DOMAIN, APP_NAME} from '../../config'
import renderHTML from 'react-render-html'
import Card from '../../components/blog/Card'
import moment from 'moment'

const Tag = ({tag, blogs, query})=>{
    const head = ()=>(
        <Head>
            <title>{tag.name} | {APP_NAME} </title>
            <meta name="description" content={`Best programming tutorials on ${tag.name}`}/>
            <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`}/>
            <meta property="og:title" content={`${tag.name} | ${APP_NAME}`}/>
            <meta property="og:description" content={`Best programming tutorials on ${tag.name}`}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`}/>
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
                                    {tag.name}
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

Tag.getInitialProps = ({query})=>{
    return singleTag(query.slug).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.tag)
            return {tag:data.tag, blogs:data.blogs, query}
        }
    })
}

export default Tag