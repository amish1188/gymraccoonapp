export interface CommentUpdate {
 programId: string;
 partitionKey: string;
 exerciseIndex: number;
 dayIndex: number;
 updateComment: string;
 commentIndex?: number;
}
