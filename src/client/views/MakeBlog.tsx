import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ITagsTable } from '../../typings/interfaces'


const MakeBlog = (props: MakeChirpProps) => {
    const Swal = require('sweetalert2');
    const history = useHistory();
    // control state of tag input
    const [tagName, setTagName] = useState<ITagsTable[]>([]);
    // control state of select element tagid
    const [selectedTagID, setSelectedTagID] = useState('0');

    // controls state of title input
    const [title, setTitle] = useState('');
    const handleSetTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)
    // controls state of blog content input
    const [newBlog, setNewBlog] = useState('');
    const handleSetNewBlog = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlog(e.target.value)

    useEffect(() => {
        fetch('/api/tags')
            .then(res => res.json())
            .then(tags => setTagName(tags));
    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (selectedTagID === '0') {
            Swal.fire({
                icon: 'error',
                title: 'Whoopsies...',
                text: 'Please select a tag!',
            })
            return;
        }
        if (title.length === 0 || newBlog.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Whoopsies...',
                text: 'Please input a blog title and/or content!',
            })
            return;
        }
        if (title.length > 60 || newBlog.length > 250) {
            Swal.fire({
                icon: 'error',
                title: 'Whoopsies...',
                text: 'Character Limit Exceeded!',
                footer: 'Max Title 60, Max Blog 250'
            })
            return;
        }
        let temp: any = null;
        fetch(`/api/blogs/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content: newBlog, authorid: 1 }) //  { title, content, authorid}
        })
            .then(res => res.json())
            .then((serverRes: any) => {
                console.log({ blogid: serverRes.result.insertId, tagid: selectedTagID });
                temp = serverRes.result.insertId
                return fetch('/api/blogtags/blogtag', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ blogid: serverRes.result.insertId, tagid: selectedTagID })
                })
            })
            .then(res => res.json())
        .then((serverRes: any) => {
            history.push('/details/' + temp);  // loads Details view
        });
    };


    return (

        <section className="col-md-8 justify-content-center align-items-center mx-auto">
            <form
                id="chirp-form"
                className="form-group bg-info shadow rounded mt-2 p-3">
                <div className="mb-3">
                    <select value={selectedTagID}
                        onChange={e => setSelectedTagID(e.target.value)}
                        className="form-control">
                        <option value="0">Select Tag</option>
                        {tagName.map(tag => (
                            <option key={`tag-option-${tag.id}`} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <textarea
                        rows={2}
                        className="form-control mb-2"
                        placeholder="Title"
                        value={title}
                        onChange={handleSetTitle}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control mb-2"
                        rows={15}
                        id="blog-input"
                        placeholder="Place your entry here"
                        value={newBlog}
                        onChange={handleSetNewBlog}
                    />
                </div>

                <div className="container ">
                    <div className="row justify-content-between align-items-center">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="btn btn-secondary mb-2">
                            Post Blog
                        </button>
                        <Link to="/" className="btn btn-link bg-light rounded mb-2">
                            Back Home
                        </Link>
                    </div>
                </div>
            </form>
        </section>
    );
};

interface MakeChirpProps { };

export default MakeBlog;