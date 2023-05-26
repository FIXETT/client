import React, { useEffect } from 'react';
import styled from 'styled-components';
import { propsType } from '../fix/Fix';
import { useRecoilState } from 'recoil';
import { useFixState, usePagination } from '../../recoil/fix';
import markerimg from '../../assets/icon/marker.svg';
import previcon from '../../assets/icon/prev.png';
import nexticon from '../../assets/icon/next.png';
import lasticon from '../../assets/icon/last.png';
interface placeType {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
  totalCount: number;
}

//------------------자기 위치 찾기 ----------------
const getCurrentLocation = async () => {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        const locPosition = new kakao.maps.LatLng(lat, lon);
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
  const [count, setCount] = useRecoilState(useFixState);
  const [page, setPage] = useRecoilState(usePagination);

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
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
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
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      const iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
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
      const options = {
        location: currentLocation,
        radius: 10000,
        size: 5,
        sort: kakao.maps.services.SortBy.DISTANCE,
      };
      const keyword = props.searchKeyword;
      ps.keywordSearch(keyword, placesSearchCB, options);
    };

    const placesSearchCB = (data: any, status: any, pagination: any) => {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출
        displayPlaces(data);
        //페이지네이션 전체 갯수 저장
        setCount(pagination?.totalCount);
        //페이지네이션 arg 저장
        setPage([pagination.current, pagination.last]);
        //페이지 번호를 표출
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('주변 5km 내에 매장이 없습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
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

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
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
      // document.getElementById('btn')?.addEventListener('click', space);
      // function space() {
      //   window.location.href = `${places.place_url}`;
      // }
      const el = document.createElement('li');
      const itemStr = `
      
          <div style=
          "padding:16px 20px;
          border: 1px solid #DDDDDD;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 16px; 
          margin-top:12px;
          margin-left:-10%;
          width: 100%;
          padding:20px, 16px, 20px, 16px;
          max-width: 624px;
          min-width:624px;
          height:106px;
          display:flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

         
          " class="info">
<div style="display:flex;align-items:center">
          <div style="width:40px;
            height:40px;
           
            border:1px solid #066AFF;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius: 12px;
            font-family: Pretendard;
font-size: 18px;
font-weight: 500;
color:#066AFF;




            ">${index}</div>
            
            <div style="display:flex;
            flex-direction:column;
            margin-left:16px;">
            
           
              <h5 style="font-size:16px; font-weight:700;color:#333333;" class="info-item place-name">${
                places.place_name
              }</h5>
              ${
                places.road_address_name
                  ? `<span style="font-size:14px;margin-top:12px;font-weight:500;color:#999999;" class="info-item road-address-name">
                    ${places.road_address_name}
                   </span>
                  `
                  : `<span style="font-size:14px;margin-top:12px;font-weight:500;color:#999999;" class="info-item address-name">
             	     ${places.address_name}
                  </span>`
              }
             
              <span style="font-size:14px;margin-top:8px;color:#999999;" class="info-item tel">
                ${places.phone}
              </span>
            </a>
            </div>
            </div>
            
            <div style="display:flex;flex-direction:column;align-items:end;gap:10px;">
            
            
            
            
            
            </div>
          </div>
          `;

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMarker(position: any, idx: number, title: undefined) {
      const imageSrc = 'https://ifh.cc/g/3JZ376.png', // 마커 이미지 url, 스프라이트 이미지
        imageSize = new kakao.maps.Size(32, 45), // 마커 이미지의 크기
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
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    //검색 결과 목록 하단에 페이지 번호 표시 함수
    function displayPagination(pagination: {
      last: number;
      totalCount: number;
      current: number;
      gotoPage: (arg0: number) => void;
    }) {
      const paginationEl = document.getElementById('pagination') as HTMLElement;
      const fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지번호를 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.lastChild && paginationEl.removeChild(paginationEl.lastChild);
      }

      //이전 페이지 가는 함수
      const prevEl = document.createElement('img') as HTMLImageElement;
      // prevEl.href = '#';

      prevEl.src = previcon;
      prevEl.style.cursor = 'pointer';
      prevEl.onclick = function () {
        if (pagination.current > 1) {
          pagination.gotoPage(pagination.current - 1);
        }
        return false;
      };
      fragment.appendChild(prevEl);
      paginationEl.appendChild(fragment);
      // 페이지 번호 생성
      // for (i = 1; i <= pagination.last; i++) {
      //   const el = document.createElement('a') as HTMLAnchorElement;
      //   el.href = '#';
      //   el.innerHTML = i.toString();

      //   if (i === pagination.current) {
      //     el.className = 'on';
      //   } else {
      //     el.onclick = (function (i) {
      //       return function () {
      //         pagination.gotoPage(i);
      //       };
      //     })(i);
      //   }

      //   fragment.appendChild(el);
      // }

      //현재페이지 / 마지막페이지 나타내는 함수
      const pageStatusEl = document.createElement('a') as HTMLAnchorElement;
      pageStatusEl.style.display = 'flex';
      pageStatusEl.style.flexDirection = 'row';
      pageStatusEl.innerHTML = `<div style="height: 38px;
      display:flex;
      justify-content:center;
      width: 38px;
      border-radius: 8px;
      padding: 12px;
      background:#F4F4F4;
      color:#999999;
      ">${pagination.current}</div>  <div style="height: 38px;
      width: 38px;
      border-radius: 8px;
      padding: 12px;
      color:#CCCCCC;
      ">${pagination.last}</div>`;
      paginationEl.appendChild(pageStatusEl);
      //다음페이지 가는 함수
      const nextEl = document.createElement('img') as HTMLImageElement;
      nextEl.src = nexticon;
      nextEl.style.cursor = 'pointer';
      nextEl.onclick = function () {
        if (pagination.current < pagination.last) {
          pagination.gotoPage(pagination.current + 1);
        }
        return false;
      };
      fragment.appendChild(nextEl);

      paginationEl.appendChild(fragment);

      //마지막 페이지 가는 함수
      const lastEl = document.createElement('img') as HTMLImageElement;
      lastEl.src = lasticon;
      lastEl.style.cursor = 'pointer';
      lastEl.onclick = function () {
        if (pagination.current < pagination.last) {
          pagination.gotoPage(pagination.last);
        }
        return false;
      };
      fragment.appendChild(lastEl);

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
  return (
    <Mapcontainer className="map-container">
      <ResultList>
        {/* <span>컴퓨터수리노트북수리</span>
        <span>서울 강남구 테헤란로 20길 18 6층</span>
        <span>02-6953-8153</span> */}

        <div id="search-result">
          <p className="result-text">{/* <span className="result-keyword">{props.searchKeyword}</span> */}</p>
          <div className="scroll-wrapper">
            <PlaceList id="places-list" />
          </div>

          <Pagenation id="pagination" />
        </div>
      </ResultList>
      <MapDiv>
        <div
          id="map"
          className="map"
          style={{
            width: '1012px',
            height: '562px',
            borderRadius: '10px',
          }}
        />
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
  margin-top: 10px;
`;
const ResultList = styled.div``;

const PlaceList = styled.ul`
  height: 562px;
  width: 624px;

  border-radius: 0px;

  border-radius: 0px;

  background-color: #ffffff;
`;

//Item Box

const MapDiv = styled.div`
  border-radius: 10px;
`;
const Pagenation = styled.div`
  display: flex;

  align-items: center;
  margin: 24px 0 0 32px;
`;
