# fe-ddokddak

- DoDone(ddokddak)의 프론트 레포지토리입니다.
  
### 리액트 실행 명령어
```bash
npm run start
```

### 빌드 명령어
```bash
yarn install
yarn build
```

### 도커 이미지 빌드 명령어
```bash
# 이미지 빌드
docker build -t ddokddak/front -f Dockerfile.prod .

# 이미지 업로드 (로그인 필요)
docker push ddokddak/front
```

### 도커 컴포즈 실행 명령어
```bash
# 갱신된 이미지가 있다면 다운로드
docker compose pull

# 컨테이너를 새로 생성하며 빌드
docker compose up -d --force-recreate --build

# 사용하지 않는 이미지 제거(모든 미사용 이미지 제거하므로 주의 필요)
docker image prune -f
```
- 설치된 버전에 따라 docker-compose 혹은 docker compose 로 명령어 수행