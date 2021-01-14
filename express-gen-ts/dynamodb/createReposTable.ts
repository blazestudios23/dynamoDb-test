const AWS = require("aws-sdk");

// import AWS from "aws-sdk";

const credentials = new AWS.Credentials({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
})

AWS.config.update({
    credentials,
    region: "us-east-1"
});

const dynamodb = new AWS.DynamoDB();



var params = {
    TableName : "Repos",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH"},  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "N" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});