import {useUserStore} from "~/stores/user.js";
import {request} from "~/utils/request";


export const getUser = () => {
    let user = useUserStore();
    request({
        url: '/v1/user',
        method: 'GET'
    }).then((res) => {
        user.username = res.data.data.username;
        user.name = res.data.data.name;
        user.type = res.data.data.type;
        user.id = res.data.data.id;
        user.phone = res.data.data.phone;
    }).catch((err) => {
        console.log(err)
    })
}