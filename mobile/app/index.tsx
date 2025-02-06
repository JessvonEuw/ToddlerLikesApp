import { FlatList } from "react-native";
import ItemListItem from "../components/ItemListItem";
import items from "../assets/items.json";
import { Button, ButtonText } from "@/components/ui/button";

const HomeScreen = () => {
  return (
    <Button>
      <ButtonText>Click</ButtonText>
    </Button>
  );
  // return (
  //   <FlatList
  //     data={items}
  //     renderItem={({ item }) => <ItemListItem item={item} />}
  //   />
  // );
};

export default HomeScreen;
