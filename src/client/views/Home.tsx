import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment  from 'moment';

import type { IAllBlogs } from '../../typings/interfaces';


const Home = (props: HomeProps) => {

    const [blogs, setBlogs] = useState<IAllBlogs[]>([]);

    useEffect(() => {
        fetch('/api/blogs/')
            .then(res => res.json())
            .then(blogs => setBlogs(blogs))
            // .then(serverRes => console.log(serverRes))
    }, [])


    return (
        <section className="row d-flex justify-content-around align-items-center mx-2">
            {blogs?.map(blog => (
                <div key={`blogs-${blog.id}`} id="blog-card" className="card bg-info col-xs-6 col-sm-8 col-md-5 col-lg-3 rounded shadow-lg mx-1 my-3 p-2">
                    <div className="card card-body bg-light px-0 py-1">
                        <h5 className="card-title text-center mb-3 mt-2">{blog.title}</h5>
                        <h6 className="card-title ml-2 mt-4">{`By: ${blog.name}`}</h6>
                        <h6 className="card-title ml-2 mt-1">{Moment(blog.created_at).format('MMMM Do YYYY, h:mm a')}</h6>
                        <Link to={`/details/${blog.id}`} className="mx-auto">To blog Details</Link>
                    </div>
                </div>
            ))}
        </section>
    );
};

interface HomeProps { };

export default Home;