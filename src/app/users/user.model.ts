export class User {
  constructor(
    public id: number,
    public email: string, 
    public username: string, 
    public bio: string, 
    public location_id: number,     
    public created_at: string, 
    public updated_at: string, 
    // avatar_file_name: string, 
    // avatar_content_type: string, 
    // avatar_file_size: number
    ){}
}