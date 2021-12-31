const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"UserDB",required:true},
    items:[
        {
        _id: false,
        productId:{type:mongoose.Schema.Types.ObjectId,ref:"ProductDB",required:true},
        quantity:{type:Number,required:true}
        }
    ],
    totalPrice:{type:Number,required:true},
    totalItems:{type:Number,required:true},
    totalQuantity:{type:Number,},
    cancellable:{type:Boolean,default:true},
    status:{type:String,default:"Pending"},//enum[pending, completed, cancled]
    deletedAt:{type:Date},
    isDeleted: {type:Boolean, default: false},
    createdAt:{type: Date,default: Date.now},
    updatedAt:{type:Date, default:Date.now}

},{ timestamps: true })

module.exports=mongoose.model("OrderDB",orderSchema)