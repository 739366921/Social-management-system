//引入bcryptjs文件用于加密密码
const bcrypt  = require('bcryptjs')

    //加密密码
const tools={
        enbcrypt(password){
            let salt = bcrypt.genSaltSync(10)
            let hash=bcrypt.hashSync(password,salt)
            return hash
        }
}

module.exports=tools
