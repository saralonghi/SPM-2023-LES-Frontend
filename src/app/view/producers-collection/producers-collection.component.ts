import {Component, OnInit} from '@angular/core';
import {ProducerViewService} from "../../service/producerView/producer-view.service";
import {ProducerDetails} from "../../model/producerDetails/producer-details";
import {SearchProducer} from "../../model/searchProducer/search-producer";

@Component({
  selector: 'app-producers-collection',
  templateUrl: './producers-collection.component.html',
  styleUrl: './producers-collection.component.css'
})
export class ProducersCollectionComponent implements OnInit{

  listProducers: ProducerDetails[];
  searchProducer: SearchProducer;

  constructor(private serviceManager: ProducerViewService) {
    this.listProducers = [];
    this.searchProducer= new SearchProducer();

  }

  ngOnInit(): void {
    this.serviceManager.getAllProducersDetails().subscribe((data : any ) => {
      this.listProducers = Object.keys(data).map((key) => {
        return data [key]});
      this.listProducers.forEach((producer) => {
        if(producer.coverPhoto != null) {
          producer.urlPhoto = 'data:image/jpeg;base64,' + producer.coverPhoto;
        }
      }
    )
    });
  }

  onSubmit(){
    this.serviceManager.getFilterProducersDetails(this.searchProducer.products,this.searchProducer.province).subscribe((data : any ) => {
      this.listProducers = Object.keys(data).map((key) => {
        return data [key]});
      this.listProducers.forEach((producer) => {
          if(producer.coverPhoto != null) {
            producer.urlPhoto = 'data:image/jpeg;base64,' + producer.coverPhoto;
          }
        }
      )
    });
  }

}
