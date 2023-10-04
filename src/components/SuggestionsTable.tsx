import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import {Suggestion} from '../types/Suggestion.type';
import { FirebaseService } from '../services/FirebaseService';
import { useTranslation } from 'react-i18next';

export default function SuggestionTable() {

  const {t} = useTranslation('view_feedback');

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    FirebaseService.getSuggestions((suggestions: Suggestion[]) => setSuggestions(suggestions));
  }, [setSuggestions])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>{t('framework_suggestions_table.type')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>{t('framework_suggestions_table.title')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>{t('framework_suggestions_table.description')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suggestions.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell >{row.title}</TableCell>
              <TableCell >{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}