import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyLineChart = ({ data }) => {
  const chartData = data.map((item) => ({
    month: `${item._id.month}/${item._id.year}`,
    count: item.count,
  }));

  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h3 className="font-semibold mb-2">Monthly Records</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line dataKey="count" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyLineChart;
