export class Exchange {
  constructor(
    public id: number, 
    public listing_id: number, 
    public offer_id: number,    
    public created_at: string,    
    public updated_at: string,
    ) {}
}