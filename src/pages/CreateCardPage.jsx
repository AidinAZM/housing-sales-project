import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Select,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { useContext, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useNavigate } from "react-router-dom";
import { AdContext } from "../context/AdContext";
const randNum = Math.floor(Math.random() * 1000);

// Initialize the Position State of the Marker
function CreateCardPage() {
  const adv = useContext(AdContext);
  const [markerPos, setMarkerPos] = useState({
    lat: 35.7219,
    lng: 51.3347,
  });

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    axios
      .post("http://localhost:3000/house", {
        id: `${randNum}`,
        houseName: `House ${randNum}`,
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
        console.log("Response of POST Request", response);
        message.success("آگهی با موفقیت ثبت شد");
      });
    navigate("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("ثبت آگهی با مشکل روبرو شد");
  };

  return (
    <div>
      <ConfigProvider direction="rtl">
        <Divider>
          <h3 style={{ padding: "20px" }}>فرم ثبت آگهی</h3>
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
            margin: "0 auto",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="نام صاحب ملک"
            name="ownername"
            initialValue={adv.getUser().username}
          >
            <Input disabled />
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
            <Input />
          </Form.Item>
          <Form.Item
            label="تلفن همراه"
            name="ownerNumber"
            rules={[
              {
                required: true,
                message: "Please input your Number!",
              },
            ]}
          >
            <Input placeholder="09123456789" />
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
            <Input />
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
            <Input />
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
            <Input type="number" />
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
            <Input type="number" />
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
            <Input type="number" />
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
            <Select>
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
            <Select>
              <Option value="true">دارد</Option>
              <Option value="false">ندارد</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="طبقه"
            name="floor"
            rules={[
              {
                required: true,
                message: "Please input your floor Number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="سال ساخت"
            name="buildYear"
            rules={[
              {
                required: true,
                message: "Please input your BuidYear !",
              },
            ]}
          >
            <Input />
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
            <TextArea />
          </Form.Item>
          <Form.Item>
            <MapContainer
              center={[35.7219, 51.3347]}
              zoom={13}
              style={{ right: 100, width: "500px" }}
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
              ثبت آگهی
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default CreateCardPage;
