const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const validateEmail = require('../helpers/vaildateEmail')
const createToken = require('../helpers/createToken')
const Post = require('../models/postModel')
const Verify = require('../models/verificationToken')


//google login
const { google } = require("googleapis");
const { OAuth2 } = google.auth
const sendMail = require('../helpers/sendMail');
const ImagePost = require('../models/imagePostModel')

const userController = {
    registerUser: async (req, res) => {
        try {
            const { username, email, avatar, password } = req.body

            if (!username || !email || !avatar || !password) {
                return res.status(400).json({ message: 'please fill all' })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ message: 'email is not valid' })
            }
            const user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ message: 'user already exists' })
            }
            if (password.length < 6) {
                return res.status(400).json({ message: 'password is too short' })
            }
            const newUser = new User({ username, email, avatar, password })

            const otp = `${Math.floor(1000 + Math.random() * 9000)}`

            const verificationToken = new Verify({
                email: newUser.email,
                token: otp
            })

            const url = `OTP = ${otp}`
            sendMail.sendEmailRegister(email, url, "Please enter your OTP / User Id")

            await verificationToken.save();
            await newUser.save();
            res.status(200).json({ message: "Welcome ! Please Check your Email" })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    verifyEmail: async (req, res) => {

        const { email, otp } = req.body;


        const user = await User.findOne({ email })

        if (!user) return res.status(500).json({ message: "user not found" })

        const token = await Verify.findOne({ owner: user._id })

        if (!token) return res.status(500).json({ message: "user not found" })

        const isMatch = await token.compareToken(otp)
        if (!isMatch) return res.status(500).json({ message: "match not found" })

        user.verified = true;
        await Verify.findOneAndDelete()
        await user.save();

        res.status(200).json({ message: "Successfully Sign in" })

    },
    signing: async (req, res) => {
        try {
            //get cred
            const { email, password } = req.body;
            //check email
            const user = await User.findOne({ email })
            if (!user)
                return res.status(400).json({ message: "This Email is not Register in our Server" })
            //check password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ message: "This password is incrrect." })

            if (user.verified === false)
                return res.status(400).json({ message: "Please Verify Your Email" })

            //refresh token
            const rf_token = createToken.refresh({ id: user._id })
            res.cookie("_apprftoken", rf_token, {
                httpOnly: true,
                path: "/api/auth/access",
                maxAage: 24 * 60 * 60 * 1000
            });
            //siging success
            res.status(200).json({ message: "Sigin Success" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },



    access: async (req, res) => {
        try {
            // rf token
            const rf_token = req.cookies._apprftoken;
            if (!rf_token) return res.status(400).json({ msg: "Please sign in." });
            // validate
            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please sign in again." });
                // create access token
                const ac_token = createToken.access({ id: user.id });
                // access success
                return res.status(200).json({ ac_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    info: async (req, res) => {
        try {
            //get info  -password
            const user = await User.findById(req.user.id).select("-password");
            //return user
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    createPost: async (req, res) => {
        try {
            const { title, category, videos, description } = req.body
            if (!title || !category || !videos || !description) {
                return res.status(402).json({ error: "Plz add all the fields" })
            }

            const post = new Post({
                title,
                category,
                videos,
                description,
                postedBy: req.user.id
            })
            post.save().then(posts => {
                res.json({ post: posts })
            }).catch(error => console.log(error))
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getallposts: async (req, res) => {
        Post.find()
            .populate("postedBy", "username avatar followers following")
            .sort({ createdAt: -1 })
            .then(posts => {
                res.json({ posts })
            })
            .catch(err => {
                console.log(err);
            })
    },



    //get user post by id
    postbyid: async (req, res) => {
        Post.find({ postedBy: req.user.id })
            .populate("postedBy", "_id username")
            .then(mypost => {
                res.json({ mypost })
            })
            .catch(err => {
                console.log(err);
            })
    },
    //like a post of user
    likeposts: async (req, res) => {
        Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user.id }
        }, {
            new: true
        }).populate("postedBy", "username avatar").exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json(result)
            }
        })
    },
    //dislike a post of user
    dislikeposts: async (req, res) => {
        Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user.id }
        }, {
            new: true
        }).populate("postedBy", "username avatar").exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json(result)
            }
        })
    },
    //to see other user profile or info
    getuserid: (req, res) => {
        User.findOne({ _id: req.params.id })
            .select("-password")
            .then(user => {
                Post.find({ postedBy: req.params.id })
                    .populate("postedBy", "_id name")
                    .exec((err, posts) => {
                        if (err) {
                            return res.status(422).json({ error: err })
                        }
                        res.json({ user, posts })
                    })
            }).catch(err => {
                return res.status(404).json({ error: "User not found", err })
            })
    },
    //To search Specific User through email username
    allSearchUser: async (req, res) => {
        let userPattern = new RegExp("^" + req.body.query)
        User.find({
            $or: [
                { username: { $regex: userPattern } },
                { email: { $regex: userPattern } },
            ],
        })
            .select("_id email username avatar")
            .then(user => {
                res.json({ user })
            }).catch(err => {
                console.log(err)
            })
    },
    //follow specific user
    followuser: async (req, res) => {
        User.findByIdAndUpdate(req.body.followId, {
            $push: { followers: req.user.id }
        }, { new: true }, (err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            User.findByIdAndUpdate(req.user.id, {
                $push: { following: req.body.followId }
            }, { new: true }).select("-password")
                .exec((err, result, user1) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    else {
                        res.json(result)
                    }
                })
        })
    },
    //unfollow specific user
    unfollowuser: (req, res) => {
        User.findByIdAndUpdate(req.body.unfollowId, {
            $pull: { followers: req.user.id }
        }, { new: true }, (err, results) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            User.findByIdAndUpdate(req.user.id, {
                $pull: { following: req.body.unfollowId }
            }, { new: true }).select("-password")
                .then(results => {
                    res.status(200).json(results)
                }).catch(err => {
                    return res.status(422).json({ error: err })
                })
        })
    },

    //update user profile

    updatepic: async (req, res) => {
        User.findByIdAndUpdate(req.user.id, {
            $set: { avatar: req.body.avatar }
        }, { new: true }, (err, result) => {
            if (err) {
                return res.status(422).json({ err: "Pic Cannot Avatar" })
            }
            res.json(result)
        })
    },

    FriendFollowing: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            const friends = await Promise.all(
                user.following.map((friendId) => {
                    return User.findById(friendId);
                })
            );
            let friendList = [];
            friends.map((friend) => {
                const { _id, username, avatar, email } = friend;
                friendList.push({ _id, username, avatar, email });
            });
            res.status(200).json(friendList)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    FriendFollowers: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            const friends = await Promise.all(
                user.followers.map((friendId) => {
                    return User.findById(friendId);
                })
            );
            let friendLists = [];
            friends.map((friend) => {
                const { _id, username, avatar, email } = friend;
                friendLists.push({ _id, username, avatar, email });
            });
            res.status(200).json(friendLists)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    createImagePost: async (req, res) => {
        try {
            const { title, category, images } = req.body
            if (!title || !category || !images) {
                return res.status(402).json({ error: "Plz add all the fields" })
            }

            const post = new ImagePost({
                title,
                category,
                images,
                otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE*60 * 60 * 1000),
                postedBy: req.user.id
            })
            post.save().then(posts => {
                res.json({ post: posts })
            }).catch(error => console.log(error))
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    getallimageposts: async (req, res) => {
        ImagePost.find()
            .populate("postedBy", "username avatar followers following")
            .sort({ createdAt: -1 })
            .then(imagepost => {
                res.json({ imagepost })
            })
            .catch(err => {
                console.log(err);
            })
    },

    google: async (req, res) => {
        try {
            const { tokenId } = req.body;

            const client = new OAuth2(process.env.G_CLIENT_ID)

            const verify = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.G_CLIENT_ID
            })


            const { email_verified, name, email, given_name } = verify.payload


            // console.log(verify.payload);
            if (!email_verified)
                return res.status(400).json({ msg: "Email verification failed." });

            // passed verification
            const user = await User.findOne({ email });

            if (user) {
                // refresh token
                const rf_token = createToken.refresh({ id: user._id });
                // store cookie
                res.cookie("_apprftoken", rf_token, {
                    httpOnly: true,
                    path: "/api/auth/access",
                    maxAge: 24 * 60 * 60 * 1000, // 24hrs
                });
                res.status(200).json({ msg: "Signing with Google success." });
            } else {
                // new user / create user
                const password = email + process.env.G_CLIENT_ID;
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(password, salt);
                const newUser = new User({
                    username: name,
                    email,
                    password: hashPassword
                });
                await newUser.save();
                // sign in the user
                // refresh token
                const user = await User.findOne({ email });
                const rf_token = createToken.refresh({ id: user._id });
                // store cookie
                res.cookie("_apprftoken", rf_token, {
                    httpOnly: true,
                    path: "/api/auth/access",
                    maxAge: 24 * 60 * 60 * 1000, // 24hrs
                });
                // success
                res.status(200).json({ msg: "Signing with Google success." });
            }
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    signout: async (req, res) => {
        try {
            res.clearCookie("_apprftoken", { path: "/api/auth/access" })
            res.status(200).json({ message: "Signout Successfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
}


module.exports = userController