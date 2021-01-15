var AWS = require("aws-sdk");

const credentials = new AWS.Credentials({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
})

AWS.config.update({
    credentials,
    region: "us-east-1"
});
const docClient = new AWS.DynamoDB.DocumentClient()

const params = {
    TableName: "Repos",
    Key:{
        "id": 41687006
    }
};
docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});