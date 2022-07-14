
const util = require('util');
const uuid = require('uuid').v1;
const AWS = require('aws-sdk');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const S3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

S3.getSignedUrl = util.promisify(S3.getSignedUrl);
module.exports = app => {

    app.get('/api/uploads', requireLogin, async (req,res) => {

        const Key = `${req.user.id}/${uuid()}.jpeg`;

        try {
            const S3UrlConfig = {
                Bucket: keys.bucketName,
                ContentType: 'image/jpeg',
                Key,
            }
            const signedURI = await S3.getSignedUrl('putObject', S3UrlConfig);
            
            res.send({ Key, signedURI })
        } catch(error) {
            console.log(error);
            res.send({error})
        }

    });

}