#!/bin/bash

RUNNER_NAME=${RUNNER_NAME:-default}
RUNNER_WORKDIR=${RUNNER_WORKDIR:-_work}

if [[ -z "${GITHUB_ACCESS_TOKEN}" || -z "${REPOSITORY_URL}" ]]; then
  echo 'One of the mandatory parameters is missing. Quit!'
  exit 1
else
  AUTH_HEADER="Authorization: token ${GITHUB_ACCESS_TOKEN}"
  USERNAME=$(cut -d/ -f4 <<< ${REPOSITORY_URL})
  REPOSITORY=$(cut -d/ -f5 <<< ${REPOSITORY_URL})

  RUNNER_TOKEN="$(curl -XPOST -fsSL \
    -H "Accept: application/vnd.github.v3+json" \
    -H "${AUTH_HEADER}" \
    "https://api.github.com/repos/${USERNAME}/${REPOSITORY}/actions/runners/registration-token" \
    | jq -r '.token')"
fi

./config.sh --url "${REPOSITORY_URL}" --token "${RUNNER_TOKEN}" --name "${RUNNER_NAME}" --work "${RUNNER_WORKDIR}"
./run.sh
