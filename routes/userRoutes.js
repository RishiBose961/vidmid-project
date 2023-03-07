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
route.post('/api/auth/google_signing',userController.google);
route.get('/api/auth/signout', userController.signout);

module.exports = route;