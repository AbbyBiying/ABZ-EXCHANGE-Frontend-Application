export class Location {
  public id: number;
  // public number: string;
  // public street: string;
  public city: string;
  public state: string;
  public country: string;
  public latitude: number;
  public longitude: number; 

  constructor( 
    id: number,
    // number: string, 
    // street: string, 
    city: string, 
    state: string, 
    country: string, 
    latitude: number, 
    longitude: number
    )
    {
      this.id = id;    
      // this.number = number;    
      // this.street = street;
      this.city = city;
      this.state = state;
      this.country = country;
      this.latitude = latitude;
      this.longitude = longitude;
    }
}