export class Comment {
  constructor(
    public commentable_id: number, 
    public commentable_type: string, 
    public body: string,
    public user_id: number
    ) {}
}