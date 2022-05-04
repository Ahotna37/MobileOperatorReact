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
import { Service, Tariff } from "../API/methods";
import { Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Checkbox, TextField } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const error = () => toast.error(' Тариф уже создан', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const success = () => toast.success('Успех!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const classes = useStyles();
    useEffect(() => {
        setTitle("Добавить тариф");
    },[])

    const [inputValuesForTariff, setInputValuesForTariff] = React.useState({
        Name: "",
        CostOneMinCallCity: 0,
        CostOneMinCallOutCity: 0,
        CostOneMinCallInternation: 0,
        IntGb: 0,
        Sms: 0,
        IsPhysTar: true,
        CostChangeTar: 0,
        CanConnectThisTar: true,
        SubcriptionFee: 0,
        FreeMinuteForMonth: 0,
        CostSms: 0,
    });
    const handleChangeInputForTariff = (event) => {
        const { value, name } = event.target;
        setInputValuesForTariff((prev) => ({ ...prev, [name]: value }));
    };
    const handleChangeCheckboxForTariff = (event) => {
        const { checked, name } = event.target;
        setInputValuesForTariff((prev) => ({ ...prev, [name]: checked }));
    };

    const createTariff = () => {
        fetch("https://localhost:5001/api/tariff/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "access-control-expose-headers": "*",
                "Access-Control-Allow-Credentials": "true",
            },
            // credentials: "include",
            body: JSON.stringify({
                Name: inputValuesForTariff.Name,
                CostOneMinCallCity: inputValuesForTariff.CostOneMinCallCity,
                CostOneMinCallOutCity: inputValuesForTariff.CostOneMinCallOutCity,
                CostOneMinCallInternation: inputValuesForTariff.CostOneMinCallInternation,
                IntGb: inputValuesForTariff.IntGb,
                Sms: +inputValuesForTariff.Sms,
                IsPhysTar: inputValuesForTariff.IsPhysTar,
                CostChangeTar: inputValuesForTariff.CostChangeTar,
                CanConnectThisTar: inputValuesForTariff.CanConnectThisTar,
                SubcriptionFee: inputValuesForTariff.SubcriptionFee,
                FreeMinuteForMonth: inputValuesForTariff.FreeMinuteForMonth,
                CostSms: inputValuesForTariff.CostSms,
                Id: 0
            }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    error()
                    return res.json();
                } else {
                    success()
                    return res
                }
            })

    };



    /**
     * разметка страницы
     */
    return (
        <div className={classes.stats}>
            <ToastContainer />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Name"
                label="Название"
                name="Name"
                autoComplete="Name"
                value={inputValuesForTariff.Name}
                onChange={handleChangeInputForTariff}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="CostOneMinCallCity"
                label="Стоимость звонка в городе"
                type="number"
                id="CostOneMinCallCity"
                value={inputValuesForTariff.CostOneMinCallCity}
                onChange={handleChangeInputForTariff}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="CostOneMinCallOutCity"
                label="Стоимость минуты вне города"
                name="CostOneMinCallOutCity"
                autoComplete="CostOneMinCallOutCity"
                type="number"
                value={inputValuesForTariff.CostOneMinCallOutCity}
                onChange={handleChangeInputForTariff}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="CostOneMinCallInternation"
                label="Стоимость минуты в другую страну"
                name="CostOneMinCallInternation"
                type="number"
                autoComplete="CostOneMinCallInternation"
                value={inputValuesForTariff.CostOneMinCallInternation}
                onChange={handleChangeInputForTariff}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="IntGb"
                label="ГБ в месяц"
                type="number"
                id="IntGb"
                value={inputValuesForTariff.IntGb}
                onChange={handleChangeInputForTariff}
            />
            <TextField
                variant="outlined"
                margin="normal"
                type="number"
                required
                fullWidth
                id="Sms"
                label="СМС"
                name="Sms"
                autoComplete="Sms"
                value={inputValuesForTariff.Sms}
                onChange={handleChangeInputForTariff}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="CostChangeTar"
                label="Стоимость смены тарифа"
                type="number"
                id="CostChangeTar"
                value={inputValuesForTariff.CostChangeTar}
                onChange={handleChangeInputForTariff}
            />

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="SubcriptionFee"
                label="Стоимость тарифа в месяц"
                type="number"
                id="SubcriptionFee"
                value={inputValuesForTariff.SubcriptionFee}
                onChange={handleChangeInputForTariff}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="FreeMinuteForMonth"
                label="Минут в месяц"
                type="number"
                id="FreeMinuteForMonth"
                value={inputValuesForTariff.FreeMinuteForMonth}
                onChange={handleChangeInputForTariff}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="CostSms"
                label="Стоимость смс"
                type="number"
                id="CostSms"
                value={inputValuesForTariff.CostSms}
                onChange={handleChangeInputForTariff}
            />
            <Checkbox
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="IsPhysTar"
                label="Тариф для физичиского / юридического лица"
                id="IsPhysTar"
                checked={inputValuesForTariff.IsPhysTar}
                onChange={handleChangeCheckboxForTariff}
            />
            Тариф для физичиского(true) / юридического(false) лица
            <Checkbox variant="outlined"
                margin="normal"
                required
                fullWidth
                name="CanConnectThisTar"
                text="Можно ли подключить тариф?"
                id="CanConnectThisTar"
                checked={inputValuesForTariff.CanConnectThisTar}
                onChange={handleChangeCheckboxForTariff}
            />
            Можно ли подключить тариф?
            <div>
                <Button variant="contained" color="secondary" onClick={createTariff}>
                    Создать
                </Button>
            </div>
        </div>
    );
}
