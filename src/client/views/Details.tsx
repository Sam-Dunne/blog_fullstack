import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { IAllBlogs, ITagNamesByBlogId } from '../../typings/interfaces';
import Moment from 'moment';

/* HOOK REACT EXAMPLE */
const Details = (props: DetailsProps) => {
    const { id } = useParams<{ id: string }>();
    // *** Following 2 states were refactored into '[data, setData]'
    // const [blog, setBlog] = useState<IAllBlogs>(null);   ***TS freaked with this typing after refactor??***
    // const [blogTags, setBlogTags] = useState<ITagNamesByBlogId[]>(null);
    const [data, setData] = useState< { blog: any, blogTags: ITagNamesByBlogId[] }>({
        blog: [],
        blogTags: []
    })
 
    useEffect(() => {

        let temp: any = null;

        fetch(`/api/blogs/${id}`)
            .then(res => res.json())
            .then(blog => {
                temp = blog;
                return fetch(`/api/blogtags/${id}`);
            })       
            .then(res => res.json())
            .then(blogTags => {
                setData({
                   blogTags,
                   blog: temp 
                })          
            })
    }, [id])


    return (
        <section>
            {data.blogTags?.map(blogTag => (
                <span key={`blogtags-${blogTag.id}`} className="badge badge-pill badge-info mx-3">{blogTag.name}</span>
            ))}

            <div className="card my-2">
                <div className="card-body ">
                    <h4 className="card-title"><u>{data.blog?.title}</u></h4>
                    <h6 className="card-title border">{data.blog?.content}</h6>
                    <h6 className="card-title">{Moment(data.blog?.created_at).format("MMM Do YY")}</h6>
                    <h4 className="card-title">{data.blog?.name}</h4>
                    <div className="container ">
                        <div className="row justify-content-between align-items-center">
                            <Link to={`/edit/${id}`}
                                className="btn btn-link bg-secondary rounded my-2 mx-auto p-2">
                                To Edit
							</Link>
                            <Link to={`/`}
                                className="btn btn-link bg-secondary rounded my-2 mx-auto p-2">
                                Back to Home
							</Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    );
};

interface DetailsProps { }



export default Details;