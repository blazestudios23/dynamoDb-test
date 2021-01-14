const AWS = require("aws-sdk");
const fs = require('fs');
const credentials = new AWS.Credentials({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
})

AWS.config.update({
    credentials,
    region: "us-east-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing repos into DynamoDB. Please wait.");
const repos = JSON.parse(fs.readFileSync('repoData.json', 'utf8'));
repos.forEach(function(repo) {

    const keys = Object.keys(repo)
const params = {
        TableName: "Repos",
        Item: keys.reduce((obj, key) =>{
            if (typeof repo[key] !== "object" 
            && repo[key] !== null && repo[key] !== undefined){
                return ({...obj, [key]: repo[key]}) 
            }
            return obj
        }, {})
    };
docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add repo", repo.name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", repo.name);
       }
    });
});