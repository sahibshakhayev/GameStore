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
          colorText: "black",
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
