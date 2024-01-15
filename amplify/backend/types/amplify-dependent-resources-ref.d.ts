export type AmplifyDependentResourcesAttributes = {
  "api": {
    "weatherappreactjs": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "function": {
    "myWeatherAppFunction": {
      "Arn": "string",
      "CloudWatchEventRule": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "storage4weatherapp": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}