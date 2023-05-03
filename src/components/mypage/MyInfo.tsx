import React from 'react';
import styled from 'styled-components';
import profile from '../../assets/icon/profile.svg';
import email from '../../assets/icon/email.svg';
import phone from '../../assets/icon/phone.svg';
import locker from '../../assets/icon/locker.svg';
const MyInfo = () => {
  return (
    <Wrap>
      <Container>
        <SpanBox>
          <Span>MY페이지</Span>
          <BtnBox>
            <InfoSpan>기본정보</InfoSpan>
            <EditBtn>수정하기</EditBtn>
          </BtnBox>
        </SpanBox>
        <InfoBox>
          <ProfileBox>
            <img src={profile} alt="fixet" />
            <Profile>
              <Name>김픽셋</Name>
              <Company>비누랩스</Company>
              <Part>경영관리</Part>
            </Profile>
          </ProfileBox>
          <EmailBox>
            <EmailImg src={email} alt="email" />
            <Email>wyswhsl21@naver.com</Email>
          </EmailBox>
          <PhoneBox>
            <PhoneImg src={phone} alt="phone" />
            <Phone>010-7777-7777</Phone>
          </PhoneBox>
        </InfoBox>
        <Security>보안설정</Security>
        <SecurityContainer>
          <SecurityBox>
            <Locker src={locker} alt="Lock" />
            <span>비밀번호</span>
          </SecurityBox>

          <Editpw>비밀번호 수정</Editpw>
        </SecurityContainer>
      </Container>
    </Wrap>
  );
};

export default MyInfo;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  margin-left: 57px;
  margin-top: 72px;
  display: flex;
  flex-direction: column;
`;
const Span = styled.span`
  font-weight: 700;
  font-size: 24px;
`;
const SpanBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
  width: 651px;
  height: 74px;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 651px;
  height: 25px;
`;
const InfoSpan = styled.span`
  font-weight: 700;
  font-size: 15px;
`;
const EditBtn = styled.button`
  width: 58px;
  height: 16px;
  background-color: #066aff;
  color: #ffffff;
  font-size: 11px;
`;
const InfoBox = styled.div`
  width: 660px;
  height: 196px;
  border: 1px solid #000000;
  border-radius: 4px;
  offset: 0px, 4px rgba(0, 0, 0, 0.25);
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  gap: 10px;
`;
const ProfileBox = styled.div`
  display: flex;
  margin-top: 37px;
  margin-left: 17px;
`;
const Name = styled.span`
  font-size: 15px;
  font-weight: 700;
`;
const Company = styled.span`
  color: #999999;
  font-size: 10px;
  font-weight: 500;
`;
const Part = styled.span`
  color: #999999;
  font-size: 10px;
  font-weight: 500;
`;
const EmailBox = styled.div`
  width: 195px;
  height: 27px;
  display: flex;
  gap: 6px;
  margin-left: 21px;
  align-items: center;
`;
const EmailImg = styled.img``;
const Email = styled.span`
  font-weight: 500;
  font-size: 11px;
`;
const PhoneBox = styled.div`
  display: flex;
  gap: 3px;
  width: 178px;
  height: 29px;
  margin-left: 18px;

  align-items: center;
`;
const PhoneImg = styled.img``;
const Phone = styled.span`
  font-weight: 500;
  font-size: 11px;
`;
const Security = styled.span`
  font-weight: 700;
  font-size: 15px;
  margin-top: 24px;
`;
const SecurityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 660px;
  height: 66px;
  border: 1px solid #000000;
  margin-top: 7px;
`;
const Locker = styled.img``;
const Editpw = styled.button`
  width: 68px;
  height: 16px;
  background-color: #d9d9d9;
  font-weight: 500;
  font-size: 11px;
  margin-right: 42px;
`;

const SecurityBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 21px;
  span {
    font-size: 11px;
    font-weight: 500;
  }
`;
