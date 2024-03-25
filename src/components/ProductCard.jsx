import { Card, Image } from "antd";
import { useContext, useEffect, useState } from "react";
import { AdContext } from "../context/AdContext";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const adv = useContext(AdContext);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/house/${props.data.id}`);
  };

  const [bgColor, setBgColor] = useState("white");

  useEffect(
    function () {
      if (!adv.getDarkMode()) {
        setBgColor("#F8F6F4");
      } else {
        setBgColor("#D2E9E9");
      }
    },
    [adv]
  );

  return (
    <Card
      hoverable
      bordered={false}
      style={{
        width: 200,
        display: "flex",
        backgroundColor: bgColor,
      }}
      onClick={handleCardClick}
    >
      <Image
        width={150}
        height={110}
        src={props.data.imageAddress}
        className="img-fluid rounded"
      />
      {/* <img
        src={props.data.productImageAddress}
        alt={props.data.productName}
        className="img-fluid rounded"
      /> */}
      <h5 style={{ marginTop: "8px" }}>{props.data.houseName}</h5>
      <p> Price: {`${props.data.price}T`}</p>
      <p style={{ color: "blue" }}>{props.data.city}</p>
    </Card>
  );
}
export default ProductCard;
