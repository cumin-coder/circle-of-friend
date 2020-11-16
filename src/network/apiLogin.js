import Ajax from "./request"

const MAINURL = "/login"

/**
 *注册接口 用户注册不能重复
 * @param username
 * @param password
 * @param email
 * @param code
 * @param urlheader
 * @param changename
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqUserRegisterIfRepetitionr = (username, password, email, code, urlheader, changename) => {
    return Ajax.post(MAINURL + "/userRegisterIfRepetition", {
        username,
        password,
        email,
        code,
        urlheader,
        changename
    })
}

/**
 * 用户名是否存在
 * @param username
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqUserIsExist= (username) => {
    return Ajax.post(MAINURL + "/userIsExist", {
        username
    })
}

/**
 * 验证邮箱号是否存在
 * @param email
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqEmailIsExist =(email)=>{
    return Ajax.post(MAINURL+ "/emailIsExist",{
        email
    })
}


/**
 * 获取验证码
 * @param username
 * @param password
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqGetCode = (email) => {
    return Ajax.post(MAINURL + "/getcode", {
        email
    })
}

/**
 * token
 * @param token
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqToken= (token)=>{
    return Ajax.post(MAINURL+"/token",{
        token
    })
}

/**
 * 用户登录
 * @param username
 * @param password
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqUserLogin = (username,password)=>{
    return Ajax.post(MAINURL + "/userLogin",{
        username,
        password
    })
}


//$AjaxLogin