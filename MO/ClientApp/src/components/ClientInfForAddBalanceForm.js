import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

/**
 * страница пополнения баланса содержащая поля для заполнения
 */
export default function ClientInfForAddBalanceForm({
  inputValuesForAddBalance,
  setInputValuesForAddBalance,
}) {
  const handleChangeInputForAddBalance = (event) => {
    const { value, name } = event.target;
    setInputValuesForAddBalance((prev) => ({ ...prev, [name]: value }));
  };
  /**
   * разметка страницы
   */
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Информация о пополнении
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="phoneNumberForAddBalance"
            name="PhoneNumberForAddBalance"
            label="Номер пополнения"
            fullWidth
            autoComplete=""
            type="tel"
            maxLength="11"
            disabled
            value={localStorage.getItem("role")}
            onChange={handleChangeInputForAddBalance}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="SumForAdd"
            name="SumForAdd"
            label="Сумма пополнения"
            fullWidth
            autoComplete="400"
            type="number"
            value={inputValuesForAddBalance.SumForAdd}
            onChange={handleChangeInputForAddBalance}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="nameBankCard"
            name="NameBankCard"
            label="Имя владельца"
            fullWidth
            autoComplete="cc-name"
            value={inputValuesForAddBalance.NameBankCard}
            onChange={handleChangeInputForAddBalance}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="numberBankCard"
            name="NumberBankCard"
            label="Номер карты"
            fullWidth
            autoComplete="cc-number"
            type="number"
            maxLength="10"
            value={inputValuesForAddBalance.NumberBankCard}
            onChange={handleChangeInputForAddBalance}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="dateBankCard"
            name="DateBankCard"
            label="Дата окончания службы карты"
            fullWidth
            autoComplete="cc-exp"
            value={inputValuesForAddBalance.DateBankCard}
            onChange={handleChangeInputForAddBalance}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="CVVBankCard"
            name="CvvbankCard"
            label="CVV"
            helperText="Три цифры на обратной стороне карты"
            fullWidth
            autoComplete="cc-csc"
            type="number"
            maxLength="3"
            value={inputValuesForAddBalance.CvvbankCard}
            onChange={handleChangeInputForAddBalance}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
