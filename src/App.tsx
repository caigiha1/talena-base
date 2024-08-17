import { useLoadingContext } from "./context/LoadingContext";
import AppRouter from "./routes/AppRouter";
import "./styles/global.scss";
import { Spin } from "antd";

function App() {
  const { loading } = useLoadingContext();

  return (
    <>
      <AppRouter />
      <Spin size="large" spinning={loading} fullscreen></Spin>
    </>
  );
}

export default App;
