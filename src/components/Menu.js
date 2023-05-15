import {Link} from "react-router-dom";

function Menu() {
    return (
        <div className= 'm-1'>
        <h1>menu</h1>
        <p><Link to="/content" className='page-link '> coffees </Link></p>
        </div>
    )
}

export default Menu;