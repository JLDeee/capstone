import { Link } from 'react-router-dom';
function Footer() {
    return(<>
        <footer>
        <Link to={'/'}>Social Media</Link>
        <Link to={'/contact'}>Contact Us</Link>
        <Link to={'/faq'}>FAQ</Link>
        </footer>
    </>);
}

export default Footer;