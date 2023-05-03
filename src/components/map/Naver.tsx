import axios from 'axios';
import React, { useEffect } from 'react';

const Naver = () => {
  const keyword = '수리업체';
  const clientId = 'kzcqg6r65o';
  const clientSecret = 'rPTpNSG0n9ZhEIGxBQ2dIEe1iNqhQ3f6x3jEdAM6';

  const url = `https://openapi.naver.com/v1/search/local.json?query=${keyword}&display=10`;

  fetch(url, {
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  return <div>네이버</div>;
};

export default Naver;
