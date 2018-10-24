export class Group {
  constructor(
    public id: number,
    public name: string, 
    public user_id: number, 
    public description: string, 
    public created_at: string, 
    public updated_at: string, 
    // public location_id: string
    ) {}
}