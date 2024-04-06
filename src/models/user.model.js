// photo, name, bio, phone, email, and password

const mongoose= require ('mongoose');

const userSchema= new mongoose.Schema({
    fullname:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phoneNum:{
        type:Number,
    },
    bio:{
        type:String,
    },
    password: {
        type: String,
        required: true,
      },
    profilePhoto:{
        type: String,
        default:'https://i.pinimg.com/originals/07/66/d1/0766d183119ff92920403eb7ae566a85.png',
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },

},
{
    timestamps: true,
  }
)

module.exports= mongoose.model('user', userSchema);