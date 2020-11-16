import Ajax from "./request"

const MAINURL = "/switch"


/**
 * 改变昵称的接口
 * @param id
 * @param newName
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqChangeName = (id,newName)=>{
    return Ajax.post(MAINURL + "/changname",{
        id,
        newName,
    })
}

/**
 * 获取默认昵称的函数
 * @param username
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqAjaxGetChangeName = (username)=>{
    return Ajax.post(MAINURL + "/getchangename",{
        username
    })
}

/**
 * 获取头像URL
 * @param _id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqAjaxGetHeader = (_id)=>{
    return Ajax.post(MAINURL + '/getheader',{
        _id
    })
}

/**
 * 上传图片
 * @param form
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqAjaxFormData = (form)=>{
    return Ajax.post(MAINURL + "/setheaderurl",form,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
