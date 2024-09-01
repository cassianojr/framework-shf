import React, { useEffect } from "react";
import { Modal } from "../Modal";
import { Button, TextField } from "@mui/material";
import { FrameworkItem } from "../../types/Framework.type";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import RandomStringDetector, { SupportedLanguages } from "../../util/RandomStringDetector/RandromStringDetector";

interface SurveyCommentModalProps {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>,
  modalState: boolean,
  items: React.MutableRefObject<FrameworkItem[]>,
  changeItems: (value: FrameworkItem[]) => void,
  commentModalItem: FrameworkItem | undefined,
  commentModalError: boolean,
  setCommentModalError: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SurveyCommentModal({ setModalState, modalState, items, changeItems, commentModalItem, commentModalError, setCommentModalError }: SurveyCommentModalProps) {
  const [comment, setComment] = React.useState('');

  const { t } = useTranslation(['ecos_survey', 'common']);

  useEffect(() => {
    setComment(items.current.find((item) => item.ids[i18next.language] === commentModalItem?.ids[i18next.language])?.comment ?? '');
  }, [items, commentModalItem, setComment])

  if (!commentModalItem) return null;

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const randomStringLanguage = (i18next.language === 'en' ? 'ENGLISH' : 'PORTUGUESE') as SupportedLanguages;
    const randomStringDetector = new RandomStringDetector(randomStringLanguage);

    if (randomStringDetector.isRandomText(comment)) {
      
      setCommentModalError(true);
      return;
    }


    const item = items.current.find((i) => i.ids[i18next.language] === commentModalItem?.ids[i18next.language]);

    if (!item) return;

    const newItem = { ...item, comment: comment };
    const newItems = items.current.map((item) => item.ids[i18next.language] === commentModalItem?.ids[i18next.language] ? newItem : item);

    changeItems(newItems);
    setComment('');

    setModalState(false);
  }


  return (
    <Modal.Root state={modalState} handleClose={() => setModalState(false)} title={`${t('feedback.title')} ${commentModalItem?.names[i18next.language]}`} id={`comment-modal-${commentModalItem?.id}`}>
      <Modal.Text>
        <form onSubmit={handleSave}>
          <TextField
            id="filled-multiline-static"
            label={t('feedback.textarea_label')}
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            variant="outlined"
            sx={{ width: '100%' }}
            error={commentModalError}
            helperText={commentModalError ? t('invalid_comment') : ''}
          />
          <Button type='submit' variant="contained" color="primary" sx={{ width: '100%', mt: 2 }}>{t('common:save_btn')}</Button>
        </form>
      </Modal.Text>
      <Modal.Actions handleClose={() => {
        if(commentModalError) setComment('');
        setCommentModalError(false);
        setModalState(false)
      }}
       />
    </Modal.Root>
  )
}