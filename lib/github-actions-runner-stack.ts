import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ssm from "@aws-cdk/aws-ssm";
import path = require("path");
import { FargatePlatformVersion } from "@aws-cdk/aws-ecs";

export class GithubActionsRunnerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "GitHubActionsRunnerVpc", {
      maxAzs: 1, // Default is all AZs in region
    });

    const cluster = new ecs.Cluster(this, "GitHubActionsRunnerCluster", {
      vpc: vpc,
    });

    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "GitHubActionsRunnerTaskDefinition"
    );

    taskDefinition.addContainer("GitHubActionsRunnerContainer", {
      image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, "../image")),
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "GitHubActionsRunner" }),
      secrets: {
        GITHUB_ACCESS_TOKEN: ecs.Secret.fromSsmParameter(
          ssm.StringParameter.fromSecureStringParameterAttributes(
            this,
            "GitHubAccessToken",
            {
              parameterName: "GITHUB_ACCESS_TOKEN",
              version: 0,
            }
          )
        ),
        GITHUB_ACTIONS_RUNNER_CONTEXT: ecs.Secret.fromSsmParameter(
          ssm.StringParameter.fromSecureStringParameterAttributes(
            this,
            "GitHubActionsRunnerContext",
            {
              parameterName: "GITHUB_ACTIONS_RUNNER_CONTEXT",
              version: 0,
            }
          )
        ),
      },
    });

    const ecsService = new ecs.FargateService(
      this,
      "GitHubActionsRunnerService",
      {
        cluster,
        taskDefinition,
        platformVersion: FargatePlatformVersion.VERSION1_4,
        assignPublicIp: true
      }
    );
  }
}
