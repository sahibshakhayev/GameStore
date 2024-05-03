import { useEffect } from "react";
import { Card, List, Typography, Rate } from "antd";
import { useSelector, useDispatch } from "react-redux"
import { fetchGames } from "../redux/reducerGames"
import { LoadingOutlined } from '@ant-design/icons'

function Games() {
  let gamesArray = useSelector((state) => state.games.dataArray)
  let loading = useSelector((state) => state.games.isLoading)
  let error = useSelector((state) => state.games.error)

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGames())
  }, [])

  return (
    <>
    <Typography.Title style={{ marginTop: 65 }}>ALL GAMES</Typography.Title>
    <List
      grid={{ gutter: 16, column: 5 }}
      loading={{spinning: loading,
      indicator: <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/>}}
      pagination={{ position: 'bottom', align: 'center', defaultPageSize: 5, showSizeChanger: false}}
      dataSource={gamesArray}
      style={{ marginTop: 50 }}
      renderItem={(item) => (
      <List.Item>
        <Card className="game-card" hoverable style={{ width: 200, borderColor: "#202020" }} cover={<img src={"https://localhost:7017" + item.imageRelativePath}/>}>
          <Card.Meta title={item.name} description={
            <Typography.Paragraph style={{ marginBottom: 20 }} ellipsis={{ rows: 4, expandable: "collapsible"}}>{item.shortDescription}</Typography.Paragraph>}
          />
          <Rate disabled allowHalf defaultValue={item.usersScore} style={{ marginBottom: 15 }}/>
          <Typography.Paragraph style={{ color: "#999", fontSize: 12, textAlign: "end", marginBottom: -15, marginRight: -10 }}>{item.releaseDate}</Typography.Paragraph>
        </Card>
      </List.Item>)}>
    </List>
    </>
  )
}
  
export default Games