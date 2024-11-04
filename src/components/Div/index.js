import {isWeb, Convert} from '../../lib.js'

import ComWeb from './div.web.js'
import ComMobile from './div.mobile.js'

let Com = isWeb() ? ComWeb : ComMobile
export default Com
