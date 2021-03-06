import Link from 'next/link'
import {useState, useEffect} from 'react'
import Router, {withRouter} from 'next/router'
import dynamic from 'next/dynamic'
import {getCookie, isAuth} from '../../actions/auth'
import {getCategories} from '../../actions/category'
import {getTags} from '../../actions/tag'
import {singleBlog, updateBlog} from '../../actions/blog'
const ReactQuill = dynamic(()=> import('react-quill'), {ssr:false})
import '../../node_modules/react-quill/dist/quill.snow.css';
import {QullModules, QuillFormats } from '../../helpers/quill'
import {API} from '../../config'

const BlogUpdate = ({router}) =>{

    
    const [body, setBody] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checkedCat, setCheckedCat] = useState([])
    const [checkedTag, setCheckedTag] = useState([])
    const [values, setValues] = useState({
        error:'',
        success:'',
        title: '',
        formData:''
    })

    const {error, success, formData, title} = values
    const token = getCookie('token')

    useEffect(()=>{
        setValues({...values, formData: new FormData()})
        initBlog();
        initCategories();
        initTags();
    }, [router])

    const initBlog = () =>{
        if(router.query.slug){
            singleBlog(router.query.slug).then(data=>{
                if(data.error){
                    console.log(data.error)
                }else {
                    setValues({...values, title:data.title});
                    setBody(data.body);
                    setCategoriesArray(data.categories)
                    setTagsArray(data.tags)
                }
            });
        }
    };

    const setCategoriesArray = blogCategories => {
        let ca = []
        blogCategories.map((c,i)=>{
            ca.push(c._id)
        })
        setCheckedCat(ca)
    }

    const setTagsArray = blogTags => {
        let ta = []
        blogTags.map((t,i)=>{
            ta.push(t._id)
        })
        setCheckedTag(ta)
    }
    
    const initCategories = ()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setCategories(data)
            }
        })
    }

    const initTags = ()=>{
        getTags().then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setTags(data)
            }
        })
    }

    const handleToggleCat = (c)=>{
        setValues({...values, error:''})
        const clickedCategory = checkedCat.indexOf(c)
        const all = [...checkedCat]
        if(clickedCategory === -1){
            all.push(c)
        }else{
            all.splice(clickedCategory, 1)
        }
        setCheckedCat(all)
        formData.set('categories', all)
    }

    const handleToggleTag = (t)=>{
        setValues({...values, error:''})
        const clickedTag = checkedTag.indexOf(t)
        const all = [...checkedTag]
        if(clickedTag === -1){
            all.push(t)
        }else{
            all.splice(clickedTag, 1)
        }
        setCheckedTag(all)
        formData.set('tags', all)
    }

    const findOutCategory = c =>{
        const result = checkedCat.indexOf(c)
        if(result !== -1){
            return true
        }
        else return false
    }

    const findOutTags = t =>{
        const result = checkedTag.indexOf(t)
        if(result !== -1){
            return true
        }
        else return false
    }

    const showCategories = ()=>{
        return(
            categories && categories.map((c,i)=>(
                <li key={i} className="list-unstyled">
                    <input onChange={()=>handleToggleCat(c._id)} checked={findOutCategory(c._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    const showTags = ()=>{
        return(
            tags && tags.map((t,i)=>(
                <li key={i} className="list-unstyled">
                    <input onChange={()=>handleToggleTag(t._id)} checked={findOutTags(t._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }

    const handleChange = name => e =>{
        const value = name ==="photo" ? e.target.files[0] : e.target.value;
        formData.set(name, value)
        setValues({...values, [name]:value, formData, error:''})
    }

    const handleBody = e =>{
        setBody(e)
        formData.set('body', e)
        if(typeof window !== 'undefined'){
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const editBlog = (e) =>{
        e.preventDefault()
        updateBlog(formData, token, router.query.slug).then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({...values, title:'', success:`Blog titled "${data.title}" is successfully updated`})
                if(isAuth() && isAuth().role ===1){
                    Router.replace(`/admin/crud/${router.query.slug}`)
                }else{
                    if(isAuth() && isAuth().role === 0){
                        Router.replace(`/user/crud/${router.query.slug}`)
                    }
                }
            }
        })
    }
    
    const showError = () =>{
        <div className="alert alert-danger" style={{display:error ? '' :'none'}}>
            {error}
        </div>
    }
    
    const showSuccess = () =>{
        <div className="alert alert-danger" style={{display:success ? '' :'none'}}>
            {success}
        </div>
    }

    const updateBlogForm = () =>{
        return(
            <form onSubmit={editBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')}/>
                </div>

                <div className="form-group">
                    <ReactQuill 
                        modules={QullModules} 
                        formats={QuillFormats} 
                        value={body} 
                        placeholder="Write something amazing ..." 
                        onChange={handleBody} />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {updateBlogForm()}
                    {/* <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                        <hr/>
                    </div> */}
                    
                    {body && router.query.slug && (
                        <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} style={{width:'100%'}} />
                    )}
                </div>
                <div className="col-md-4">
                    <div className="form-group pb-2">
                        <h5>Featured Image</h5><hr/>
                        <small className="text-muted">Max size: 1mb</small><br/>
                        <label className="btn btn-outline-info" style={{cursor:"pointer"}}>Upload featured image
                            <input onChange={handleChange('photo')} type="file" accept="image/*" hidden/>
                        </label>                      
                    </div>
                    <div>
                        <h5>Categories</h5><hr/>
                        <ul style={{maxHeight:'200px', overflowY:'scroll', paddingLeft:'0px'}}>
                            {showCategories()}
                        </ul>
                    </div>
                    <div>
                        <h5>Tags</h5><hr/>
                        <ul style={{maxHeight:'200px', overflowY:'scroll', paddingLeft:'0px'}}>
                            {showTags()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(BlogUpdate);