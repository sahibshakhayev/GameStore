import { Link } from "react-router-dom"
import { Flex, Typography } from 'antd'
import mainLogo from '/mainLogo.svg'
import cartIcon from '/cartIcon.svg'
import cartIconHover from '/cartIconHover.svg'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, logout, } from "../redux/accountSlice"
import { useGetUserClaimsQuery } from "../redux/apiAccount"
import { LoadingOutlined } from '@ant-design/icons'

function Header() {
  const [ isHovered, setIsHovered ] = useState(false);
  const { userInfo, accessToken } = useSelector((state) => state.account);  
  let { data, isFetching } = useGetUserClaimsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    //accessToken? dispatch() : 0;
  }, [accessToken, dispatch]);

  return (
    <header>
      <Flex justify='space-between'>
        <Link to='/'><Flex gap='40px'>
          <img alt="logo" src={mainLogo} className="main-logo"/>
          <Typography.Title>Game Store</Typography.Title>
        </Flex></Link>
        <Flex gap='20px' className="nav-flex">
          <Flex gap='10px' style={{ marginTop: -9, backgroundColor: "#333", height: "min-content", padding: 10, borderRadius: 10 }}>
            {isFetching? <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/> : (userInfo?
              <>
                <Typography.Text style={{ fontSize: 18, color: "#DFDFDF" }}>Welcome!</Typography.Text>
                <Link to='/' onClick={() => dispatch(logout())}><Typography.Text className='nav-text profile'>Logout</Typography.Text></Link>
              </>
              :
              <>
                <Link to='/register'><Typography.Text className='nav-text profile'>Sign up!</Typography.Text></Link>
                <Typography.Text style={{ fontSize: 18, color: "#DFDFDF" }}>Already have an account?</Typography.Text>
                <Link to='/login'><Typography.Text className='nav-text profile'>Login</Typography.Text></Link>
              </>)
            }
          </Flex>
          <Link to='/catalog'><Typography.Text className='nav-text'>Catalog</Typography.Text></Link>
          <Link to='/cart'><Flex gap='5px' onMouseEnter={() => { setIsHovered(true); }} onMouseLeave={() => { setIsHovered(false); }}>
            <img alt="cart" src={isHovered ? cartIconHover : cartIcon} className="cart-icon"/><Typography.Text className='nav-text' style={{color: (isHovered ? '#2f9dbe' : 'white')}}>Cart</Typography.Text>
          </Flex></Link>
          <Link to='/admin'><Typography.Text className='nav-text'>Admin</Typography.Text></Link>
        </Flex>
      </Flex>
    </header>
  )
}
  
export default Header