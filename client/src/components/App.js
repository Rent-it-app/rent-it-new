import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const App = () => {
    const [items, setItems] = useState([]);

    const fetchItems = () => {
        axios
            .get(`${process.env.REACT_APP_API}/items`)
            .then(response => {
                // console.log(response);
                setItems(response.data);
            })
            .catch(error => alert('Error fetching items'));
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to rent this Item?');
        if (answer) {
            deleteItem(slug);
        }
    };

    const deleteItem = slug => {
        // console.log('delete', slug, ' item');
        axios
            .delete(`${process.env.REACT_APP_API}/item/${slug}`)
            .then(response => {
                alert(response.data.mes);
                fetchItems();
            })
            .catch(error => alert('Error renting this Item'));
    };

    return (
        <div className="container pb-5">
           
            <br />
            <h4  className="mx-auto" style={{width: "400px", color: "#111361" }}> Why Buy It? when you can RENT IT</h4> 
           
            <hr />
            {items.map((item, i) => (
                <div className="row" key={item._id} style={{ borderBottom: '1px solid silver' }}>
                    <div className="col pt-3 pb-2">
                        <div className="row">
                            <div className="col-md-10">
                                <Link to={`/item/${item.slug}`}>
                                    <h2>{item.itemName}</h2>
                                </Link>
                                <p className="lead">{item.itemDescription.substring(0, 100)}</p>
                                <p>
                                    Item Price (JOD):<span className="badge"> {item.itemPrice} </span>
                                    Owner <span className="badge">{item.user}</span> 
                                    <br></br>
                                    Published on{' '}
                                    <span className="badge">{new Date(item.createdAt).toLocaleString()}</span>
                                    
                                </p>
                            </div>

                            <div className="col-md-2 ">
                                <Link to={`/item/update/${item.slug}`} className="btn btn-warning ">
                                    Edit
                                </Link>

                                <button
                                    onClick={() => deleteConfirm(item.slug)}
                                    className="btn btn-danger "
                                    style={{marginLeft:"5px"}}
                                >
                                    Rent it
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
