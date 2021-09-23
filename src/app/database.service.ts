import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data:any) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id:any, data:any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id:any) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  ////////////////movies

  getMovies() {
    return this.http.get("/movies");
  }
  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }
  createMovie(data:any) {
    return this.http.post("/movies", data, httpOptions);
  }
  updateMovie(mid:any, aid:any) {
    let url = "/movies/" + mid + "/" +aid;
    // let obj = {
    //   mid: mid,
    // }
    return this.http.post(url, {},httpOptions);
  }
  deleteMovieTitle(title: String) {
    let url = "/moviesDeleteByTitle/" + title;
    return this.http.delete(url, httpOptions);
  }
  deleteMoviesY1Y2(y1: number, y2: number){
    let url = "/moviesDeleteYear1Year2/" + + y1 + "/" + y2;
    return this.http.delete(url, httpOptions);
  }
}