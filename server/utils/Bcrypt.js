const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e)
    }
  })
}

let comparePassword = (userPassword, passwordInDB) => {
  return bcrypt.compareSync(userPassword, passwordInDB)
}

module.exports = {
  hashPassword,
  comparePassword
}


