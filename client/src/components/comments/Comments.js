import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Comment } from 'react-loader-spinner';
import { AuthContext } from '../../context/AuthContext';
import { Avatar } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars-2';

export default function Comments({post,data,setData}) {

    const {token} = React.useContext(AuthContext)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const getPostCommet = async () => {
        const res = await fetch('/api/auth/getallcomment');
        await res.json()
          .then(result => {
            setData(result.userpost)
          })
      }
    
      React.useEffect(() => {
        getPostCommet()
      }, [])
    

    const makeComment = (text, postId) => {
        fetch('/api/service/getcomments', {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify({
            postId,
            text
          })
        }).then(res => res.json())
          .then(result => {
            const newData = data.map(item => {
              if (item._id == result._id) {
                return result
              } else {
                return item
              }
            })
            setData(newData)
            
            
          }).catch(err => {
            console.log(err);
          })
          
      }


    return (
        <div>
            <div onClick={handleClickOpen}>
                <Comment
                    visible={true}
                    height="28"
                    width="28"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                    color="#fff"
                    backgroundColor="#845EC2"
                />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                maxWidth='md'
                fullWidth
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                <form onSubmit={(e) => {
                  e.preventDefault()
                  // console.log(e.target[0].value);
                  makeComment(e.target[0].value, post._id)
                }}

                >
                  <input name="Text1" rows="2"
                    placeholder='Comments' className="bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg focus:ring-[#ffd000] focus:border-[#ffd000] outline-none block w-full p-3"/>

              
                </form>
                
                </DialogTitle>
                <DialogContent>
                <Scrollbars style={{ width: 'auto', height: 200 }} >
                {
                    post.comments.map((item)=>{
                        return(
                            <>
                            <div className='inline-flex mt-2'>
                                        <Avatar className='mt-2 ring-amber-600 bg-amber-500' alt="loading" src={item?.postedBy.avatar} />
                                        <div className='mx-2'>
                                            <p className='font-bold text-lg'>{item?.postedBy.username}</p>
                                            <p>{item.text}</p>
                                        </div>

                                    </div>
                            <p></p>
                            </>
                        )
                    })
                }
                </Scrollbars>

                </DialogContent>
            </Dialog>
        </div>
    );
}