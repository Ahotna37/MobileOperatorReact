import React, { useEffect, useState, PureComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Service } from "../API/methods";
import { Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { PieChartAllTariffs } from "./graphics/PieChartAllTariffs";
import { PieChartTariffsNow } from "./graphics/PieChartTariffsNow";
import { PieChartAllServices } from "./graphics/PieChartAllServices";

/**
 * страница услуг
 */
/**
 * стили страницы
 */



const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    tariff: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    stats: {
        height: "100%",
    },
    tariffMedia: {},
    cardContent: {
        flexGrow: 1,
    },
    graphics: {
        display: "flex",
        justifyContent: "center",
        flexWrap:"wrap",
        gap: 20,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));
export default function Stats({ setTitle }) {


    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const data02 = [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 300 },
        { name: 'B1', value: 100 },
        { name: 'B2', value: 80 },
        { name: 'B3', value: 40 },
        { name: 'B4', value: 30 },
        { name: 'B5', value: 50 },
        { name: 'C1', value: 100 },
        { name: 'C2', value: 200 },
        { name: 'D1', value: 150 },
        { name: 'D2', value: 50 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
    const classes = useStyles();
    /**
     * феч возвращающий услуги
     */

    const onClickAddNewSer = (ser) => {
        Service.AddNewSerForClient((data) => console.log(data), {
            idClient: localStorage.getItem("id"),
            Name: ser.name,
        });
    };
    /**
     * разметка страницы
     */
    return (
        <div className={classes.stats}>
            <div className={classes.graphics}>
                <PieChartAllTariffs />
                <PieChartTariffsNow />
                <PieChartAllServices />
                {/* <PieChartMy />
                <PieChartMy /> */}
            </div>
        </div>
    );
}
