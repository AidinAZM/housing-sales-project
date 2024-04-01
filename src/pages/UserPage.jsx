import axios from "axios";
import { useContext, useEffect } from "react";
import { AdContext } from "../context/AdContext";
import { Button, Descriptions, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const adv = useContext(AdContext);

  useEffect(function () {
    axios
      .get(`http://localhost:3000/house?ownerName=${adv.getUser().username}`)
      .then((res) => {
        adv.setUserAds(res.data);
      });
  }, []);

  const columns = [
    {
      title: "خانه",
      dataIndex: "houseName",
      key: "houseName",
    },
    {
      title: "شهر",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "قیمت",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const data = [];
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/editAd");
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/house/${id}`).then((res) => {
      console.log("Response of Advertisement Delete:", res);
      message.success("آگهی با موفقیت حذف شد");
    });
    navigate("/");
  };

  adv.getUserAds().map((ad) => {
    data.push({
      key: ad.houseName,
      houseName: ad.houseName,
      city: ad.city,
      price: ad.price,
      actions: (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <EditOutlined style={{ fontSize: "17px" }} onClick={handleEdit} />
          <DeleteOutlined
            style={{ fontSize: "17px" }}
            onClick={() => handleDelete(ad.id)}
          />
        </div>
      ),
    });
  });

  return (
    <div>
      <Descriptions
        title={<span style={{ fontSize: "25px" }}>User Info</span>}
        style={{ marginTop: "20px" }}
        bordered
      >
        <Descriptions.Item label="نام">
          {adv.getUser().username}
        </Descriptions.Item>
        <Descriptions.Item label="رمز عبور">
          {adv.getUser().password}
        </Descriptions.Item>
        <Descriptions.Item label="ایمیل">
          {adv.getUser().email}
        </Descriptions.Item>
      </Descriptions>
      <h5 style={{ marginTop: "20px", padding: "15px" }}>User Ads</h5>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default UserPage;
