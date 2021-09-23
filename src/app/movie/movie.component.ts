import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  dB: any[] = [];
  actorsDB: any[] = [];
  section = 1;
  mTitle: string = "";
  mYear: number = 0;
  mActors: string = "";
  mID: string = "";
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  my1: number = 0;
  my2: number = 0;

  constructor(private dbService: DatabaseService) {}
  

  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.dB = data;
    });
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.mTitle, year: this.mYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  // add an actor to a movie
  onSelectActor(id: string) {
    
    this.actorId =id;
  }
  onSelectMovie(id: string) {
    this.mID =id;
  }
  onUpdateMovie() {
    this.dbService.updateMovie(this.mID, this.actorId).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Delete Movie by Title
  onDeleteActorTitle(title: string) {
    this.dbService.deleteMovieTitle(title).subscribe(result => {
      this.onGetMovies();
    });
  }

    //Delete Movie by Title
  onDeleteY1Y2() {
    this.dbService.deleteMoviesY1Y2(this.my1,this.my2).subscribe(result => {
      this.onGetMovies();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
  }
  changeSection(sectionId:number) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.mTitle = "";
    this.mYear = 0;
    this.mActors = "";
    this.mID = "";
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.my1 = 0;
    this.my2 = 0;
  }

}
