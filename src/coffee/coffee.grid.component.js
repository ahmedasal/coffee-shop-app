import {useEffect, useState} from "react";

import axios from "axios";
export function Content() {
    const [coffees, setCoffees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message , setMessage] = useState(null);
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
        },[]
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
                    <th scope='col'>Company</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Flavors</th>
                </tr>
                </thead>
                <tbody>
                {coffees.map((item,index) =>
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.name}</td>
                        <td>{item.name}</td>
                        <td><button onClick={() => deleteCoffee(item.id)}>delete</button></td>
                    </tr>
                )
                }
                </tbody>
                {/*<tfoot>{message ? <div style={{backgroundColor:color}}>{message}</div> : null}</tfoot>*/}
            </table>
        </>
    )
}

export function DefaultContent () {
    return (
        <>
            <p> welcome back to our coffee app you can explore everything you want from menu</p>
            <img src="https://www.tastingtable.com/img/gallery/coffee-brands-ranked-from-worst-to-best/l-intro-1645231221.jpg" alt="coffee app"/>
        </>)

}



