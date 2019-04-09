# Vegetas

**채식 식당을 찾아주는 어플리케이션**

## 기본 환경 설치

<ul>
<li>node@latest</li>
<li>yarn@latest</li>
</ul>

## 패키지 설치

### 프로젝트 패키지 설치

- `root`(VEGETAS), 클라이언트, 서버 폴더 별로 `npm install` or `yarn`으로 설치합니다.

  ```
  $ cd vegetas-client
  $ npm install
  $ npm start
  ```

### Package Dependencies

- [axios](https://www.npmjs.com/package/axios)
- [geolib](https://www.npmjs.com/package/geolib)
- [express](https://www.npmjs.com/package/express)
- [react-navigation](https://www.npmjs.com/package/react-navigation)
- [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons)
- [sequelize](https://www.npmjs.com/package/sequelize)

## Project Description

![vegetas](https://media.giphy.com/media/j5shfsFI1b3VCucVuT/giphy.gif)

- 회원가입/로그인 후 유저에게 맞는 채식 유형을 선택하고 해당 위치에서 거리 별로 식당 데이터를 가져옵니다.
- 지도 맵을 활용해 현재 위치를 중심으로 식당 위치를 파악할 수 있습니다.
- 자주 가는 식당을 즐겨찾기에 추가할 수 있습니다.
