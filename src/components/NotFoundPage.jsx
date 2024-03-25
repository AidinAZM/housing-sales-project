import { Result } from "antd";
function NotFoundPage() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="متاسفانه صفحه موردنظر پیدا نشد :("
      />
    </div>
  );
}

export default NotFoundPage;
