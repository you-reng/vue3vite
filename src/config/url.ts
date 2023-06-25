const environments:any = {
    development: {
        baseURL: 'http://192.168.1.177:1211',
        uploadBaseUrl: 'http://192.168.1.177:1211/upload/single',
        multiUploadBaseUrl: "http://192.168.1.177:1211/upload/batch",
        fileUrl: 'https://img2.9000ji.com',

        // baseURL: 'http://bakgateway.btstars.cn',
        // uploadBaseUrl: 'http://bakgateway.btstars.cn/upload/single',
        // multiUploadBaseUrl: "http://bakgateway.btstars.cn/upload/batch",
        // fileUrl: 'https://img2.9000ji.com'
    },
    testing: {
        baseURL: 'http://192.168.1.177:1211',
        uploadBaseUrl: 'http://192.168.1.177:1211/upload/single',
        multiUploadBaseUrl: "http://192.168.1.177:1211/upload/batch",
        fileUrl: 'https://img2.9000ji.com',
    },
    release: {
        baseURL: 'http://bakgateway.btstars.cn',
        uploadBaseUrl: 'http://bakgateway.btstars.cn/upload/single',
        multiUploadBaseUrl: "http://bakgateway.btstars.cn/upload/batch",
        fileUrl: 'https://img2.9000ji.com'
    },
    production: {
        baseURL: 'https://gateway.btstars.cn',
        uploadBaseUrl: 'https://gateway.btstars.cn/upload/single',
        multiUploadBaseUrl: "https://gateway.btstars.cn/upload/batch",
        fileUrl: 'https://img2.9000ji.com'
    }
};
export default environments

