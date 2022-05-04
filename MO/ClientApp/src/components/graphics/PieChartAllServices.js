import { makeStyles, Typography } from '@material-ui/core';
import React, { PureComponent, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#DC143C','#FF69B4','#4B0082','#BC8F8F','#7FFFD4'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    typograghy: {
        width: "100%",
        textAlign: "center",
        marginBottom: "20px",
        fontSize:"20px",
        fontWeight:"bold"
    }
}));

export const PieChartAllServices = () => {
    const classes = useStyles();
    const [stats, setStats] = React.useState([]);
    useEffect(() => {
        fetch(
            "https://localhost:5001/api/Service/servicestats",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "access-control-expose-headers": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
                credentials: "include",
            }
        ).then((res) => res.json())
            .then((res) => setStats(res))
    }, []);
    return (
        <div className={classes.conteiner}>
            <ResponsiveContainer width={500} height={500}>
                <PieChart width={200} height={200}>
                    <Pie
                        data={stats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={250}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {stats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>
            <Typography className={classes.typograghy}>Статистика по всем подключениям услуг</Typography>
        </div>
    );
}
