import {LoginEntity} from "../models/login"

export const isValidLogin = (loginInfo: LoginEntity):boolean =>
    loginInfo.login === "admin" && loginInfo.password === "test";
