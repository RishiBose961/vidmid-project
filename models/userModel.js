const { Schema, model, mongoose } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }

    next()
})

const User = model("User", userSchema)

module.exports = User
