import { Avatar, Button } from '@mui/material'
import i18next from 'i18next';

export default  function LanguageButton() {
  const flags = {
    pt_br: 'src/assets/images/br-flag.png',
    en: 'src/assets/images/us-flag.png'
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