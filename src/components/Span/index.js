import {isWeb, Convert} from '../../lib.js'

import ComWeb from './span.web.js'
import ComMobile from './span.mobile.js'

let Com = isWeb() ? ComWeb : ComMobile
export default Com
