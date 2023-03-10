const { Schema, model, mongoose } = require('mongoose')


const imagepostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    images: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    otp_expiry: {
        type:Date
    },
}, { timestamps: true })

imagepostSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 })

const ImagePost = model("ImagePost", imagepostSchema)

module.exports = ImagePost
