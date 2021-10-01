    const path = require('path');
    const fs = require('fs');
    var filesize = require("filesize"); 

    const express = require('express')
    const cors = require('cors');

    const app = express()
    app.use(cors())

    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));

    const PORT = process.env.PORT || 5000;

    const folderSeperator = "¬";
    const fileSeperator = "¯";

    // const arr = ['documents', 'folder_1']
    // const arrPath = path.push(arr);
    // let directoryPath = path.join(__dirname,arrPath);

    // var paths = [__dirname];
    // var userInput =  ['documents', 'folder_1'];
    // paths.push(userInput); // x
    // let directoryPath = path.join.apply(...paths);
    // let folderPath = directoryPath

    // const curPath = path.join(folderPath, 'wdrerf.txt');

    // console.log(curPath)




    // fileData()

    function getInitFiles(folderName, callback){
        const files = fs.readdirSync(folderName, {withFileTypes: true});

        for (const file of files) {
            
            const absolutePath = path.resolve(__dirname, file.name);

            
            var stats = fs.stat(file.name).then(res=>{

                let fileObj = {
                    isDirectory: file.isDirectory(),
                    filename: file.name,
                    fullPath: path.join(__dirname, file.name),
                    createdDate: res.ctime,
                    fileSize: res.size,
                    fileType: getExtension(file.name, file.isDirectory())
                };


                fileArray.push(fileObj);
                
                // console.log(fileOjb)
                // console.log('isDir', file.isDirectory())
                // console.log('name', file.name)
                // console.log('fullPath', absolutePath)
                // console.log(convertBytes(res.size))
                // console.log(`File Data Last Modified: ${res.ctime}`);

                if(file.isDirectory()){
                    
                    const nested =  fs.readdir(absolutePath, {withFileTypes: true}).then(res=>{

                        // console.log(res)
                    });

                }

            });
            // fs.stat(absolutePath, (err, fileStats) => {
            //     if (err) {
            //       console.log(err)
            //     } else {
            //       console.log(fileStats)
            //     }
            //   })
            // var stats = fs.statSync(file.name)
            // var fileSizeInBytes = stats.size;
            // var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
            // var fileSizeInMb = filesize(stats.size, {round: 0});

            
        }
        
        callback(fileArray)
        // let fileArray = [];
        
    }


    function createFiles(files){
        for (const file of files) {
            
            const absolutePath = path.resolve(__dirname, file.name);

            
            var stats = fs.stat(file.name).then(res=>{

                let fileObj = {
                    isDirectory: file.isDirectory(),
                    filename: file.name,
                    fullPath: path.join(__dirname, file.name),
                    createdDate: res.ctime,
                    fileSize: res.size,
                    fileType: getExtension(file.name, file.isDirectory())
                };

                fileArray.push(fileObj);

                if(file.isDirectory()){
                    
                    const nested =  fs.readdir(absolutePath, {withFileTypes: true}).then(res=>{

                    });

                }

            }); 
        }
        return fileArray;
    }



    const convertBytes = function(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    if (bytes == 0) {
        return "n/a"
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    if (i == 0) {
        return bytes + " " + sizes[i]
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
    }


    const  getExtension = function(filename, isDirectory) {
        var result = "";
        if(isDirectory){
            rresult = 'Folder';
        }
        if(!filename.includes(".")){
            result = ''
        }else{
            var i = filename.lastIndexOf('.');
            result =  (i < 0) ? '' : filename.substr(i);
        }

        return result;
    }



    app.get('/',(req, res)=>{
        res.send('hello world.')
    })

    app.get('/api/ServerFiles',(req, res)=>{
        const files = fs.readdirSync(__dirname, {withFileTypes: true});
        // fileData().then(res=>{
        
        res.send(files)
        // })
        // let res = await getInitFiles(__dirname);
    })
    
    app.get('/api/ServerFiles/:folderPath',(req, res)=>{

        let fPath = "";
        
        
        if(req.params.folderPath == ""){
            fPath = __dirname;
        }else{
            
            let folderArr = req.params.folderPath.split(folderSeperator);
            if(folderArr.length == 1){
                fPath = path.resolve(__dirname, folderArr[0]);
            }else{
                
                var paths = [__dirname];
                var userInput =  folderArr;
                paths.push(userInput); // x
                let directoryPath = path.join.apply(...paths);
                fromRoot = directoryPath
                fPath = path.resolve(__dirname, fromRoot);
                

            }
        }
        // fileData().then(res=>{
            const files = fs.readdirSync(fPath, {withFileTypes: true});

        res.send(files)
        // })
        // let res = await getInitFiles(__dirname); 
    })


app.get('/api/ServerFiles/FileInfo/:filePathString',(req, res)=>{
    
    let filePathArr = req.params.filePathString.split(fileSeperator);
    

    try {
        
        var stats
        if(filePathArr[0] ==""){
            stats = fs.statSync(filePathArr[1])
        }else{
            let folderPath = "";
            let folderPathArr = filePathArr[0].split(folderSeperator);
            if(folderPathArr.length == 1){
                folderPath = folderPathArr[0]
            }else{
    
                // files = fs.readdirSync(dirPath)
                var paths = [__dirname];
                var userInput =  folderPathArr;
                paths.push(userInput); // x
                let directoryPath = path.join.apply(...paths);
                fromRoot = directoryPath
                
                folderPath = path.resolve(__dirname, fromRoot)
                
            }
            const curPath = path.join(folderPath, filePathArr[1]);
         stats = fs.statSync(curPath)
        }
    
        var fileObj = {
            isDirectory: stats.isDirectory(),
            fileName: filePathArr[1],
            fullPath: path.join(__dirname, filePathArr[1]),
            createdDate: stats.ctime,
            fileSize: convertBytes(stats.size),
            fileType: getExtension(filePathArr[1], stats.isDirectory()),
            permissions: '0' + (stats.mode & parseInt('777', 8)).toString(8)
        };
    
        // res.send(fileObj);
        res.send(fileObj);
    } catch (error) {
        
        res.send(error);
    }
    // fileData().then(res=>{

    // })
    // let res = await getInitFiles(__dirname);
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
