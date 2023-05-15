import {useState} from "react";
import axios from "axios";

export function AddCoffeeForm(props) {
    const [coffe, setCoffe] = useState({});
    const [flavors, setFlavors] = useState([])
    const [flavorValue, setFlavorValue] = useState({})
    const [message, setMessage] = useState(null);
    const [color, setColor] = useState(null);
    const data = {
        ...coffe,
        flavors: flavors
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const resp = await axios.post("http://localhost:8000/coffees", data)
            if (resp.status === 201) {
                setCoffe({name:'', price:''})
                console.log(coffe)
                setMessage("coffee created successfully")
                setColor("green")
                props.fetch();
            } else {
                setMessage("error occurred")
                setColor("red")
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleFlavorsSubmit = () => {
        const createdFlavors = [
            ...flavors,
            flavorValue
        ]
        setFlavors(createdFlavors);
        setFlavorValue({name: ""});
    }

    const handleFlavorDeleteButton = (index) => {
        const updatedFlavors = [...flavors];
        updatedFlavors.splice(index, 1);
        setFlavors(updatedFlavors);
    }

    return (

        <tr>
            <td></td>
            <td className='col-auto'>
                <input
                    type="text"
                    value={coffe.name}
                    placeholder='CoffeeName'
                    onChange={event => {
                        setCoffe({name: event.target.value})
                    }}
                    className="form-control"
                />
            </td>
            <td>
                <div className='col-auto input-group'>
                    <input
                        type="text"
                        value={flavorValue.name}
                        placeholder='CoffeeFlavors'
                        onChange={event => setFlavorValue({name: event.target.value})}
                        className="form-control"
                    />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleFlavorsSubmit}>Add
                    </button>
                </div>
                <ul className="list-unstyled">
                    {flavors.map((item, index) => (
                        <div className='container input-group'>
                            <li className='col-3'>{item.name}   </li>
                            <button type='button' onClick={() => handleFlavorDeleteButton(index)}
                                    className="btn btn-danger col-3"> delete
                            </button>
                        </div>
                    ))}
                </ul>
                <div>{message ? <span style={{backgroundColor: color}}>{message}</span> : null}</div>
            </td>
            <td>
                <input
                    type="text"
                    value={coffe.price}
                    placeholder='Price'
                    onChange={event => setCoffe({...coffe, price: event.target.value})}
                    className="form-control"
                />
            </td>
            <td>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add Coffee</button>
            </td>
        </tr>
    )

}