import { Layout, Menu } from "antd";
import { employeeService } from "services";

const { Header, Content } = Layout;
const { SubMenu } = Menu;

const Base = ({ children }) => {
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#fff",
        }}
      >
        <Menu>
          <SubMenu style={{ float: "right" }} title={<span>Action</span>}>
            <Menu.Item key="logout" onClick={employeeService.logout}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default Base;
