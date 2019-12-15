import Head from 'next/head'
import {Fragment, useState, useEffect} from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {singleBlog, listRelated} from '../../actions/blog'
import {API, DOMAIN, APP_NAME} from '../../config'
import renderHTML from 'react-render-html'
import moment from 'moment'
import RelatedCard from '../../components/blog/RelatedCard'

const SingleBlog = ({blog})=>{
    const [related, setRelated] = useState([])

    const loadRelated = () =>{
        listRelated({blog}).then(data =>{
            if(data){
                if(data.error){
                    console.log(data.error)
                }else{
                    setRelated(data)
                }
            }
            else{
                console.log('nodata')
            }
        })
    }

    useEffect(()=>{
        loadRelated();
    }, [])

    const head = ()=>(
        <Head>
            <title>{blog.title} | {APP_NAME} </title>
            <meta name="description" content={blog.mdesc}/>
            <link rel="canonical" href={`${DOMAIN}/blogs/${blog.slug}`}/>
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`}/>
            <meta property="og:description" content={blog.mdesc}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/blogs/${blog.slug}`}/>
            <meta property="og:site_name" content={APP_NAME}/>
            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:type" content="image/jpg"/>
        </Head>
    )

    const showBlogCategories = blog =>(
        blog.categories.map((c,i)=>(
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    )

    const showBlogTags = blog =>(
        blog.tags.map((t,i)=>(
            <Link key={i} href={`/categories/${t.slug}`}>
                <a className="btn btn-outline-info mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
    )

    const showRelatedBlog = ()=>{
        return (
            related.map((blog, i) => (
                <div key={i} className="col-md-4">
                    <article>
                        <RelatedCard blog={blog} />
                    </article>
                </div>
            )
        ))
    }


    return (
        <Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="w3-content">
                            <section>
                                <div style={{marginTop:'-30px'}} className="container mt-5">
                                    <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid featured-image" />
                                </div>
                            </section>
                            <section>
                                <div className="container">
                                    <h1 className="display pb-3 text-center pt-3">{blog.title}</h1>
                                    <p className="lead mt-3 w3-teal pl-2">
                                        Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}                                    
                                    </p>
                                    <div className="pb-3">                                    
                                        {showBlogCategories(blog)}
                                        {showBlogTags(blog)}
                                        <br/>
                                        <br/>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="w3-content">
                            <section>
                                <div className="col-md-12">
                                    {renderHTML(blog.body)}
                                </div>
                            </section>
                        </div>
                        <div className="w3-content pb-5">
                            <h2 className="text-center pt-5">Related blogs</h2>
                            <hr/>
                            <div className="row">
                                {showRelatedBlog()}
                            </div>
                        </div>
                        <div className="w3-content pb-5">
                            <p>show comments</p>
                        </div>
                    </article>
                </main>
            </Layout>
        </Fragment>
    )
}

SingleBlog.getInitialProps = ({query})=>{
    return singleBlog(query.slug).then(data =>{
        if(data.error){
            console.log(data.error)
        }else{
            return {blog:data}
        }
    })
}

export default SingleBlog;