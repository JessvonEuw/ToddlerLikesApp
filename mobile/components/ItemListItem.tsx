import { Text } from "react-native";

interface Item {
  name: string;
  description: string;
  createdBy: string;
  familyName: string;
  tags: string[];
}

const ItemListItem = ({ item }: { item: Item }) => {
  return <Text style={{ fontSize: 30 }}>{item.name}</Text>;
};

export default ItemListItem;
