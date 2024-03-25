import { useState, useContext } from "react";
import {
  Menu,
  ConfigProvider,
  message,
  Divider,
  Space,
  Button,
  Drawer,
  Form,
} from "antd";
import { HomeOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { AdContext } from "../context/AdContext";
import Search from "antd/es/input/Search";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const adv = useContext(AdContext);

  // states of Opening and Closing the Drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //states for Login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isRegisterForm, setIsRegisterForm] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
              console.log(res.data[0]);
              message.success("با موفقیت وارد شدید");
              setIsLoggedIn(true);
              adv.setUser(res.data[0]);
            } else {
              message.error("نام کاربری یا رمز عبور اشتباه است");
            }
          });
      } else if (values.email != undefined) {
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
      }
      handleRegister;
      setIsLoginModalOpen(false);
    });
  };

  const handleLoginCancel = () => {
    setIsLoginModalOpen(false);
    handleLoginState;
  };

  const onSearch = (value) => console.log(value);
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const handleUserPage = () => {
    navigate("/userPage");
  };

  return (
    <ConfigProvider direction="ltr">
      <Menu
        mode="horizontal"
        style={{
          justifyContent: "space-between",
          position: "relative",
          display: "flex",
          marginTop: "20px",
        }}
        id="#Navbar"
      >
        <Menu.Item
          key={"userAcc"}
          style={{ position: "absolute", top: 0, left: 0 }}
          className="responsivNav"
        >
          {!isLoggedIn ? (
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
            <UserOutlined
              style={{ fontSize: "23px", color: "#1B9C85" }}
              onClick={handleUserPage}
            />
          )}
        </Menu.Item>

        <Menu.Item key={"searchBar"} disabled>
          <Space>
            <Search
              dir="rtl"
              placeholder="نام خانه موردنظر را وارد کنید..."
              onSearch={onSearch}
              className={isFocused ? "searchBar-focused" : "searchBar"}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
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
