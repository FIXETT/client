import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { propsType } from '../Fix';
import { useRecoilState } from 'recoil';
import { useFixState } from '../../recoil/fix';

interface placeType {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
}

//------------------자기 위치 찾기 ----------------
const getCurrentLocation = async () => {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon);
        res(locPosition);
      });
      // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      rej(new Error('현재 위치를 불러 올 수 없습니다.'));
    }
  });
};

//KaKao API 불러오기
const { kakao } = window as any;
const KaKao = (props: propsType) => {
  // 지도를 표시할 div
  let markers: any[] = [];
  useEffect(() => {
    //지도 생성

    const container = document.getElementById('map');
    const option = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 1,
    };
    //지도 생성
    const map = new kakao.maps.Map(container, option);
    const markerPosition = new kakao.maps.LatLng(37.566826, 126.9786567);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    //장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();

    // 검색 결과 목록 마커 클릭 때 장소명 표출할 인포 윈도우
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    //

    //지도에 마커와 인포윈도우를 표시하는 함수
    function displayMarker(locPosition: any, message: any) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
    // -----------키워드로 장소 검색 --------------
    if (!map) return;

    //장소 검색 객체를 통해 키워드로 장소 검색을 요청
    const searchPlaces = async () => {
      const currentLocation = await getCurrentLocation();
      let options = {
        location: currentLocation,
        radius: 10000,
        size: 6,
        sort: kakao.maps.services.SortBy.DISTANCE,
      };
      let keyword = props.searchKeyword;
      ps.keywordSearch(keyword, placesSearchCB, options);
    };

    const placesSearchCB = (data: any, status: any, pagination: any) => {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출
        displayPlaces(data);
        //페이지 번호를 표출
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('주변 5km 내에 매장이 없습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
      console.log(data, status, pagination);
    };
    // 검색 결과 목록과 마커를 표출하는 함수
    const displayPlaces = (places: string | any[]) => {
      const listEl = document.getElementById('places-list'),
        resultEl = document.getElementById('search-result'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds();

      //검색 결과 목록에 추가된 항목들 제거
      listEl && removeAllChildNods(listEl);
      //지도에 표시되고 있는 마커를 제거
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i, undefined),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시
        // mouseout 했을 때는 인포윈도우를 닫기
        (function (marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }
      //검색결과 항목들을 겸색결과 목록 element  추가
      listEl && listEl.appendChild(fragment);
      if (resultEl) {
        resultEl.scrollTop = 0;
      }
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      map.setBounds(bounds);
    };

    // 검색결과 항목을 Element로 반환하는 함수
    function getListItem(index: number, places: placeType) {
      const el = document.createElement('li');
      let itemStr = `
          <div style="padding:5px;z-index:1;border: 1px solid #E4CCFF;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 3px; margin-top:20px;" class="info">
           
            <a href="${places.place_url}" target="_blank">
              <h5 class="info-item place-name">${places.place_name}</h5>
              ${
                places.road_address_name
                  ? `<span class="info-item road-address-name">
                    ${places.road_address_name}
                   </span>
                  `
                  : `<span class="info-item address-name">
             	     ${places.address_name}
                  </span>`
              }
              <br>
              <span class="info-item tel">
                ${places.phone}
              </span>
            </a>
          </div>
          `;

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMarker(position: any, idx: number, title: undefined) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출
      markers.push(marker); // 배열에 생성된 마커를 추가

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    //검색 결과 목록 하단에 페이지 번호 표시 함수
    function displayPagination(pagination: { last: number; current: number; gotoPage: (arg0: number) => void }) {
      const paginationEl = document.getElementById('pagination') as HTMLElement;
      let fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지번호를 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.lastChild && paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a') as HTMLAnchorElement;
        el.href = '#';
        el.innerHTML = i.toString();

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }
    //검색 결과 목록 또는 마커 클릭 했을때 호출되는 함수
    //인포 윈도우에 장소명 표시
    function displayInfowindow(marker: any, title: string) {
      const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }
    //검색결과 목록의 자식 element 제거 함수
    function removeAllChildNods(el: HTMLElement) {
      while (el.hasChildNodes()) {
        el.lastChild && el.removeChild(el.lastChild);
      }
    }
    searchPlaces();
  }, [props.searchKeyword]);
  console.log(markers);
  console.log(props.searchKeyword);
  return (
    <Mapcontainer className="mapgfvjjg-container">
      <ResultList>
        {/* <span>컴퓨터수리노트북수리</span>
        <span>서울 강남구 테헤란로 20길 18 6층</span>
        <span>02-6953-8153</span> */}
        <div id="search-result">
          <p className="result-text">{/* <span className="result-keyword">{props.searchKeyword}</span> */}</p>
          <div className="scroll-wrapper">
            <PlaceList id="places-list"></PlaceList>
          </div>
          <div id="pagination"></div>
        </div>
      </ResultList>
      <MapDiv>
        <div
          id="map"
          className="map"
          style={{
            width: '400px',
            height: '500px',
          }}
        ></div>
      </MapDiv>
    </Mapcontainer>
  );
};

export default KaKao;
const Mapcontainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 59px;
  width: 1029px;
  height: 514px;
`;
const ResultList = styled.div``;

const PlaceList = styled.ul`
  width: 610px;
  height: 70px;

  background-color: #ffffff;
`;

//Item Box
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 610px;
  height: 70px;

  border-radius: 3px;
  border: #e4ccff;
`;
const MapDiv = styled.div`
  margin-left: 20px;
`;
