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
import { User } from '../../recoil/userList';
export interface InfoFormValue {
  name: string;
  company: string;
  password: string;
  confirm: string;

  email: string;

  auth: string | number;
}
const MyInfo = () => {
  const [profile, setProfile] = useRecoilState(useProfileState);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const profilEmail = localStorage.getItem('email');
  const [editModal, setEditMoadl] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const buttonRef = useRef<HTMLInputElement>(null);
  //yup schema
  const schema = yup.object().shape({
    name: yup
      .string()
      .notRequired()

      .matches(/^[가-힣a-zA-Z]{2,20}$/, '이름에 특수기호는 사용 할 수 없어요'),
    company: yup.string().notRequired().required('회사를 입력해주세요'),
    email: yup
      .string()
      .notRequired()
      .matches(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '올바른 이메일 형식으로 입력해주세요.'),
    auth: yup.string().min(6, '인증번호는 6자리 숫자입니다.').max(6, '6자리를 초과하면 안되요'),
    password: yup
      .string()
      .notRequired()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, '영문/숫자조합 8자에서 20자로 설정해주세요.'),

    confirm: yup.string().oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.'),
  });
  useEffect(() => {
    getprofile();
  }, []);

  const [{ password }, onChange, reset] = useInputs({
    password: '',
  });
  const mypageHandler = () => {
    setEdit(!edit);
    getprofile();
    window.location.reload();
  };

  //유저 정보 가져오는 핸들러
  async function getprofile() {
    try {
      const { data: userData } = await readuser({ token, Id: userId });
      setProfile(userData);
    } catch (err) {
      return;
    }
  }
  const editpwHandler = () => {
    setEditMoadl(!editModal);
  };

  //이메일 인증 핸들러

  //ModalHandler
  const cancelHandler = () => {
    setEditMoadl(!editModal);
  };
  const authHandler = async () => {
    try {
      const { data } = await UserApi.authuser(profile?.user?.email, password);
      setError(false);

      setEditMoadl(!editModal);
      setEdit(!edit);
    } catch (err) {
      setError(true);
    }
  };

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<InfoFormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',

      company: '',

      email: '',
      password: '',
      confirm: '',
      auth: '',
    },

    mode: 'onChange',
  });
  const getFields = getValues();
  const watchedFields = watch();
  //변경 이메일 전송 핸들러
  const transemailHandler = async () => {
    const email = watchedFields.email;
    try {
      const { data } = await UserApi.authmail(email);
      alert(data.msg);
    } catch (err) {
      return;
    }
  };

  //auth code 전송 핸들러
  const transauthcodeHandler = async () => {
    const authcode = watchedFields.auth;
    const email = watchedFields.email;
    try {
      const { data } = await UserApi.authcode(email, authcode);
      alert('인증이 되었습니다');
      setComplete(true);
    } catch (err) {
      setComplete(false);
    }
  };

  //기본정보 수정 핸들러
  const editprofileHandler = async () => {
    const formData = getValues();
    if (formData.name) {
      try {
        const response = await UserApi.editprofile({ email: profile?.user?.email, name: formData.name });
        alert('기본정보가 수정 되었습니다.');
      } catch (err) {
        return;
      }
    }
    if (formData.company) {
      try {
        const response = await UserApi.editprofile({ email: profile?.user?.email, company: formData.company });
        alert('기본정보가 수정 되었습니다.');
      } catch (err) {
        return;
      }
    }
  };
  //이메일 수정하기 핸들러
  const editemailhandler = async () => {
    const email = profile.user.email;
    const editEmail = getFields.email;
    if (!errors.email?.message && getFields.email !== null && complete === true && !errors.auth?.message) {
      try {
        const { data } = await UserApi.editemail(email, editEmail);
      } catch (err) {
        return;
      }
    }
  };

  //비밀번호 수정하기 핸들러
  const editpasswordHandler = async () => {
    if (!errors.confirm?.message) {
      const email = profile.user.email;
      const password = getFields.password;
      try {
        const { data } = await UserApi.patchpw(email, password);
      } catch (err) {
        return;
      }
    }
  };

  const profilesubmitHandler = () => {
    return;
  };

  return (
    <Wrap>
      <Container>
        {edit ? (
          <>
            <MypageBox>
              <Span>개인정보 수정</Span>
              <MypageBtn onClick={() => mypageHandler()}>마이페이지로 가기</MypageBtn>
            </MypageBox>
            <SubSpan margin="32px">기본정보 수정</SubSpan>
            <InfoForm autoComplete="off" onSubmit={handleSubmit(profilesubmitHandler)}>
              <InfoEditBox className={(errors.name?.message && 'error') || (errors.company?.message && 'error')}>
                <ProfileBox>
                  <Fixet src={profileImg} alt="fixet" />
                  <Profile>
                    <Input
                      className={errors.name?.message ? 'error' : getFields.name === '' ? '' : 'complete'}
                      id="name"
                      margin="0px"
                      width="304px"
                      placeholder={profile?.user?.name}
                      {...register('name')}
                    />
                    <Errormessage>{errors.name?.message}</Errormessage>
                    <Input
                      className={errors.company?.message ? 'error' : getFields.company === '' ? '' : 'complete'}
                      id="company"
                      margin="0px"
                      width="304px"
                      placeholder={profile?.user?.company === null ? '회사를 입력해주세요' : profile.user.company}
                      {...register('company')}
                    />
                    <Errormessage>{errors.company?.message}</Errormessage>
                  </Profile>
                </ProfileBox>
                <EditInfoBtn
                  className={
                    !errors?.name?.message &&
                    !errors?.company?.message &&
                    getFields.name !== '' &&
                    getFields.company !== ''
                      ? 'complete'
                      : ''
                  }
                  onClick={editprofileHandler}
                  type="button"
                >
                  기본정보 수정하기
                </EditInfoBtn>
              </InfoEditBox>

              <SubSpan margin="24px">이메일 수정</SubSpan>

              <InfoEditEmailBox className={(errors.email?.message && 'error') || (errors.auth?.message && 'error')}>
                <SubSpan margin="0px">현재 이메일</SubSpan>
                <EmailSpan margin="8px">{profile?.user?.email}</EmailSpan>

                <EmailBox>
                  <SubSpan margin="16px">변경 이메일</SubSpan>
                  <EditEmail className={errors.email?.message ? 'error' : getFields.email === '' ? '' : 'complete'}>
                    <input id="email" placeholder="변경할 이메일주소를 입력해주세요" {...register('email')} />

                    <TransBtn
                      className={!errors.email?.message && getFields.email !== '' ? 'complete' : ''}
                      onClick={() => transemailHandler()}
                      width="81px"
                      type="button"
                    >
                      인증번호 전송
                    </TransBtn>
                  </EditEmail>
                  {errors.email?.message && <Errormessage>{errors.email?.message}</Errormessage>}
                  <EditEmail className={errors.auth?.message ? 'error' : getFields.auth === '' ? '' : 'complete'}>
                    <input id="auth" placeholder="인증번호를 입력해주세요" {...register('auth')} />

                    <TransBtn
                      className={!errors.auth?.message && getFields.auth !== '' ? 'complete' : ''}
                      onClick={() => transauthcodeHandler()}
                      width="58px"
                      type="button"
                    >
                      인증하기
                    </TransBtn>
                  </EditEmail>
                  {errors.auth?.message && <Errormessage>{errors.auth?.message}</Errormessage>}
                </EmailBox>
                <EditInfoBtn
                  disabled={
                    !errors.email?.message && getFields.email !== null && complete === true && !errors.auth?.message
                      ? false
                      : true
                  }
                  className={complete ? 'complete' : ''}
                  onClick={editemailhandler}
                  type="button"
                >
                  이메일 수정하기
                </EditInfoBtn>
              </InfoEditEmailBox>
              <SubSpan margin="24px">비밀번호 변경</SubSpan>
              <InfoEditPwBox>
                <PwBox>
                  <Input
                    className={errors.password?.message ? 'error' : getFields.password === '' ? '' : 'complete'}
                    id="password"
                    type="password"
                    margin="0px"
                    width="404px"
                    placeholder="새 비밀번호를 입력해주세요"
                    {...register('password')}
                  />

                  <EmailSpan className={errors.password?.message && 'error'} margin="4px">
                    영문,숫자 혼합 8~20자로 입력해주세요.
                  </EmailSpan>
                  <Input
                    className={errors.confirm?.message ? 'error' : getFields.confirm === '' ? '' : 'complete'}
                    type="password"
                    margin="8px"
                    width="404px"
                    placeholder="한번 더 입력해주세요"
                    {...register('confirm')}
                  />
                  <Errormessage>{errors.confirm?.message}</Errormessage>
                </PwBox>
                <EditInfoBtn
                  className={
                    !errors.password?.message &&
                    !errors.confirm?.message &&
                    getFields.password !== '' &&
                    getFields.confirm !== ''
                      ? 'complete'
                      : ''
                  }
                  onClick={editpasswordHandler}
                  id="confirm"
                  type="button"
                >
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
                  <MypageProfile>
                    <Name>{profile?.user?.name}</Name>
                    <Company>{profile?.user?.company}</Company>
                  </MypageProfile>
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
              <EditBtn onClick={() => editpwHandler()}>개인정보 수정</EditBtn>
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
  height: 100vh;
  padding-bottom: 100px;
  overflow: visible;
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
  &.error {
    color: #ff0000;
  }
`;
const InfoEditBox = styled.div`
  margin-top: 8px;
  height: 190px;
  width: 452px;
  border: 1px solid #dddddd;
  border-radius: 24px;
  padding: 24px;
  &.error {
    height: 210px;
  }
`;
const EditInfoBtn = styled.button`
  width: 125px;
  height: 38px;
  border-radius: 8px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 700;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #066aff;
  color: #ffffff;
  &.complete {
    background: #066aff;
  }
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
  &.error {
    height: 304px;
  }
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
const TransBtn = styled.button<{ width: string }>`
  height: 28px;
  width: ${(props) => props.width};

  border-radius: 8px;
  padding: 8px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #066aff;
  color: #ffffff;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 700;
  &.complete {
    background: #066aff;
  }
`;
const EditEmail = styled.div`
  display: flex;
  height: 40px;
  width: 404px;
  background: #f4f4f4;
  border-radius: 8px;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;

  input {
    border: transparent;
    font-size: 14px;
    font-weight: 500;

    background-color: transparent;
    width: 189px;
    ::placeholder {
      color: #999999;
    }
  }
  &.error {
    border: 1px solid #ff0000;
  }
  &.complete {
    border: 1px solid #066aff;
  }
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
`;
const MypageProfile = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 8px;
`;
const ProfileBox = styled.div`
  display: flex;
  gap: 12px;
`;
const Input = styled.input<{ width: string; margin: string }>`
  height: 40px;
  background-color: #f4f4f4;
  width: ${(props) => props.width};
  margin-top: ${(props) => props.margin};

  border-radius: 8px;
  padding: 8px;

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  ::placeholder {
    color: #999999;
  }
  &.error {
    border: 1px solid #ff0000;
  }
  &.complete {
    border: 1px solid #066aff;
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
  display: flex;

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
const PwBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const PhoneBox = styled.div`
  display: flex;
  gap: 8px;
`;
const PhoneImg = styled.img`
  width: 24px;
  height: 24px;
`;
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
