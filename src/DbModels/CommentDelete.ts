export interface CommentDelete {
 programId: string;
 partitionKey: string;
 exerciseIndex: number;
 dayIndex: number;
 commentIndex?: number;
}
