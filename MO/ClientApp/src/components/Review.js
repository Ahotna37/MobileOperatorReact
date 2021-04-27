import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

/**
 * страница после заполнения полей для пополнения баланса
 */
const payments = [
  { name: "Владелец карты", detail: "ANTON BELYAEV" },
  { name: "Номер карты", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Дата окончания", detail: "04/2024" },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ inputValuesForAddBalance }) {
  const classes = useStyles();
  console.log(inputValuesForAddBalance);
  /**
   * разметка страницы
   */
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Сумма пополнения
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {inputValuesForAddBalance.SumForAdd}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Номер пополнения
          </Typography>
          <Typography gutterBottom>
            {inputValuesForAddBalance.PhoneNumberForAddBalance}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Информация о карте
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Владелец карты</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {inputValuesForAddBalance.NameBankCard}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Номер карты</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {inputValuesForAddBalance.NumberBankCard}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Дата окончания</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {inputValuesForAddBalance.DateBankCard}
                </Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
