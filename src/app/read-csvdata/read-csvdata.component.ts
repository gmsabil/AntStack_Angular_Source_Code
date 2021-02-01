import { Component, OnInit, ViewChild } from '@angular/core';
import { CSVRecord } from './read-csvdataModal';

@Component({
  selector: 'app-read-csvdata',
  templateUrl: './read-csvdata.component.html',
  styleUrls: ['./read-csvdata.component.css']
})
export class ReadCSVDataComponent implements OnInit {
  title = 'Angular7AppReadCSV';  
  public records: any[] = [];  
  searchText: string;
  sortDir = 1;
  headerData:any;
  list = [];

  sortType: string;
  sortReverse: boolean = false;

  @ViewChild('fileReader') csvReader: any;  

  constructor() { 
    this.sortArr('orderId');
  }

  ngOnInit(): void {
  }

  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
        this.headerData = this.getHeaderArray(csvRecordsArray); 
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
        this.list=this.records;


        for (let listItem of this.list) {
          var tempItem1 = listItem.items;
          var tempItem2 = listItem.orderDate;
          tempItem1 = tempItem1.replaceAll(":", "-");
          tempItem1 = tempItem1.split(";");
          tempItem2 = tempItem2.replaceAll("-","/");
          listItem.items = [];
          listItem.items = tempItem1;
          listItem.orderDate = [];
          listItem.orderDate = tempItem2;
        }
      };  
  
      reader.onerror = function () {  
        console.log('Error occured while reading');  
      };  
  
    } else {  
      alert("Only CSV files are accepted");  
      this.fileReset();  
    }  
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let rowData = (<string>csvRecordsArray[i]).split(',');  
      if (rowData.length == headerLength) {  
        let csvData: CSVRecord = new CSVRecord();  
        csvData.orderId = rowData[0].trim();  
        csvData.customerId = rowData[1].trim();  
        csvData.deliveryPincode = rowData[2].trim();  
        csvData.orderDate = rowData[3].trim();  
        csvData.items = rowData[4].trim();  
        csvArr.push(csvData);  
      }  
    }  
    return csvArr;  
  }  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    console.log("Header Array",headerArray);
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }

  onSortClick(event) {
    console.log(event);
    console.log(event.target.parentElement.firstChild.data);
    let sortCol = event.target.parentElement.firstChild.data;
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir=-1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir=1;
    }
    this.sortArr(sortCol);
  }

  sortArr(colName:any){
    this.records.sort((a,b)=>{
      a= a[colName].toLowerCase();
      b= b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }



}