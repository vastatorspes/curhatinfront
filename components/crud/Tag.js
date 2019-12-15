import {useState, useEffect, Fragment} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {getCookie} from '../../actions/auth'
import {create, getTags, removeTag} from '../../actions/tag'

const Tag = () =>{
    const [values, setValues] = useState({
        name:'',
        error:false,
        success:false,
        tags: [],
        remove:false,
        reload:false
    })

    const {name, error, success, tags, remove, reload} = values
    const token = getCookie('token')

    useEffect(()=>{
        loadTags()
    }, [reload])

    const loadTags = ()=>{
        getTags().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setValues({...values, tags:data})
            }
        })
    }

    const showTags = ()=>{
        return tags.map((t, i)=>{
            return (
                <button onDoubleClick={()=>deleteConfirm(t.slug)} title="double click to delete" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">
                    {t.name}
                </button>
            ) 
        })
    }

    const deleteConfirm = slug =>{
        let answer = window.confirm('Are you sure you want to delete this tag?')
        if(answer){
            removeTag(slug, token).then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setValues({...values, error:false, remove:true, success:false, reload:!reload})
                }
            })
        }
    }

    const clickSubmit = (e) =>{
        e.preventDefault()
        create({name}, token).then(data =>{
            if(data.error){
                setValues({...values, error:data.error, success:false})
            }else{
                setValues({...values, error:false, success:true, name:'', reload:!reload})
            }
        })
    }

    const handleChange = e =>{
        setValues({...values, name:e.target.value, error:false, success:false, remove:false});
    }

    const showSuccess = ()=>{
        if(success){
            return (
                <p className="text-success"> Tag is Created</p>
            )
        }
    }

    const showError = ()=>{
        if(error){
            return (
                <p className="text-danger">Tag is exist</p>
            )
        }
    }

    const showRemoved = ()=>{
        if(remove){
            return (
                <p className="text-danger">Tag is removed</p>
            )
        }
    }

    const mouseMoveHandler = ()=>{
        setValues({...values, error:false, success:false, remove:false})
    }

    const newTagForm = ()=>(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Tag Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required/>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Create</button>
            </div>
        </form>
    )

    return(
        <Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}>
                {newTagForm()}
                {showTags()}
            </div>
        </Fragment>
    )
}

export default Tag