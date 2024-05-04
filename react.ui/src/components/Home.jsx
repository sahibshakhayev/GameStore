import { Card, List, Typography, Rate, Carousel } from "antd"
import { useGetBestratedGamesQuery } from "../redux/apiGames"
import { LoadingOutlined } from '@ant-design/icons'

function Home() {
  let { data: brGames, isLoading, isError } = useGetBestratedGamesQuery();

  return (
    <>
    <Typography.Title style={{ marginTop: 65 }}>BESTRATED GAMES</Typography.Title>
    <List
      grid={{ gutter: 16, column: 5 }}
      loading={{spinning: isLoading,
      indicator: <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/>}}
      pagination={{ hideOnSinglePage: true, position: 'bottom', align: 'center', pageSize: 5, showSizeChanger: false}}
      dataSource={brGames}
      style={{ marginTop: 50 }}
      renderItem={(item) => (
      <List.Item>
        <Card hoverable style={{ width: 200, borderColor: "#202020", backgroundColor: "#202020" }}
          cover={<img src={"https://localhost:7017" + item.imageRelativePath}/>}>
          <Card.Meta title={item.name} description={
            <Typography.Paragraph style={{ marginBottom: 20 }} ellipsis={{ rows: 4, expandable: "collapsible"}}>
              {item.shortDescription}
            </Typography.Paragraph>}
          />
          <Typography.Paragraph style={{
            color: "white", fontSize: 24, textAlign:
            "center", marginTop: 0, marginBottom: 15,
            textShadow: "#999955 0 0 25px" }}>
            {item.price + "$"}
          </Typography.Paragraph>
          <Rate disabled allowHalf defaultValue={item.usersScore} style={{ marginBottom: 15 }}/>
          <Typography.Paragraph style={{ color: "#999", fontSize: 12, textAlign: "end", marginBottom: -15, marginRight: -10 }}>
            {item.releaseDate.substr(0, 10)}
          </Typography.Paragraph>
        </Card>
      </List.Item>)}>
    </List>
    </>
  )
}
  
export default Home