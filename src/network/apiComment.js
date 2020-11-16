import Ajax from "./request"


//contentwall
const MAINURL = "/contentwall";

/**
 * 查找指定的内容
 * @param nickname
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqProfileUser = (nickname)=>{
    return Ajax.post(MAINURL + "/profileUser",{
        nickname
    })
}

/**
 * 删除昵称
 * @param nickname
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqDelProfile  = (nickname)=>{
    return Ajax.post(MAINURL + "/delprofile",{
        nickname
    })
}


/**
 * 修改昵称 NickName
 * @param newName
 * @param oldName
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqUpdataNickName = (newName,oldName)=>{
    return Ajax.post(MAINURL+"/targetnickname",{
        newName,
        oldName
    })
}


/**
 *
 * 追加评论的接口
 * @param _id
 * @param content
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqAddComment = function (_id, content) {
    return Ajax.post(MAINURL + "/addCommentContent", {
        _id,
        content
    })
}

/**
 * 查询评论内容的接口
 * @param _id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqFindComment = (_id) => Ajax.post(MAINURL + "/findCommentContent", {_id})


/**
 * 点击点赞数量增加
 * @param _id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqUpdataGoodCount = (_id) => Ajax.post(MAINURL + "/updatainfo", {_id})


/**
 * 点击评论数量增加
 * @param _id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqUpdataCommentCount = (_id) => Ajax.post(MAINURL + "/updatacommentcount", {_id})


/**
 * 获取数据库中所有的数据信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export const reqGetAllMessage = () => Ajax.post(MAINURL + "/getinfo")



