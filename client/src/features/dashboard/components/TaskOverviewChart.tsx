import { Card, CardContent, Typography } from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const data = [
  { name: 'Mon', todo: 12, inProgress: 8, done: 15 },
  { name: 'Tue', todo: 10, inProgress: 12, done: 18 },
  { name: 'Wed', todo: 8, inProgress: 14, done: 20 },
  { name: 'Thu', todo: 6, inProgress: 10, done: 22 },
  { name: 'Fri', todo: 5, inProgress: 8, done: 25 },
]

export const TaskOverviewChart = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Task Overview
      </Typography>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="todo" fill="#94A3B8" name="To Do" radius={[4, 4, 0, 0]} />
          <Bar dataKey="inProgress" fill="#0EA5E9" name="In Progress" radius={[4, 4, 0, 0]} />
          <Bar dataKey="done" fill="#10B981" name="Done" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)
