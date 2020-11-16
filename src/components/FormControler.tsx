import React, { useState, useRef, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Field, reduxForm, change } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../slices';
import { normalizeMoney } from '../utils/normalize';
import { FORM_FIELDS } from '../constants/formFields';

const MIN_SALARY_LABOR_IN_PENZA = '12130';

const FormControlerComponent = () => {
  const [showMWLInfo, setShowMWLInfo] = useState(false);
  const mWLRef = useRef();
  const inputRef: any = useRef();
  const dispatch = useDispatch();

  const {
    controlForm: {
      values: { withoutPersonalIncomeTax, amount },
    },
  } = useSelector((state: AppState) => state.form);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const setSelectInput = async () => {
      if (amount === FORM_FIELDS.AMOUNT.SALARY_MIN_LABOR) {
        await dispatch(change('controlForm', FORM_FIELDS.INPUT_MONEY, normalizeMoney(MIN_SALARY_LABOR_IN_PENZA)));
      }

      if (inputRef.current) {
        inputRef.current.select();
      }
    };

    setSelectInput();
  }, [amount]);

  const iconContent = showMWLInfo ? 'highlight_off' : 'error_outline';

  const mMWLLabelContent = (
    <div onMouseEnter={() => setShowMWLInfo(true)} onMouseLeave={() => setShowMWLInfo(false)}>
      <OverlayTrigger
        target={mWLRef.current}
        show={showMWLInfo}
        placement="right"
        overlay={<Tooltip id="button-tooltip-2">МРОТ - минимальный размер оплаты труда. Разный для разных регионов</Tooltip>}
      >
        <div className="d-flex align-items-center">
          <span>МРОТ</span>
          <i className="material-icons">{iconContent}</i>
        </div>
      </OverlayTrigger>
    </div>
  );

  const getIncomeTaxTextClass = (flag: boolean) => `small_tex ${flag ? 'text-secondary' : 'text-dark '}`;

  const incomeTaxContent = (
    <div className="d-flex align-items-center mt-3 mb-3 ml-3">
      <span className={getIncomeTaxTextClass(withoutPersonalIncomeTax)}>Указать НДФЛ</span>
      <div className="custom-control custom-switch ml-2">
        <Field
          type="checkbox"
          name={FORM_FIELDS.WITHOUT_PERSONAL_INCOME_TAX}
          className="custom-control-input"
          id={FORM_FIELDS.WITHOUT_PERSONAL_INCOME_TAX}
          component="input"
        />
        <label className="custom-control-label" htmlFor={FORM_FIELDS.WITHOUT_PERSONAL_INCOME_TAX}>
          <span className={getIncomeTaxTextClass(!withoutPersonalIncomeTax)}>Без НДФЛ</span>
        </label>
      </div>
    </div>
  );

  const inputMoneyContent = (
    <div className="mt-2 mb-2 d-flex align-items-center">
      <Field
        className="form-control rounded-pill"
        type="text"
        component="input"
        name={FORM_FIELDS.INPUT_MONEY}
        id={FORM_FIELDS.INPUT_MONEY}
        normalize={normalizeMoney}
        props={{
          ref: inputRef,
        }}
      />
      <label className="ml-2 text-dark h4" htmlFor={FORM_FIELDS.INPUT_MONEY}>&#8381;</label>
    </div>
  );

  return (
    <div className="text-sm-left text-secondary">
      <h6>Сумма</h6>
      <form className="ml-3">
        <div className="custom-control custom-radio mt-2 mb-2">
          <Field
            type="radio"
            name={FORM_FIELDS.AMOUNT.NAME}
            className="custom-control-input"
            id={FORM_FIELDS.AMOUNT.SALARY_FOR_MONTH}
            value={FORM_FIELDS.AMOUNT.SALARY_FOR_MONTH}
            component="input"
          />
          <label className="custom-control-label text-dark" htmlFor={FORM_FIELDS.AMOUNT.SALARY_FOR_MONTH}>Оклад за месяц</label>
        </div>
        <div className="custom-control custom-radio mt-2 mb-2">
          <Field
            type="radio"
            name={FORM_FIELDS.AMOUNT.NAME}
            className="custom-control-input"
            id={FORM_FIELDS.AMOUNT.SALARY_MIN_LABOR}
            value={FORM_FIELDS.AMOUNT.SALARY_MIN_LABOR}
            component="input"
          />
          <label className="custom-control-label text-dark" htmlFor={FORM_FIELDS.AMOUNT.SALARY_MIN_LABOR}>
            {mMWLLabelContent}
          </label>
        </div>
        <div className="custom-control custom-radio mt-2 mb-2">
          <Field
            type="radio"
            name={FORM_FIELDS.AMOUNT.NAME}
            className="custom-control-input"
            id={FORM_FIELDS.AMOUNT.SALARY_FOR_DAY}
            value={FORM_FIELDS.AMOUNT.SALARY_FOR_DAY}
            component="input"
          />
          <label className="custom-control-label text-dark" htmlFor={FORM_FIELDS.AMOUNT.SALARY_FOR_DAY}>Оплата за день</label>
        </div>
        <div className="custom-control custom-radio mt-2 mb-2">
          <Field
            type="radio"
            name={FORM_FIELDS.AMOUNT.NAME}
            className="custom-control-input"
            id={FORM_FIELDS.AMOUNT.SALARY_FOR_HOUR}
            value={FORM_FIELDS.AMOUNT.SALARY_FOR_HOUR}
            component="input"
          />
          <label className="custom-control-label text-dark" htmlFor={FORM_FIELDS.AMOUNT.SALARY_FOR_HOUR}>Оплата за час</label>
        </div>
        {incomeTaxContent}
        {inputMoneyContent}
      </form>
    </div>
  );
};

const FormControler = reduxForm({
  form: 'controlForm',
  initialValues: {
    [FORM_FIELDS.AMOUNT.NAME]: FORM_FIELDS.AMOUNT.SALARY_FOR_MONTH,
    [FORM_FIELDS.WITHOUT_PERSONAL_INCOME_TAX]: true,
    [FORM_FIELDS.INPUT_MONEY]: '',
  },
})(FormControlerComponent);

export { FormControler };
