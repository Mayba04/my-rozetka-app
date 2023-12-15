import { useState, useEffect } from "react";
import axios from "axios";

interface ICategoryItem {
  Id: number;
  name: string;
}

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([]);

  const mapData = list.map((item) => {
    return <li key={item.Id}>{item.name}</li>;
  });

  useEffect(() => {
    axios
      .get<ICategoryItem[]>("http://rozetka.com/api/categories")
      .then((resp) => {
        //console.log("Resp data", resp.data);
        setList(resp.data);
      });
  }, []);

  return (
    <>
        <h1>Hello</h1>
      <ul>{mapData}</ul>
    </>
  );
};
export default HomePage;
