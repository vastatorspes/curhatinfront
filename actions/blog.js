import fetch from 'isomorphic-fetch'
import {API} from '../config'


export const createBlog = (blog, token)=>{
    return fetch(`${API}/blog`, {
        method: 'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body: blog
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const listBlogsCatTags = (skip, limit)=>{

    const data = {
        limit, skip
    }

    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const singleBlog = slug =>{
    return fetch(`${API}/blog/${slug}`,{
        method: 'GET'
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}


export const listRelated = (blog)=>{

    return fetch(`${API}/blogs/related`, {
        method: 'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(blog)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const list = () =>{
    return fetch(`${API}/blogs`,{
        method: 'GET'
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const removeBlog = (slug, token)=>{
    return fetch(`${API}/blog/${slug}`, {
        method: 'DELETE',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const updateBlog = (blog, token, slug)=>{
    return fetch(`${API}/blog/${slug}`, {
        method: 'PUT',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body: blog
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}
