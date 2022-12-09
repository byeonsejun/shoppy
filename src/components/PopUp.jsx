import React from 'react';
import { useAuthContext } from './context/AuthContext';

export default function PopUp() {

  const { platforms, setPopUp, goToLogin } = useAuthContext();
    // console.log(platforms)
  return (
    <div className="popUp-Wrap">
      <div className='dimm' onClick={() => setPopUp(false)} ></div>
      <div className="popUp ">
      <span className="modal_close" onClick={() => setPopUp(false)} >×</span>
        <h2>로그인 인증방법을 선택하세요.</h2>
        <div className="sign-select">
          {
            platforms.map((platform) => {
              return (
                <div 
                  key={platform.name} 
                  className={platform.name} 
                  onClick={()=>goToLogin(platform.name)}
                >
                  <span>{platform.icon}</span>
                  {platform.text}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

