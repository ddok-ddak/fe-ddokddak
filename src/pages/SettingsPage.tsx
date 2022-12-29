import React from 'react';
import { Typography } from '@mui/material';
import '../styles/setting.css';
import { useRecoilState } from 'recoil';

const SettingPage = () => {
  // const [user, setUser] = useRecoilState();
  return (
    <div>
      <div className="box">
        <img className="profile"></img>
        {/* <div className="username">`${user}` 회원님</div> */}
        <div className="username"> 00 회원님</div>
      </div>

      <div className="items">
        <ul className="items_ul">
          <li>
            <div className="item">커스텀화</div>
          </li>
          <li>
            <a href="/">테마 설정</a>
          </li>
          <li>
            <a href="/">한 주의 시작 요일 설정</a>
          </li>
          <li>
            <div className="item">고객센터</div>
          </li>
          <li>
            <a href="/">도움말</a>
          </li>
          <li>
            <a href="/">문의하기</a>
          </li>
          <li>
            <div className="item">기타</div>
          </li>
          <li>
            <a href="/">로그아웃</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingPage;
