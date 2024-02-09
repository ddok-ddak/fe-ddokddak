import { getInfo } from '@/api/auth';
import { setTokenCookie } from '@/api/http';
import { UserModeList } from '@/pages/category/CategoryPage';
import { currentUserInfo } from '@/store/info';
import { modalState } from '@/store/modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

function LoginRedirect() {
  const navigate = useNavigate();

  const [token, setToken] = useState('');

  const setUserInfo = useSetRecoilState(currentUserInfo);
  const setModalInfo = useSetRecoilState(modalState);

  const getUserInfo = async () => {
    // await getInfo()
    //   .then((response) => {
    //     const info = response.result;
    //     setUserInfo(info);
    //     if (info.templateType === 'NONE') {
    //       setModalInfo({
    //         open: true,
    //         title: `${info.nickname}님 환영합니다!`,
    //         msg: '두던에서 나만의 시간 기록을 남겨보세요.\n사용 전 모드를 선택 해주세요 :)',
    //         optionList: UserModeList.map(
    //           (userMode: { id: any; type: any; name: any }) => {
    //             return {
    //               id: userMode.id,
    //               type: userMode.type,
    //               name: userMode.name,
    //             };
    //           },
    //         ),
    //         isShowConfirmBtn: true,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const result = await getInfo();
    console.log(result)
  };
  useEffect(() => {
    const accessToken = new URL(window.location.href).searchParams.get(
      'accessToken',
    ); // 현재 URL에서 토큰만 추출
    setTokenCookie(accessToken);
    // setToken(accessToken);
    // navigate('/record', { replace: false });
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  return <></>;
}

export default LoginRedirect;
