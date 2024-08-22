import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { FrameworkItem } from '../../types/Framework.type';
import { useTranslation } from 'react-i18next';
import HelpIcon from '@mui/icons-material/Help';
import { Tooltip as TooltipMui } from '@mui/material';

interface SentiMentChartProps {
  frameworkItem: FrameworkItem,

}
export default function SentimentChart({ frameworkItem }: SentiMentChartProps) {

  const { t } = useTranslation('ecos_dashboard');


  const data = [
    { name: t('positive'), value: (frameworkItem.optionalAnswer) ? frameworkItem.optionalAnswer.positiveSentiment : (frameworkItem.answer) ? frameworkItem.answer.positiveSentiment : 0 },
    { name: t('neutral'), value: (frameworkItem.optionalAnswer) ? frameworkItem.optionalAnswer.neutralSentiment : (frameworkItem.answer) ? frameworkItem.answer.neutralSentiment : 0 },
    { name: t('negative'), value: (frameworkItem.optionalAnswer) ? frameworkItem.optionalAnswer.negativeSentiment : (frameworkItem.answer) ? frameworkItem.answer.negativeSentiment : 0 },
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
          label={({ name, percent, value }) => {
            if (value === 0) return null;
            return `${name} ${(percent * 100).toFixed(1)}%`
          }}
          labelLine={({ value, stroke, points }) => (value != 0 ? <path stroke={stroke} d={`M${points[0].x},${points[0].y}L${points[1].x},${points[1].y}`} className="customized-label-line" /> : <polyline stroke={stroke} fill="none" />)
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Box display="flex" justifyContent="center">
        <Typography variant="h6" align="center">{t('feedback_sentiment_analysis')}</Typography>
        <TooltipMui title={t('feedback_sentiment_analysis_tooltip')} arrow>
          <HelpIcon color='warning' />
        </TooltipMui>
      </Box>
    </Box>
  )
}

