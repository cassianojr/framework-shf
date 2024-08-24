import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts'

interface GraphicProps {
  title: string,
  data: GraphicData[]
}

interface GraphicData {
  name: string,
  value: string,
  color: string,
  rawValue: number
}


export default function DemographicDataBar({ data, title }: GraphicProps) {

  interface CustomLabelProps {
    x: number,
    y: number,
    width: number,
    index: number
  }
  const customLabel = (props: CustomLabelProps) => {
    const { x, y, width, index } = props;
    const rawValue = data[index].rawValue;
    
    return (
      <text x={x + width / 2} y={y}  textAnchor="middle" dy={-6}>
        {`${rawValue !== 0 ? rawValue : ''}`}
      </text>
    );
  };


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
        <Tooltip formatter={(value, _, item)=>{
          return [`${value}%`, item.payload.name]
        }}
        labelFormatter={()=>title}
        />
        <Bar
          dataKey={'value'}
          label={customLabel}
          
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
