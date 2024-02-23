const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName:{
    type: String,
    required:[true,"first name required"],
    trim: true,
    maxlength:50,
    minlength:3,
  },
  lastName:{
    type: String,
    required:[true,"last name required"],
    trim: true,
    maxlength:50,
    minlength:3,
  },
  username:{
    type: String,
    unique: true,
    required: [true, "user required"],
    trime: true,
    maslength: 20,
  },
  email:{
    type: String,
    unique: true,
    required: [true, "email required"],
    trim: true,
    maxlength: 150,
    lowercase: true,
  },
  phoneNumber:{
    type: String,
    unique: true,
    required: [true, "phone required"],
    trim: true,
    maxlength: 150,
    lowercase: true,
  },
  profilePicture:{
    type: String,
    default:"",
  },
  friends:[{
    type: Schema.Types.ObjectId,
    ref:"User"
   },
  ],
  followers:[{
    type: Schema.Types.ObjectId,
    ref:"User"
   },
  ],
  followings:[{
    type: Schema.Types.ObjectId,
    ref:"User"
   },
  ],
 },
 {timestamps: true}
);

module.exports = mongoose.model("User",userSchema);