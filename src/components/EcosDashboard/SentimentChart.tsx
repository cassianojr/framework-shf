import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { FrameworkItem } from '../../types/Framework.type';

interface SentiMentChartProps{
  frameworkItem: FrameworkItem,

}
export default function SentimentChart({ frameworkItem }: SentiMentChartProps) {

  const data = [
    { name: 'Positivo', value: (frameworkItem.answer) ? frameworkItem.answer.positiveSentiment : 0 },
    { name: 'Neutro', value: (frameworkItem.answer) ? frameworkItem.answer.neutralSentiment : 0 },
    { name: 'Negativo', value: (frameworkItem.answer) ? frameworkItem.answer.negativeSentiment : 0 },
  ];
  const COLORS = ['#388e3c', '#d1bc69', '#e53935'];


  return (
    <Box width={450}>
      <PieChart width={450} height={300}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={80}
          outerRadius={110}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          cy={200}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Typography variant="h6" align="center">Análise de sentimento do feedback</Typography>
    </Box>
  )
}

