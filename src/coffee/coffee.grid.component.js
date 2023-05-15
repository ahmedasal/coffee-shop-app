import {useEffect, useState} from "react";

import axios from "axios";
import {AddCoffeeForm} from "./coffee.create.component";
import {Outlet} from "react-router-dom";

export function Content() {
    const [coffees, setCoffees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [color, setColor] = useState(null);
    const requestOpts = {
        method: 'DELETE'
    };

    function loadCoffees() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        setLoading(true)
        axios.get("http://localhost:8000/coffees")
            .then(response => {
                console.log(response)
                return response.data
            })
            .then(setCoffees)
            .then(() => setLoading(false))
            .catch(setError)
    }

    useEffect(() => {
            loadCoffees()
        }, []
    )
    let deleteCoffee = async (id) => {
        try {
            let responseJson = await axios.delete(`http://localhost:8000/coffees/${id}`);
            // alert('delete done')
            loadCoffees();
        } catch (err) {
            setMessage(err)

            console.log(err);
        }

    }


    console.log(coffees);
    if (loading) return <h1 className='bg-warning'>loading......</h1>
    if (error)
        return <pre>{JSON.stringify(error)}</pre>
    if (!coffees) return <h1>there is no coffee</h1>
    return (
        <>
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Flavors</th>
                    <th scope='col'>Price</th>
                </tr>
                </thead>
                <tbody>
                <AddCoffeeForm fetch = {loadCoffees}/>
                </tbody>
                <tbody>
                {coffees.map((item, index) =>
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.flavors.map((item) => item.name) + ''}</td>
                        <td>{item.price} L.E</td>
                        <td className="btn-group">
                            <button onClick={() => deleteCoffee(item.id)} className="btn btn-danger">delete</button>
                            <button className='btn btn-warning'>update</button>
                            <button className='btn btn-primary'>Order</button>
                        </td>
                    </tr>
                )
                }
                </tbody>
                <tfoot>{message ? <div style={{backgroundColor:color}}>{message}</div> : null}</tfoot>
            </table>
        </>
    )
}

export function DefaultContent() {
    return (
        <div className="container">
            <p className="row justify-content-center"> welcome back to our coffee app you can explore everything you want from menu</p>
            <div className="row justify-content-center">
                <img height='700'
                     src="https://www.tastingtable.com/img/gallery/coffee-brands-ranked-from-worst-to-best/l-intro-1645231221.jpg"
                     alt="coffee app"/>
            </div>
        </div>)

}



