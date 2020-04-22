FROM ubuntu:rolling

RUN apt-get update && apt-get install -y \
  curl \
  jq \
  && rm -rf /var/lib/apt/lists/*

RUN addgroup runner && \
  adduser \
  --system \
  --disabled-password \
  --home /home/runner \
  --ingroup runner \
  runner

WORKDIR /home/runner

RUN GITHUB_RUNNER_VERSION=${GITHUB_RUNNER_VERSION:-$(curl -s https://api.github.com/repos/actions/runner/releases/latest | jq -r .tag_name | sed 's/v//g')} \
  && curl -sSLO https://github.com/actions/runner/releases/download/v${GITHUB_RUNNER_VERSION}/actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz \
  && tar -zxvf actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz \
  && rm -f actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz \
  && ./bin/installdependencies.sh \
  && chown -R runner:runner /home/runner

COPY entrypoint.sh entrypoint.sh

USER runner

ENTRYPOINT ["./entrypoint.sh"]