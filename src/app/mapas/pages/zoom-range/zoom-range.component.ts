import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .row{
      width: 400px ;
      background-color: white;
      border-radius: 5px;
      position: fixed;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      z-index: 999;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild("mapa") divMapa!: ElementRef

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] =  [-58.45046680089234, -34.55903422813093];


  constructor() { }

  ngOnDestroy(): void {

    this.mapa.off("zoom", () => {})
    this.mapa.off("zoomend", () => {})
    this.mapa.off("move", () => {})

  }

  ngAfterViewInit(): void {

    console.log("after",this.divMapa);

    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom: this.zoomLevel
    });


    this.mapa.on("zoom", (e) => {
      this.zoomLevel = this.mapa.getZoom();
    });


    this.mapa.on("zoomend", (e) => {
      if(this.mapa.getZoom() > 18 ){
        this.mapa.zoomTo(18);
      }
    });


    this.mapa.on("move", (e) => {
      const target = e.target;
      const { lng, lat } = target.getCenter()
      this.center = [lng, lat];
    });

  }

  zoomOut(){
    this.mapa.zoomOut();
    // console.log("zoom",this.divMapa);
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomCambio(value: string){
    this.mapa.zoomTo(Number(value) )
  }

}
