import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import fixerLong from '../assets/landing/fixet_long.png';
import fixerShort from '../assets/landing/fixet_short.png';
import chat01 from '../assets/landing/chat_01.png';
import chat02 from '../assets/landing/chat_02.png';
import group01 from '../assets/landing/group01.png';
import group02 from '../assets/landing/group02.png';
import addAssetList from '../assets/landing/addAssetList.png';
import search from '../assets/landing/search.png';
import assetMap from '../assets/landing/assetMap.png';
import fixet from '../assets/landing/fixet.png';
import bubble from '../assets/landing/bubble.png';
import logo_g from '../assets/icon/logo_g.svg';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Profile } from '../assets/profile.svg';

const Landing = () => {
  const navigate = useNavigate();
  const [reachedBottom, setReachedBottom] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.pageYOffset || document.documentElement.scrollTop;
      setFadeOut(scrollHeight !== 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.pageYOffset;
      if (scrollPosition >= 1922) {
        setReachedBottom(true);
      } else {
        setReachedBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <LandingContainer>
      <Header>
        <Logo />
        <BtnWrap>
          <LoginBtn
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인
          </LoginBtn>
          <SignInBtn
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </SignInBtn>
        </BtnWrap>
      </Header>
      <LandingFirst>
        <LandingFirstWrap>
          <TextWrap>
            <MainText>귀찮은 자산관리, 우리회사 자산 수리...</MainText>
            <SubText fadeOut={fadeOut}>
              픽셋은 <span>자산관리부터</span>
              <br />
              수리업체 찾기까지 <br />
              <span>다 가능</span>해요!
            </SubText>
            <SubText fadeOut={fadeOut}>
              픽셋은 자산관리부터
              <br />
              <span> 수리업체 찾기까지 </span>
              <br />
              <span>다 가능</span>해요!
            </SubText>
            <ChaImg1 src={fixerLong} alt="지팡이긴캐릭터" />
            <ChaImg2 src={fixerShort} alt="지팡이짧은캐릭터" />
          </TextWrap>
          <LinkBtn
            onClick={() => {
              navigate('/login');
            }}
          >
            무료로 fixet 시작하기
          </LinkBtn>
        </LandingFirstWrap>
        <ImgWrap>
          <ChatImg1 src={chat02} alt="채팅화면02" />
          <ChatImg2 src={chat01} alt="채팅화면01" />
        </ImgWrap>
      </LandingFirst>
      <LandingScroll reachedBottom={reachedBottom}>
        <TopText>기존의 회사 자산관리는 이랬죠..</TopText>
        <LandingScrollImg src={group01} alt="텍스트이미지" reachedBottom={reachedBottom} />
        <LandingScrollImg src={group02} alt="텍스트이미지" reachedBottom={reachedBottom} />
        <BottomText reachedBottom={reachedBottom}>이제 fixet으로 이 고민들을 해결할 시간이에요!</BottomText>
        <BouncingBox reachedBottom={reachedBottom}>
          <Profile width="200px" height="200px" />
        </BouncingBox>
      </LandingScroll>
      <AssetListContainer>
        <p>자산 대시보드</p>
        <AssetListMainText>실시간 자산현황 업데이트</AssetListMainText>
        <p>
          실시간 자산현황 대시보드로
          <br />
          우리회사의 자산을 한눈에 파악하세요.
        </p>
        <BubbleWrapContainer>
          <img src={bubble} alt="자산대시보드이미지" />
        </BubbleWrapContainer>
      </AssetListContainer>
      <AssetListAddContainer>
        <div>
          <AssetListAddMainText>자산등록</AssetListAddMainText>
          <AssetListAddSubText>
            신규등록도,{' '}
            <span>
              기존에 갖고 있던 <br />
              자산관리 파일도 간편하게
            </span>
          </AssetListAddSubText>
          <AssetListAddText>
            신규로 등록하는 자산도, 기존에 갖고있던 자산관리 파일도 <br />
            쉽고 간편하게 등록하세요.
          </AssetListAddText>
          <img src={addAssetList} alt="자산등록이미지" />
        </div>
      </AssetListAddContainer>
      <AssetSearchContainer>
        <img src={search} alt="자산검색이미지" />
      </AssetSearchContainer>
      <AssetMapContainer>
        <AssetMapAddMainText>자산 수리</AssetMapAddMainText>
        <AssetMapAddSubText>자산이 고장나도 귀찮지 않게!</AssetMapAddSubText>
        <AssetMapAddText>fixet이 수리요청까지 도와드릴게요</AssetMapAddText>
        <img src={assetMap} alt="수리업체찾기" />
        <AssetMapBtn
          onClick={() => {
            navigate('/login');
          }}
        >
          <img src={fixet} alt="픽셋캐릭터" />
          <AssetMapBtnText>이 모든 기능을 무료로! 사용해보세요</AssetMapBtnText>
        </AssetMapBtn>
      </AssetMapContainer>
      <Footer>
        <div>
          <img src={logo_g} alt="로고" />
        </div>
        <Flex>
          <p>Copyright 2023 UZ. All rights reserved</p>
          <p>Team UZ Contact. Eojjeoji@gmail.com</p>
        </Flex>
      </Footer>
    </LandingContainer>
  );
};
export default Landing;
const LandingContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
`;
const BtnWrap = styled.div`
  display: flex;
  gap: 8px;
`;
const LoginBtn = styled.button`
  padding: 12px;
  background: #f4f4f4;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #999999;
`;
const SignInBtn = styled.button`
  padding: 12px;
  background: #066aff;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`;

const LandingFirstWrap = styled.div`
  width: 480px;
`;

const LandingFirst = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 56px;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(98.68deg, #dfe7f2 0%, #c0dbff 80.93%);
`;
const MainText = styled.p`
  width: 100%;
  font-weight: 600;
  font-size: 32px;
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 16px;
`;
const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
 
  40% {
    opacity: 1;
  }
  
  50% {
    opacity: 0;
  }

  100% {
    opacity: 0;
    display: none;
  }
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    display: none;
  }
  
  50% {
    opacity: 0;
  }
  
  60% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
`;

const SubText = styled.p<{ fadeOut: boolean }>`
  width: 100%;
  position: absolute;
  top: 54px;
  left: 0;
  line-height: 72px;
  font-weight: 700;
  font-size: 56px;
  color: rgba(6, 106, 255, 0.5);
  span {
    color: #066aff;
  }
  :nth-child(2) {
    animation: ${fadeOutAnimation} 6s linear infinite alternate;
    animation-delay: 3s; /* Add a delay to the animation */
  }
  :nth-child(3) {
    animation: ${fadeInAnimation} 6s linear infinite alternate;
    animation-delay: 3s; /* Add a delay to the animation */
  }
`;

const ChaImg1 = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  animation: ${fadeOutAnimation} 6s linear infinite alternate;
  animation-delay: 3s; /* Add a delay to the animation */
`;

const ChaImg2 = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  animation: ${fadeInAnimation} 6s linear infinite alternate;
  animation-delay: 3s; /* Add a delay to the animation */
`;

const TextWrap = styled.div`
  width: 100%;
  height: 462px;
  position: relative;
`;

const ImgWrap = styled.div`
  width: 904px;
  position: relative;
`;

const ChatImg1 = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  animation: ${fadeOutAnimation} 6s linear 3s infinite alternate;
`;
const ChatImg2 = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  animation: ${fadeInAnimation} 6s linear 3s infinite alternate;
`;
const LinkBtn = styled.button`
  padding: 24px;
  width: 255px;
  height: 72px;
  background: #066aff;
  border-radius: 20px;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  margin-top: 40px;
`;
const LandingScroll = styled.div<{ reachedBottom: boolean }>`
  width: 100vw;
  height: 1400px;
  position: relative;
  overflow: hidden;
  background: ${(props) =>
    props.reachedBottom
      ? css`linear-gradient(180deg, #066AFF 0%, rgba(6, 106, 255, 0) 100%)`
      : css`linear-gradient(180deg, #000000 0%, rgba(107, 107, 107, 0.682292) 53.12%, rgba(186, 186, 186, 0) 100%)`};
`;

const LandingScrollImg = styled.img<{ reachedBottom: boolean }>`
  position: absolute;

  &:nth-child(2) {
    bottom: auto;
    top: 233px;
    left: 50%;
    transform: translateX(-50%);
    opacity: ${(props) => (props.reachedBottom ? 0 : 1)};
    transition: opacity 1s;
  }

  &:nth-child(3) {
    top: auto;
    bottom: 274px;
    left: 50%;
    transform: translateX(-50%);
    opacity: ${(props) => (props.reachedBottom ? 1 : 0)};
    transition: opacity 1s;
  }
`;
const TopText = styled.p`
  font-weight: 700;
  font-size: 48px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  padding-top: 94px;
`;
const gradientAnimation = keyframes`
  0% {
    background-position: 200% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;

  }
`;
const BottomText = styled.p<{ reachedBottom: boolean }>`
  font-weight: 700;
  font-size: 76px;
  text-align: center;
  padding-top: 1037px;
  background: ${(props) =>
    props.reachedBottom
      ? `linear-gradient(90.24deg, rgba(255, 255, 255, 0) 0%, #ffffff 12.84%, rgba(255, 255, 255, 0) 28.97%),
    #066aff`
      : '#bbbbbb'};
  background-size: 200% auto;
  animation: ${(props) => (props.reachedBottom ? gradientAnimation : 'none')} 3s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const AssetListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 160px 0;
  p {
    :nth-child(1) {
      font-weight: 700;
      font-size: 28px;
      text-align: center;
      color: #666666;
    }
    :nth-child(3) {
      font-weight: 500;
      font-size: 24px;
      text-align: center;
      color: #999999;
      line-height: 140%;
      margin-bottom: 56px;
    }
  }
`;

const BubbleWrapContainer = styled.div`
  display: flex;
  justify-content: center;
  img {
    max-width: 1440px;
  }
`;
const AssetListMainText = styled.p`
  font-weight: 700;
  font-size: 56px;
  color: #066aff;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const AssetListAddContainer = styled.div`
  width: 100vw;
  height: 1431px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
    linear-gradient(90deg, #066aff 0%, #21a366 100%);
  padding: 160px 0;
  > div {
    width: 1440px;
    margin: 0 auto;
  }
  img {
    margin-top: 56px;
    width: 100%;
  }
`;
const AssetListAddMainText = styled.p`
  text-align: left;

  font-weight: 700;
  font-size: 28px;
  color: #666666;
  margin-bottom: 16px;
`;
const AssetListAddSubText = styled.p`
  text-align: left;
  line-height: 67px;
  font-weight: 700;
  font-size: 56px;
  color: #066aff;
  margin-bottom: 24px;
  span {
    color: #21a366;
  }
`;
const AssetListAddText = styled.p`
  text-align: left;
  font-weight: 500;
  font-size: 24px;
  color: #999999;
  line-height: 140%;
`;
const AssetSearchContainer = styled.div`
  width: 100%;
  padding: 160px 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 1440px;
  }
`;
const AssetMapContainer = styled.div`
  width: 100%;
  padding: 160px 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(113.33deg, #3385ff 0.58%, #0066ff 98.36%);
  img {
    max-width: 1440px;
  }
`;

const AssetMapAddMainText = styled.p`
  font-weight: 700;
  font-size: 28px;
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
`;
const AssetMapAddSubText = styled.p`
  font-weight: 700;
  font-size: 56px;
  text-align: center;
  color: #ffffff;
  margin-top: 16px;
  margin-bottom: 24px;
`;
const AssetMapAddText = styled.p`
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 56px;
`;
const AssetMapBtn = styled.button`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 24px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 32px;
  margin-top: 56px;
`;
const gradientAnimationAssetMapBtnText = keyframes`
  0% {
    background-position: 200% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const AssetMapBtnText = styled.p`
  font-weight: 700;
  font-size: 28px;
  line-height: 100%;
  background: linear-gradient(90.28deg, rgba(6, 106, 255, 0.4) 0.11%, #066aff 49.8%, rgba(6, 106, 255, 0.4) 100.11%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  animation: ${gradientAnimationAssetMapBtnText} 2s ease-in-out infinite;
  background-size: 200% auto;
`;

const Footer = styled.div`
  width: 100%;
  padding: 24px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Flex = styled.div`
  display: flex;
  color: #999;
  font-size: 14px;
  gap: 16px;
`;

// 애니메이션 추락
const bounceAnimation = keyframes`
  0% {
    top: -100px;
  }
  25% {
    top: 0;
  }
  50% {
    top: 60%;
  }
  75% {
    top: 55%;
  }
  100% {
    top: 60%;
  }
`;

const BouncingBox = styled.div<{ reachedBottom: boolean }>`
  display: ${(props) => (props.reachedBottom ? 'block' : 'none')};
  position: absolute;
  animation: ${bounceAnimation} 2s ease-in-out forwards;
  left: 50%;
  transform: translateX(-50%);
`;
