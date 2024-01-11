import { Avatar, Button } from '@mui/material'
import i18next from 'i18next';

import br_flag from '../assets/images/br-flag.png';
import us_flag from '../assets/images/us-flag.png';


export default function LanguageButton() {
  const flags = {
    pt_br: br_flag,
    en: us_flag
  }

  return (
    <Button sx={{ color: '#fff' }} onClick={() => i18next.changeLanguage(i18next.language == 'pt_br' ? 'en' : 'pt_br')}>
      <Avatar
        alt="Language image"
        src={i18next.language == 'pt_br' ? flags.pt_br : flags.en}
      />
    </Button>
  )
}