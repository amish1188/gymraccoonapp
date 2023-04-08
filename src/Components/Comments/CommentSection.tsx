import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import {
 useAddExerciseComment,
 useDeleteComment
} from '../../queryHooks/useCurrentTrainingData';
import AddNewCommentDialog from '../Dialogs/AddNewCommentDialog';

import Comment from './Comment';
import './Comments.scss';

interface CommentSectionProps {
 comments: string[];
 dayIndex: number;
 exerciseIndex: number;
 id: string;
}

const CommentSection = ({
 comments,
 dayIndex,
 exerciseIndex
}: CommentSectionProps) => {
 const [showDialog, setShowDialog] = useState<boolean>(false);
 const [commentIndex, setCommentIndex] = useState<number>();
 const [valueToAddOrUpdate, setValueToAddOrUpdate] = useState<string>();
 const emptyStringErrorText = 'Cannot be empty';
 const { mutate: addExerciseComment } = useAddExerciseComment();
 const { mutate: deleteExerciseComment } = useDeleteComment();

 const openDialog = (value?: string, commentIndexValue?: number) => {
  value && setValueToAddOrUpdate(value);
  if (commentIndexValue !== undefined) {
   setCommentIndex(+commentIndexValue.toFixed(2));
  }
  setShowDialog(true);
 };

 const closeDialog = () => {
  setShowDialog(false);
 };

 const addComment = (updatedComment: string, commentIndexD?: number) => {
  const commentUpdate = {
   programId: '7E4D171A-B059-11ED-B99C-E1CF9FF5D58B',
   partitionKey: 'CB906C34-B06D-11ED-B750-BE393A933C10',
   exerciseIndex: exerciseIndex,
   dayIndex: dayIndex,
   updateComment: updatedComment,
   commentIndex: commentIndexD
  };
  addExerciseComment(commentUpdate);
  closeDialog();
 };

 const deleteComment = (commentIndex: number) => {
  const commentDelete = {
   programId: '7E4D171A-B059-11ED-B99C-E1CF9FF5D58B',
   partitionKey: 'CB906C34-B06D-11ED-B750-BE393A933C10',
   exerciseIndex: exerciseIndex,
   dayIndex: dayIndex,
   commentIndex: commentIndex
  };
  deleteExerciseComment(commentDelete);
 };

 return (
  <>
   <Grid
    item
    container
    direction='row'
    alignItems='center'
    justifyContent='space-between'
   >
    <p>Comments:</p>
    <Button variant='text' onClick={() => openDialog()}>
     + Add comment
    </Button>
   </Grid>
   <Grid item container>
    <div className='comment-container'>
     {comments.map((c, i) => (
      <Comment
       key={i}
       comment={c}
       commentIndex={i}
       deleteComment={deleteComment}
       openDialog={openDialog}
      />
     ))}
    </div>
   </Grid>
   {showDialog && (
    <AddNewCommentDialog
     currentValue={valueToAddOrUpdate}
     currentIndex={commentIndex}
     updateComment={addComment}
     closeDialog={closeDialog}
     isDialogOpen={showDialog}
     errorText={emptyStringErrorText}
    />
   )}
  </>
 );
};

export default CommentSection;
