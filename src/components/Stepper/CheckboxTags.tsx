import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { QuestionListItems } from '../../types/Question.type';
import i18next from 'i18next';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CheckboxTagsData {
  itemName: string,
  itemId: string,
  options: QuestionListItems[],
}

export default function CheckboxesTags({ itemName, itemId, options }: CheckboxTagsData) {

  return (
    <Autocomplete
      multiple
      id={itemId}
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.names[i18next.language]}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.names[i18next.language]}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={itemName} placeholder={itemName} />
      )}
    />
  );
}