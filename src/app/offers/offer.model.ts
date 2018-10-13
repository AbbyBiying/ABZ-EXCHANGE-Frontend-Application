export class Offer {
  constructor(
    public id: number, 
    public name: string, 
    public user_id: number, 
    public description: string, 
    public listing_id: number,
    public url: string, 
    // public avatar_file_name: string, 
    // public avatar_content_type: string, 
    // public avatar_file_size: number
    ) {}
}