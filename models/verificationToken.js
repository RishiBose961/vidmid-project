const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const vericationSchema = new Schema(
    {
        email: {
            type: String,
            required: [true,"Please enter Your Name"],
            trim: true,
        },
        token: {
            type: String,
            required: true,
        },
    },{timestamps:true}
);

vericationSchema.pre("save",async function(next) {
    if(this.isModified("token")){
        this.token = await bcrypt.hash(this.token,8);
    }
    next()
})

vericationSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token,this.token);
    return result
}

const Verify = model("Verify",vericationSchema);

module.exports = Verify;