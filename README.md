# memo-api

메모 기능을 가진 간단한 어플리케이션입니다.

### Prerequisite

- Docker & Docker Compose
- Node v16 이상
- Yarn v3 이상
- Typescript 4.7.2 이상

### Setup

Package Manager 는 Yarn 사용을 권장합니다.

```
yarn install
```

MacOs, Linux 의 경우 다음 sh 스크립트를 실행합니다. DB 및 관련 의존성 설정을 자동으로 진행합니다. 

```
sh setup.sh
```

### Build

```
yarn run start
```

실행 이후 http://localhost:8080/api 에서 직접 테스트도 가능합니다.
