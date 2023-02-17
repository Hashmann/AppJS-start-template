// import jwt from 'jsonwebtoken'
// import {logger} from '../utils/logger.utils.js'
// import config from "config";
//
// export default (req, res, next) => {
//   const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
//   if (token) {
//     try {
//       const decoded = jwt.verify(token, config.get('jwtSecretKey'))
//       req.userId = decoded._id
//       next()
//     } catch (err) {
//       logger('err', `JWT token not decoded`, err, 'checkAuth', `${req.ip}`, 'NO ACCESS', 'x')
//
//       // logger('info', `messageText`, 'err', 'checkAuth', `${req.ip}`, 'NO ACCESS', 'v')
//       // logger('info', `messageText`, '', '', `${req.ip}`, 'NO ACCESS', 'x')
//       // logger('warn', `messageText`, 'err', 'checkAuth', `${req.ip}`, 'NO ACCESS', 'v')
//       // logger('warn', `messageText`, '', '', `${req.ip}`, 'NO ACCESS', 'x')
//       // logger('err', `messageText`, 'err', 'checkAuth', `${req.ip}`, 'NO ACCESS', 'v')
//       // logger('err', `messageText`, '', '', `${req.ip}`, 'NO ACCESS', 'x')
//       return res.status(403).json({message: 'Нет доступа'})
//     }
//   } else {
//     logger('err', `JWT token not found`, '', 'checkAuth', `${req.ip}`, 'NO ACCESS', 'x')
//     return res.status(403).json({message: 'Нет доступа'})
//   }
//   // res.send(token)
//   logger('info', `Check Auth work`, '', 'checkAuth', `${req.ip}`, 'DONE', 'v')
// }