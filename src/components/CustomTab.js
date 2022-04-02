import { Tab } from "@chakra-ui/react";

function CustomTab({ title }) {
  return (
    <Tab
      fontSize="18px"
      _selected={{
        color: "white",
        fontWeight: "700",
        borderBottom: "1.5px solid white",
      }}
      _focus={{ outline: "none" }}
      mr="44px"
      padding={0}
    >
      {title}
    </Tab>
  );
}

export default CustomTab;
