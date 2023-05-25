import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import profileImg from '../../assets/icon/profile.svg';
import email from '../../assets/icon/email.svg';
import auth from '../../assets/icon/auth.svg';
import locker from '../../assets/icon/locker.svg';
import { useRecoilState } from 'recoil';
import { useProfileState } from '../../recoil/profile';
import { readuser } from '../../apis/auth';
import EditInfo from '../modal/EditInfo';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Errormessage, FormValue } from '../landing/Landing';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserApi } from '../../apis/axiosInstance';
import cancle from '../../assets/icon/cancel.svg';
import useInputs from '../../hooks/useInput';
const MyInfo = () => {
  const [profile, setProfile] = useRecoilState(useProfileState);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const profilEmail = localStorage.getItem('email');
  const [editModal, setEditMoadl] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  interface FormValue {
    name: string;
    phone: string;
    company: string;
    job: string;
    email: string;
    password: string;
    auth: string | number;
  }
  interface ModalFormValue {
    password: string;
  }
  useEffect(() => {
    getprofile();
  }, []);

  const [{ password }, onChange, reset] = useInputs({
    password: '',
  });
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
  //유저 정보 가져오는 핸들러
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

  //ModalHandler
  const cancelHandler = () => {
    setEditMoadl(!editModal);
  };
  const authHandler = async () => {
    try {
      const { data } = await UserApi.authuser(profile?.user?.email, password);
      console.log(data);
      setError(false);

      setEditMoadl(!editModal);
      setEdit(!edit);
    } catch (err) {
      setError(true);
    }
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
    password: yup.string().required('비밀번호를 입력해주세요'),
    auth: yup.string().required('비밀번호를 입력해주세요'),
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
      password: '',
      auth: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });
  console.log(errors);

  return (
    <Wrap>
      <Container>
        {edit ? (
          <>
            <MypageBox>
              <Span>개인정보 수정</Span>
              <MypageBtn>마이페이지로 가기</MypageBtn>
            </MypageBox>
            <SubSpan margin="32px">기본정보 수정</SubSpan>
            <InfoForm onSubmit={onSubmit(profilesubmitHandler)}>
              <InfoEditBox>
                <ProfileBox>
                  <Fixet src={profileImg} alt="fixet" />
                  <Profile>
                    <Input margin="0px" width="304px" placeholder={profile?.user?.name} {...register('name')} />
                    <Input margin="0px" width="304px" placeholder="회사" {...register('company')} />
                  </Profile>
                </ProfileBox>
                <EditInfoBtn>기본정보 수정하기</EditInfoBtn>
              </InfoEditBox>

              <SubSpan margin="24px">이메일 수정</SubSpan>

              <InfoEditEmailBox>
                <SubSpan margin="0px">현재 이메일</SubSpan>
                <EmailSpan margin="8px">{profile?.user?.email}</EmailSpan>

                <EmailBox>
                  <SubSpan margin="16px">변경 이메일</SubSpan>
                  <div>
                    <Input
                      margin="0px"
                      width="404px"
                      placeholder="변경할 이메일주소를 입력해주세요"
                      {...register('email')}
                    />
                    <button>인증</button>
                  </div>

                  <Input margin="0px" width="404px" placeholder="인증번호를 입력해주세요" {...register('auth')} />
                </EmailBox>
                <EditInfoBtn>이메일 수정하기</EditInfoBtn>
              </InfoEditEmailBox>
              <SubSpan margin="24px">비밀번호 변경</SubSpan>
              <InfoEditPwBox>
                <PhoneBox>
                  <Input margin="0px" width="404px" placeholder="새 비밀번호를 입력해주세요" {...register('phone')} />
                  <EmailSpan margin="4px">영문,숫자 혼합 8~20자로 입력해주세요.</EmailSpan>
                  <Input margin="8px" width="404px" placeholder="한번 더 입력해주세요" {...register('phone')} />
                </PhoneBox>
                <EditInfoBtn ref={buttonRef} type="submit">
                  비밀번호 변경하기
                </EditInfoBtn>
              </InfoEditPwBox>
            </InfoForm>
          </>
        ) : (
          <>
            <Span>마이페이지</Span>
            <InfoBox>
              <ProfileDiv>
                <ProfileBox>
                  <Fixet src={profileImg} alt="fixet" />
                  <Profile>
                    <Name>{profile?.user?.name}</Name>
                    <Company>{profile?.user?.company}</Company>
                  </Profile>
                </ProfileBox>
                <EmailBox>
                  <EmailDiv>
                    <EmailImg src={email} alt="email" />
                    <Email>{profile?.user?.email}</Email>
                    <EmailAuthBtn>인증 완료</EmailAuthBtn>
                  </EmailDiv>
                  <PhoneBox>
                    <PhoneImg src={auth} alt="phone" />
                    <Phone>********</Phone>
                  </PhoneBox>
                </EmailBox>
              </ProfileDiv>
              <EditBtn onClick={editpwHandler}>개인정보 수정</EditBtn>
            </InfoBox>
          </>
        )}
      </Container>
      {editModal && (
        <EditInfo>
          <ModalSpan>본인인증</ModalSpan>
          <ModalDiv>
            <Password
              className={error ? 'error' : ''}
              name="password"
              onChange={onChange}
              autoComplete="off"
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
            />
            {error && <Errormessage>비밀번호를 올바르게 입력해주세요.</Errormessage>}

            <ButtonBox>
              <OK className={password && 'active'} onClick={authHandler}>
                본인인증 완료
              </OK>
              <Cancel onClick={cancelHandler}>
                <img src={cancle} alt="cancle" />
                취소하기
              </Cancel>
            </ButtonBox>
          </ModalDiv>
        </EditInfo>
      )}
    </Wrap>
  );
};

