var ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	api = new ApiBuilder(),
    documentClient = new AWS.DynamoDB.DocumentClient(),
    dynamoDBTableName = 'amplify-links';

AWS.config.update({region: 'us-east-1'});

module.exports = api;

// hello world
api.get('/hello', function () {
  return 'hello world';
});

// create
api.put('/api/create', function (request) {
    'use strict';
    try {
        const params = {
            TableName: dynamoDBTableName,
            Item: {
                username: request.body.username,
                links: request.body.links
            }
        };
        return documentClient.put(params).promise();
    } catch (error) {
        return error;
    }
}, { success: {code: 200}, error: {code: 500} });

// read
api.get('/api/read/{username}', function (request) {
	'use strict';
    try {
        const params = {
            TableName: dynamoDBTableName,
            Key: {
                username: request.pathParams.username
            }
        };
        return documentClient.get(params).promise();
    } catch (error) {
        return error;
    }
});

// delete
api.delete('/api/delete/{username}', function (request) {
	'use strict';
    try {
        const params = {
            TableName: dynamoDBTableName,
            Key: {
                username: request.pathParams.username
            }
        };
        return documentClient.delete(params).promise();
    } catch (error) {
        return error;
    }
});