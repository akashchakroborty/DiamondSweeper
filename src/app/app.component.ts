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
    for(let i=0;i<diamonds.length;i++){
      diamonds[i].className = diamonds[i].className.replace(/\bdiamond disabled\b/g, "unknown");
    }
    let arrows = document.querySelectorAll(".arrow") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < arrows.length; i++) {
      arrows[i].className = arrows[i].className.replace(/\barrow disabled\b/g, "unknown");
      arrows[i].style.transform = "none";
    }
  }
  
  minDistance(clicked_id) {
    var distanceMap = {};
    Object.keys(this.diamond_set).map((id) => {
      distanceMap[id] = Math.abs(this.cellCordinates[clicked_id].x_cord - this.cellCordinates[id].x_cord) +
        Math.abs(this.cellCordinates[clicked_id].y_cord - this.cellCordinates[id].y_cord);
    });
    let nearestId = Object.keys(distanceMap).sort(function (a, b) {
      return distanceMap[a] - distanceMap[b]
    })
    return nearestId[0];
  }

  hint(clicked_id) {
    let nearestDiamondId = this.minDistance(clicked_id);
    return (Math.atan2((this.cellCordinates[nearestDiamondId].x_cord - this.cellCordinates[clicked_id].x_cord), (this.cellCordinates[nearestDiamondId].y_cord - this.cellCordinates[clicked_id].y_cord))) * 180 / Math.PI;
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
      } else {
        var slope = this.hint(e.target.id);
        e.target.className = "cell arrow disabled";
        e.target.style["boxShadow"] = 'none';
        e.target.style["border"] = 'none';
        e.target.style["transform"] = "rotate(" + slope + "deg)";
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
