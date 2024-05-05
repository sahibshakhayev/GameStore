import { Card, List, Typography, Rate, Input, Flex, Select } from "antd"
import { LoadingOutlined } from '@ant-design/icons'
import { useGetAllGamesQuery, useGetByGenreGamesQuery } from "../redux/apiGames"
import { useGetAllGenresQuery } from "../redux/apiGenres"
import { useState, useEffect } from "react"

const { Search } = Input;

function Catalog() {
  let [ genreId, setGenreId] = useState(null);

  let [ params, setParams ] = useState({ pageIndex: 1, pageSize: 5, search: "" });
  let { data: allGames, isFetching } = (genreId == null)? useGetAllGamesQuery(params) : useGetByGenreGamesQuery(genreId);
  let { data: allGenres} = useGetAllGenresQuery();

  let [ pageI, setPageIndex ] = useState(params.pageIndex);
  let [ pageS, setPageSize ] = useState(params.pageSize);
  let [ searcH, setSearch ] = useState(params.search);

  useEffect(() => {
    setParams({ pageIndex: pageI, pageSize: pageS, search: searcH });
    console.log(searcH);
    console.log(params.search);
  }, [pageI, searcH])

  return (
    <>
    <Flex justify='space-between' style={{ marginTop: 65 }}>
      <Typography.Title>ALL GAMES</Typography.Title>
      <Flex>
        <Search onSearch={(value, ev, info) => {(info.source == "input")? setSearch(value) : 0}}
          placeholder="Search" allowClear className="catalog-search" style={{ width: 200, marginTop: 7 }}/>
        <Select
          showSearch
          onSelect={(value, option) => { setGenreId(option.key); }}
          style={{ width: 150, margin: "7px 0 0 15px" }}
          placeholder="Genre"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={isFetching? [] : allGenres.map((item) => ({ label: item.name, value: item.name, key: item.id }))}
        />
      </Flex>
    </Flex>
    {isFetching? <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/> : <List
      grid={{ gutter: 16, column: 5 }}
      loading={{ spinning: isFetching,
      indicator: <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/>}}
      pagination={(allGames.items == undefined)?
        { hideOnSinglePage: true, position: 'bottom', align: 'center',
        pageSize: params.pageSize, showSizeChanger: false }
        :
        { onChange: ((page) => { setPageIndex(page); }), hideOnSinglePage: true,
        position: 'bottom', align: 'center', pageSize: params.pageSize,
        total: params.pageSize * allGames.totalPages,
        showSizeChanger: false }}
      dataSource={(allGames.items == undefined)? allGames : allGames.items}
      style={{ marginTop: 50 }}
      renderItem={(item) => (
      <List.Item>
        <Card hoverable style={{ width: 200, borderColor: "#202020", backgroundColor: "#202020" }}
          cover={<img src={"https://localhost:7017" + item.imageRelativePath}/>}>
          <Card.Meta title={item.name} description={
            <Typography.Paragraph style={{ marginBottom: 15 }} ellipsis={{ rows: 4, expandable: "collapsible"}}>
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
    </List>}
    </>    
  )
}
  
export default Catalog