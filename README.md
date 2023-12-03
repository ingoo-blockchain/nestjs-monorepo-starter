# NestJS 프로젝트 구성하기 - 스터디용

## LocalStack 설정

-   로컬에서 테스트할 수 있는 AWS 클라우드 환경을 제공
-   단독으로 실행이 가능하며 AWS 서비스를 사용하는 어플리케이션을 쉽게 테스트할 수 있다.
-   AWS 에서 사용되는 서비스들을 대부분 지원하고 있으며 도커를 사용하여 손쉽게 실행할 수 있다.
-   AWS Service Feature Converage

```yaml
# docker-compose-localstack.yaml
version: '3.0'

services:
    localstack:
        container_name: 'localstack'
        image: localstack/localstack:0.14.3 # 버전에 따라 설정이 다른점이 많아서 지정하였음
        network_mode: bridge
        ports:
            - '4510-4559:4510-4559' # external service port range
            - '4566:4566' # LocalStack Edge Proxy
        environment:
            - SERVICES=s3,dynamodb,secretsmanager # 사용할 서비스 목록
            - DEBUG=${DEBUG-}
            - DATA_DIR=${DATA_DIR-}
            - HOST_TMP_FOLDER=${TMPDIR:-/tmp/}localstack
            - DOCKER_HOST=unix:///var/run/docker.sock
            - AWS_ACCESS_KEY_ID=test # 내부에서 aws 커맨드 사용을 위해 지정 awslocal 을 사용하면 필요없음
            - AWS_SECRET_ACCESS_KEY=test # 위와 동일
            - AWS_DEFAULT_REGION=us-east-1 # 위와 동일
        volumes:
            - '${TMPDIR:-/tmp}/localstack:/tmp/localstack'
            - '/var/run/docker.sock:/var/run/docker.sock'
```

docker container 생성

```sh
docker-compose -f docker-compose-localstack.yaml up -d
```

실행이 확인되면 container진입하기

```sh
docker exec -it localstack /bin/bash
```

접속후 명령어 실행가능

```sh
awslocal
aws --endpoint-url=http://localhost:4566 kms create-key --description "my-service-master-key"
```

---

## secretsmanger 설정

```sh
awslocal secretsmanager create-secret --name /secret/web_local --secret-string '{"DB_TYPE":"mysql","DB_HOST":"localhost","DB_USERNAME":"root","DB_PASSWORD":"root","DB_PORT":"3306","DB_DATABASE":"develrocket"}'
```

결과값

```
{
    "ARN": "arn:aws:secretsmanager:us-east-1:000000000000:secret:/secret/web_local-9180f7",
    "Name": "/secret/web_local",
    "VersionId": "93a554ea-ad66-42a3-a551-7eb1c4cf9f59"
}
```

aws --endpoint-url=http://localhost:4566 secretsmanager get-secret-value --secret-id "/secret/web_local" --profile localstack

## TypeORM Migration

migration:generate

```sh
npm run migration:generate --name=user
```

```sh
npm run migration:run
```

npx ts-node -r tsconfig-paths/register \
./node_modules/typeorm/cli.js \
-d libs/database/for-migration-typeorm.config.ts \
migration:run

npx ts-node -r tsconfig-paths/register \
./node_modules/typeorm/cli.js \
-d libs/database/for-migration-typeorm.config.ts \
migration:generate \
libs/database/src/migrations/changeup

ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate libs/database/src/migrations/${npm_config_name}
