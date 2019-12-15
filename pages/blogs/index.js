import Head from 'next/head'
import {Fragment, useState} from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {listBlogsCatTags} from '../../actions/blog'
import Card from '../../components/blog/Card'
import {API, DOMAIN, APP_NAME} from '../../config'
import {withRouter} from 'next/router'

const Blogs = ({blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router})=>{

    const head = ()=>(
        <Head>
            <title>Programming Blogs | {APP_NAME} </title>
            <meta name="description" content="Programming blogs and tutorials on react and web development"/>
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:title" content={`Latest web development tutorials | ${APP_NAME}`}/>
            <meta property="og:description" content="Programming blogs and tutorials on react and web development"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={APP_NAME}/>
            <meta property="og:image" content={`${DOMAIN}/static/images/perfecto.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/perfecto.png`}/>
            <meta property="og:image:type" content="image/jpg"/>
        </Head>
    )

    const [limit, setLimit] = useState(blogsLimit)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(totalBlogs)
    const [loadedBlogs, setLoadedBlogs] = useState([])

    const loadMore = () =>{
        let toSkip = skip + limit
        listBlogsCatTags(toSkip, limit).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setLoadedBlogs([...loadedBlogs, ...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () =>{
        return(
            size > 0 && size >= limit &&(
                <button onClick={loadMore} className="btn btn-outline-info">
                    load more
                </button>
            )
        )
    }

    const showAllBlogs = ()=>{
        return blogs.map((blog, i)=>(
            <article key={i}>
                <Card blog={blog} />
                <br/>
            </article>
        ))
    }

    const showLoadedBlogs = ()=>{
        return loadedBlogs.map((blog, i)=>(
            <article key={i}>
                <Card blog={blog} />
                <br/>
            </article>
        ))
    }

    const showAllCategories = () =>{
        return categories.map((c,i)=>(
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))    
    }

    const showAllTags = () =>{
        return tags.map((t,i)=>(
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-info mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
    }

    return(
        <Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 text-center w3-text-teal">
                                    Positive Blogs
                                </h1>
                            </div>
                            <section>
                                <div className="pb-5 text-center">
                                    {showAllCategories()}
                                    <br/>
                                    {showAllTags()}
                                </div>
                            </section>
                        </header>
                    </div>
                    <div className="container-fluid w3-content">{showAllBlogs()}</div>
                    <div className="container-fluid w3-content">{showLoadedBlogs()}</div>
                    <div className="text-center pt3">{loadMoreButton()}</div>
                </main>
            </Layout>    
        </Fragment>
    )
}

Blogs.getInitialProps = ()=>{
    let skip = 0;
    let limit = 2;
    return listBlogsCatTags(skip, limit).then(data =>{
        if(data.error){
            console.log(data.error)
        }else{
            return {
                blogs:data.blogs,
                categories:data.categories,
                tags:data.tags,
                totalBlogs:data.size,
                blogsLimit: limit,
                blogsSkip: skip
            };
        }
    })
}

export default withRouter(Blogs);