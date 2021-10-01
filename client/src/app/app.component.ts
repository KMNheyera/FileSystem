import { Component, OnInit } from '@angular/core';
import { IFile, SampleFiles } from './file.model';
import { MyServiceService } from './my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'File System';
  folderPath: string = "";
  folderSeperator: string = "¬"
  fileSeperator: string = "¯"
  files: IFile[] = SampleFiles;
  isBack: boolean = false;
  constructor(
    private myService: MyServiceService
  ){}
  ngOnInit(): void {
    this.myService.getFolderFiles(this.folderPath).subscribe(fileNames => {
      // console.log(fileNames)
      this.files= [];
      for (const file of fileNames) {
        this.myService.getFileInfo(this.folderPath+this.fileSeperator+file.name).subscribe(fileInfo => {
          this.files.push(fileInfo)
          // console.log(fileInfo)
        })
      }
    })
  }


  resolveNewFolder(folderName: string, isDirectory: boolean){
    if(isDirectory){
      this.isBack = true;

      if(this.folderPath == ""){
        this.folderPath = folderName;
      }else{
        this.folderPath = this.folderPath+this.folderSeperator+folderName;
      }

      // console.log(this.folderPath)
      
      this.getFolderFiles(this.folderPath)
     

    }

  }

  getFolderFiles(folderPath: string){
    this.myService.getFolderFiles(folderPath).subscribe(folderfiles =>{
      this.files= [];
      for (const file of folderfiles) {
        // console.log(file)
      this.myService.getFileInfo(folderPath+this.fileSeperator+file.name).subscribe(fileInfo => {
        this.files.push(fileInfo)
      })
      }
    })
  }

  back(){

    let newPath = '';
    let folderArr = this.folderPath.split(this.folderSeperator);

    folderArr.pop();

    if(folderArr.length == 0){
      this.folderPath = ''
      this.isBack = false;
    }else if(folderArr.length == 1){
      this.folderPath = folderArr[0]
    }else{
      this.folderPath = folderArr.join(this.folderSeperator)
    }

    this.getFolderFiles(this.folderPath)
  }
}

