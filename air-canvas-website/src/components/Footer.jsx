import '../assets/Footer.css'

export default function Footer () {
    return (
        <div className='footer'>
            <h1>B[U]ILT 2026 ©</h1>
            <div className='footer-icons'>
                <a href='https://tinyurl.com/built-uiuc' target='_blank' rel='noopener noreferrer'>
                    <img src='/slack-svgrepo-com.svg' alt='slack svg' />
                </a>
                <a href='https://github.com/BUILT-Illinois' target='_blank' rel='noopener noreferrer'>
                    <img src='/github-svgrepo-com.svg' alt='github svg' />
                </a>
                <a href='https://www.instagram.com/built_uiuc/' target='_blank' rel='noopener noreferrer'>
                    <img src='/instagram-svgrepo-com.svg' alt='instagram svg' />
                </a>
                <a href='https://www.linkedin.com/in/built-uiuc/' target='_blank' rel='noopener noreferrer'>
                    <img src='/linkedin-svgrepo-com.svg' alt='linkedin svg' />
                </a>
            </div>
        </div>
    )
};