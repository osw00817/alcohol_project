# 알콜 프로젝트 (Alcohol Project)

**버전 1.0.0**

---

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [기술 스택](#기술-스택)
3. [데이터베이스 구조](#데이터베이스-구조)
4. [설치 및 설정](#설치-및-설정)
5. [시드 데이터 삽입](#시드-데이터-삽입)
6. [서버 실행](#서버-실행)
7. [기능 설명](#기능-설명)
8. [사용 예시](#사용-예시)
9. [문제 해결](#문제-해결)
10. [기여 방법](#기여-방법)
11. [라이센스](#라이센스)

---

## 프로젝트 소개

**알콜 프로젝트**는 Sequelize, Express, EJS, JWT, 그리고 MySQL을 활용하여 구축된 웹 애플리케이션입니다. 이 프로젝트는 사용자 인증, 디바이스 관리, 리포트 생성 및 조회, 패널티 기록 관리를 포함한 다양한 기능을 제공합니다. **info.ejs** 페이지를 통해 JWT 토큰 인증 후 디바이스와 관련된 리포트를 손쉽게 조회할 수 있습니다.

---

## 기술 스택

- **백엔드:** Node.js, Express.js
- **프론트엔드:** EJS (Embedded JavaScript)
- **데이터베이스:** MySQL, Sequelize ORM
- **인증:** JSON Web Tokens (JWT)
- **기타:** bcrypt (비밀번호 해싱), cookie-parser, dotenv

---

## 데이터베이스 구조

### 1. Device 테이블

| 필드 이름         | 데이터 타입 | 설명                         |
|-------------------|-------------|------------------------------|
| id                | INTEGER     | 기본 키, 자동 증가           |
| device_id         | STRING      | 디바이스 고유 ID, 유니크     |
| device_name       | STRING      | 디바이스 이름                |
| location          | STRING      | 디바이스 위치                |
| measurement_date  | DATEONLY    | 측정 날짜                    |

### 2. People 테이블

| 필드 이름    | 데이터 타입 | 설명                 |
|--------------|-------------|----------------------|
| person_id    | STRING      | 사람 고유 ID, 기본 키 |
| name         | STRING      | 이름                 |
| address      | STRING      | 주소                 |
| phone_number | STRING      | 전화번호             |
| etc          | STRING      | 기타 정보            |

### 3. Penalty 테이블

| 필드 이름      | 데이터 타입 | 설명                           |
|----------------|-------------|--------------------------------|
| id             | INTEGER     | 기본 키, 자동 증가             |
| person_id      | STRING      | People 테이블과 연관된 ID       |
| name           | STRING      | 이름                           |
| penalty_date   | DATEONLY    | 처벌 날짜                      |
| penalty_info   | STRING      | 처벌 정보                      |
| reason         | STRING      | 처벌 사유                      |
| device_id      | STRING      | Device 테이블과 연관된 ID       |

### 4. Report 테이블

| 필드 이름          | 데이터 타입 | 설명                           |
|--------------------|-------------|--------------------------------|
| id                 | INTEGER     | 기본 키, 자동 증가             |
| alcohol_level      | FLOAT       | 알콜 수치                      |
| measurement_date   | DATEONLY    | 측정 날짜                      |
| device_id          | STRING      | Device 테이블과 연관된 ID       |
| location           | STRING      | 위치                           |
| name               | STRING      | 이름                           |
| person_id          | STRING      | People 테이블과 연관된 ID       |

### 5. User 테이블

| 필드 이름 | 데이터 타입 | 설명                     |
|-----------|-------------|--------------------------|
| id        | INTEGER     | 기본 키, 자동 증가       |
| username  | STRING      | 사용자 이름, 유니크       |
| password  | STRING      | 비밀번호 (해싱됨)         |

---

## 설치 및 설정

1. 프로젝트를 클론합니다:

   `git clone https://github.com/your-username/alchol_project.git && cd alchol_project`

2. 종속성을 설치합니다:

   `npm install`

3. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음과 같이 설정합니다:

    `JWT_SECRET=your_secret_key DB_NAME=adventure DB_USER=root DB_PASS=1234 DB_HOST=localhost PORT=3000`
    
---

## 시드 데이터 삽입

1. 시드 데이터를 삽입합니다:

`npm run seed` 또는 `node seed.js`

---

## 서버 실행

1. 서버를 실행합니다:

`npm start`

---

## 기능 설명

1. **사용자 인증**
- JWT 기반 로그인 및 로그아웃.
2. **디바이스 관리**
- 디바이스 및 리포트 목록 조회.
3. **리포트 관리**
- 리포트 상세 정보 및 관련 패널티 기록 조회.
4. **패널티 기록 관리**
- 특정 사람에 대한 패널티 기록 조회.

---

## 사용 예시

1. **로그인**
- URL: `http://localhost:3000/login`
- 예시 사용자:
  - Username: user1
  - Password: password1

2. **디바이스 및 리포트 확인**
- 로그인 후 `/info` 페이지에서 디바이스 및 리포트를 확인합니다.

---

## 문제 해결

1. **필드 이름 오류**
- `alchol_level` → `alcohol_level`로 수정 필요.
- 관련 파일: `models/Report.js`, `seed.js`, `views/info.ejs`.

2. **시드 데이터 재실행**
`npm run seed && npm start`

---

## 기여 방법

1. 프로젝트를 포크합니다.
2. 브랜치를 생성합니다: `git checkout -b feature/새로운기능`.
3. 변경 사항을 커밋합니다.
4. 원격 저장소에 브랜치를 푸시합니다.
5. 풀 리퀘스트를 생성합니다.

---

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참고하세요.

