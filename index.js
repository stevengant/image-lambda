const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
    try {
        if(!event || !event.Records || !event.Records[0]) {
            throw new Error('invalid event');
        }
        let Bucket = event.Records[0].s3.bucket.name;
        let Key = event.Records[0].s3.object.key;
        
        console.log(JSON.stringify(event));
        
        if(Key === 'images.json') {
            let imgArr = [];
        }

        // returns a promise that needs to be handled in an AWS sort of way
        let imageJson = await S3.getObject({ Bucket, Key }).promise();
        let strImgJson = imageJson.Body.toString();
        let parsedImgJson = JSON.parse(strImgJson);
        
        console.warn(parsedImgJson);
        
        const response = {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),
        };
        return response;
    }
        
    catch (e) {
        console.error(e);
        const response = {
            statusCode: 500,
            body: JSON.stringify('Error'),
        };
        return response;
    }


};