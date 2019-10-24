import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import {} from 'googlemaps';
import {Observable} from 'rxjs';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  address:string ;
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: 'A',
      draggable: true
    };
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    this.marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: 'A',
      draggable: true
    };
    this.getReverseLocation().subscribe(res => {
      this.address = res;
    });
  }
  inputChange(address:any){
    console.log(address.target.value);
    this.address = address.target.value;
  }
  doMagic(){
this.getLocation().subscribe(res => {
  console.log(res);
  this.address = res.formatted_address;
       this.marker = {
      lat: res.geometry.location.lat,
      lng: res.geometry.location.lng,
      label: 'A',
      draggable: true
    };
    });
  }
  getReverseLocation(): Observable<any> {
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
        geocoder.geocode({
            location:{
              lat:this.marker.lat,
              lng:this.marker.lng
            }
        }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0].formatted_address);
                observer.complete();
            } else {
                console.log('Error: ', results, ' & Status: ', status);
                observer.error();
            }
        });
    });
}

getLocation(): Observable<any> {
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
        geocoder.geocode({
            address:this.address
        }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0]);
                observer.complete();
            } else {
                console.log('Error: ', results, ' & Status: ', status);
                observer.error();
            }
        });
    });
}

  marker: marker =   {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  }
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
