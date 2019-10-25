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
  lat: number = 28.7040592;
  lng: number = 7.10249019999992;
  address:string ;
  lat_marker: number = 28.7040592;
  lng_marker: number = 7.10249019999992;
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
      this.lat_marker= $event.coords.lat;
       this.lng_marker= $event.coords.lng;
     
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
      this.lat_marker= $event.coords.lat;
      this.lng_marker= $event.coords.lng;
    this.getReverseLocation().subscribe(res => {
      this.address = res.formatted_address;
      console.log(res);
    });
  }
  inputChange(address:any){
    this.address = address.target.value;
  }
  doMagic(){
this.getLocation().subscribe(res => {
  console.log(res);
            this.address = res.formatted_address;
             this.lat_marker= res.geometry.location.lat();
             this.lng_marker= res.geometry.location.lng();
    console.log(this.lat_marker);
 
    });
  }
  getReverseLocation(): Observable<any> {
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
        geocoder.geocode({
            location:{
              lat:this.lat_marker,
              lng:this.lng_marker
            }
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
