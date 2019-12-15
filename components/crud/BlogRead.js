import Link from 'next/link'
import {useState, useEffect, Fragment} from 'react'
import Router, {withRouter} from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {list, removeBlog, updateBlog} from '../../actions/blog'
import moment from 'moment'

const BlogRead = () =>{
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState('')
    const token = getCookie('token')

    useEffect(()=>{
        loadBlogs()
    }, [])

    const loadBlogs = () =>{
        list().then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setBlogs(data)
            }
        })
    }


    const deleteConfirm = (slug) =>{
        let answer = window.confirm('Are you sure you want to delete this blog?')
        if(answer){
            removeBlog(slug, token).then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setMessage(data.message)
                    loadBlogs()
                }
            })
        }
    }

    const showUpdateButton = (blog)=>{
        if(isAuth() && isAuth().role === 0){
            return(
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-info">Update</a>
                </Link>
            )
        }else if(isAuth() && isAuth().role === 1){      
            return(
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-info">Update</a>
                </Link>
            )      
        }
    }

    const showAllBlogs = () =>{
        return (
            blogs.map((blog, i)=>{
                return(
                    <div key={i} className="pb-5">
                        <h3>{blog.title}</h3>
                        <p className="mark">Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}</p>
                        <button className="btn btn-sm btn-danger" onClick={()=> deleteConfirm(blog.slug)}>Delete</button>
                        {showUpdateButton(blog)}
                    </div>
                )
            })
        )
    }

    return(
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && (
                        <div className="alert alert-success">{message}</div>
                    )}
                    {showAllBlogs()}
                </div>
            </div>
        </Fragment>
    )
}

export default BlogRead