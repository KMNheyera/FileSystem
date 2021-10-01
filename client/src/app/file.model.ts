export var SampleFiles: IFile[] = [
 
    {
        fileName: "File 01",
        fullPath: "this/is/a/path",
        fileSize: 1092,
        fileType: "application/text",
        permissions: "777",
        isDirectory: false,
        createdDate: '',
    },
    {
        fileName: "File 02",
        fullPath: "this/is/a/path",
        fileSize: 1092,
        fileType: "application/text",
        permissions: "777",
        isDirectory: false,
        createdDate: '',
    },
    {
        fileName: "File 03",
        fullPath: "this/is/a/path",
        fileSize: 1092,
        fileType: "application/text",
        permissions: "777",
        isDirectory: false,
        createdDate: '',
    },
    {
        fileName: "File 04",
        fullPath: "this/is/a/path",
        fileSize: 1092,
        fileType: "application/text",
        permissions: "777",
        isDirectory: false,
        createdDate: '',
    },
];


export interface IFile{
    fileName: string;
    fullPath: string;
    fileSize: number;
    fileType: string;
    permissions: string;
    isDirectory: boolean;
    createdDate: string;
}
