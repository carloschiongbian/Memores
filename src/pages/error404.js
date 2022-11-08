/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import '../public/css/components/error404.css'
import logo from '../public/images/error404.jpg'

const Error404 = () => (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="row align-items-start justify-content-start" >
            <div className="col-12 col-lg-6 align-self-center">
                <img src={logo} alt="error04" className='w-100' />
            </div>
            <div className="col-12 col-lg-6 align-self-center">
                <h1 className='h1'>404</h1>
                <h2 className='h2'>UH OH! You're lost.</h2>
                <p>The page you are looking for does not exist.
                    How you got here is a mystery. But you can click the button below
                    to go back to the homepage.
                </p>
                <Link to={'/'} className="btn btn-outline-primary">
                    <i className="bi bi-house-fill me-2"></i> Return to Home Page
                </Link>

            </div>
        </div>
    </div>
)

export default Error404