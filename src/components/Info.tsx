import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../slices';
import { prepareMoney } from '../utils/normalize';
import { moneyFormat } from '../utils/moneyFormat';
import { FORM_FIELDS } from '../constants/formFields';

const PERSENT_PERSONAL_INCOME_TAX = 0.13;

const getSalaryForTimeContent = (amount: string, money: number) => {
  const period = {
    [FORM_FIELDS.AMOUNT.SALARY_FOR_MONTH]: 'месяц',
    [FORM_FIELDS.AMOUNT.SALARY_MIN_LABOR]: 'месяц',
    [FORM_FIELDS.AMOUNT.SALARY_FOR_DAY]: 'день',
    [FORM_FIELDS.AMOUNT.SALARY_FOR_HOUR]: 'час',
  };

  const text = `за сотрудника в ${period[amount]}`;

  return (
    <div>
      <b>{moneyFormat(money)}</b>
      &nbsp;
      <span>{text}</span>
    </div>
  );
};

const Info = () => {
  const {
    controlForm:
    {
      values: {
        inputMoney, withoutPersonalIncomeTax, amount,
      },
    },
  } = useSelector((state: AppState) => state.form);

  if (inputMoney.length === 0) {
    return null;
  }

  const preparedMoney = prepareMoney(inputMoney);
  const personalIncomeTax = Math.floor(
    preparedMoney * PERSENT_PERSONAL_INCOME_TAX,
  ); // преблезительно

  const moneyNum = withoutPersonalIncomeTax ? preparedMoney : preparedMoney - personalIncomeTax;
  const moneyByPeriod = withoutPersonalIncomeTax
    ? preparedMoney + personalIncomeTax : preparedMoney;

  const salaryContent = (
    <div className="d-flex">
      <b>{moneyFormat((moneyNum))}</b>
      &nbsp;
      <span>сотрудник будет получать на руки</span>
    </div>
  );

  const personalIncomeTaxContent = (
    <div className="d-flex">
      <b>{moneyFormat((personalIncomeTax))}</b>
      &nbsp;
      <span>НДФЛ, 13% от оклада</span>
    </div>
  );

  const salaryForTimeContent = getSalaryForTimeContent(amount, moneyByPeriod);

  return (
    <div className="container-sm mt-3 bg-warning rounded">
      <div className="row p-2">{salaryContent}</div>
      <div className="row p-2">{personalIncomeTaxContent}</div>
      <div className="row p-2">{salaryForTimeContent}</div>
    </div>
  );
};

export { Info };
