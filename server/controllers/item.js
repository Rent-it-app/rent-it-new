const Item = require('../models/item');

//require sulgify to slugify item name .. Example My item ==> my-item
const slugify = require('slugify');

//create controller
exports.create = (req, res) => {
    // console.log(req.body);
    const {itemName,itemDescription,itemPrice,user} = req.body
    const slug = slugify(itemName);

    //validate if one of the feilds was empty - not filled
    // if the condition is true for any of the below cases return statement will execute 
    switch(true){
        case !itemName:
            return res.status(400).json({error: 'Item Name is required'});
            break;
            case !itemDescription:
                return res.status(400).json({error: 'Item Description is required'});
                break; 
                case !itemPrice:
                   return res.status(400).json({error: 'Item Price is required'});
                   break;          
    }

    //create item
    Item.create({itemName,itemDescription,itemPrice,user,slug}, (err,item)=>{
        if(err){
            console.log(err);
            res.status(400).json({error: 'Duplicate Item, Try another Item Name !'});

        }
        res.json(item);
    });
};



// list controller

//The find() function is used to find particular data from the MongoDB database
//ref: https://www.geeksforgeeks.org/mongoose-find-function/?ref=rp
exports.list = (req,res)=>{
    Item.find({})
    //only display 25 items in home page
    .limit(25)
    // sort new --> old  -- newly added items will show on top of the page
    .sort({ createdAt:-1 })
    .exec((err,items)=>{
        if(err) console.log(err)
        res.json(items)
    })
}


// read controller

/*The findOne() function is used to find one document according to the condition. If multiple documents match the condition,
 then it returns the first document satisfying the condition.*/
exports.read = (req,res)=>{
    //  req.params is An object containing parameter values parsed from the URL path.
    // For example if you have the route /user/:name, then the "name" from the URL path wil be available as req.params.name. This object defaults to {}.
    const { slug } = req.params
    Item.findOne({slug})
    .exec((err,item)=>{
        if(err) console.log(err);
        res.json(item);
    });
};


// update controller

/*The findOneAndUpdate() function is used to find a matching document and update it according to the update arg, passing any options, 
and returns the found document (if any) to the callback.*/ 

exports.update=(req,res)=>{
   const {slug} = req.params;
   const{itemName,itemDescription,itemPrice,user} = req.body
   // {new:true} returns the updatd input
   // find the item based on the item slug and update it
   Item.findOneAndUpdate({slug}, {itemName,itemDescription,itemPrice,user}, {new:true}).exec((err,item)=>{
       if(err) console.log(err)
       res.json(item);
   });
 
};


// delete controller

/*The findOneAndRemove() function is used to find the element according to the
condition and then remove the first matched element*/
exports.remove = (req,res)=>{
    const { slug } = req.params
    //find and item that matches the slug and delete it
    Item.findOneAndRemove({slug}).exec((err,item)=>{
        if(err) console.log(err);
        res.json({
            message: 'Item Rented.. Customer Care will contact you Shortly! :) '
        });
    });
};
