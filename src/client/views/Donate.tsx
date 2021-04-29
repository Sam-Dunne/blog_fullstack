import * as React from 'react';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'


const Donate = (props: DonateProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });

        if (error) {
            console.log('[error]', error);
        } else {
            const res = await fetch('/api/donate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json '},
                body: JSON.stringify({ amount, paymentMethod: paymentMethod })
            });
            const successfulPayment = await res.json();
            console.log(successfulPayment);
        }
    };

    return (
        <section className="row justify-content-center aiign-items-center rounded p-3">
            <form className="card card-body col-xs-11 col-sm-10 col-md-6 mt-3">
                <h1 className='display-4 text-center'>Donate</h1>
                <input className="card form-control mb-3"
                    value={name}
                    onChange={e => setName(e.target.value)} placeholder="Your Name">
                </input>
                <input className="card form-control mb-3"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Amount">
                </input>
                <CardElement className="p-3 mb-4 border"/>
                <button className="btn btn-primary mb-3" onClick={handleSubmit}>Submit Contribution</button>
            </form>
        </section>
    )
};

interface DonateProps { };

export default Donate;