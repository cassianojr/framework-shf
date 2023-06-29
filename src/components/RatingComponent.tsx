import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import SnackBarComponent from './SnackBarComponent';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface RatingComponentProps {
  id: string
}

export default function RatingComponent(props: RatingComponentProps) {
  const { id } = props;
  const [value, setValue] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState(-1);

  const snackBarErrorText = "Ocorreu um erro ao salvar a avaliação. Por favor, tente novamente mais tarde.";
  const snackBarSuccessText = "Obrigado pela sua resposta! Aproveite para avaliar as outras atividades da gerência de requisitos.";

  const [snackBarErrorState, setSnackBarErrorState] = React.useState(false);
  const [snackBarSuccessState, setSnackBarSuccessState] = React.useState(false);



  // The rating will like this:
  // First look on localStorage if there is a rating for this id
  // If there is, set the value to that rating
  // If there isn't, set the value to null
  React.useEffect(() => {
    const getRating = () => {
      const rating = localStorage.getItem(id);
      if(rating){
        return setValue(JSON.parse(rating)?.value || null);
      }

      setValue(null);
    }
    getRating();
  }, [id, setValue]);

  function updateRating(rating: string, newValue: number | null) {
    const { docRef } = JSON.parse(rating);
    updateDoc(doc(db, "ratings", docRef), {
      rating: newValue
    }).then(() => {
      console.log("Document successfully updated!");
      setSnackBarSuccessState(true);
    }).catch((error) => {
      console.error("Error updating document: ", error);
      setSnackBarErrorState(true);
    });
    return;
  }

  function createRatingOnFirebase(newValue: number | null) {
    addDoc(collection(db, "ratings"), {
      name: id,
      rating: newValue
    }).then((docRef) => {
      localStorage.setItem(id, JSON.stringify({ value: newValue, docRef: docRef.id }));
      setSnackBarSuccessState(true);
      console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
      setSnackBarErrorState(true);
    });
  }

  const saveRating = (_: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
    const rating = localStorage.getItem(id);
    setValue(newValue);
    if (rating) {
      return updateRating(rating, newValue);
    }

    createRatingOnFirebase(newValue);
  }

  

  return (
    <>
      <SnackBarComponent snackBarState={snackBarErrorState} setSnackBarState={setSnackBarErrorState} text={snackBarErrorText} severity='error' />
      <SnackBarComponent snackBarState={snackBarSuccessState} setSnackBarState={setSnackBarSuccessState} text={snackBarSuccessText} severity='success' />
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Rating
          name={`rating-${id}`}
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={saveRating}
          onChangeActive={(_, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          id={`rating-${id}`}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
    </>
  );

}