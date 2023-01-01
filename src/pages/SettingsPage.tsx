import React from 'react';
import { Button } from '@mui/material';
import '../styles/setting.css';
import '../styles/index';

const SettingPage = () => {
  return (
    <div>
      <div className="box">
        <img className="profile"></img>
        <div className="username"> 00 회원님</div>
        {/* <div className="arrow"></div> */}
      </div>
      <div className="items">
        <ul>
          <div className="item">커스텀화</div>
          <li>
            <a href="/">테마 설정</a>
          </li>
          <li>
            <a href="/">한 주의 시작 요일 설정</a>
          </li>
          <div className="item">고객센터</div>
          <li>
            <a href="/">도움말</a>
          </li>
          <li>
            <a href="/">문의하기</a>
          </li>
          <div className="item">기타</div>
          <li>
            <a href="/">로그아웃</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingPage;
