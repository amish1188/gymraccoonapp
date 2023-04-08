import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './Comments.scss';

type CommentProps = {
 comment: string;
 commentIndex: number;
 deleteComment: (commentIndex: number) => void;
 openDialog: (value?: string, commentIndex?: number) => void;
};

const Comment = ({
 comment,
 commentIndex,
 openDialog,
 deleteComment
}: CommentProps) => {
 const [issShowEdit, setIsShowEdit] = useState<boolean>(false);

 const showEditHandler = () => {
  setIsShowEdit(!issShowEdit);
 };

 const openDialogWithIndex = () => {
  console.log('current', commentIndex);
  openDialog(comment, commentIndex);
 };

 return (
  <div onClick={showEditHandler} className='comment'>
   {issShowEdit && (
    <div className='comment-button-wrapper'>
     <EditIcon onClick={openDialogWithIndex} />
     <DeleteIcon onClick={() => deleteComment(commentIndex)} color='error' />
    </div>
   )}
   <p>{comment}</p>
  </div>
 );
};

export default Comment;
