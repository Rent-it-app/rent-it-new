import React, { useState } from 'react';
import axios from 'axios';


const Create = () => {
    // state
    const [state, setState] = useState({
        itemName: '',
        itemDescription: '',
        itemPrice:'',
        user: ''
    });
    // destructure values from state
    const { itemName, itemDescription,itemPrice, user } = state;

    // onchange event handler
    function handleChange(name) {
        return function(event) {
            setState({ ...state, [name]: event.target.value});
        };
    }

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ itemName, ItemDescription,itemPrice, user });
        axios
            .post(`${process.env.REACT_APP_API}/item`, { itemName, itemDescription,itemPrice, user })
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, itemName: '', itemDescription: '', itemPrice:'', user: '' });
                // show sucess alert
                alert(`Item ${response.data.itemName} is Added`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.msg);
            });
    };

    return (
        <div className="container pb-5">
            
            <h1> ADD RENTALS </h1>
            <br />

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Item Name</label>
                    <input
                        onChange={handleChange('itemName')}
                        value={itemName}
                        type="text"
                        className="form-control"
                        placeholder="add item name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Item Description </label>
                    <textarea
                        onChange={handleChange('itemDescription')}
                        value={itemDescription}
                        type="text"
                        className="form-control"
                        placeholder="Write something about the item you want to let .."
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Item Price</label>
                    <input
                        onChange={handleChange('itemPrice')}
                        value={itemPrice}
                        type="text"
                        className="form-control"
                        placeholder="add item price"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder="add your username"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary"> ADD </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
