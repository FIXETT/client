import React, { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { propsType } from '../Fix';

interface placeType {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
}
//KaKao API 불러오기
const { kakao } = window as any;
const KaKao = ({ searchKeyword }: propsType) => {
  // 지도를 표시할 div
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState<any[]>([]);
  const [map, setMap] = useState<any>();

  const container = document.getElementById('myMap');
  const option = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
  };

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev: any) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev: any) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev: any) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
    // -----------키워드로 장소 검색 --------------
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data: any, status: any, _pagination: any) => {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          //@ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        map.setBounds(bounds);
      }
      console.log(data, status, _pagination);
    });
  }, [searchKeyword]);
  console.log(markers);
  console.log(searchKeyword);
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: '400px',
        height: '500px',
      }}
      level={3} // 지도의 확대 레벨
      onCreate={setMap}
    >
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />

      {!state.isLoading &&
        markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
          </MapMarker>
        ))}
    </Map>
  );
};

export default KaKao;