export default MyInfo;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Container = styled.div`
  margin-left: 40px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;
// Edit 활성화 된 뒤 css
const MypageBox = styled.div`
  width: 452px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MypageBtn = styled.button`
  background-color: #066aff;
  width: 139px;
  height: 40px;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  border-radius: 8px;
`;
const Fixet = styled.img``;
const Span = styled.span`
  font-weight: 700;
  font-size: 32px;
`;
const SubSpan = styled.span<{ margin: string }>`
  margin-top: ${(props) => props.margin};

  font-weight: 700;
  font-size: 14px;
  color: #666666;
`;
const EmailSpan = styled.span<{ margin: string }>`
  margin-top: ${(props) => props.margin};
  font-size: 14px;
  font-weight: 500;

  color: #999999;
`;
const InfoEditBox = styled.div`
  margin-top: 8px;
  height: 190px;
  width: 452px;
  border: 1px solid #dddddd;
  border-radius: 24px;
  padding: 24px;
`;
const EditInfoBtn = styled.button`
  width: 125px;
  height: 38px;
  border-radius: 8px;
  margin-top: 16px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #066aff;
  color: #ffffff;
`;
const InfoEditEmailBox = styled.div`
  height: 264px;
  width: 452px;
  border: 1px solid #dddddd;
  border-radius: 24px;
  padding: 24px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;
const InfoEditPwBox = styled.div`
  margin-top: 8px;
  height: 212px;
  width: 452px;
  gap: 16px;

  border-radius: 24px;
  padding: 24px;
  border: 1px solid #dddddd;
`;
const InfoForm = styled.form`
  width: 452px;
  height: 780px;
  display: flex;
  flex-direction: column;
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
  width: 93px;
  height: 30px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin: 24px 24px 0 0;
  color: #999999;
  font-size: 11px;
  font-weight: 500;
  font-size: 14px;
`;
const InfoBox = styled.div`
  width: 670px;
  height: 220px;
  border: 1px solid #dddddd;
  border-radius: 24px;
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
`;
const ProfileDiv = styled.div`
  height: 172px;
  margin: 24px 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;

  gap: 8px;
`;
const ProfileBox = styled.div`
  display: flex;
  gap: 12px;
`;
const Input = styled.input<{ width: string; margin: string }>`
  height: 40px;
  width: ${(props) => props.width};
  margin-top: ${(props) => props.margin};

  border-radius: 8px;
  padding: 8px;
  background-color: #f4f4f4;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  ::placeholder {
    color: #999999;
  }
`;
const Name = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #333333;
`;
const Company = styled.span`
  color: #999999;
  font-size: 16px;
  font-weight: 500;
  color: #999999;
`;
const Part = styled.span`
  color: #999999;
  font-size: 10px;
  font-weight: 500;
`;
const EmailBox = styled.div`
  height: 110px;
  display: flex;
  gap: 8px;
  flex-direction: column;
`;
const EmailImg = styled.img``;
const Email = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #999999;
  margin-left: 8px;
  margin-top: 3px;
`;
const EmailDiv = styled.div`
  height: 24px;
  display: flex;
`;
const EmailAuthBtn = styled.button`
  width: 49px;
  height: 22px;
  margin-left: 4px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #066aff;
  border-radius: 6px;
  color: #066aff;
  font-weight: 700;
  font-size: 10px;
`;
const PhoneBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const PhoneImg = styled.img``;
const Phone = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #999999;
  margin-top: 4px;
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

//Modal
const ModalSpan = styled.span`
  font-weight: 700;
  font-size: 32px;
  color: #333333;
  margin: 32px 0 0 32px;
`;
const ModalDiv = styled.div`
  display: flex;

  flex-direction: column;
  margin-left: 32px;
`;

const Password = styled.input`
  margin-top: 32px;
  border: none;
  color: #000000;
  background-color: #f4f4f4;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  width: 426px;
  height: 40px;
  border-radius: 8px;
  padding: 8px;
  &.error {
    border: 1px solid #ff0000;
  }
`;

const ButtonBox = styled.div`
  margin-top: 18px;
  width: 426px;
  height: 40px;
  display: flex;

  gap: 8px;
`;
const OK = styled.button`
  width: 322px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), #066aff;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  &.active {
    background: #066aff;
  }
`;
const Cancel = styled.button`
  width: 96px;
  height: 40px;
  background-color: #f4f4f4;
  color: #999999;
  border: none;
  border-radius: 8px;
  gap: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
