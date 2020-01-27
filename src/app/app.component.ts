import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testingpad';
  results:any = []
  website:string = 'http://invoicer.me'
  pendingAccessibilityTest:boolean = false;
  resultsLists:any = {
    pass: 0,
    fail: 0,
    na: 0,
  }
  constructor(private http: HttpClient){}

  createNotifications() {
    for(let i in this.results) {
      if(this.results[i].result === "PASS") {
        this.resultsLists.pass++
      }
      else if(this.results[i].result === "FAIL") {
        this.resultsLists.fail++
      }
      else if(this.results[i].result === "NA") {
        this.resultsLists.na++
      }
    }
  }
  getAccessibility() {
    this.pendingAccessibilityTest = true
  	this.http.post('https://us-central1-testing-pad.cloudfunctions.net/accessibility', {"site": this.website}).subscribe((data) => {
  		console.log(data)
      this.results = data;
      this.createNotifications()
      this.pendingAccessibilityTest = false;
  	})
  }
}
