import { useGetByIdGamesQuery } from "../redux/apiGames"
import { useParams } from "react-router-dom";
import { Image, Flex, Typography, Rate, Divider, Space, Button } from "antd"
import { LoadingOutlined } from '@ant-design/icons'
import { format } from "date-fns"

function Game() {
  let { gameId } = useParams();
  let { data, isFetching } = useGetByIdGamesQuery(gameId);
  
  return (
    <Flex style={{ marginTop: 50, padding: "0 50px" }}>
      {isFetching? <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/> :
      <Flex justify="center" style={{ width: "100%", backgroundColor: "#202020" }} gap="large" vertical>
        <Flex>
          <Flex style={{ width: "70%"}}>
            <Image
              width="100%"
              src={"https://localhost:7017" + data.coverImageRelativePath}
            />
          </Flex>
          <Flex style={{ width: "30%", padding: "40px 15px 0" }} vertical>
            <Typography.Title style={{ fontWeight: "bold" }}>{data.name}</Typography.Title>
            <Typography.Paragraph style={{ fontSize: 16, color: "#fff" }}>{data.shortDescription}</Typography.Paragraph>
            <Divider style={{ margin: "5px 0 15px" }}/>
            <Flex justify="center" className="developers">
              <Typography.Text style={{ fontSize: 16, color: "#BBB", paddingRight: 10 }}>Developers: </Typography.Text>
              <Space split={<Divider type="vertical"/>}>
                {data.developers.map((item) =>
                  <Typography.Text key={item.id} style={{ fontSize: 16, color: "#DFDFDF" }}>{item.name}</Typography.Text>
                )}
              </Space>
            </Flex>
            <Flex justify="center" className="publishers">
              <Typography.Text style={{ fontSize: 16, color: "#BBB", paddingRight: 10 }}>Publishers: </Typography.Text>
              <Space split={<Divider type="vertical"/>}>
                {data.publishers.map((item) =>
                  <Typography.Text key={item.id} style={{ fontSize: 16, color: "#DFDFDF" }}>{item.name}</Typography.Text>
                )}
              </Space>
            </Flex>
            <Rate allowHalf style={{ padding: "20px 0" }} defaultValue={data.usersScore}/>
            <Flex justify="center" className="platforms">
              <Typography.Text style={{ fontSize: 16, color: "#BBB", paddingRight: 10 }}>Platforms: </Typography.Text>
              <Space split={<Divider type="vertical"/>}>
                {data.platforms.map((item) =>
                  <Typography.Text key={item.id} style={{ fontSize: 16, color: "#DFDFDF" }}>{item.name}</Typography.Text>
                )}
              </Space>
            </Flex>
            <Flex justify="center" gap="small" className="release-date">
              <Typography.Text style={{ fontSize: 16, color: "#BBB" }}>Release date: </Typography.Text>
              <Typography.Text style={{ fontSize: 16, color: "#DFDFDF" }}>
                {format(data.releaseDate, "PPP")}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Flex vertical style={{ padding: "0 60px", width: "70%" }}>
            <Flex justify="flex-end" gap={100}>
              <Typography.Text style={{ fontSize: 50, textShadow: "#999955 0 0 25px" }}>
                {data.price + "$"}
              </Typography.Text>
              <Button type="primary" style={{ height: "100%", width: "min-content", fontSize: 40, padding: "0 60px" }}>To Cart</Button>
            </Flex>
            <Typography.Text style={{ fontSize: 27, fontWeight: 500, textAlign: "start", margin: "10px 0 0" }}>Description:</Typography.Text>
            <Typography.Text style={{ fontSize: 20, textAlign: "justify"}}>{data.description}</Typography.Text>
          </Flex>
          <Flex vertical style={{ width: "30%" }}>
            <Flex justify="center" className="genres">
              <Typography.Text style={{ fontSize: 20, color: "#BBB", paddingRight: 10}}>Genres: </Typography.Text>
              <Space split={<Divider type="vertical"/>}>
                {data.genres.map((item) =>
                  <Typography.Text key={item.id} style={{ fontSize: 20, color: "#DFDFDF" }}>{item.name}</Typography.Text>
                )}
              </Space>
            </Flex>
          </Flex>
        </Flex>
      </Flex>}
    </Flex>
  )
}

export default Game