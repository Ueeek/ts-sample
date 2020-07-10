import React, { useState, useContext } from "react";
import { NotificationComponent } from "../common";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import makeStyles from "@material-ui/styles/makeStyles";
import createStyles from "@material-ui/styles/createStyles";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";

import { LoginEntity, createEmptyLogin } from "../models/login";
import { isValidLogin } from "../api/login";
import {
  LoginFormErrors,
  createDefaultLoginFormErrors,
} from "./loginPage.viewmodel";
import { loginFormValidation } from "./loginPage.validation";
import {
  FieldValidationResult,
  FormValidationResult,
} from "lc-form-validation";
import { TextFieldForm, SessionContext} from "../common";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      maxWidth: 400,
      margin: "0 auto",
    },
  })
);

interface Props extends RouteComponentProps {}

const LoginPageInner = (props: Props) => {
  const [loginInfo, setLoginInfo] = useState<LoginEntity>(createEmptyLogin());
  const loginContext = useContext(SessionContext);

  const [loginFormErrors, setLoginFormErrors] = useState<LoginFormErrors>(
    createDefaultLoginFormErrors()
  );
  const [showLoginFailedMsg, setShowLoginFailedMsg] = useState(false);

  const classes = useStyles();

  const onLogin = () => {
    loginFormValidation.validateForm(loginInfo).then((FormValidationResult) => {
      if (FormValidationResult.succeeded) {
        if (isValidLogin(loginInfo)) {
          props.history.push("/pageB");
          loginContext.updateLogin(loginInfo.login);
        } else {
          setShowLoginFailedMsg(true);
        }
      } else {
        alert("error, review the fields");
        const updatedLoginFormErrors = {
          ...loginFormErrors,
          ...FormValidationResult.fieldErrors,
        };
        setLoginFormErrors(updatedLoginFormErrors);
      }
    });
  };

  const onUpdateLoginField = (name: string, value: any) => {
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });

    loginFormValidation
      .validateField(loginInfo, name, value)
      .then((FieldValidationResult) => {
        setLoginFormErrors({
          ...loginFormErrors,
          [name]: FieldValidationResult,
        });
      });
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader title="login" />
        <CardContent>
          <LoginForm
            onLogin={onLogin}
            onUpdateField={onUpdateLoginField}
            loginInfo={loginInfo}
            loginFormErrors={loginFormErrors}
          />
        </CardContent>
      </Card>
      <NotificationComponent
        message="Invalid login or password, please type agin"
        show={showLoginFailedMsg}
        onClose={() => setShowLoginFailedMsg(false)}
      />
    </>
  );
};

interface PropsForm {
  onLogin: () => void;
  onUpdateField: (name: string, value: any) => void;
  loginInfo: LoginEntity;
  loginFormErrors: LoginFormErrors;
}

const useFormStyles = makeStyles((theme) =>
  createStyles({
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

const LoginForm = (props: PropsForm) => {
  const classes = useFormStyles();
  const { onLogin, onUpdateField, loginInfo, loginFormErrors } = props;

  const onTexFieldChange = (fieldId: any) => (e: any) => {
    onUpdateField(fieldId, e.target.value);
  };
  return (
    <div className={classes.formContainer}>
      <TextFieldForm
        label="Name"
        name="login"
        value={loginInfo.login}
        onChange={onUpdateField}
        error={loginFormErrors.login.errorMessage}
      />
      <TextFieldForm
        label="Password"
        name="password"
        type="password"
        value={loginInfo.password}
        onChange={onUpdateField}
        error={loginFormErrors.password.errorMessage}
      />
      <Button variant="contained" color="primary" onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};

export const LoginPage = withRouter(LoginPageInner);
