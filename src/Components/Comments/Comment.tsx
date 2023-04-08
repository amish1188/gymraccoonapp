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
  openDialog(comment, commentIndex);
 };

 return (
  <div onClick={showEditHandler} className='comment'>
   <p>{comment}</p>
   {issShowEdit && (
    <div className='button-section-container'>
     <button className='button'>
      <EditIcon onClick={openDialogWithIndex} />
     </button>
     <button className='button'>
      <DeleteIcon onClick={() => deleteComment(commentIndex)} color='error' />
     </button>
    </div>
   )}
  </div>
 );
};

export default Comment;
