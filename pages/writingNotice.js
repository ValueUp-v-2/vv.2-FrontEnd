import { useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

/*
공고 : announcement
id (PK, 공고 번호)
title (공고 제목) -> 제목
content (공고 내용) -> 상세 내용 
// create_time
// update_time
kind(게시판 종류) ->  인턴, 채용, 대외활동, 공모전, 동아리 
recruitment(모집 인원)
start_date(시작 기간) -> 접수기간/모집기간 
end_date(종료 기간)
period(활동 기간 (일 수)) -> 숫자만 
url(홈페이지) -> 웹사이트 주소 
 */

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div``;

const BtnContainer = styled.div`
  width: 570px;
  display: flex;
  margin-top: 40px;
  justify-content: flex-end;
`;

const KindContainer = styled.div`
  display: flex;
`;

const RecruitmentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 450px;
`;

const InputDiv = styled.div`
  display: flex;
  margin: 5px 0px 5px 0px;
  align-items: center;
`;

const RecruitmentDiv = styled.div``;

const WhatInput = styled.p`
  width: 130px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const StringInput = styled.input`
  width: 450px;
  font-size: 14px;
  height: 35px;
  padding-left: 13px;
  border-radius: 10px;
  border: 1px solid #343439;
`;

const ContentInput = styled.textarea`
  height: 200px;
  width: 450px;
  font-size: 14px;
  padding: 13px 13px 13px 13px;
  border-radius: 10px;
  border: 1px solid #343439;
`;

const KindInput = styled.input`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const NumberInput = styled.input`
  width: 450px;
  font-size: 14px;
  height: 35px;
  padding-left: 13px;
  border-radius: 10px;
  border: 1px solid #343439;
`;

const RecruitmentInput = styled(DatePicker)`
  display: flex;
  height: 35px;
  font-size: 14px;
  width: 200px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #343439;
`;

const FileUploadBtn = styled.button`
  width: 100px;
  height: 35px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  background-color: #f9e79f;
  cursor: pointer;
  :hover {
    background-color: #f7dc6f;
    transition-duration: 0.2s;
  }
`;

const KindName = styled.p`
  font-size: 14px;
  margin: 0px 22px 0px 5px;
  align-items: center;
  display: flex;
`;

const ImgName = styled.p`
  display: flex;
  font-size: 14px;
  margin-left: 10px;
`;

const SubmitBtn = styled.button`
  width: 150px;
  height: 35px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  background-color: #f4d03f;
  cursor: pointer;
  :hover {
    background-color: #f1c40f;
    transition-duration: 0.2s;
  }
`;

export default function WritingNotice() {
  const KindDiv = () => {
    const kindArr = ['인턴', '채용', '대외활동', '공모전', '동아리'];
    return (
      <>
        {kindArr.map((kind) => (
          <KindContainer key={kind}>
            <KindInput
              type="radio"
              name="kind"
              value={kind}
              onChange={onChangeInput}
              checked={input.kind === kind}
            />
            <KindName>{kind}</KindName>
          </KindContainer>
        ))}
      </>
    );
  };

  // const InputContents = ({ name, input }) => {
  //   return (
  //     <InputDiv>
  //       <WhatInput>{name}</WhatInput>
  //       {input}
  //     </InputDiv>
  //   );
  // };

  const [input, setInput] = useState({
    title: '',
    content: '',
    kind: '',
    recruitment: '',
    start_date: new Date(),
    end_date: new Date(),
    period: '',
    url: '',
    img: '',
  });

  const imgInput = useRef();

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onChangeImg = (e) => {
    setInput({ ...input, [e.target.name]: e.target.files });
    console.log(e.target.files);
  };

  const onClickImgUpload = () => {
    imgInput.current.click();
  };

  const onClickSubmit = () => {
    console.log(input);
  };

  return (
    <Layout>
      <InputContainer>
        <InputDiv>
          <WhatInput>제목</WhatInput>
          <StringInput
            name="title"
            onChange={onChangeInput}
            value={input.title}
          />
        </InputDiv>

        <InputDiv>
          <WhatInput>상세 내용</WhatInput>
          <ContentInput
            name="content"
            onChange={onChangeInput}
            value={input.content}
          />
        </InputDiv>

        <InputDiv>
          <WhatInput>게시판 종류</WhatInput>
          <KindDiv name="kind" onChange={onChangeInput} value={input.kind} />
        </InputDiv>

        <InputDiv>
          <WhatInput>모집 인원</WhatInput>
          <NumberInput
            name="recruitment"
            onChange={onChangeInput}
            value={input.recruitment}
            type="number"
            placeholder="EX) 15"
          />
        </InputDiv>

        <InputDiv>
          <WhatInput>접수 기간</WhatInput>
          <RecruitmentContainer>
            <RecruitmentDiv>
              <RecruitmentInput
                name="start_date"
                selected={input.start_date}
                dateFormat="yyyy/MM/dd"
                locale={ko}
                onChange={(e) => {
                  setInput({ ...input, start_date: e });
                }}
              />
            </RecruitmentDiv>
            <p style={{ fontSize: 20 }}>~</p>
            <RecruitmentDiv>
              <RecruitmentInput
                name="start_date"
                selected={input.end_date}
                dateFormat="yyyy/MM/dd"
                minDate={input.start_date}
                locale={ko}
                onChange={(e) => {
                  setInput({ ...input, end_date: e });
                }}
              />
            </RecruitmentDiv>
          </RecruitmentContainer>
        </InputDiv>

        <InputDiv>
          <WhatInput>활동 일 수</WhatInput>
          <NumberInput
            name="period"
            onChange={onChangeInput}
            value={input.period}
            type="number"
            placeholder="EX) 90"
          />
        </InputDiv>

        <InputDiv>
          <WhatInput>웹사이트 주소</WhatInput>
          <StringInput name="url" onChange={onChangeInput} value={input.url} />
        </InputDiv>

        <InputDiv>
          <WhatInput>이미지</WhatInput>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={imgInput}
            onChange={onChangeImg}
            name="img"
          />
          <FileUploadBtn onClick={onClickImgUpload}>파일 선택</FileUploadBtn>
          <ImgName>{input.img[0] ? input.img[0].name : ''}</ImgName>
        </InputDiv>

        {/* <InputContents
          name="제목"
          input={
            <StringInput
              name="title"
              onChange={onChangeInput}
              value={input.title}
            />
          }
        />
        <InputContents
          name="상세 내용"
          input={
            <ContentInput
              name="content"
              onChange={onChangeInput}
              value={input.content}
            />
          }
        />
        <InputContents
          name="게시판 종류"
          input={
            <KindDiv name="kind" onChange={onChangeInput} value={input.kind} />
          }
        />
        <InputContents
          name="모집 인원"
          input={
            <NumberInput
              name="recruitment"
              onChange={onChangeInput}
              value={input.recruitment}
            />
          }
        />
        <InputContents name="접수 기간" />
        <InputContents
          name="활동 기간"
          input={
            <NumberInput
              name="period"
              onChange={onChangeInput}
              value={input.period}
            />
          }
        />
        <InputContents
          name="웹사이트 주소 "
          input={
            <StringInput
              name="url"
              onChange={onChangeInput}
              value={input.url}
            />
          }
        /> */}
      </InputContainer>
      <BtnContainer>
        <SubmitBtn onClick={onClickSubmit}>확인</SubmitBtn>
      </BtnContainer>
    </Layout>
  );
}
