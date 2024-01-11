import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { QuestionListItems } from '../../types/Question.type';
import i18next from 'i18next';
import { useTranslation } from "react-i18next";
import { CorrelateValues } from './CorrelateComponent';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CheckboxTagsData {
  itemName: string,
  itemId: string,
  options: QuestionListItems[],
  values: CorrelateValues[],
  setValues: (value: CorrelateValues[]) => void
}

export default function CheckboxesTags({ itemName, itemId, options, values, setValues }: CheckboxTagsData) {

  const { t } = useTranslation('ecos_survey');

  const handleChange = (event: React.SyntheticEvent, newValue: QuestionListItems[]) => {

    const newValues = values.filter((value) => value.correlateWith.id != itemId);

    newValues.push({ correlateWith: values.filter((value) => value.correlateWith.id == itemId)[0].correlateWith, itemsToCorrelate: newValue });
    setValues(newValues);

  }

  return (
    <Autocomplete
      multiple
      id={itemId}
      options={options}
      disableCloseOnSelect
      value={(values.length == 0) ? [] : values.filter((value) => value.correlateWith.id === itemId)[0]?.itemsToCorrelate ?? []}
      onChange={handleChange}
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
        <TextField {...params} label={`${itemName}  ${t('checkbox_tags_text')}`} placeholder={`${itemName}  ${t('checkbox_tags_text')}`} />
      )}
    />
  );
}