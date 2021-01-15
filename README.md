## Setup

Set the following environment variables:

AWSAccessKeyId=yourAWSAccessKey

AWSSecretKey=yourAWSSecretKey

You will need to run the following command to set up this server:

```sh
docker-compose -p api-test-server up -d --remove-orphans
```
Root: http://localhost:3000/

GetAllRepos: api/repos/all
UpdateRepo: api/repos/update

