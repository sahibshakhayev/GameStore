import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import applicationStore from './redux/store.js'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      token: {
        colorText: "white"
      },
      components: {
        Input: {
          colorText: "#202020",
          fontSize: "20px",
          hoverBorderColor: "#5bae71",
          activeBorderColor: "#5bae71",
          colorPrimary: "#2f9dbe",
          colorPrimaryBorder: "#2f9dbe",
          colorPrimaryHover: "#2f9dbe",
          colorPrimaryActive: "#2f9dbe"
        },
        InputNumber: {
          colorText: "#202020",
          fontSize: "20px",
          hoverBorderColor: "#5bae71",
          activeBorderColor: "#5bae71",
          colorPrimary: "#2f9dbe",
          colorPrimaryBorder: "#2f9dbe",
          colorPrimaryHover: "#2f9dbe",
          colorPrimaryActive: "#2f9dbe"
        },
        Pagination: {
          itemBg: "#202020",
          itemActiveBg: "#202020",
          colorPrimary: "white",
          colorPrimaryHover: "#2f9dbe",
          lineWidth: "0"
        },
        Card: {
          colorText: "white",
          colorTextDescription: "white"
        },
        Select: {
          colorBgContainer: "#202020",
          colorBgElevated: "#202020",
          optionActiveBg: "#333",
          optionSelectedBg: "#444",
          optionSelectedFontWeight: 500,
          fontSize: "20px",
          colorTextPlaceholder: "#999",
          colorBorder: "#202020",
          colorPrimary: "#2f9dbe",
          colorPrimaryBorder: "#2f9dbe",
          colorPrimaryHover: "#2f9dbe",
          colorPrimaryActive: "#2f9dbe"
        },
        Button: {
          colorPrimary: "linear-gradient(90deg, #507a5b 0%, #113a46 100%)",
          colorPrimaryHover: "linear-gradient(90deg, #678c6f 0%, #234c58 100%)",
          colorPrimaryActive: "linear-gradient(90deg, #407a4b 0%, #004a76 100%)",
          primaryColor: "#ddffff"
        },
        Rate: {
          starBg: "#111",
          starSize: 30
        },
        Divider: {
          colorSplit: "#888"
        },
        Empty: {
          colorTextDescription: "#FAFAFA"
        }
      }
    }}>
      <BrowserRouter>
        <Provider store={applicationStore}>
          <App/>
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
