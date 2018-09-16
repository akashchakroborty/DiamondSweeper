import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cellNumber: number = 0;
  row_count: number = 8;
  column_count: number = 8;
  cellCordinates: object = {};
  diamond_count: number = 8;
  diamond_set: object = {};
  win_count: number = 0;
  display: string = 'none';
  
  ngOnInit(){
   this.randomGenerators();
   this.initializeGame();
  }
  
  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = 'none';
    this.newGame();
  }
  
  randomGenerators() {
    while (Object.keys(this.diamond_set).length < this.diamond_count) {
      let randomnumber = Math.ceil(Math.random() * 63)
      this.diamond_set[randomnumber] = randomnumber;
    }
  }
  
  newGame() {
    this.randomGenerators();
    this.win_count = 0;
    let diamonds = document.querySelectorAll(".diamond") as HTMLCollectionOf<HTMLElement>;
    console.log(diamonds.length);
    for(let i=0;i<diamonds.length;i++){
      diamonds[i].className = diamonds[i].className.replace(/\bdiamond disabled\b/g, "unknown");
    }
  }
  
  clickHandler = (e) =>{
   if (e.target.nodeName == 'DIV') {
      this.win_count++;
      if (this.diamond_set[e.target.id]) {
        e.target.className = "cell diamond disabled";
        delete this.diamond_set[e.target.id];
        if (Object.keys(this.diamond_set).length == 0) {
          document.getElementById("openWinnerModalButton").click();
        }
        if (Object.keys(this.diamond_set).length == 1) {
          alert("One more to go, Go and acheive it");
        }
      }
    }
  }
  
  initializeGame() {
    let table = document.createElement("table");
    table.id = "diamond_container";
    for (let row = 0; row < this.row_count; row++) {
        let tr = document.createElement('tr');
        for (let column = 0; column < this.column_count; column++) {
            let td = document.createElement('td');
            let div = document.createElement('div');
            this.cellCordinates[this.cellNumber] = {
                x_cord: row,
                y_cord: column
            };
            div.className = "cell unknown";
            div.id = `${this.cellNumber}`;
            this.cellNumber++;
            td.appendChild(div)
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById("diamondSweeper").appendChild(table);
    document.getElementById("diamond_container").addEventListener("click", this.clickHandler);
  }
}
