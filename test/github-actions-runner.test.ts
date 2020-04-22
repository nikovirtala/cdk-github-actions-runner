import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import GithubActionsRunner = require('../lib/github-actions-runner-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new GithubActionsRunner.GithubActionsRunnerStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
