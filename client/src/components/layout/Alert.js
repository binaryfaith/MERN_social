import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertToggled } from '../../reducers/alert';

export default function Alert() {
  const alerts = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  console.log(alerts);

  const alertMessage =
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className='alert-wrapper'>
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          {alert.msg}
        </div>
      </div>
    ));

  setTimeout(
    () =>
      alerts.map((alert) => {
        console.log(alert.id);
        dispatch(alertToggled({ id: alert.id }));
      }),
    500
  );

  return alertMessage;
}
