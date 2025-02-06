import { FlatList } from "react-native";
import ItemListItem from "../components/ItemListItem";
import items from "../assets/items.json";

const HomeScreen = () => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <ItemListItem item={item} />}
    />
  );
};

export default HomeScreen;
