export class Location {
  constructor( 
    public id: number,
    public number: string,
    public street: string,
    public city: string,
    public state: string,
    public country: string,
    public latitude: number,
    public longitude: number,     
    public created_at: string, 
    public updated_at: string, 
  ){}
}

  