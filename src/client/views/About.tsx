import * as React from 'react';
import { useState } from 'react';

const About = (props: AboutProps) => {
    const [from, setFrom] = useState<string>('');
    const handleSetFrom = (e: React.ChangeEvent<HTMLInputElement>) => setFrom(e.target.value)
    const [subject, setSubject] = useState<string>('');
    const handleSetSubject = (e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)
    const [message, setMessage] = useState<string>('');
    const handleSetMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch('api/contact', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ from, subject, message })
        })
            .then(res => res.json())
            .then(result => console.log(result));
    }
    return (
        <section className="container p-2">
            <div  className="row justify-content-center align-items-center p-3">
                <div className="card card-body bg-info col-md-10 col-lg-8">
                    <h2 className="display-4 mx-5 text-center">About</h2>
                    <p className="card card-text p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus blanditiis facere esse,
                 quo corrupti iste labore odio similique voluptatibus? Nulla atque iusto ut sapiente modi ipsum expedita saepe nesciunt hic.</p>
                </div>
            </div>
            <div className="row justify-content-center align-items-center p-3">
                <form className="form-group border rounded shadow bg-info col-md-8">
                    <input type="text" className="form-control my-3" onChange={handleSetFrom} value={from} placeholder="Your Email" />
                    <input type="text" className="form-control mb-3" onChange={handleSetSubject} value={subject} placeholder="Subject" />
                    <textarea className="form-control mb-3" rows={8} onChange={handleSetMessage} value={message} placeholder="Message" />
                    <button className="btn btn-primary mb-3" onClick={handleSubmit}>Contact Me!</button>
                </form>
            </div>
        </section>
    )
}

interface AboutProps { };
export default About;