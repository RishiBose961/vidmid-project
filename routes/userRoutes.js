const {Router} = require('express')
const userController = require('../controller/userController')
const auth = require('../middleware/auth')
const route = Router()

//register and loogin routes
route.post('/api/auth/register',userController.registerUser)
route.post('/api/auth/activation', userController.verifyEmail);
route.post('/api/auth/login',userController.signing)
route.post('/api/auth/access', userController.access);
route.get('/api/auth/user',auth,userController.info);

//create post request
route.post('/api/auth/createpost',auth,userController.createPost);
//get all post requests
route.get('/api/auth/getallpost',userController.getallposts);
route.get('/api/auth/getpostid',auth,userController.postbyid);
route.put('/api/auth/like',auth,userController.likeposts);
route.put('/api/auth/dislike',auth,userController.dislikeposts);

//create imagepost request
route.post('/api/auth/createimagepost',auth,userController.createImagePost);
route.get('/api/auth/getallimagepost',userController.getallimageposts);

//get single or search a user
route.get('/api/auth/getsingleuser/:id',userController.getuserid);

//SEARCH FEATURE
route.post('/api/auth/searchuser',userController.allSearchUser)

//update user name and avatar
route.put('/api/auth/user_avatar',auth,userController.updatepic);

//get individual post in different page
route.get('/api/auth/getsinglepost/:id',userController.getIndividualpost);

//user comment
route.put('/api/service/getcomments',auth,userController.commentuser);
route.get('/api/auth/getallcomment',userController.getallComments);

//follow and unfollow a user route
route.put('/api/auth/follow',auth,userController.followuser)
route.put('/api/auth/unfollow',auth,userController.unfollowuser)

//followers and followings a user route show
route.get('/api/auth/friendfollowing/:userId',auth,userController.FriendFollowing)
route.get('/api/auth/friendfollowers/:userId',auth,userController.FriendFollowers)


//getfollowing post
route.get('/api/auth/randompost',userController.RandomPost)

//login & signgout
route.post('/api/auth/google_signing',userController.google);
route.get('/api/auth/signout', userController.signout);

module.exports = route;