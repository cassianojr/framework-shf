import { List, ListItem, ListItemIcon, ListItemText, Switch, Tooltip } from "@mui/material";
import { FrameworkItem } from "../../types/Framework.type";
import i18next from "i18next";
import { InfoRounded } from "@mui/icons-material";

interface ListComponentProps {
  items: FrameworkItem[],
  setItems: React.Dispatch<React.SetStateAction<FrameworkItem[]>>
}

export default function FrameworkItemListSelect(props: ListComponentProps) {

  const handleItemChange = (item: FrameworkItem) => {
    const newItems = [...props.items];
    const itemIndex = newItems.findIndex((i) => i.id === item.id);
    newItems[itemIndex].selected = !newItems[itemIndex].selected;

    props.setItems(newItems);
  }

  return (
    <List dense>
      {props.items.map((item) => {
        return (
          <ListItem key={item.id} divider>
            <ListItemIcon>
              <Tooltip arrow title={<p style={{ fontSize: '1rem' }}>{item.descriptions[i18next.language]}</p>} >
                <InfoRounded sx={{ color: 'primary.main', cursor: 'pointer' }} fontSize="small" />
              </Tooltip>
            </ListItemIcon>
            <ListItemText id={`text-${item.id}`}>{item.names[i18next.language]}</ListItemText>
            <Switch
              edge="end"
              checked={item.selected ?? false}
              onChange={() => handleItemChange(item)}
              id={`switch-${item.id}`}
              inputProps={{ 'aria-labelledby': `text-${item.id}` }}
            />
          </ListItem>
        )
      })}
    </List>
  );
}
