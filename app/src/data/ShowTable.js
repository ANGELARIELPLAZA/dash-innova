import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export const ShowTable = ({ data }) => {
  return (
    <div>
      <LineChart width={1300} height={400} data={data}>
        <XAxis dataKey="hora" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="volt" stroke="rgba(75, 192, 192, 1)" fill="rgba(75, 192, 192, 0.2)" />
        <Line type="monotone" dataKey="amper" stroke="rgba(192, 75, 192, 1)" fill="rgba(192, 75, 192, 0.2)" />
        <Line type="monotone" dataKey="caudal" stroke="rgba(90, 102, 182, 1)" fill="rgba(90, 102, 182, 0.2)" />
      </LineChart>
    </div>
  );
};
