import AWS from "aws-sdk";


const credentials = new AWS.Credentials({
    accessKeyId: process.env.AWSAccessKeyId as string,
    secretAccessKey: process.env.AWSSecretKey as string,
})

AWS.config.update({
    credentials,
    region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();

export { docClient as default }