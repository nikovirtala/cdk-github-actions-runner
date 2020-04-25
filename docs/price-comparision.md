## Price Comparison

[GitHub](https://help.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners) hosted runners are running on Standard_DS2_v2 virtual machines in Microsoft Azure. Each virtual machine has 2 vCPUs and 7 GB of RAM. The per-hour rate for hosted Linux runner is `$0.48` (`$0.008 / minute`).

[AWS Fargate pricing](https://aws.amazon.com/fargate/pricing/) has two dimensions; vCPU and memory. The per-hour rate for similarly sized Tasks (2 vCPUs and 7 GB of RAM) is `$0.112075` on on-demand capacity and `$0.0336225` on spot capacity.

| Hosting                              | Price / hour |
| ------------------------------------ | ------------ |
| GitHub hosted                        | `$0,48`      |
| AWS Fargate, On-demand (`eu-west-1`) | `$0.112075`  |
| AWS Fargate, Spot (`eu-west-1`)      | `$0.0336225` |

However, the price comparison is not quite as straightforward. Each GitHub account receives a certain amount of free minutes.

| Product     | Free minutes / month      |
| ----------- | ------------------------- |
| GitHub Free | 2000 min. (33,33 hours)   |
| GitHub Pro  | 3000 min. (50 hours)      |
| GitHub Team | 10000 min. (166,67 hours) |
| GitHub Team | 50000 min. (833,33 hours) |

But if we e.g. double the hours used per month we'll start to find some differences:

| Product     | Paid hours / month | GitHub hosted | Fargate, On-demand | Fargate, Spot |
| ----------- | ------------------ | ------------- | ------------------ | ------------- |
| GitHub Free | 33,33 hours        | `$16.00`      | `$3.74`            | `$1.12`       |
| GitHub Pro  | 50 hours           | `$24.00`      | `$5.60`            | `$1.68`       |
| GitHub Team | 166,67 hours       | `$80.00`      | `$18.68`           | `$5.60`       |
| GitHub Team | 833,33 hours       | `$400.00`     | `$93.40`           | `$28.02`      |

Also, taking account of the fact that GitHub also provides one size of hosted-runner, this is starting to look very interesting to me!

Unfortunately AWS CDK does not support ECS Capacity Providers, and thus Fargate Spot capacity yet. :/
