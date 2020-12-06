import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UpdateItem = (props) => {
    const [state, setState] = useState({
        itemName: '',
        itemDescription: '',
        itemPrice:'',
        slug: '',
        user: ''
    });
    const { itemName, itemDescription,itemPrice, slug, user } = state;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/item/${props.match.params.slug}`)
            .then(response => {
                const { itemName, itemDescription,itemPrice, slug, user } = response.data;
                setState({ ...state, itemName, itemDescription,itemPrice, slug, user });
            })
            .catch(error => alert('Error loading item'));
             // eslint-disable-next-line
    },[]);

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ itemName, itemDescription,itemPrice, user });
        axios
            .put(`${process.env.REACT_APP_API}/item/${slug}`, { itemName, itemDescription,itemPrice, user })
            .then(response => {
                console.log(response);
                const { itemName, itemDescription,itemPrice, slug, user } = response.data;
                // empty state
                setState({ ...state, itemName, itemDescription,itemPrice, slug, user });
                // show sucess alert
                alert(`Item ${itemName} is Edited`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.msg);
            });
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted"> Item Name </label>
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
                <label className="text-muted">Item Description</label>
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
                <textarea
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
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    );

    return (
        <div className="container pb-5">
            
            <br />
            <h1> EDIT ITEM </h1>
            {showUpdateForm()}
        </div>
    );
};

export default UpdateItem;
