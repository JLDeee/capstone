import { Link } from 'react-router-dom';
function Footer() {
    return(<>
        <footer>
            <ul>
                <p>Copyright 2023</p>

                <li><Link to={'/'}>Social Media</Link></li>
                <li><Link to={'/contact'}>Contact Us</Link></li>
                <li><Link to={'/faq'}>FAQ</Link></li>
            </ul>
        </footer>
    </>);
}

export default Footer;