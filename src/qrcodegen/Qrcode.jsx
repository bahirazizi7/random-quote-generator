import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'


export default function Qrcode() {
    const [content, setContent] = useState('');
    const [submiteContent, setSubmiteContent] = useState('example');
    const [isDownload, setIsDownload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const qrCodeRef = useRef();

    const generateQRCode = (e) => {
        e.preventDefault();
        if (content.trim() === '') {
            toast.error('Please Enter The content in the field!!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }

        setIsLoading(true);

        setSubmiteContent(content);
        setContent('');
    };

    const downloadQRCode = () => {
        if (qrCodeRef.current) {
            setIsLoading(true);

            html2canvas(qrCodeRef.current)
                .then((canvas) => {
                    const url = canvas.toDataURL('image/png');
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'qrcode.png';
                    a.click();

                    setIsDownload(true);
                    setIsLoading(false);

                    setTimeout(() => {

                        toast.success('QR Code downloaded successfully!', {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                        });
                    }, 3000);
                })
                .catch((error) => {
                    console.error('Error downloading QR Code:', error);
                    setIsLoading(false);

                    toast.error('Error downloading QR Code. Please try again.', {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                });
        }
    };

    return (
        <div className="body">
            <ToastContainer />
            <div className="about-qrcode">
                <h1>QR Code Generator</h1>
                <p>Welcome to our QR Code Generator app! This user-friendly tool allows you to quickly generate QR codes for various purposes, including URLs, text, or any other content you'd like to encode. Follow the simple steps below to create and download your custom QR codes.</p>
                <ul>
                    <li>
                        <strong>Enter Content:</strong> Start by entering the content you want to encode into the QR code. This could be a website URL, a piece of text, or any information you'd like to share.
                    </li>
                    <li>
                        <strong>Generate QR Code:</strong> Click the "Generate QR Code" button to instantly create the QR code based on the entered content. Our app ensures a seamless and efficient generation process.
                    </li>
                    <li>
                        <strong>View QR Code:</strong> Once generated, the QR code will be displayed on the screen. Take a moment to review and ensure it accurately represents the intended information.
                    </li>
                    <li>
                        <strong>Download QR Code:</strong> To save the QR code to your device, simply click the "Download QR Code" button. The image will be saved as "qrcode.png" for easy access and sharing.
                    </li>
                </ul>

            </div>
            <div className="container">

                <h1>QR Code Generator</h1>
                <label htmlFor="contentInput">Enter Content(URL)</label>
                <form onSubmit={generateQRCode}>
                    <input
                        type="text"
                        id="contentInput"
                        placeholder="Enter text or URL"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button >Generate QR Code</button>
                </form>

                {submiteContent && (
                    <>
                        {/* <p >The Generated Qr code for: <span style={{ color: "#088F8F", fontSize: "13px" }}>{submiteContent}</span> </p> */}
                        <div className='qrcode-box' ref={qrCodeRef}>
                            <QRCode  value={submiteContent} size={200} />
                        </div>
                        <button className="download" onClick={downloadQRCode}>
                            Download QR Code
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
