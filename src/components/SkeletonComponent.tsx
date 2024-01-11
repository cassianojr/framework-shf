import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonComponent() {
  return (
    <Box>
      <Skeleton />
      <Skeleton animation="wave" variant='rectangular' height={120} />
      <Skeleton />
    </Box>
  );
}