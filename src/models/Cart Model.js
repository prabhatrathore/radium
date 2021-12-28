const mongoose=require('mongoose')

const CartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"UserDB",required:true,unique:true},
    items:[
        {
        _id: false,
        productId:{type:mongoose.Schema.Types.ObjectId,ref:"ProductDB",required:true},
        quantity:{type:Number,required:true,min:1}
        }
    ],
    totalPrice:{type:Number,required:true},
    totalItems:{type:Number,required:true},
    createdAt:{type: Date,default: Date.now},
    updatedAt:{type:Date, default:Date.now}

},{ timestamps: true })

module.exports=mongoose.model("CartDB",CartSchema)