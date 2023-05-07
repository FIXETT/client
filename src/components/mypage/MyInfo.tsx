import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import profileImg from '../../assets/icon/profile.svg';
import email from '../../assets/icon/email.svg';
import phone from '../../assets/icon/phone.svg';
import locker from '../../assets/icon/locker.svg';
import { useRecoilState } from 'recoil';
import { useProfileState } from '../../recoil/profile';
import { readuser } from '../../apis/auth';
import EditInfo from '../modal/EditInfo';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormValue } from '../landing/Landing';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserApi } from '../../apis/axiosInstance';
const MyInfo = () => {
  const [profile, setProfile] = useRecoilState(useProfileState);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const profilEmail = localStorage.getItem('email');
  const [editModal, setEditMoadl] = useState(false);
  const [edit, setEdit] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  interface FormValue {
    name: string;
    phone: string;
    company: string;
    job: string;
    email: string;
  }
  useEffect(() => {
    getprofile();
  }, []);
  const profilesubmitHandler: SubmitHandler<FormValue> = async (data) => {
    const name = data?.name;
    const company = data?.company;
    const email = data?.email;
    const job = data?.job;
    const phone = data?.phone;
    try {
      const { data } = await UserApi.editprofile(name, phone, company, job, email);
    } catch (err) {
      console.log(err);
    }
  };

  async function getprofile() {
    try {
      const { data: userData } = await readuser({ token, Id: userId });
      setProfile(userData);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(profile?.user?.email);
  const editpwHandler = () => {
    setEditMoadl(!editModal);
  };
  const editprofileHandler = () => {
    buttonRef.current?.click();
  };

  //yup schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('이메일을 입력해주세요.')
      .matches(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '올바른 이메일 형식이 아닙니다.'),
    name: yup.string().required('이름을 입력해주세요'),
    phone: yup.string().required('번호를 입력해주세요'),
    company: yup.string().required('회사를 입력해주세요'),
    job: yup.string().required('소속을 입력해주세요'),
  });

  //react-hook-form
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      name: '',
      phone: '',
      company: '',
      job: '',
      email: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <Wrap>
      <Container>
        <SpanBox>
          <Span>MY페이지</Span>
          <BtnBox>
            <InfoSpan>기본정보</InfoSpan>
            {edit ? (
              <>
                <button onClick={() => editprofileHandler()}>확인하기</button>
                <button onClick={() => setEdit(!edit)}>취소하기</button>{' '}
              </>
            ) : (
              <EditBtn onClick={() => setEdit(!edit)}>수정하기</EditBtn>
            )}
          </BtnBox>
        </SpanBox>
        {edit ? (
          <InfoBox>
            <form onSubmit={onSubmit(profilesubmitHandler)}>
              <ProfileBox>
                <img src={profileImg} alt="fixet" />
                <Profile>
                  <input placeholder="이름" {...register('name')} />
                  <input placeholder="회사" {...register('company')} />
                  <input placeholder="파트" {...register('job')} />
                </Profile>
              </ProfileBox>
              <EmailBox>
                <EmailImg src={email} alt="email" />
                <input placeholder="이메일" {...register('email')} />
              </EmailBox>
              <PhoneBox>
                <PhoneImg src={phone} alt="phone" />
                <input placeholder="전화번호" {...register('phone')} />
              </PhoneBox>
              <button ref={buttonRef} type="submit" />
            </form>
          </InfoBox>
        ) : (
          <InfoBox>
            <ProfileBox>
              <img src={profileImg} alt="fixet" />
              <Profile>
                <Name>{profile?.user?.name}</Name>
                <Company>{profile?.user?.company}</Company>
                <Part>{profile?.user?.job}</Part>
              </Profile>
            </ProfileBox>
            <EmailBox>
              <EmailImg src={email} alt="email" />
              <Email>{profile?.user?.email}</Email>
            </EmailBox>
            <PhoneBox>
              <PhoneImg src={phone} alt="phone" />
              <Phone>{profile?.user?.phone}</Phone>
            </PhoneBox>
          </InfoBox>
        )}

        <Security>보안설정</Security>
        <SecurityContainer>
          <SecurityBox>
            <Locker src={locker} alt="Lock" />
            <span>비밀번호</span>
          </SecurityBox>

          <Editpw onClick={editpwHandler}>비밀번호 수정</Editpw>
        </SecurityContainer>
      </Container>
      {editModal && <EditInfo modal={editModal} EditModal={setEditMoadl} />}
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
  input {
    width: 115px;
    height: 20px;
    border: 1px solid #000000;
  }
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
  margin-top: 21px;
  align-items: center;
  input {
    width: 115px;
    height: 20px;
    border: 1px solid #000000;
  }
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
  input {
    width: 115px;
    height: 20px;
    border: 1px solid #000000;
  }
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
