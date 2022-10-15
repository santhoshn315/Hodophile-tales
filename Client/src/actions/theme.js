import { LIGHT, DARK } from "../constants/actoinTypes";

export const themeLight = () => (dispatch) => dispatch({ type: LIGHT });
export const themeDark = () => (dispatch) => dispatch({ type: DARK });
