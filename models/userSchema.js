const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
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
  password:{
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    trim: true,
    minLength: 8,
  },
  passwordChangedAt: Date,
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
userSchema.pre("save", async function(next){
  try{
    if(!this.isModified("password")){
      return next();
    }
    else{
      this.password= await bcrypt.hash(this.password,12);
      this.passwordConfirm = undefined;
    }
  }catch(err){
    console.log(err)
  }
});
userSchema.methods.checkPassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword)
}
module.exports = mongoose.model("User",userSchema);