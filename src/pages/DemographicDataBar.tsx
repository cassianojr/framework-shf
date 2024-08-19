import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts'

interface GraphicProps {
  title: string,
  data: GraphicData[]
}

interface GraphicData {
  name: string,
  value: string,
  color: string
}



export default function DemographicDataBar({ data, title }: GraphicProps) {
  return (
    <>
      <BarChart
        width={450}
        height={350}
        margin={{
          top: 10,
          right: 50,
          left: 0,
          bottom: 5,
        }}
        data={data}

      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='name' tick={false} label={title} />
        <YAxis />
        <Tooltip formatter={(value)=>{
          return `${value}%`
        }} />
        <Bar
          dataKey={'value'}
          name={'Respostas'}
        >
          {
            data.map((item, index) => (
              <Cell key={`bar-rect-${index}`} fill={item.color} />
            ))
          }
        </Bar>

      </BarChart>
    </>
  );
}
