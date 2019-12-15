import {useState, useEffect, Fragment} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {getCookie} from '../../actions/auth'
import {create, getCategories, removeCategory} from '../../actions/category'

const Category = () =>{
    const [values, setValues] = useState({
        name:'',
        error:false,
        success:false,
        categories: [],
        remove:false,
        reload:false
    })

    const {name, error, success, categories, remove, reload} = values
    const token = getCookie('token')

    useEffect(()=>{
        loadCategories()
    }, [reload])

    const loadCategories = ()=>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setValues({...values, categories:data})
            }
        })
    }

    const showCategories = ()=>{
        return categories.map((c, i)=>{
            return (
                <button onDoubleClick={()=>deleteConfirm(c.slug)} title="double click to delete" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">
                    {c.name}
                </button>
            ) 
        })
    }

    const deleteConfirm = slug =>{
        let answer = window.confirm('Are you sure you want to delete this category?')
        if(answer){
            removeCategory(slug, token).then(data=>{
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
                <p className="text-success"> Category is Created</p>
            )
        }
    }

    const showError = ()=>{
        if(error){
            return (
                <p className="text-danger">Category is exist</p>
            )
        }
    }

    const showRemoved = ()=>{
        if(remove){
            return (
                <p className="text-danger">Category is removed</p>
            )
        }
    }

    const mouseMoveHandler = ()=>{
        setValues({...values, error:false, success:false, remove:false})
    }

    const newCategoryForm = ()=>(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
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
                {newCategoryForm()}
                {showCategories()}
            </div>
        </Fragment>
    )
}

export default Category