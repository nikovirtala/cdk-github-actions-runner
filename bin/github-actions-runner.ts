#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { GithubActionsRunnerStack } from "../lib/github-actions-runner-stack";

const app = new cdk.App();
new GithubActionsRunnerStack(app, "GithubActionsRunnerStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
