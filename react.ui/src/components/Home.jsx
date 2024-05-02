import { useEffect, useState } from "react";
import { Card, List, Space, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux"
import { fetchGamesBs } from "../redux/reducerGamesBestsellers"
import { LoadingOutlined } from '@ant-design/icons'
import { InternalBreadcrumbItem } from "antd/es/breadcrumb/BreadcrumbItem";

function Home() {
  let bestsellersArray = useSelector((state) => state.games.dataArray)
  let loading = useSelector((state) => state.games.isLoading)
  let error = useSelector((state) => state.games.error)

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGamesBs())
  }, [])

  return (
    <List
      grid={{ gutter: 16, column: 5 }}
      loading={{spinning: loading,
      indicator: <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/>}}
      pagination={{ position: 'bottom', align: 'center', defaultPageSize: 5, showSizeChanger: false}}
      dataSource={bestsellersArray}
      style={ { marginTop: "50px" } }
      renderItem={(item) => (
      <List.Item>
        <Card className="game-card" hoverable style={{ width: 200, borderColor: "#202020" }} cover={<img src={"https://localhost:7017" + item.coverImageRelativePath}/>}>
          <Card.Meta title={item.name} description={
            <Typography.Paragraph ellipsis={{ rows: 4, expandable: "collapsible"}}>{item.shortDescription}</Typography.Paragraph>}
            style={{ marginBottom: 10 }} />
          <Typography.Paragraph style={{ color: "#999", fontSize: 12, textAlign: "end", marginBottom: -15, marginRight: -10 }}>{item.releaseDate}</Typography.Paragraph>
        </Card>
      </List.Item>)}>
    </List>
  )
}
  
export default Home