import { Observable, Subject } from "rxjs";
import { Location } from "./interfaces";

export class LocationService {
  locationSubject: Subject<Location> = new Subject();
  currentLocation: Location | null = null;

  constructor() {}

  get asObservable(): Observable<Location> {
    return this.locationSubject.asObservable();
  }

  set location(location: Location) {
    this.currentLocation = location;
    this.locationSubject.next(location);
  }

  get location(): Location | null {
    return this.currentLocation;
  }
}

export default new LocationService();
