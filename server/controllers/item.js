const Item = require('../models/item');
//require sulgify to slugify item name .. Example My item ==> my-item

const slugify = require('slugify');

exports.create = (req, res) => {
    // console.log(req.body);
    const {itemName,itemDescription,itemPrice,user} = req.body
    const slug = slugify(itemName);

    //validate

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

exports.list = (req,res)=>{
    Item.find({})
    .limit(10)
    .sort({ createdAt:-1 })
    .exec((err,items)=>{
        if(err) console.log(err)
        res.json(items)
    })
}


/*The findOne() function is used to find one document according to the condition. If multiple documents match the condition,
 then it returns the first document satisfying the condition.*/
 
exports.read = (req,res)=>{
    const { slug } = req.params
    Item.findOne({slug})
    .exec((err,item)=>{
        if(err) console.log(err);
        res.json(item);
    });
};

/*The findOneAndUpdate() function is used to find a matching document and update it according to the update arg, passing any options, 
and returns the found document (if any) to the callback.*/ 

exports.update=(req,res)=>{
   const {slug} = req.params;
   const{itemName,itemDescription,itemPrice,user} = req.body
   // {new:true} returns the updatd input
   Item.findOneAndUpdate({slug}, {itemName,itemDescription,itemPrice,user}, {new:true}).exec((err,item)=>{
       if(err) console.log(err)
       res.json(item);
   });
 
};


/*The findOneAndRemove() function is used to find the element according to the
condition and then remove the first matched element*/
exports.remove = (req,res)=>{
    const { slug } = req.params
    Item.findOneAndRemove({slug}).exec((err,item)=>{
        if(err) console.log(err);
        res.json({
            message: 'Item Rented.. Customer Care will contact you Shortly! :) '
        });
    });
};
