import { Carousel, Image, Descriptions, Divider } from "antd";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function HousePage() {
  // state of tracking if the "ارتباط با مالک" Button is clicked or not

  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [currentAd, setCurrentAd] = useState({});
  const [markerPos, setMarkerPos] = useState({
    lat: 35.7219,
    lng: 51.3347,
  });

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  let param = useParams();
  useEffect(
    function () {
      axios.get(`http://localhost:3000/house?id=${param.id}`).then((res) => {
        setCurrentAd(res.data[0]);
        setMarkerPos({
          lat: res.data[0].locationLat,
          lng: res.data[0].locationLng,
        });
      });
    },
    [param.id]
  );

  // console.log("Current loc", markerPos);

  return (
    <>
      <Nav />

      <Carousel afterChange={onChange} style={{ marginTop: "20px" }}>
        <div>
          <Image src={currentAd.imageAddress} height={250} width={1250} />
        </div>
        <div>
          <Image src={currentAd.imageAddress2} height={250} width={1250} />
        </div>
        <div>
          <Image src={currentAd.imageAddress3} height={250} width={1250} />
        </div>
        <div>
          <Image src={currentAd.imageAddress4} height={250} width={1250} />
        </div>
      </Carousel>
      <Descriptions
        title={<span style={{ fontSize: "18px" }}>اطلاعات ملک</span>}
        style={{ marginTop: "30px" }}
        bordered
      >
        <Descriptions.Item label="شهر">{currentAd.city}</Descriptions.Item>
        <Descriptions.Item label="محله">
          {currentAd.neighbourhood}
        </Descriptions.Item>
        <Descriptions.Item label="قیمت">
          {currentAd.price + "T"}
        </Descriptions.Item>
        <Descriptions.Item label="متراژ">
          {currentAd.houseMeterage}
        </Descriptions.Item>
        <Descriptions.Item label="اتاق خواب">
          {currentAd.bedroomsNum}
        </Descriptions.Item>
        <Descriptions.Item label="پارکینگ">
          {currentAd.hasParkingSpot ? "دارد" : "ندارد"}
        </Descriptions.Item>
        <Descriptions.Item label="انباری">
          {currentAd.hasWarehouse ? "دارد" : "ندارد"}
        </Descriptions.Item>
        <Descriptions.Item label="طبقه">{currentAd.floorNum}</Descriptions.Item>
        <Descriptions.Item label="سال ساخت">
          {currentAd.buildYear}
        </Descriptions.Item>
        <Descriptions.Item label="آدرس">{currentAd.Address}</Descriptions.Item>
      </Descriptions>

      <MapContainer
        center={[markerPos.lat, markerPos.lng]}
        zoom={11}
        style={{ marginTop: "30px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[markerPos.lat, markerPos.lng]}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        />
      </MapContainer>
      <Divider />
      <div style={{ margin: "30px" }}>
        {isBtnClicked ? (
          <div>
            <h4>{currentAd.ownerName}</h4>
            <h4>{currentAd.ownerTel}</h4>
            <h4>{currentAd.ownerMail}</h4>
          </div>
        ) : (
          <button
            className="btn btn-outline-success"
            onClick={() => setIsBtnClicked(true)}
          >
            ارتباط با صاحب ملک
          </button>
        )}
      </div>
    </>
  );
}
