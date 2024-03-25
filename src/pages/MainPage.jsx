import { Col, ConfigProvider, FloatButton, Row, Select } from "antd";
import ProductCard from "../components/ProductCard";
import { useContext, useEffect, useState } from "react";
import {
  FilterOutlined,
  MoonOutlined,
  PlusOutlined,
  SortAscendingOutlined,
  SunOutlined,
} from "@ant-design/icons";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AdContext } from "../context/AdContext";

export default function MainPage() {
  const navigate = useNavigate();
  const adv = useContext(AdContext);

  // data = an array state of all house objects that is shown in the MainPage.jsx
  const [data, setData] = useState([]);

  const [sortBy, setSortBy] = useState("");

  const [filterBy, setFilterBy] = useState("");

  useEffect(
    function () {
      if (setSortBy === "") {
        axios.get("http://localhost:3000/house").then((res) => {
          setData(res.data);
        });
      } else if (sortBy === "ascendingPrice") {
        axios.get("http://localhost:3000/house?_sort=price").then((res) => {
          setData(res.data);
        });
      } else if (sortBy === "descendingPrice") {
        axios
          .get("http://localhost:3000/house?_sort=price_order=desc")
          .then((res) => {
            setData(res.data);
          });
      } else if (sortBy === "ascendingMeterage") {
        axios
          .get("http://localhost:3000/house?_sort=houseMeterage")
          .then((res) => {
            setData(res.data);
          });
      } else if (sortBy === "descendingMeterage") {
        axios
          .get("http://localhost:3000/house?_sort=houseMeterage_order=desc")
          .then((res) => {
            setData(res.data);
          });
      }
    },
    [sortBy]
  );

  const handleSort = (value) => {
    setSortBy(value);
  };

  useEffect(
    function () {
      if (filterBy != "") {
        axios
          .get(`http://localhost:3000/house?city=${filterBy}`)
          .then((response) => {
            setData(response.data);
          });
      } else if (filterBy === "") {
        axios.get("http://localhost:3000/house").then((response) => {
          setData(response.data);
        });
      }
    },
    [filterBy]
  );

  const handleCityFilter = (selectedCity) => {
    setFilterBy(selectedCity);
  };

  useEffect(
    function () {
      let body = document.getElementById("#body");
      let nav = document.getElementById("#Navbar");
      if (adv.getDarkMode()) {
        body.style.backgroundColor = "#f8f6f4";
        nav.style.backgroundColor = "#f8f6f4";
      } else if (!adv.getDarkMode()) {
        body.style.backgroundColor = "white";
        nav.style.backgroundColor = "white";
      }
    },
    [adv]
  );

  const handleDarkMode = () => {
    adv.changeDarkMode();
  };
  return (
    <>
      <Nav />
      <div className="container">
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <div>
            <SortAscendingOutlined
              style={{ fontSize: "23px", marginRight: "7px" }}
            />
            <Select
              defaultValue={""}
              onChange={handleSort}
              style={{ textAlign: "right", width: 180, marginTop: "12px" }}
              options={[
                {
                  value: "",
                  label: (
                    <span style={{ color: "gray" }}>
                      تغییر ترتیب خانه ها ...
                    </span>
                  ),
                },
                {
                  value: "ascendingMeterage",
                  label: " بالاترین متراژ",
                },
                {
                  value: "descendingMeterage",
                  label: " کمترین متراژ",
                },
                {
                  value: "ascendingPrice",
                  label: "ارزان ترین",
                },
                {
                  value: "descendingPrice",
                  label: "گران ترین",
                },
              ]}
            />
          </div>
          <div>
            <Select
              defaultValue={""}
              onChange={handleCityFilter}
              style={{ textAlign: "right", width: 180, marginTop: "12px" }}
              options={[
                {
                  value: "",
                  label: (
                    <span style={{ color: "gray" }}>فیلتر بر اساس شهر ...</span>
                  ),
                },
                {
                  value: "Tehran",
                  label: "تهران",
                },
                {
                  value: "Fuman",
                  label: "فومن",
                },
                {
                  value: "Shiraz",
                  label: "شیراز",
                },
                {
                  value: "Rasht",
                  label: "رشت",
                },
                {
                  value: "Mashhad",
                  label: "مشهد",
                },
                {
                  value: "Isfahan",
                  label: "اصفهان",
                },
              ]}
            />
            <FilterOutlined style={{ fontSize: "20px", marginLeft: "5px" }} />
          </div>
        </div>

        <Row justify={"center"} className="mt-4">
          {data.map((house) => {
            return (
              <Col
                xs={8}
                sm={6}
                md={6}
                lg={6}
                xl={4}
                className="mx-5 mt-3"
                style={{ display: "flex", justifyContent: "center" }}
                key={house.id}
              >
                <ProductCard key={house.id} data={house} />
              </Col>
            );
          })}
        </Row>
      </div>
      <ConfigProvider direction="ltr">
        <FloatButton
          icon={<PlusOutlined style={{ color: "#C4DFDF" }} />}
          description="ثبت آگهی جدید"
          shape="square"
          type="default"
          style={{ height: "40px", width: "100px", backgroundColor: "#C4DFDF" }}
          onClick={() => navigate("/createNewAd")}
        />
      </ConfigProvider>
      <FloatButton
        icon={
          adv.getDarkMode() ? (
            <SunOutlined style={{ fontSize: "17px" }} />
          ) : (
            <MoonOutlined style={{ fontSize: "17px" }} />
          )
        }
        style={{ backgroundColor: "#C4DFDF" }}
        onClick={handleDarkMode}
      />
    </>
  );
}
