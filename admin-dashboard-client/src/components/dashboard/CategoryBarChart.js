import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CategoryBarChart = ({ data }) => {
  const chartData = data.map((item) => ({
    category: item._id,
    count: item.count,
  }));

  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h3 className="font-semibold mb-2">Records by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBarChart;
