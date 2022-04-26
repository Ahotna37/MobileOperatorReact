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
import { TextField } from "@material-ui/core";

/**
 * страница услуг
 */
/**
 * стили страницы
 */

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    paperModal: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        //maxWidth:"30%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: "red",
    },
    registr: {
        margin: theme.spacing(1, 0, 2),
    },
}));

export default function AdminTariff({ setTitle }) {
    const classes = useStyles();
    const [name, setName] = useState();
    const [costOneMinCallCity, setCostOneMinCallCity] = useState();
    const [costOneMinCallOutCity, setCostOneMinCallOutCity] = useState();
    const [costOneMinCallInternation, setCostOneMinCallInternation] = useState();
    const [intGB, setIntGB] = useState();
    const [SMS, setSMS] = useState();
    const [isPhysTar, setIsPhysTar] = useState();
    const [costChangeTar, setCostChangeTar] = useState();
    const [CanConnectThisTar, setCanConnectThisTar] = useState();
    const [subcriptionFee, setSubcriptionFee] = useState();
    const [freeMinuteForMonth, setFreeMinuteForMonth] = useState();
    const [costSms, setCostSms] = useState();
    useEffect(() => {

    }, []);

    /**
     * разметка страницы
     */
    return (
        <div className={classes.stats}>
            <Typography>qwewqeqw</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Название"
                name="name"
                autoComplete="login"
                value={name}
                onChange={setName}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="costOneMinCallCity"
                label="Стоимость звонка в городе"
                type="costOneMinCallCity"
                id="costOneMinCallCity"
                value={costOneMinCallCity}
                onChange={setCostOneMinCallCity}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="costOneMinCallOutCity"
                label="Стоимость минуты вне города"
                name="costOneMinCallOutCity"
                autoComplete="costOneMinCallOutCity"
                value={costOneMinCallOutCity}
                onChange={setCostOneMinCallOutCity}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="costOneMinCallInternation"
                label="Стоимость минуты в другую страну"
                name="costOneMinCallInternation"
                autoComplete="costOneMinCallInternation"
                value={costOneMinCallInternation}
                onChange={setCostOneMinCallInternation}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="intGB"
                label="ГБ в месяц"
                type="intGB"
                id="intGB"
                value={intGB}
                onChange={setIntGB}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="SMS"
                label="смс"
                name="SMS"
                autoComplete="SMS"
                value={SMS}
                onChange={setSMS}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="isPhysTar"
                label="Тариф для физичиского / юридического лица"
                type="isPhysTar"
                id="isPhysTar"
                value={isPhysTar}
                onChange={setIsPhysTar}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="costChangeTar"
                label="Стоимость смены тарифа"
                type="costChangeTar"
                id="costChangeTar"
                value={costChangeTar}
                onChange={setCostChangeTar}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="CanConnectThisTar"
                label="Можно ли подключить тариф?"
                type="CanConnectThisTar"
                id="CanConnectThisTar"
                value={CanConnectThisTar}
                onChange={setCanConnectThisTar}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="subcriptionFee"
                label="Стоимость тарифа в месяц"
                type="subcriptionFee"
                id="subcriptionFee"
                value={subcriptionFee}
                onChange={setSubcriptionFee}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="freeMinuteForMonth"
                label="Минут в месяц"
                type="freeMinuteForMonth"
                id="freeMinuteForMonth"
                value={freeMinuteForMonth}
                onChange={setFreeMinuteForMonth}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="costSms"
                label="Стоимость смс"
                type="costSms"
                id="costSms"
                value={costSms}
                onChange={setCostSms}
            />
        </div>
    );
}
