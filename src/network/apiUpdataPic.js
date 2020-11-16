import Ajax from "./request"

//uploaded
const UPLOADED = "/uploaded";


/**
 * 上传图片到服务器
 * @param form
 * @param config
 * @returns {Promise<AxiosResponse<T>>}
 */
export const uploadedServer = function (form){
    return Ajax.post(`${UPLOADED}/addimg`,form,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


/**
 * 获取图片的所有数据
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqGetAllImage = function (){
    return Ajax.get(`${UPLOADED}/getfileimg`)
}


/**
 * 点赞加一
 * @param _id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqGoodIncrease = (_id) =>{
    return Ajax.post(`${UPLOADED}/updatainfo`,{
        _id
    })
}


/**
 * 追加评论信息
 * @param _id
 * @param content
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqAddCommentContent = (_id,content) =>{
    return Ajax.post(`${UPLOADED}/addCommentContent`,{
        _id,
        content
    })
}


/**
 * 评论数量加一
 * @param _id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqUpdataCommentCount = (_id) =>{
    return Ajax.post(`${UPLOADED}/updatacommentcount`,{
        _id
    })
}


/**
 * 查找所有的评论数据
 * @param _id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqGetAllCommentData = (_id) =>{
    return Ajax.post(`${UPLOADED}/findCommentContent`,{
        _id
    })
}





