export class Listing {
  constructor(
    public id: number,
    public name: string, 
    public user_id: number, 
    public description: string, 
    public created_at: string, 
    public updated_at: string, 
    // public url: string, 
    // public avatar_file_name: string, 
    // public avatar_content_type: string, 
    // public avatar_file_size: number
    ) {}
}