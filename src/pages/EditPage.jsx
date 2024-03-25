import { Button, ConfigProvider, Divider, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { useContext, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { AdContext } from "../context/AdContext";
import { useNavigate } from "react-router-dom";

// This page is Almost like the CreateCardPage.jsx but instead of POST we use PUT because of updating the form
function EditPage() {
  const adv = useContext(AdContext);

  const [markerPos, setMarkerPos] = useState({
    lat: adv.getAds()[0].locationLat,
    lng: adv.getAds()[0].locationLng,
  });

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("Current User:", adv.getUser());
    axios
      .put(`http://localhost:3000/house/${adv.getAds()[0].id}`, {
        id: adv.getAds()[0].id,
        houseName: `House ${adv.getAds()[0].id}`,
        price: values.price,
        imageAddress: "/outHouse1.jpg",
        imageAddress2: "/inHouse1.jpg",
        imageAddress3: "/inHouse2.jpg",
        imageAddress4: "/outHouse2.jpg",
        city: values.city,
        neighbourhood: values.neighbourhood,
        houseMeterage: values.meterage,
        bedroomsNum: values.bedrooms,
        hasParkingSpot: values.parkingSpot,
        hasWarehouse: values.wareHouse,
        floorNum: values.floor,
        buildYear: values.buildYear,
        Address: values.address,
        ownerName: values.ownername,
        ownerTel: values.ownerNumber,
        ownerMail: values.email,
        locationLat: markerPos.lat,
        locationLng: markerPos.lng,
      })
      .then((response) => {
        console.log("Response of PUT Request", response);
      });
    navigate("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Divider>
          <h3 style={{ padding: "20px" }}>Edit Ad Form</h3>
        </Divider>
        <Form
          name="basic"
          dir="rtl"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="نام صاحب ملک"
            name="ownername"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].ownerName} />
          </Form.Item>

          <Form.Item
            label="ایمیل"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].ownerMail} />
          </Form.Item>
          <Form.Item
            label="تلفن همراه"
            name="ownerNumber"
            initialValue="09123456789"
            rules={[
              {
                required: true,
                message: "Please input your Number!",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].ownerTel} />
          </Form.Item>
          <Form.Item
            label="شهر"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].city} />
          </Form.Item>
          <Form.Item
            label="محله"
            name="neighbourhood"
            rules={[
              {
                required: true,
                message: "Please input your محله!",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].neighbourhood} />
          </Form.Item>
          <Form.Item
            label="قیمت"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your Price Number!",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].price} />
          </Form.Item>
          <Form.Item
            label="متراژ خانه"
            name="meterage"
            rules={[
              {
                required: true,
                message: "Please input your Meterage Number!",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].houseMeterage} />
          </Form.Item>
          <Form.Item
            label="تعداد اتاق خواب"
            name="bedrooms"
            rules={[
              {
                required: true,
                message: "Please input your bedrooms Number!",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].bedroomsNum} />
          </Form.Item>
          <Form.Item
            label="پارکینگ"
            name="parkingSpot"
            rules={[
              {
                required: true,
                message: "Please input your parkingSpot!",
              },
            ]}
          >
            <Select defaultValue={adv.getAds()[0].hasParkingSpot}>
              <Option value="true">دارد</Option>
              <Option value="false">ندارد</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="انباری"
            name="wareHouse"
            rules={[
              {
                required: true,
                message: "Please input your wareHouse!",
              },
            ]}
          >
            <Select defaultValue={adv.getAds()[0].hasWarehouse}>
              <Option value="true">دارد</Option>
              <Option value="false">ندارد</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Floor"
            name="floor"
            rules={[
              {
                required: true,
                message: "Please input your floor Number!",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].floorNum} />
          </Form.Item>
          <Form.Item
            label="سال ساخت"
            name="BuildYear"
            rules={[
              {
                required: true,
                message: "Please input your BuidYear !",
              },
            ]}
          >
            <Input placeholder={adv.getAds()[0].buildYear} />
          </Form.Item>
          <Form.Item
            label="آدرس"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your bedrooms Number!",
              },
            ]}
          >
            <TextArea placeholder={adv.getAds()[0].Address} />
          </Form.Item>
          <Form.Item>
            <MapContainer
              center={[
                adv.getAds()[0].locationLat,
                adv.getAds()[0].locationLng,
              ]}
              zoom={13}
              style={{ right: 50, width: "500px" }}
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
                draggable
                autoPan
                eventHandlers={{
                  moveend: (e) => {
                    setMarkerPos({
                      lat: e.target.getLatLng().lat,
                      lng: e.target.getLatLng().lng,
                    });
                  },
                }}
              />
            </MapContainer>
            <p>lat: {markerPos.lat}</p>
            <p>lng: {markerPos.lng}</p>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default EditPage;
