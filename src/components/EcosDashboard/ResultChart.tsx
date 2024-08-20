import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { FrameworkItem } from '../../types/Framework.type'
import { useTranslation } from 'react-i18next';

interface ResultChartProps {
  frameworkItem: FrameworkItem,
}
export default function ResultChart({ frameworkItem }: ResultChartProps) {

  const {t} = useTranslation('ecos_dashboard');

  const agree = (frameworkItem.optionalAnswer) ? frameworkItem.optionalAnswer.agree ?? 0 : frameworkItem.answer?.agree ?? 0;
  const disagree = (frameworkItem.optionalAnswer) ? frameworkItem.optionalAnswer.disagree ?? 0 : frameworkItem.answer?.disagree ?? 0;
  
  const data = [
    {
      name: t('percent_of_concordance'),
      concordo: (agree/(agree+disagree)*100).toFixed(1),
      discordo: (disagree/(agree+disagree)*100).toFixed(1)
    }
  ]
  

  return (
    <>
      <BarChart
        width={450}
        height={350}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="concordo" fill="green" name={t('agree')} />
        <Bar dataKey="discordo" fill="#f02213" name={t('disagree')}/>
      </BarChart>
    </>
  )
}

