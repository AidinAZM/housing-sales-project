import { useState, useContext, useEffect } from "react";
import {
  Menu,
  ConfigProvider,
  message,
  Divider,
  Space,
  Button,
  Drawer,
  Form,
  Avatar,
  AutoComplete,
  Dropdown,
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { AdContext } from "../context/AdContext";
import Search from "antd/es/input/Search";
import LoginForm from "./LoginForm";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const adv = useContext(AdContext);

  // states of Opening and Closing the Drawer
  const [open, setOpen] = useState(false);
  //states for Login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleRegister = () => {
    setIsRegisterForm(true);
  };
  const handleLoginState = () => {
    setIsRegisterForm(false);
  };
  const handleLoginModal = () => {
    setIsLoginModalOpen(true);
    setOpen(false);
  };

  const [form] = Form.useForm();

  // first validate the data and then decide if its Login or SignUp based of the value of Email field
  const handleLoginOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      console.log("Received values of form: ", values);
      if (values.email == undefined) {
        axios
          .get(
            `http://localhost:3000/users?username=${values.username}&password=${values.password}`
          )
          .then((res) => {
            console.log(res);
            if (
              res.data[0]?.username == values.username &&
              res.data[0]?.password == values.password
            ) {
              message.success("با موفقیت وارد شدید");
              adv.setUser(res.data[0]);
              setIsUserLoggedIn(true);
              window.localStorage.setItem(
                "userLoggedIn",
                JSON.stringify(res.data[0])
              );
            } else {
              message.error("نام کاربری یا رمز عبور اشتباه است");
            }
          });
      } else if (values.email != undefined) {
        if (values.passwordCheck == values.password) {
          axios
            .post("http://localhost:3000/users", {
              username: values.username,
              password: values.password,
              email: values.email,
            })
            .then((res) => {
              console.log(res);
            });
          message.success("ثبت نام با موفقیت انجام شد");
        } else if (values.passwordCheck != values.password) {
          message.error("رمز عبور به درستی تکرار نشده است");
        }
      }
      handleRegister;
      setIsLoginModalOpen(false);
    });
  };

  const handleLoginCancel = () => {
    setIsLoginModalOpen(false);
    handleLoginState;
  };

  const navigate = useNavigate();

  let allSearchOptionsArr = [];
  adv.getData().map((ad) => {
    allSearchOptionsArr.push({
      value: ad.id,
      label: ad.houseName,
    });
  });

  const handleSearchChange = (data) => {
    if (data != "") {
      setFilteredOptions(
        allSearchOptionsArr.filter((opt) => opt.label == data)
      );
    }
  };

  const handleSearchSelect = (adIndex) => {
    navigate(`/house/${adIndex}`);
  };

  useEffect(function () {
    if (
      window.localStorage.getItem("userLoggedIn") &&
      isUserLoggedIn == false
    ) {
      setIsUserLoggedIn(true);
      let user = JSON.parse(window.localStorage.getItem("userLoggedIn"));
      adv.setUser(user);
    }
  }, []);

  const handleLogOutBtnClick = () => {
    adv.setUser(null);
    setIsUserLoggedIn(false);
    message.success("با موفقیت از حساب کاربری خود خارج شدید");
    window.localStorage.clear();
  };

  const items = [
    {
      key: "1",
      label: <Link to={"/userPage"}>آگهی های من</Link>,
    },

    {
      key: "2",
      danger: true,
      label: (
        <Link to={"/"} onClick={handleLogOutBtnClick}>
          خروج از حساب کاربری <LogoutOutlined />
        </Link>
      ),
    },
  ];

  return (
    <ConfigProvider direction="ltr">
      <Menu
        mode="horizontal"
        style={{
          justifyContent: "space-between",
          position: "relative",
          display: "flex",
          marginTop: "20px",
          minWidth: "400px",
        }}
        id="#Navbar"
      >
        <Menu.Item
          key={"userAcc"}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {!isUserLoggedIn ? (
            <>
              <UserOutlined
                style={{ fontSize: "23px" }}
                onClick={handleLoginModal}
              />
              {/* Login Modal */}
              {isLoginModalOpen && (
                <LoginForm
                  isLoginModalOpen={isLoginModalOpen}
                  handleLoginOk={handleLoginOk}
                  handleLoginCancel={handleLoginCancel}
                  isRegisterForm={isRegisterForm}
                  handleRegister={handleRegister}
                  handleLoginState={handleLoginState}
                  form={form}
                />
              )}
            </>
          ) : (
            <ConfigProvider direction="rtl">
              <Dropdown menu={{ items }} placement="bottom">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={
                    <UserOutlined
                      style={{
                        fontSize: "23px",
                      }}
                    />
                  }
                />
              </Dropdown>
            </ConfigProvider>
          )}
        </Menu.Item>

        <Menu.Item key={"searchBar"} disabled>
          <Space>
            <AutoComplete
              options={filteredOptions}
              onSelect={handleSearchSelect}
              onChange={handleSearchChange}
            >
              <Search
                dir="rtl"
                placeholder="نام خانه موردنظر را وارد کنید..."
                onSearch={handleSearchChange}
                className={isFocused ? "searchBar-focused" : "searchBar"}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </AutoComplete>
          </Space>
        </Menu.Item>
        <Menu.Item
          key={"hamburger"}
          disabled
          className="hamburgerIcon"
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <Button type="text" onClick={showDrawer} className="hamburgerMenu">
            <MenuOutlined style={{ fontSize: "17px" }} />
          </Button>
          <Drawer
            placement="right"
            onClose={onClose}
            open={open}
            width={"200px"}
          >
            <Button type="text" block>
              <a href="/">
                <HomeOutlined style={{ fontSize: "20px" }} /> صفحه اصلی
              </a>
            </Button>

            <Divider />
            <Button type="text" block onClick={handleLoginModal}>
              <UserOutlined style={{ fontSize: "20px" }} />
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                ورود به حساب کاربری
              </span>
            </Button>
          </Drawer>
        </Menu.Item>
        <Menu.Item key={"brand"}>
          <a href="/" style={{ fontSize: "20px" }} className="responsiveNav">
            {" "}
            سامانه آگهی مسکن{" "}
          </a>
        </Menu.Item>
      </Menu>
    </ConfigProvider>
  );
}
