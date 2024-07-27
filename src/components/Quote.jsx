import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
const QuoteGenerator = () => {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        getNewQuote();
    }, []);

    const getNewQuote = () => {
        setQuote('');

        fetch('https://api.quotable.io/random')
            .then((res) => res.json())
            .then((quote) => {
                setQuote(quote);
            });
    };

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div id="content" className="container">

                <ButtonGroup newQuote={getNewQuote} quote={quote} />
                <Quote quote={quote} />
                {quote.length > 140 && <QuoteLengthWarning />}
            </div>
        </div>
    );
};

const ButtonGroup = ({ newQuote, quote }) => (
    <div className='row'>
        <div className='col-md-8 col-md-offset-2'>
            <h1>Random quote generator</h1>
            <div
                className='btn-group btn-group-justified' style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <div className='btn-group'>
                    <button
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            width: "500px",
                            height: "52px",
                            border: "2px solid #4CAF50",
                            cursor: "pointer"
                        }}
                        className='btn btn-success'
                        onClick={newQuote}
                    >
                        New Quote
                    </button>
                </div>
                <div className='btn-group'>
                    <button
                        style={{
                            backgroundColor: '#1DA1F2',
                            color: 'white',
                            textDecoration: "none",
                            width: "490px",
                            height: "52px",
                            transition: 'red 0.3s ease',
                            cursor: "pointer",
                            border: "2px solid #1DA1F2"
                        }}
                        className='btn btn-info'
                    // href={'https://twitter.com/intent/tweet?text=' + quote.content + ' - ' + quote.author}
                    // target='_blank'
                    // rel='noopener noreferrer'
                    >
                        Tweet Quote
                    </button>
                </div>
            </div>
        </div>
    </div>
);
const notify = () => toast('copied successfuly!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

const Quote = ({ quote }) => (
    <div className='row' style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
        <div style={{ width: "95%" }} className='col-md-8 col-md-offset-2 quote'>
            {quote ? (
                <div>
                    <p id='quote'>{quote.content}</p>
                    <p id='author'>{quote.author}</p>
                </div>
            ) : (
                <div className='spinner'>
                    <div className='bounce1'></div>
                    <div className='bounce2'></div>
                    <div className='bounce3'></div>
                </div>
            )}
        </div>
        <CopyToClipboard text={quote.content}
        >
            <button onClick={notify} className="copy">Copy</button>
        </CopyToClipboard>
    </div>
);

const QuoteLengthWarning = () => (
    <div className='row'>
        <div className='col-md-8 col-md-offset-2'>
            <div className='alert alert-warning'>Warning: Quote too long to tweet.</div>
        </div>
    </div>
);

export default QuoteGenerator;
